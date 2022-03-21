import movieApi from "../../api/movieApi";
import {
  errorHandler,
  loadingHandler,
  getTopRatedTvSeries,
  getTopRatedMovies,
} from "./index";

export const fetchTopRatedMovies = (page) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get("/movie/top_rated", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          page: page,
        },
      })
      .then((response) => {
        const topRatedMovies = response.data;
        dispatch(getTopRatedMovies(topRatedMovies));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};

export const fetchTopRatedTvSeries = (page) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get("/tv/top_rated", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          page: page,
        },
      })
      .then((response) => {
        const topRatedTvSeries = response.data;
        dispatch(getTopRatedTvSeries(topRatedTvSeries));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};
