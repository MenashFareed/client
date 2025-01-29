import { configureStore } from '@reduxjs/toolkit';
import courtsReducer from './slices/courtsSlice.ts';
import authReducer from './slices/authSlice.ts';
import bookingsReducer from './slices/bookingsSlice.ts';

export const store = configureStore({
  reducer: {
    courts: courtsReducer,
    auth: authReducer,
    bookings: bookingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 