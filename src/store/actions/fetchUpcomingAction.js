import movieApi from "../../api/movieApi";
import { errorHandler, loadingHandler, getUpcoming } from "./index";

export const fetchUpcomingMovies = (releaseDate, page) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get(`/discover/movie?primary_release_date.gte=${releaseDate}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          page: page,
        },
      })
      .then((response) => {
        const upcomingMovies = response.data;
        dispatch(getUpcoming(upcomingMovies));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};
