import { createSlice } from '@reduxjs/toolkit';

export const listSlice = createSlice({
  name: 'lists',
  initialState: {
    lists: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getListsStart: (state) => {
      state.isFetching = true;
    },
    getListsSuccess: (state, { payload }) => {
      state.lists = payload;
      state.isFetching = false;
    },
    getListsFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    createListStart: (state) => {
      state.isFetching = true;
    },
    createListSuccess: (state, { payload }) => {
      state.lists.push(payload);
      state.isFetching = false;
    },
    createListFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    updateListStart: (state) => {
      state.isFetching = true;
    },
    updateListSuccess: (state, { payload }) => {
      state.lists[state.lists.findIndex((item) => item._id === payload.id)] =
        payload.list;
      state.isFetching = false;
    },
    updateListFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    deleteListStart: (state) => {
      state.isFetching = true;
    },
    deleteListSuccess: (state, { payload }) => {
      state.lists.splice(
        state.lists.findIndex((item) => item._id === payload),
        1
      );
      state.isFetching = false;
    },
    deleteListFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListFailure,
  updateListStart,
  updateListSuccess,
} = listSlice.actions;

export default listSlice.reducer;
