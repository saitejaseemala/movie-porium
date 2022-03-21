import movieApi from "../../api/movieApi";
import {
  getPopularMovies,
  getPopularTvSeries,
  errorHandler,
  loadingHandler,
} from "./index";

export const fetchPopularMovies = (page) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get("/movie/popular", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          page: page,
        },
      })
      .then((response) => {
        const popularMovies = response.data;
        dispatch(getPopularMovies(popularMovies));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};

export const fetchPopularTvSeries = (page) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get("/tv/popular", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          page: page,
        },
      })
      .then((response) => {
        const popularTvSeries = response.data;
        dispatch(getPopularTvSeries(popularTvSeries));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};
