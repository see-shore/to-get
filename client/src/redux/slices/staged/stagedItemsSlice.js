import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addStagedItem, deleteStagedItem, getStagedItems, updateStagedItem } from '../../api/staged/stagedItemsAPI';

const initialState = {
  stagedItems: [],
  loadingStagedItemsData: false,
  loadingStagedItemData: false
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

export const updateStagedItemAsync = createAsyncThunk(
  'stagedItems/updateStagedItem',
  async (itemData, { dispatch }) => {
    const stagedItem = await updateStagedItem(itemData);
    return stagedItem;
  }
);

export const deleteStagedItemAsync = createAsyncThunk(
  'stagedItems/deleteStagedItem',
  async (itemId, { dispatch }) => {
    await deleteStagedItem(itemId);
    return itemId;
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
      })
      .addCase(updateStagedItemAsync.pending, (state) => {
        state.loadingStagedItemData = true;
      })
      .addCase(updateStagedItemAsync.fulfilled, (state, action) => {
        state.loadingStagedItemData = false;
        let index = state.stagedItems.findIndex(
          (item) => item.id === action.payload.id
        );
        state.stagedItems[index] = action.payload;
      })
      .addCase(deleteStagedItemAsync.fulfilled, (state, action) => {
        let index = state.stagedItems.findIndex(
          (item) => item.id === action.payload
        );
        state.stagedItems = [
          ...state.stagedItems.slice(0, index),
          ...state.stagedItems.slice(index + 1)
        ];
      })
  }
});

export const { } = stagedItemsSlice.actions;

export default stagedItemsSlice.reducer;

