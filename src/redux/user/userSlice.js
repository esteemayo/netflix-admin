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
  async ({ credentials }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.login({ ...credentials });
      if (data.role === 'admin') {
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
  async ({ credentials }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.register({ ...credentials });
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
  async ({ userId }, { rejectWithValue }) => {
    try {
      await userAPI.deleteUser(userId);
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
    getUsersStart: (state) => {
      state.isFetching = true;
    },
    getUsersSuccess: (state, { payload }) => {
      state.users = payload;
      state.isFetching = false;
    },
    getUsersFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, { payload }) => {
      state.user = payload;
      state.isFetching = false;
    },
    loginFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    registerUserStart: (state) => {
      state.isFetching = true;
    },
    registerUserSuccess: (state, { payload }) => {
      state.users.push(payload);
      state.isFetching = false;
    },
    registerUserFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    updateUserStart: (state) => {
      state.isFetching = true;
    },
    updateUserSuccess: (state, { payload }) => {
      state.users[state.users.findIndex((item) => item._id === payload.id)] =
        payload.user;
      state.isFetching = false;
    },
    updateUserFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    deleteUserStart: (state) => {
      state.isFetching = true;
    },
    deleteUserSuccess: (state, { payload }) => {
      state.users.splice(
        state.users.findIndex((item) => item._id === payload),
        1
      );
      state.isFetching = false;
    },
    deleteUserFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
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

export const {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  registerUserFailure,
  registerUserStart,
  registerUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  logout,
  reset
} = userSlice.actions;

export default userSlice.reducer;
