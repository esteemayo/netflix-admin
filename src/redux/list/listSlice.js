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
