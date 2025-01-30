import api from './api.ts';
import { Court } from '../types/Court';

export const courtsService = {
  getCourts: async () => {
    const response = await api.get('/api/courts');
    return response.data;
  },

  getCourtById: async (id: string) => {
    const response = await api.get(`/api/courts/${id}`);
    return response.data;
  }
};

export default courtsService; 