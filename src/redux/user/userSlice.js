import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from 'services/authService';
import * as userAPI from 'services/userService';
import {
  tokenKey,
  getFromStorage,
  setToStorage,
  clearStorage,
} from 'utils';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ credentials, toast }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.login({ ...credentials });
      if (data.role === 'admin') {
        toast.success('Log in successful');
        return data.details;
      }
      return rejectWithValue({ message: 'Access denied' });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ credentials, toast }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.register({ ...credentials });
      toast.success('User created successfully');
      return data.details;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'user/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.getAllUsers();
      return data.users;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, credentials }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.editUser(userId, credentials);
      return data.users;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeUser = createAsyncThunk(
  'user/deleteUser',
  async ({ userId, toast }, { rejectWithValue }) => {
    try {
      await userAPI.deleteUser(userId);
      toast.success('User deleted');
      return userId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const token = authAPI.getJWT();
const user = getFromStorage(tokenKey);

const initialState = {
  user: user ?? null,
  users: [],
  isFetching: false,
  isSuccess: false,
  error: null,
};

if (token) {
  const decodedToken = jwtDecode(token);
  const expiryDate = Date.now();

  if (expiryDate > decodedToken.exp * 1000) {
    localStorage.removeItem(tokenKey);
  }
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      clearStorage();
      state.user = null;
    },
    reset: (state) => {
      state.users = [];
      state.isFetching = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      setToStorage(tokenKey, payload);
      state.user = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.user = null;
      state.error = payload.message;
    },
    [registerUser.pending]: (state) => {
      state.isFetching = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      setToStorage(tokenKey, payload);
      state.user = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.user = null;
      state.error = payload.message;
    },
    [fetchUsers.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.users = payload;
    },
    [fetchUsers.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.error = payload.message;
    },
    [updateUser.pending]: (state) => {
      state.isFetching = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.users[
        state.users.findIndex((item) => item._id === payload._id)
      ] = payload;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.error = payload.message;
    },
    [updateUser.pending]: (state) => {
      state.isFetching = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.users.splice(
        state.users.findIndex((item) => item._id === payload),
        1,
      );
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.error = payload.message;
    },
  }
});

export const { logout, reset } = userSlice.actions;

export default userSlice.reducer;
