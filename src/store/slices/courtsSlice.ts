import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Court } from '../../types/Court';
import api from '../../services/api.ts';

interface CourtsState {
  courts: Court[];
  loading: boolean;
  error: string | null;
}

const initialState: CourtsState = {
  courts: [],
  loading: false,
  error: null,
};

export const fetchCourts = createAsyncThunk(
  'courts/fetchCourts',
  async () => {
    const response = await api.get('/courts');
    return response.data;
  }
);

const courtsSlice = createSlice({
  name: 'courts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourts.fulfilled, (state, action) => {
        state.courts = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courts';
      });
  },
});

export default courtsSlice.reducer; 