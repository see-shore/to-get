import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrders } from '../api/ordersAPI';

const initialState = {
  orders: [],
  loadingOrdersData: false
};

export const getOrdersAsync = createAsyncThunk(
  'orders/getOrders',
  async (_, { dispatch }) => {
    const orders = await getOrders();
    return orders;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersAsync.pending, (state) => {
        state.loadingOrdersData = true;
      })
      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.loadingOrdersData = false;
        state.orders = action.payload;
      });
  }
});

export const { } = ordersSlice.actions;

export default ordersSlice.reducer;
