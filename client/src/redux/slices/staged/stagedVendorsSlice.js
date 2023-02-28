import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addStagedVendor, getStagedVendors } from '../../api/staged/stagedVendorsAPI';

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

export const addStagedVendorAsync = createAsyncThunk(
  'stagedVendors/addStagedVendor',
  async (vendorData, { dispatch }) => {
    const stagedVendor = await addStagedVendor(vendorData);
    return stagedVendor;
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
      })
      .addCase(addStagedVendorAsync.pending, (state) => {
        state.loadingStagedVendorsData = true;
      })
      .addCase(addStagedVendorAsync.fulfilled, (state, action) => {
        state.loadingStagedVendorsData = false;
        state.stagedVendors.push(action.payload);
      });
  }
});

export const { } = stagedVendorsSlice.actions;

export default stagedVendorsSlice.reducer;
