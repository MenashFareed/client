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
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { createBooking } from '../store/slices/bookingsSlice.ts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { de } from 'date-fns/locale/de';
import { useNavigate } from 'react-router-dom';

interface BookingFormProps {
  court: Court;
  open: boolean;
  onClose: () => void;
}

const BookingForm = ({ court, open, onClose }: BookingFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState('1');
  const [error, setError] = useState<string | null>(null);

  // Show login prompt instead of redirecting
  if (!token) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Alert severity="info">
            Please log in to book a court.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

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
            
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
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
            </LocalizationProvider>
            
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