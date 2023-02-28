import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers, addUser } from '../api/usersAPI';

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

export const addUserAsync = createAsyncThunk(
  'users/addUser',
  async (userData, { dispatch }) => {
    try {
      const response = await addUser(userData);
      return response;
    } catch (err) {
      console.error(err);
    }
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
      })
      .addCase(addUserAsync.pending, (state) => {
        state.loadingUsersData = true;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.loadingUsersData = false;
        state.users.push(action.payload);
      });
  }
});

export const { } = usersSlice.actions;

export default usersSlice.reducer;
