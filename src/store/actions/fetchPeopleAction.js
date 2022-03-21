import movieApi from "../../api/movieApi";
import {
  getPopularPeople,
  errorHandler,
  loadingHandler,
  getPersonInfo,
} from "./index";

export const fetchPopularPeople = (page) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get("/person/popular", {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
          page: page,
        },
      })
      .then((response) => {
        const popularPeople = response.data;
        dispatch(getPopularPeople(popularPeople));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};

export const fetchPeopleInfo = (personId) => {
  return async (dispatch) => {
    dispatch(loadingHandler());
    await movieApi
      .get(`/person/${personId}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: "en-US",
        },
      })
      .then((response) => {
        const personInfo = response.data;
        dispatch(getPersonInfo(personInfo));
      })
      .catch((err) => {
        const error = err.message;
        dispatch(errorHandler(error));
      });
  };
};
