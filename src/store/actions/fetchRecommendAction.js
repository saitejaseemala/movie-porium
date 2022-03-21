import movieApi from "../../api/movieApi";
import {
  errorHandler,
  loadingHandler,
  getTvRecommendations,
  getMovieRecommendations,
} from "./index";

export const fetchMovieRecommendations = (movieId) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get(`/movie/${movieId}/recommendations`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          page: 1,
        },
      })
      .then((response) => {
        const recommendations = response.data;
        dispatch(getMovieRecommendations(recommendations));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};

export const fetchTvRecommendations = (tvId) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get(`/tv/${tvId}/recommendations`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          page: 1,
        },
      })
      .then((response) => {
        const recommendations = response.data;
        dispatch(getTvRecommendations(recommendations));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};
