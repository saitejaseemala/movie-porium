import movieApi from "../../api/movieApi";
import {
  loadingHandler,
  errorHandler,
  getMovieDetails,
  getTvSeriesDetails,
} from "./index";

export const fetchMovieDetails = (movieId) => {
  return (dispatch) => {
    dispatch(loadingHandler());
    movieApi
      .get(`/movie/${movieId}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          append_to_response: "videos",
          language: "en-US",
        },
      })
      .then((results) => {
        const movieDetails = results.data;
        dispatch(getMovieDetails(movieDetails));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};

export const fetchTvSeriesDetails = (tvId) => {
  return (dispatch) => {
    dispatch(loadingHandler());
    movieApi
      .get(`/tv/${tvId}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          append_to_response: "videos",
          language: "en-US",
        },
      })
      .then((results) => {
        const tvSeriesDetails = results.data;
        dispatch(getTvSeriesDetails(tvSeriesDetails));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};
