import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as authAPI from 'services/authService';
import { tokenKey, getFromStorage } from 'utils';

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
      state.user = null;
    },
  },
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
} = userSlice.actions;

export default userSlice.reducer;
