import movieApi from "../../api/movieApi";
import {
  errorHandler,
  loadingHandler,
  getMovieGenres,
  getTvGenres,
} from "./index";

export const fetchMovieGenres = () => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get("/genre/movie/list", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
        },
      })
      .then((response) => {
        const genres = response.data.genres;
        dispatch(getMovieGenres(genres));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};

export const fetchTvGenres = () => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get("/genre/tv/list", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
        },
      })
      .then((response) => {
        const genres = response.data.genres;
        dispatch(getTvGenres(genres));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};
