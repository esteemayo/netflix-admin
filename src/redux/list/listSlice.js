import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as listAPI from 'services/listService';

export const fetchLists = createAsyncThunk(
  'movies/getLists',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await listAPI.getLists();
      return data.lists;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createList = createAsyncThunk(
  'movies/createList',
  async (list, { rejectWithValue }) => {
    try {
      const { data } = await listAPI.createList({ ...list });
      return data.list;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateList = createAsyncThunk(
  'movies/updateList',
  async (listId, list, { rejectWithValue }) => {
    try {
      console.log(listId, list)
      const { data } = await listAPI.editList(listId, list);
      return data.list;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeList = createAsyncThunk(
  'movies/deleteList',
  async (listId, { rejectWithValue }) => {
    try {
      await listAPI.deleteList(listId);
      return listId;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  lists: [],
  isFetching: false,
  isSuccess: false,
  error: null,
};

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  extraReducers: {
    [fetchLists.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchLists.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.lists = payload;
    },
    [fetchLists.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.error = payload.message;
    },
    [createList.pending]: (state) => {
      state.isFetching = true;
    },
    [createList.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.lists.push(payload);
    },
    [createList.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.error = payload.message;
    },
    [updateList.pending]: (state) => {
      state.isFetching = true;
    },
    [updateList.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.lists[
        state.lists.findIndex((item) => item._id === payload._id)
      ] = payload;
    },
    [updateList.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.error = payload.message;
    },
    [removeList.pending]: (state) => {
      state.isFetching = true;
    },
    [removeList.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.lists.splice(
        state.lists.findIndex((item) => item._id === payload),
        1,
      );
    },
    [removeList.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.error = payload.message;
    },
  },
});

export default listSlice.reducer;
