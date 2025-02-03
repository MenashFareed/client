import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingsService from '../../services/bookings.service.ts';
import { Booking } from '../../types/Booking';
import { TimeSlot } from '../../types/TimeSlot.ts';

interface BookingsState {
  bookings: Booking[];
  slots: TimeSlot[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  slots: [],
  loading: false,
  error: null
};

export const createBooking = createAsyncThunk(
  'bookings/create',
  async (bookingData: Partial<Booking>) => {
    const response = await bookingsService.createBooking(bookingData);
    return response;
  }
);

export const fetchBookings = createAsyncThunk(
  'bookings/fetchAll',
  async () => {
    const response = await bookingsService.getBookings();
    return response;
  }
);

export const fetchTimeSlots = createAsyncThunk(
  'slots/fetchByCourtId',
  async (courtId: string) => {
    const response = await bookingsService.getTimeSlots(courtId);
    return response;
  }
);

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create booking';
      })
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch bookings';
      })

      // slots reducers
      .addCase(fetchTimeSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimeSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload; // Update the slots state
      })
      .addCase(fetchTimeSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch time slots';
      });
  }
});

export default bookingsSlice.reducer; 
