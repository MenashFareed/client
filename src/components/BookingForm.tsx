import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Alert,
} from '@mui/material';
import { Court } from '../types/Court';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { createBooking, fetchTimeSlots } from '../store/slices/bookingsSlice.ts';
import { useNavigate } from 'react-router-dom';
import { TimeSlot } from '../types/TimeSlot.ts';
import TimeSlotPicker from './TimeSlotPicker.tsx';

interface BookingFormProps {
  court: Court;
  open: boolean;
  onClose: () => void;
}

const BookingForm = ({ court, open, onClose }: BookingFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);
  const { slots } = useAppSelector((state) => state.bookings);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async function() {
      await dispatch(fetchTimeSlots(court._id));
    })();
  }, []);

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
    
    if (!selectedTimeSlot) {
      setError('Please select a time slot to book');
      return;
    }

    try {
      await dispatch(createBooking({
        slotId: selectedTimeSlot?._id,
        totalAmount: court.hourlyRate
      })).unwrap();

      // Fetch updated time slots after successful booking
      await dispatch(fetchTimeSlots(court._id));
      
      setSelectedTimeSlot(null); // Reset selected slot
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
            
            <TimeSlotPicker
              slots={slots}
              handleSlotPick={(slot) => setSelectedTimeSlot(slot)}
             />
            
            <Typography variant="body1">
              Total Cost: ${court.hourlyRate}
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