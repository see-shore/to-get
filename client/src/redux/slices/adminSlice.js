import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
  archiveAllPublishedData, 
  publishToUsers, 
  publishDeliveryDate,
  getMostRecentlySetDeliveryDate
} from "../api/adminAPI";

const initialState = {
  deliveryDate: null,
  deliveryId: null
};

export const publishToUsersAsync = createAsyncThunk(
  'admin/publishToUsers',
  async (_, { dispatch }) => {
    const response = await publishToUsers();
    return response;
  }
);

export const archiveAllPublishedDataAsync = createAsyncThunk(
  'admin/archiveAll',
  async (_, { dispatch }) => {
    const response = await archiveAllPublishedData();
    return response;
  }
);

export const publishDeliveryDateAsync = createAsyncThunk(
  'admin/publishDeliveryDate',
  async (deliveryData, { dispatch }) => {
    const response = await publishDeliveryDate(deliveryData);
    return response;
  }
);

export const getMostRecentlySetDeliveryDateAsync = createAsyncThunk(
  'admin/getMostRecentlySetDeliveryDate',
  async (_, { dispatch }) => {
    const response = await getMostRecentlySetDeliveryDate();
    return response;
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(publishDeliveryDateAsync.fulfilled, (state, action) => {
        state.deliveryDate = action.payload.deliveryDate;
        state.deliveryId = action.payload.uuid;
      })
      .addCase(getMostRecentlySetDeliveryDateAsync.fulfilled, (state, action) => {
        state.deliveryDate = action.payload.deliveryDate;
        state.deliveryId = action.payload.uuid;
      });
  }
})

export const { } = adminSlice.actions;

export default adminSlice.reducer;
