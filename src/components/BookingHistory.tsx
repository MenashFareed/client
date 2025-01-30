import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchBookings } from '../store/slices/bookingsSlice';

const BookingHistory = () => {
  const dispatch = useAppDispatch();
  const { bookings, loading, error } = useAppSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Court</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.courtId}</TableCell>
              <TableCell>
                {new Date(booking.startTime).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(booking.startTime).toLocaleTimeString()}
              </TableCell>
              <TableCell>
                {(new Date(booking.endTime).getTime() - 
                  new Date(booking.startTime).getTime()) / 
                  (1000 * 60 * 60)} hours
              </TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>${booking.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingHistory; 