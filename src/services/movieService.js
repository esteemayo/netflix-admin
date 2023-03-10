import http from './httpService';

const apiEndpoint = '/movies';

const movieUrl = (movieId) => `${apiEndpoint}/${movieId}`;

export const getMovies = () => http.get(apiEndpoint);

export const getMovieById = (movieId) =>
  http.get(`${apiEndpoint}/find/${movieId}`);

export const getMovieBySlug = (slug) =>
  http.get(`${apiEndpoint}/details/${slug}`);

export const createMovie = (movie) => http.post(apiEndpoint, movie);

export const editMovie = (movieId, movie) =>
  http.patch(movieUrl(movieId), movie);

export const deleteMovie = (movieId) => http.delete(movieUrl(movieId));
