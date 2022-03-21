import { errorHandler, getMultiSearch, loadingHandler } from ".";
import movieApi from "../../api/movieApi";

const fetchMultiSearch = (queryString, page) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get("/search/multi", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en",
          page: page,
          include_adult: false,
          query: queryString,
        },
      })
      .then((response) => {
        const searchResults = response.data;
        dispatch(getMultiSearch(searchResults));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};

export default fetchMultiSearch;
