import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createNewCredentials } from "../api/adminAPI";
import { getUsers, addUser, getUser, updateUser, getRecentUsers } from '../api/usersAPI';

const initialState = {
  users: [],
  loadingUsersData: false,
  user: {},  // Currently logged in user pulled from MySQL DB
  loadingUserData: false,
  recentUsers: [],
  token: "",
  error: null
};

export const getUsersAsync = createAsyncThunk(
  'users/getUsers',
  async (_, { dispatch }) => {
    const users = await getUsers();
    return users;
  }
);

export const createCredentialsAsync = createAsyncThunk(
  'users/createCredentials',
  async (data, { dispatch }) => {
    const { user, token } = data;
    const response = await createNewCredentials(user, token);
    if (response?.status === 200) {
      dispatch(addUserAsync(user));
    }
  }
);

export const addUserAsync = createAsyncThunk(
  'users/addUser',
  async (user, { dispatch }) => {
    try {
      const response = await addUser(user);
      return response;
    } catch (e) {
      console.error(e);
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

export const getRecentUsersAsync = createAsyncThunk(
  'users/getRecentUsers',
  async (email, { dispatch }) => {
    const recentUsers = await getRecentUsers(email);
    return recentUsers;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setTokenInStore: (state, action) => {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
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
        state.loadingUserData = true;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.loadingUserData = false;
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
      .addCase(getRecentUsersAsync.fulfilled, (state, action) => {
        state.recentUsers = action.payload
      })
      .addCase(createCredentialsAsync.pending, (state, action) => {
        state.loadingUserData = true;
        
      })
      .addCase(createCredentialsAsync.rejected, (state) => {
        console.log("test 1");
        state.error = "Error while creating credentials. They may already exist or may be invalid.";
        state.loadingUserData = false;
      });
  }
});

export const {
  setTokenInStore,
  setError
} = usersSlice.actions;

export default usersSlice.reducer;
