import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addStagedVendor, deleteStagedVendor, getStagedVendors, updateStagedVendor } from '../../api/staged/stagedVendorsAPI';

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

export const deleteStagedVendorAsync = createAsyncThunk(
  'stagedVendors/deleteStagedVendor',
  async (vendorId, { dispatch }) => {
    await deleteStagedVendor(vendorId);
    return vendorId;
  }
);

export const updateStagedVendorAsync = createAsyncThunk(
  'stagedVendors/updateStagedVendor',
  async (vendorData, { dispatch }) => {
    const stagedVendor = await updateStagedVendor(vendorData);
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
      })
      .addCase(deleteStagedVendorAsync.fulfilled, (state, action) => {
        let index = state.stagedVendors.findIndex(
          (vendor) => vendor.id === action.payload
        );
        state.stagedVendors = [
          ...state.stagedVendors.slice(0, index),
          ...state.stagedVendors.slice(index + 1)
        ];
      })
      .addCase(updateStagedVendorAsync.fulfilled, (state, action) => {
        let index = state.stagedVendors.findIndex(
          (vendor) => vendor.id === action.payload.id
        );
        state.stagedVendors[index] = action.payload
      });
  }
});

export const { } = stagedVendorsSlice.actions;

export default stagedVendorsSlice.reducer;
