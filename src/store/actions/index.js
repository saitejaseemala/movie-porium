import * as actionType from "../action-types/actionTypes";

export const loadingHandler = () => {
  return {
    type: actionType.FETCH_LOADING,
  };
};

export const errorHandler = (error) => {
  return {
    type: actionType.ERROR,
    payload: {
      error,
    },
  };
};

export const getPopularMovies = (popularMovies) => {
  return {
    type: actionType.FETCH_POPULAR_MOVIES,
    payload: {
      popularMovies,
    },
  };
};

export const getPopularTvSeries = (popularTvSeries) => {
  return {
    type: actionType.FETCH_POPULAR_TV_SERIES,
    payload: {
      popularTvSeries,
    },
  };
};

export const getTopRatedMovies = (topRatedMovies) => {
  return {
    type: actionType.FETCH_TOP_RATED_MOVIES,
    payload: {
      topRatedMovies,
    },
  };
};

export const getTopRatedTvSeries = (topRatedTvSeries) => {
  return {
    type: actionType.FETCH_TOP_RATED_SERIES,
    payload: {
      topRatedTvSeries,
    },
  };
};

export const getMovieGenres = (genres) => {
  return {
    type: actionType.FETCH_MOVIE_GENRES,
    payload: {
      genres,
    },
  };
};

export const getTvGenres = (genres) => {
  return {
    type: actionType.FETCH_TV_GENRES,
    payload: {
      genres,
    },
  };
};

export const getUpcoming = (upcomingMovies) => {
  return {
    type: actionType.FETCH_UPCOMING_MOVIES,
    payload: {
      upcomingMovies,
    },
  };
};

export const getMoviesOnSearch = (moviesOnSearch) => {
  return {
    type: actionType.FETCH_MOVIES_ON_SEARCH,
    payload: {
      moviesOnSearch,
    },
  };
};

export const getTvSeriesOnSearch = (tvSeriesOnSearch) => {
  return {
    type: actionType.FETCH_TV_SERIES_ON_SEARCH,
    payload: {
      tvSeriesOnSearch,
    },
  };
};

export const getPeopleOnSearch = (peopleOnSearch) => {
  return {
    type: actionType.FETCH_PEOPLE_ON_SEARCH,
    payload: {
      peopleOnSearch,
    },
  };
};

export const getMovieRecommendations = (recommendations) => {
  return {
    type: actionType.FETCH_MOVIE_RECOMMENDATIONS,
    payload: {
      recommendations,
    },
  };
};

export const getTvRecommendations = (recommendations) => {
  return {
    type: actionType.FETCH_TV_RECOMMENDATIONS,
    payload: {
      recommendations,
    },
  };
};

export const getMovieDetails = (movieInfo) => {
  return {
    type: actionType.FETCH_MOVIE_DETAILS,
    payload: {
      movieInfo,
    },
  };
};

export const getTvSeriesDetails = (tvInfo) => {
  return {
    type: actionType.FETCH_TV_DETAILS,
    payload: {
      tvInfo,
    },
  };
};

export const getPopularPeople = (people) => {
  return {
    type: actionType.FETCH_POPULAR_PEOPLE,
    payload: {
      people,
    },
  };
};

export const getPersonInfo = (personInfo) => {
  return {
    type: actionType.FETCH_PEOPLE_INFO,
    payload: {
      personInfo,
    },
  };
};

export const getMultiSearch = (searchResults) => {
  return {
    type: actionType.FETCH_MULTI_SEARCH,
    payload: {
      searchResults,
    },
  };
};

export const getMoviesOnGenre = (movieResultsOnGenre) => {
  return {
    type: actionType.FETCH_MOVIES_ON_GENRE,
    payload: {
      movieResultsOnGenre,
    },
  };
};

export const getUpcomingOnGenre = (upcomingOnGenre) => {
  return {
    type: actionType.FETCH_UPCOMING_ON_GENRE,
    payload: {
      upcomingOnGenre,
    },
  };
};

export const getTvOnGenre = (tvResultsOnGenre) => {
  return {
    type: actionType.FETCH_TV_ON_GENRE,
    payload: {
      tvResultsOnGenre,
    },
  };
};
