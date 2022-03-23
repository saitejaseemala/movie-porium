import { Upcoming } from "@mui/icons-material";
import {
  errorHandler,
  getMoviesOnGenre,
  getMultiSearch,
  getTvOnGenre,
  getUpcomingOnGenre,
  loadingHandler,
} from ".";
import movieApi from "../../api/movieApi";

export const fetchMovieDetailsOnGenre = (genres, page) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get("/discover/movie", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en",
          page: page,
          with_genres: genres,
        },
      })
      .then((response) => {
        const results = response.data;
        dispatch(getMoviesOnGenre(results));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};

export const fetchUpcomingOnGenre = (upcoming, genres, page) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get(`/discover/movie?primary_release_date.gte=${upcoming}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en",
          page: page,
          with_genres: genres,
        },
      })
      .then((response) => {
        const results = response.data;
        dispatch(getUpcomingOnGenre(results));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};

export const fetchTvDetailsOnGenre = (genres, page) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get("/discover/tv", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en",
          page: page,
          with_genres: genres,
        },
      })
      .then((response) => {
        const results = response.data;
        dispatch(getTvOnGenre(results));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};
