import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    movie: {},
    isFetching: false,
    error: false,
  },
  reducers: {
    getMoviesStart: (state) => {
      state.isFetching = true;
    },
    getMoviesSuccess: (state, { payload }) => {
      state.movies = payload;
      state.isFetching = false;
    },
    getMoviesFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    getMovieByIdStart: (state) => {
      state.isFetching = true;
    },
    getMovieByIdSuccess: (state, { payload }) => {
      state.movie = payload;
      state.isFetching = false;
    },
    getMovieByIdFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    getMovieBySlugStart: (state) => {
      state.isFetching = true;
    },
    getMovieBySlugSuccess: (state, { payload }) => {
      state.movie = payload;
      state.isFetching = false;
    },
    getMovieBySlugFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    createMovieStart: (state) => {
      state.isFetching = true;
    },
    createMovieSuccess: (state, { payload }) => {
      state.movies.push(payload);
      state.isFetching = false;
    },
    createMovieFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    updateMovieStart: (state) => {
      state.isFetching = true;
    },
    updateMovieSuccess: (state, { payload }) => {
      state.movies[state.movies.findIndex((item) => item._id === payload.id)] =
        payload.movie;
      state.isFetching = false;
    },
    updateMovieFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    deleteMovieStart: (state) => {
      state.isFetching = true;
    },
    deleteMovieSuccess: (state, { payload }) => {
      state.movies.splice(
        state.movies.findIndex((movie) => movie._id === payload),
        1
      );
    },
    deleteMovieFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMovieByIdFailure,
  getMovieByIdStart,
  getMovieByIdSuccess,
  getMovieBySlugFailure,
  getMovieBySlugStart,
  getMovieBySlugSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  updateMovieFailure,
  updateMovieStart,
  updateMovieSuccess,
} = movieSlice.actions;

export default movieSlice.reducer;
