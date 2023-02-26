import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItems } from '../api/itemsAPI';

const initialState = {
  items: [],
  loadingItemsData: false
};

export const getItemsAsync = createAsyncThunk(
  'items/getItems',
  async (_, { dispatch }) => {
    const items = await getItems();
    console.log(items);
    return items;
  }
);

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
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

export const { } = itemsSlice.actions;

export default itemsSlice.reducer;
