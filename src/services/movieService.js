import http from './httpService';

const apiEndpoint = 'movies';

const movieUrl = (id) => {
  return `${apiEndpoint}/${id}`;
};

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovieById(id) {
  return http.get(`${apiEndpoint}/find/${id}`);
}

export function getMovieBySlug(slug) {
  return http.get(`${apiEndpoint}/details/${slug}`);
}

export function createMovie(movie) {
  return http.post(apiEndpoint, movie);
}

export function editMovie(id, movie) {
  return http.patch(movieUrl(id), movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
