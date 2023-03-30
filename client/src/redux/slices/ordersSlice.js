import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrders, deleteOrder, getOrders, getMyOrders } from '../api/ordersAPI';
import { setLoadingUserData, setUserTotal } from "./usersSlice";

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
    dispatch(setLoadingUserData(false));
    return orders;
  }
);

export const getMyOrdersAsync = createAsyncThunk(
  'orders/getMyOrders',
  async (userId, { dispatch }) => {
    const orders = await getMyOrders(userId);
    return orders;
  }
);

export const createOrdersAsync = createAsyncThunk(
  'orders/createOrders',
  async (data, { dispatch }) => {
    const { orders, orderTotal } = data;
    dispatch(setUserTotal(orderTotal));
    const response = await createOrders(orders, orderTotal);
    return response;
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
  reducers: {
    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    }
  },
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
      })
      .addCase(getMyOrdersAsync.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      });
  }
});

export const { 
  setMyOrders
} = ordersSlice.actions;

export default ordersSlice.reducer;
