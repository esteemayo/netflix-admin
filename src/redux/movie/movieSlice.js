import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as movieAPI from 'services/movieService';

export const fetchMovies = createAsyncThunk(
  'movies/getMovies',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await movieAPI.getMovies();
      return data.movies;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/getMovieById',
  async (movieId, { rejectWithValue }) => {
    try {
      const { data } = await movieAPI.getMovieById(movieId);
      return data.movie;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchMovieBySlug = createAsyncThunk(
  'movies/getMovieBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await movieAPI.getMovieBySlug(slug);
      return data.movie;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createMovie = createAsyncThunk(
  'movies/createMovie',
  async (movie, { rejectWithValue }) => {
    try {
      const { data } = await movieAPI.createMovie({ ...movie });
      return data.movie;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async ({ movieId, movie }, { rejectWithValue }) => {
    try {
      const { data } = await movieAPI.editMovie(movieId, movie);
      return data.movie;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (movieId, { rejectWithValue }) => {
    try {
      const { data } = await movieAPI.deleteMovie(movieId);
      return data.movie;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  movies: [],
  movie: {},
  isFetching: false,
  isSuccess: false,
  error: null,
};

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchMovies.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.movies = payload;
    },
    [fetchMovies.rejected]: (state, { payload }) => {
      state.isFetching = true;
      state.error = payload.message;
    },
    [fetchMovieById.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchMovieById.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.movie = payload;
    },
    [fetchMovieById.rejected]: (state, { payload }) => {
      state.isFetching = true;
      state.error = payload.message;
    },
    [fetchMovieBySlug.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchMovieBySlug.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.movie = payload;
    },
    [fetchMovieBySlug.rejected]: (state, { payload }) => {
      state.isFetching = true;
      state.error = payload.message;
    },
    [createMovie.pending]: (state) => {
      state.isFetching = true;
    },
    [createMovie.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.movies.push(payload);
    },
    [createMovie.rejected]: (state, { payload }) => {
      state.isFetching = true;
      state.error = payload.message;
    },
    [updateMovie.pending]: (state) => {
      state.isFetching = true;
    },
    [updateMovie.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.movies[
        state.movies.findIndex((item) => item._id === payload._id)
      ] = payload;
    },
    [updateMovie.rejected]: (state, { payload }) => {
      state.isFetching = true;
      state.error = payload.message;
    },
    [removeMovie.pending]: (state) => {
      state.isFetching = true;
    },
    [removeMovie.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.movies.splice(
        state.movies.findIndex((item) => item._id === payload),
        1,
      );
    },
    [removeMovie.rejected]: (state, { payload }) => {
      state.isFetching = true;
      state.error = payload.message;
    },
  },
});

export const { reset } = movieSlice.actions;

export default movieSlice.reducer;
