import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItems, updateItem, uploadImage } from '../api/itemsAPI';
import { cartExists, isCartValid, getCart } from "../../util/AppUtil";

const initialState = {
  items: [],
  cart: {},   // { itemId: quantity }
  cartCount: 0, // Total quantity of items so far
  loadingItemsData: false,
  loadingItemData: false
};

export const getItemsAsync = createAsyncThunk(
  'items/getItems',
  async (_, { dispatch }) => {
    const items = await getItems();
    dispatch(initializeCart(items));

    if (cartExists() && isCartValid()) {
      const cart = getCart();
      dispatch(setCart(cart));
    }

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
      if (action.payload.isIncrement) {
        state.cartCount += 1;
      } else {
        if (state.cartCount > 0) {
          state.cartCount -= 1;
        } else {
          state.cartCount = 0;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('cartUpdatedAt', new Date());
    },
    removeFromCart: (state, action) => {
      const qty = state.cart[action.payload];
      if (state.cartCount - qty > 0) {
        state.cartCount -= qty;
      } else {
        state.cartCount = 0;
      }
      state.cart[action.payload] = 0;
      localStorage.setItem('cart', JSON.stringify(state.cart));
      localStorage.setItem('cartUpdatedAt', new Date());
    },
    clearCart: (state) => {
      state.cart = {};
      localStorage.removeItem('cart');
      localStorage.removeItem('cartUpdatedAt');
    },
    setCart: (state, action) => {
      Object.entries(action.payload).forEach((obj) => {
        const [itemId, qty] = obj;
        state.cart[itemId] = qty;
        state.cartCount += qty;
      });
    },
    initializeCart: (state, action) => {
      action.payload.forEach((item) => state.cart[item.id] = 0);
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
      });
  }
});

export const { 
  updateCart,
  removeFromCart,
  clearCart,
  setCart,
  initializeCart
} = itemsSlice.actions;

export default itemsSlice.reducer;
