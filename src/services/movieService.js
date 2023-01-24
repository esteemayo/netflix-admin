import http from './httpService';

const apiEndpoint = '/movies';

const movieUrl = (id) => `${apiEndpoint}/${id}`;

export const getMovies = () => http.get(apiEndpoint);

export const getMovieById = (id) =>
  http.get(`${apiEndpoint}/find/${id}`);

export const getMovieBySlug = (slug) =>
  http.get(`${apiEndpoint}/details/${slug}`);

export const createMovie = (movie) => http.post(apiEndpoint, movie);

export const editMovie = (id, movie) => http.patch(movieUrl(id), movie);

export const deleteMovie = (id) => http.delete(movieUrl(id));
