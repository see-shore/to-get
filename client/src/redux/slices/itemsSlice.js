import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItems, updateItem, uploadImage } from '../api/itemsAPI';

const initialState = {
  items: [],
  cart: {},   // { itemId: quantity }
  loadingItemsData: false,
  loadingItemData: false
};

export const getItemsAsync = createAsyncThunk(
  'items/getItems',
  async (_, { dispatch }) => {
    const items = await getItems();
    return items;
  }
);

export const updateItemAsync = createAsyncThunk(
  'items/updateItem',
  async (itemData, { dispatch }) => {
    const item = await updateItem(itemData);
    return item;
  }
);

export const uploadImageAsync = createAsyncThunk(
  'items/uploadImage',
  async (file) => {
    const response = await uploadImage(file);
    return response;
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
    },
    clearCart: (state) => {
      state.cart = {};
      localStorage.removeItem('cart');
      localStorage.removeItem('cartUpdatedAt');
    },
    setCart: (state, action) => {
      state.cart = action.payload;
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
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.loadingItemData = true;
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.loadingItemData = false;
        let index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
  }
});

export const { 
  updateCart,
  removeFromCart,
  clearCart,
  setCart
} = itemsSlice.actions;

export default itemsSlice.reducer;
