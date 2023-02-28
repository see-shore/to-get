import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from '../api/usersAPI';

const initialState = {
  users: [],
  loadingUsersData: false
};

export const getUsersAsync = createAsyncThunk(
  'users/getUsers',
  async (_, { dispatch }) => {
    const users = await getUsers();
    return users;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.loadingUsersData = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.loadingUsersData = false;
        state.users = action.payload;
      });
  }
});

export const { } = usersSlice.actions;

export default usersSlice.reducer;
