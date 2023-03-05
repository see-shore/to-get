import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getVendors } from '../api/vendorsAPI';

const initialState = {
  vendors: [],
  loadingVendorsData: false
};

export const getVendorsAsync = createAsyncThunk(
  'vendors/getVendors',
  async (_, { dispatch }) => {
    const vendors = await getVendors();
    return vendors;
  }
);

export const vendorsSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVendorsAsync.pending, (state) => {
        state.loadingVendorsData = true;
      })
      .addCase(getVendorsAsync.fulfilled, (state, action) => {
        state.loadingVendorsData = false;
        state.vendors = action.payload;
      });
  }
});

export const { } = vendorsSlice.actions;

export default vendorsSlice.reducer;
