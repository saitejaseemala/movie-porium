import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Pagination from "../../components/Pagination";
import SearchCard from "../../components/SearchCard";
import fetchMultiSearch from "../../store/actions/fetchMultiSearch";
import {
  fetchMoviesOnSearch,
  fetchTvSeriesOnSearch,
} from "../../store/actions/fetchShowsOnSearch";
import fetchPeopleOnSearch from "../../store/actions/fetchPeopleOnSearch";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { LinearProgress } from "@mui/material";
import "./SearchPage.css";

function SearchPage(props) {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const [allToggle, setAllToggle] = useState(true);
  const [queryParam] = useSearchParams();
  const pageParam = queryParam.get("page");
  const navigate = useNavigate();
  const [movieToggle, setMovieToggle] = useState(false);
  const [tvToggle, setTvToggle] = useState(false);
  const [peopleToggle, setPeopleToggle] = useState(false);
  const [activePage, setActivePage] = useState(parseInt(pageParam));
  const [pageChanger, setPageChanger] = useState(() => {
    if (pageParam % 10 === 0) {
      return (parseInt(parseInt(pageParam) / 10) - 1) * 10;
    } else {
      return parseInt(parseInt(pageParam) / 10) * 10;
    }
  });
  const [totalPages, setTotalPages] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchSearchResults(searchTerm, pageParam);
    props.fetchMoviesOnSearch(searchTerm, pageParam);
    props.fetchTvSeriesOnSearch(searchTerm, pageParam);
    props.fetchPeopleOnSearch(searchTerm, pageParam);
  }, []);

  useEffect(() => {
    if (allToggle) {
      props.searchResults && setResults(props.searchResults.results);
      props.searchResults.results &&
        setTotalPages(props.searchResults.total_pages);
    }
  }, [props.searchResults, allToggle]);

  useEffect(() => {
    if (movieToggle) {
      props.moviesOnSearch && setResults(props.moviesOnSearch.results);
      props.moviesOnSearch.results &&
        setTotalPages(props.moviesOnSearch.total_pages);
    }
  }, [props.moviesOnSearch, movieToggle]);

  useEffect(() => {
    if (tvToggle) {
      props.tvSeriesOnSearch && setResults(props.tvSeriesOnSearch.results);
      props.tvSeriesOnSearch.results &&
        setTotalPages(props.tvSeriesOnSearch.total_pages);
    }
  }, [props.tvSeriesOnSearch, tvToggle]);

  useEffect(() => {
    if (peopleToggle) {
      props.peopleOnSearch && setResults(props.peopleOnSearch.results);
      props.peopleOnSearch.results &&
        setTotalPages(props.peopleOnSearch.total_pages);
    }
  }, [props.peopleOnSearch, peopleToggle]);

  const onPageChangeHandler = (val) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const pageNo = val;
    setActivePage(pageNo);
    if (allToggle) {
      props.fetchSearchResults(searchTerm, pageNo);
    }
    if (movieToggle) {
      props.fetchMoviesOnSearch(searchTerm, pageNo);
    }
    if (tvToggle) {
      props.fetchTvSeriesOnSearch(searchTerm, pageNo);
    }
    if (peopleToggle) {
      props.fetchPeopleOnSearch(searchTerm, pageNo);
    }
  };

  const decrementHandler = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageChanger(pageChanger - 10);
    setActivePage(pageChanger - 9);
    onPageChangeHandler(pageChanger - 9);
  };

  const incrementHandler = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageChanger(pageChanger + 10);
    setActivePage(pageChanger + 11);
    onPageChangeHandler(pageChanger + 11);
  };

  const allClickHandler = () => {
    navigate(`/search/${searchTerm}/?page=1`);
    props.fetchSearchResults(searchTerm, 1);
    setAllToggle(true);
    setMovieToggle(false);
    setTvToggle(false);
    setPeopleToggle(false);
    setPageChanger(0);
    setActivePage(1);
  };

  const movieClickHandler = () => {
    navigate(`/search/${searchTerm}/?page=1`);
    props.fetchMoviesOnSearch(searchTerm, 1);
    setAllToggle(false);
    setMovieToggle(true);
    setTvToggle(false);
    setPeopleToggle(false);
    setPageChanger(0);
    setActivePage(1);
  };

  const tvClickHandler = () => {
    navigate(`/search/${searchTerm}/?page=1`);
    props.fetchTvSeriesOnSearch(searchTerm, 1);
    setAllToggle(false);
    setMovieToggle(false);
    setTvToggle(true);
    setPeopleToggle(false);
    setPageChanger(0);
    setActivePage(1);
  };

  const peopleClickHandler = () => {
    navigate(`/search/${searchTerm}/?page=1`);
    props.fetchPeopleOnSearch(searchTerm, 1);
    setAllToggle(false);
    setMovieToggle(false);
    setTvToggle(false);
    setPeopleToggle(true);
    setPageChanger(0);
    setActivePage(1);
  };

  return !props.loading ? (
    <div className="search-page-container">
      <div className="search-filters">
        <div>
          <h3>Search Filters</h3>
        </div>
        <div
          className={`search-p ${allToggle ? "selected" : ""}`}
          onClick={allClickHandler}
        >
          <Link to={`/search/${searchTerm}/?page=1`} id="all" title="all">
            All
          </Link>
          <span className="results all-results">
            {props.searchResults.total_results}
          </span>
        </div>
        <div
          className={`search-p ${movieToggle ? "selected" : ""}`}
          onClick={movieClickHandler}
        >
          <Link to={`/search/${searchTerm}/?page=1`} id="movie" title="movies">
            Movies
          </Link>
          <span className="results movie-results">
            {props.moviesOnSearch.total_results}
          </span>
        </div>
        <div
          className={`search-p ${tvToggle ? "selected" : ""}`}
          onClick={tvClickHandler}
        >
          <Link
            to={`/search/${searchTerm}/?page=1`}
            id="tvshows"
            title="tvshows"
          >
            Tv Shows
          </Link>
          <span className="results tv-results">
            {props.tvSeriesOnSearch.total_results}
          </span>
        </div>
        <div
          className={`search-p ${peopleToggle ? "selected" : ""}`}
          onClick={peopleClickHandler}
        >
          <Link to={`/search/${searchTerm}/?page=1`} id="people" title="people">
            People
          </Link>
          <span className="results people-results">
            {props.peopleOnSearch.total_results}
          </span>
        </div>
      </div>
      <div>
        {results && results.length > 0 ? (
          <SearchCard search={results} />
        ) : (
          <h3 className="no-results-content">
            There are no results that matched your query.
          </h3>
        )}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            pageChanger={pageChanger}
            activePage={activePage}
            onPageChange={onPageChangeHandler}
            decrementHandler={decrementHandler}
            incrementHandler={incrementHandler}
            type={`search/${searchTerm}`}
          />
        )}
      </div>
    </div>
  ) : (
    <LinearProgress />
  );
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    peopleOnSearch: state.peopleOnSearch,
    moviesOnSearch: state.moviesOnSearch,
    tvSeriesOnSearch: state.tvSeriesOnSearch,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchResults: (searchTerm, page) => {
      dispatch(fetchMultiSearch(searchTerm, page));
    },
    fetchPeopleOnSearch: (queryString, page) => {
      dispatch(fetchPeopleOnSearch(queryString, page));
    },
    fetchMoviesOnSearch: (searchTerm, page) => {
      dispatch(fetchMoviesOnSearch(searchTerm, page));
    },
    fetchTvSeriesOnSearch: (searchTerm, page) => {
      dispatch(fetchTvSeriesOnSearch(searchTerm, page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
