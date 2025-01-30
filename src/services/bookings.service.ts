import api from './api.ts';
import { Booking } from '../types/Booking';

export const bookingsService = {
  createBooking: async (bookingData: Partial<Booking>) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  getBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  cancelBooking: async (bookingId: string) => {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  }
};

export default bookingsService; 