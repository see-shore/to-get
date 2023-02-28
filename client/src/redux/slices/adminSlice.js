import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publishToUsers } from "../api/adminAPI";

const initialState = {
  
};

export const publishToUsersAsync = createAsyncThunk(
  'admin/publishToUsers',
  async (_, { dispatch }) => {
    const response = await publishToUsers();
    return response;
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
})

export const { } = adminSlice.actions;

export default adminSlice.reducer;
