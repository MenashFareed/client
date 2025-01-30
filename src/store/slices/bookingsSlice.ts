import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingsService from '../../services/bookings.service.ts';
import { Booking } from '../../types/Booking';

interface BookingsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
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
      });
  }
});

export default bookingsSlice.reducer; 