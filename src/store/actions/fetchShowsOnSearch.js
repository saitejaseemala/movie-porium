import movieApi from "../../api/movieApi";
import {
  loadingHandler,
  errorHandler,
  getMoviesOnSearch,
  getTvSeriesOnSearch,
} from "./index";

export const fetchMoviesOnSearch = (searchTerm, page) => {
  return (dispatch) => {
    dispatch(loadingHandler());
    movieApi
      .get("/search/movie", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          include_adult: false,
          query: searchTerm,
          page: page,
        },
      })
      .then((results) => {
        const moviesOnSearch = results.data;
        dispatch(getMoviesOnSearch(moviesOnSearch));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};

export const fetchTvSeriesOnSearch = (searchTerm, page) => {
  return (dispatch) => {
    dispatch(loadingHandler());
    movieApi
      .get("/search/tv", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          query: searchTerm,
          include_adult: false,
          page: page,
        },
      })
      .then((results) => {
        const tvSeriesOnSearch = results.data;
        dispatch(getTvSeriesOnSearch(tvSeriesOnSearch));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};
