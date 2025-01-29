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

interface BookingFormProps {
  court: Court;
  open: boolean;
  onClose: () => void;
}

const BookingForm = ({ court, open, onClose }: BookingFormProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState('1');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Validation and submission logic will be added later
    console.log({ date, startTime, duration });
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