import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrders, deleteOrder, getOrders } from '../api/ordersAPI';

const initialState = {
  orders: [],
  loadingOrdersData: false,
  saveOrdersPending: false,
  myOrders: [],
  thanksDialogOpen: false
};

export const getOrdersAsync = createAsyncThunk(
  'orders/getOrders',
  async (_, { dispatch }) => {
    const orders = await getOrders();
    return orders;
  }
);

export const createOrdersAsync = createAsyncThunk(
  'orders/createOrders',
  async (ordersData, { dispatch }) => {
    const orders = await createOrders(ordersData);
    return orders;
  }
);

export const deleteOrderAsync = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { dispatch }) => {
    await deleteOrder(orderId);
    return orderId;
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
      })
      .addCase(createOrdersAsync.pending, (state) => {
        state.saveOrdersPending = true;
      })
      .addCase(createOrdersAsync.fulfilled, (state, action) => {
        state.saveOrdersPending = false;
        state.myOrders = action.payload;
        state.thanksDialogOpen = true;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        let index = state.orders.findIndex(
          (order) => order.id === action.payload
        );
        state.orders = [
          ...state.orders.slice(0, index),
          ...state.orders.slice(index + 1)
        ];
      });
  }
});

export const { } = ordersSlice.actions;

export default ordersSlice.reducer;
