import movieApi from "../../api/movieApi";
import { loadingHandler, errorHandler, getPeopleOnSearch } from "./index";

export const fetchPeopleOnSearch = (searchTerm, page) => {
  return (dispatch) => {
    dispatch(loadingHandler());
    movieApi
      .get("/search/person", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          include_adult: false,
          query: searchTerm,
          page: page,
        },
      })
      .then((results) => {
        const peopleOnSearch = results.data;
        dispatch(getPeopleOnSearch(peopleOnSearch));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};

export default fetchPeopleOnSearch;
