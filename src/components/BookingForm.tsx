import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Court } from '../types/Court';
import { useAppDispatch } from '../hooks/redux.ts';
import { createBooking } from '../store/slices/bookingsSlice.ts';

interface BookingFormProps {
  court: Court;
  open: boolean;
  onClose: () => void;
}

const BookingForm = ({ court, open, onClose }: BookingFormProps) => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState('1');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!date || !startTime || !duration) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + parseInt(duration));

      await dispatch(createBooking({
        courtId: court.id,
        startTime,
        endTime,
      })).unwrap();

      onClose();
    } catch (err) {
      setError('Failed to create booking. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book {court.name}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            {error && <Alert severity="error">{error}</Alert>}
            
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              disablePast
            />
            
            <TimePicker
              label="Select Start Time"
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
            />
            
            <TextField
              label="Duration (hours)"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              inputProps={{ min: 1, max: 4 }}
            />
            
            <Typography variant="body1">
              Total Cost: ${Number(duration) * court.hourlyRate}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Proceed to Payment
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default BookingForm; 