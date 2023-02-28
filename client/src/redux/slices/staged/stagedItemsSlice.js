import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addStagedItem, getStagedItems } from '../../api/staged/stagedItemsAPI';

const initialState = {
  stagedItems: [],
  loadingStagedItemsData: false
};

export const getStagedItemsAsync = createAsyncThunk(
  'stagedItems/getStagedItems',
  async (_, { dispatch }) => {
    const stagedItems = await getStagedItems();
    return stagedItems;
  }
);

export const addStagedItemAsync = createAsyncThunk(
  'stagedItems/addStagedItem',
  async (itemData, { dispatch }) => {
    const stagedItem = await addStagedItem(itemData);
    return stagedItem;
  }
);

export const stagedItemsSlice = createSlice({
  name: 'stagedItems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStagedItemsAsync.pending, (state) => {
        state.loadingStagedItemsData = true;
      })
      .addCase(getStagedItemsAsync.fulfilled, (state, action) => {
        state.loadingStagedItemsData = false;
        state.stagedItems = action.payload;
      })
      .addCase(addStagedItemAsync.pending, (state) => {
        state.loadingStagedItemsData = true;
      })
      .addCase(addStagedItemAsync.fulfilled, (state, action) => {
        state.loadingStagedItemsData = false;
        state.stagedItems.push(action.payload);
      });
  }
});

export const { } = stagedItemsSlice.actions;

export default stagedItemsSlice.reducer;

