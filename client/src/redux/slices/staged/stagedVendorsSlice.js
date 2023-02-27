import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStagedVendors } from '../../api/staged/stagedVendorsAPI';

const initialState = {
  stagedVendors: [],
  loadingStagedVendorsData: false
};

export const getStagedVendorsAsync = createAsyncThunk(
  'stagedVendors/getStagedVendors',
  async (_, { dispatch }) => {
    const stagedVendors = await getStagedVendors();
    return stagedVendors;
  }
);

export const stagedVendorsSlice = createSlice({
  name: 'stagedVendors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStagedVendorsAsync.pending, (state) => {
        state.loadingStagedVendorsData = true;
      })
      .addCase(getStagedVendorsAsync.fulfilled, (state, action) => {
        state.loadingStagedVendorsData = false;
        state.stagedVendors = action.payload;
      });
  }
});

export const { } = stagedVendorsSlice.actions;

export default stagedVendorsSlice.reducer;
