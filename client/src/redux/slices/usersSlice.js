import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers, addUser, getUser, updateUser } from '../api/usersAPI';

const initialState = {
  users: [],
  loadingUsersData: false,
  user: {},  // Currently logged in user pulled from MySQL DB
  loadingUserData: false
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

export const getUserAsync = createAsyncThunk(
  'users/getUser',
  async (email, { dispatch }) => {
    const user = await getUser(email);
    return user;
  }
);

export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
  async (userData, { dispatch }) => {
    const user = await updateUser(userData);
    return user;
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
      })
      .addCase(getUserAsync.pending, (state) => {
        state.loadingUserData = true;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.loadingUserData = false;
        state.user = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loadingUserData = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loadingUserData = false;
        let index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        state.users[index] = action.payload;
      })
  }
});

export const { } = usersSlice.actions;

export default usersSlice.reducer;
