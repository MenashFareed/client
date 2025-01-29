import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingState {
  bookings: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    // Add reducers as needed
  },
});

export default bookingsSlice.reducer; 