import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItems } from '../api/itemsAPI';

const initialState = {
  items: [],
  cart: {},   // { itemId: quantity }
  loadingItemsData: false
};

export const getItemsAsync = createAsyncThunk(
  'items/getItems',
  async (_, { dispatch }) => {
    const items = await getItems();
    return items;
  }
);

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      const itemId = action.payload.itemId;
      const quantity = action.payload.quantity;
      state.cart[itemId] = quantity;
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('cartUpdatedAt', new Date());
    },
    removeFromCart: (state, action) => {
      delete state.cart[action.payload];
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('cartUpdatedAt', new Date());
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItemsAsync.pending, (state) => {
        state.loadingItemsData = true;
      })
      .addCase(getItemsAsync.fulfilled, (state, action) => {
        state.loadingItemsData = false;
        state.items = action.payload;
      });
  }
});

export const { 
  updateCart,
  removeFromCart
} = itemsSlice.actions;

export default itemsSlice.reducer;
