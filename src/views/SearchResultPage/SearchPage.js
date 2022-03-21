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
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "./SearchPage.css";

function SearchPage(props) {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const [allToggle, setAllToggle] = useState(true);
  const [movieToggle, setMovieToggle] = useState(false);
  const [tvToggle, setTvToggle] = useState(false);
  const [peopleToggle, setPeopleToggle] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [pageChanger, setPageChanger] = useState(0);
  useEffect(() => {
    props.fetchSearchResults(searchTerm, 1);
    props.fetchMoviesOnSearch(searchTerm, 1);
    props.fetchTvSeriesOnSearch(searchTerm, 1);
    props.fetchPeopleOnSearch(searchTerm, 1);
  }, []);

  useEffect(() => {
    if (allToggle) {
      props.searchResults && setResults(props.searchResults.results);
    }
  }, [props.searchResults]);

  useEffect(() => {
    if (movieToggle) {
      props.moviesOnSearch && setResults(props.moviesOnSearch.results);
    }
  }, [props.moviesOnSearch]);

  useEffect(() => {
    if (tvToggle) {
      props.tvSeriesOnSearch && setResults(props.tvSeriesOnSearch.results);
    }
  }, [props.tvSeriesOnSearch]);

  useEffect(() => {
    if (peopleToggle) {
      props.peopleOnSearch && setResults(props.peopleOnSearch.results);
    }
  }, [props.peopleOnSearch]);

  const onPageChangeHandler = (val) => {
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
    setPageChanger(pageChanger - 10);
    setActivePage(pageChanger - 9);
    onPageChangeHandler(pageChanger - 9);
  };

  const incrementHandler = (e) => {
    setPageChanger(pageChanger + 10);
    setActivePage(pageChanger + 11);
    onPageChangeHandler(pageChanger + 11);
  };

  const allClickHandler = () => {
    props.searchResults && setResults(props.searchResults.results);
    setAllToggle(true);
    setMovieToggle(false);
    setTvToggle(false);
    setPeopleToggle(false);
    setPageChanger(0);
    setActivePage(1);
  };

  const movieClickHandler = () => {
    props.moviesOnSearch && setResults(props.moviesOnSearch.results);
    setAllToggle(false);
    setMovieToggle(true);
    setTvToggle(false);
    setPeopleToggle(false);
    setPageChanger(0);
    setActivePage(1);
  };

  const tvClickHandler = () => {
    props.tvSeriesOnSearch && setResults(props.tvSeriesOnSearch.results);
    setAllToggle(false);
    setMovieToggle(false);
    setTvToggle(true);
    setPeopleToggle(false);
    setPageChanger(0);
    setActivePage(1);
  };

  const peopleClickHandler = () => {
    props.peopleOnSearch && setResults(props.peopleOnSearch.results);
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
          <a id="all" title="all">
            All
          </a>
          <span className="results all-results">
            {props.searchResults.total_results}
          </span>
        </div>
        <div
          className={`search-p ${movieToggle ? "selected" : ""}`}
          onClick={movieClickHandler}
        >
          <a id="movie" title="movies">
            Movies
          </a>
          <span className="results movie-results">
            {props.moviesOnSearch.total_results}
          </span>
        </div>
        <div
          className={`search-p ${tvToggle ? "selected" : ""}`}
          onClick={tvClickHandler}
        >
          <a id="tvshows" title="tvshows">
            Tv Shows
          </a>
          <span className="results tv-results">
            {props.tvSeriesOnSearch.total_results}
          </span>
        </div>
        <div
          className={`search-p ${peopleToggle ? "selected" : ""}`}
          onClick={peopleClickHandler}
        >
          <a id="people" title="people">
            People
          </a>
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
        {props.searchResults.total_pages > 1 && (
          <Pagination
            totalPages={props.searchResults.total_pages}
            pageChanger={pageChanger}
            activePage={activePage}
            onPageChange={onPageChangeHandler}
            decrementHandler={decrementHandler}
            incrementHandler={incrementHandler}
          />
        )}
      </div>
    </div>
  ) : (
    <CircularProgress className="spinner" />
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
