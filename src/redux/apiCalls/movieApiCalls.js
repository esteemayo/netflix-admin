import * as actions from '../movie/moviemovie';
import * as movieService from 'services/movieService';

export const fetchMovies = async (dispatch) => {
  dispatch(actions.getMoviesStart());

  try {
    const {
      data: { movies },
    } = await movieService.getMovies();

    dispatch(actions.getMoviesSuccess(movies));
  } catch (err) {
    dispatch(actions.getMoviesFailure());
    console.log(err.response);
  }
};

export const fetchMovieById = async (dispatch, id) => {
  dispatch(actions.getMovieByIdStart());

  try {
    const {
      data: { movie },
    } = await movieService.getMovieById(id);

    dispatch(actions.getMovieByIdSuccess(movie));
  } catch (err) {
    dispatch(actions.getMovieByIdFailure());
    console.log(err.response);
  }
};

export const fetchMovieBySlug = async (dispatch, slug) => {
  dispatch(actions.getMovieBySlugStart());

  try {
    const {
      data: { movie },
    } = await movieService.getMovieBySlug(slug);

    dispatch(actions.getMovieBySlugSuccess(movie));
  } catch (err) {
    dispatch(actions.getMovieBySlugFailure());
    console.log(err.response);
  }
};

export const createNewMovie = async (dispatch, movie) => {
  dispatch(actions.createMovieStart());

  try {
    const { data } = await movieService.createMovie(movie);
    dispatch(actions.createMovieSuccess(data.movie));
  } catch (err) {
    dispatch(actions.createMovieFailure());
    console.log(err.response);
  }
};

export const updateMovie = async (dispatch, id, newMovie) => {
  dispatch(actions.updateMovieStart());

  try {
    const {
      data: { movie },
    } = await movieService.editMovie(id, newMovie);

    dispatch(actions.updateMovieSuccess({ id, movie }));
  } catch (err) {
    dispatch(actions.updateMovieFailure());
    console.log(err.response);
  }
};

export const removeMovie = async (dispatch, id) => {
  dispatch(actions.deleteMovieStart());

  try {
    await movieService.deleteMovie(id);
    dispatch(actions.deleteMovieSuccess(id));
  } catch (err) {
    dispatch(actions.deleteMovieFailure());
    console.log(err);
  }
};
