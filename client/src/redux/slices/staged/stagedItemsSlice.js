import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStagedItems } from '../../api/staged/stagedItemsAPI';

const initialState = {
  stagedItems: [],
  loadingStagedItemsData: false
};

export const getStagedItemsAsync = createAsyncThunk(
  'stagedItems/getStagedItems',
  async (_, { dispatch }) => {
    const stagedItems = await getStagedItems();
    console.log(stagedItems);
    return stagedItems;
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
      });
  }
});

export const { } = stagedItemsSlice.actions;

export default stagedItemsSlice.reducer;

