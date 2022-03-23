import {
  ERROR,
  FETCH_POPULAR_MOVIES,
  FETCH_LOADING,
  FETCH_POPULAR_TV_SERIES,
  FETCH_TOP_RATED_SERIES,
  FETCH_TOP_RATED_MOVIES,
  FETCH_MOVIE_GENRES,
  FETCH_TV_GENRES,
  FETCH_UPCOMING_MOVIES,
  FETCH_TV_SERIES_ON_SEARCH,
  FETCH_MOVIES_ON_SEARCH,
  FETCH_MOVIE_RECOMMENDATIONS,
  FETCH_TV_RECOMMENDATIONS,
  FETCH_MOVIE_DETAILS,
  FETCH_TV_DETAILS,
  FETCH_POPULAR_PEOPLE,
  FETCH_PEOPLE_INFO,
  FETCH_MULTI_SEARCH,
  FETCH_PEOPLE_ON_SEARCH,
  FETCH_MOVIES_ON_GENRE,
  FETCH_TV_ON_GENRE,
  FETCH_UPCOMING_ON_GENRE,
} from "../action-types/actionTypes";

const initialState = {
  popularMoviesBucket: {},
  popularTvSeries: {},
  topRatedMovies: {},
  topRatedTvSeries: {},
  upcomingMovies: {},
  tvGenres: [],
  movieGenres: [],
  tvSeriesOnSearch: {},
  moviesOnSearch: {},
  peopleOnSearch: {},
  movieRecommendations: {},
  tvRecommendations: {},
  movieInfo: {},
  tvInfo: {},
  people: {},
  personInfo: {},
  searchResults: {},
  tvResultsOnGenre: {},
  movieResultsOnGenre: {},
  upcomingOnGenre: {},
  loading: false,
  error: "",
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_POPULAR_MOVIES: {
      return {
        ...state,
        popularMoviesBucket: action.payload.popularMovies,
        loading: false,
      };
    }

    case FETCH_POPULAR_TV_SERIES: {
      return {
        ...state,
        popularTvSeries: action.payload.popularTvSeries,
        loading: false,
      };
    }

    case FETCH_TOP_RATED_MOVIES: {
      return {
        ...state,
        topRatedMovies: action.payload.topRatedMovies,
        loading: false,
      };
    }

    case FETCH_TOP_RATED_SERIES: {
      return {
        ...state,
        topRatedTvSeries: action.payload.topRatedTvSeries,
        loading: false,
      };
    }

    case FETCH_MOVIE_GENRES: {
      return {
        ...state,
        movieGenres: action.payload.genres,
        loading: false,
      };
    }

    case FETCH_TV_GENRES: {
      return {
        ...state,
        tvGenres: action.payload.genres,
        loading: false,
      };
    }

    case FETCH_UPCOMING_MOVIES: {
      return {
        ...state,
        upcomingMovies: action.payload.upcomingMovies,
        loading: false,
      };
    }

    case FETCH_MOVIES_ON_SEARCH: {
      return {
        ...state,
        moviesOnSearch: action.payload.moviesOnSearch,
        loading: false,
      };
    }

    case FETCH_TV_SERIES_ON_SEARCH: {
      return {
        ...state,
        tvSeriesOnSearch: action.payload.tvSeriesOnSearch,
        loading: false,
      };
    }

    case FETCH_PEOPLE_ON_SEARCH: {
      return {
        ...state,
        peopleOnSearch: action.payload.peopleOnSearch,
        loading: false,
      };
    }

    case FETCH_MOVIE_RECOMMENDATIONS: {
      return {
        ...state,
        movieRecommendations: action.payload.recommendations,
        loading: false,
      };
    }

    case FETCH_TV_RECOMMENDATIONS: {
      return {
        ...state,
        tvRecommendations: action.payload.recommendations,
        loading: false,
      };
    }

    case FETCH_MOVIE_DETAILS: {
      return {
        ...state,
        movieInfo: action.payload.movieInfo,
        loading: false,
      };
    }

    case FETCH_TV_DETAILS: {
      return {
        ...state,
        tvInfo: action.payload.tvInfo,
        loading: false,
      };
    }

    case FETCH_POPULAR_PEOPLE: {
      return {
        ...state,
        people: action.payload.people,
        loading: false,
      };
    }

    case FETCH_PEOPLE_INFO: {
      return {
        ...state,
        personInfo: action.payload.personInfo,
        loading: false,
      };
    }

    case FETCH_MOVIES_ON_GENRE: {
      return {
        ...state,
        movieResultsOnGenre: action.payload.movieResultsOnGenre,
        loading: false,
      };
    }

    case FETCH_TV_ON_GENRE: {
      return {
        ...state,
        tvResultsOnGenre: action.payload.tvResultsOnGenre,
        loading: false,
      };
    }

    case FETCH_UPCOMING_ON_GENRE: {
      return {
        ...state,
        upcomingOnGenre: action.payload.upcomingOnGenre,
        loading: false,
      };
    }

    case FETCH_MULTI_SEARCH: {
      return {
        ...state,
        searchResults: action.payload.searchResults,
        loading: false,
      };
    }

    case ERROR: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default movieReducer;
