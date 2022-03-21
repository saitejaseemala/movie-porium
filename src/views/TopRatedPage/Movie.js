import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchTopRatedMovies } from "../../store/actions/fetchTopRatedAction";
import { fetchMovieGenres } from "../../store/actions/fetchGenresAction";
import Row from "../../components/Row";
import { Link } from "react-router-dom";
import "./TopRated.css";
import Chip from "../../components/Chip";
import Pagination from "../../components/Pagination";
import { fetchMovieDetailsOnGenre } from "../../store/actions/fetchDetailsOnGenre";
import { CircularProgress } from "@mui/material";

function Movie(props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageChanger, setPageChanger] = useState(0);
  const [genreToggle, setGenreToggle] = useState(false);
  const [genreId, setGenreId] = useState("");
  useEffect(() => {
    props.fetchTopRatedMovies(1);
    props.fetchMovieGenres();
  }, []);
  useEffect(() => {
    props.topRatedMovies.results && setResults(props.topRatedMovies.results);
  }, [props.topRatedMovies]);

  useEffect(() => {
    if (genreToggle) {
      props.movieResultsOnGenre.results &&
        setResults(props.movieResultsOnGenre.results);
    }
  }, [props.movieResultsOnGenre, genreToggle]);

  const onPageChangeHandler = (val) => {
    const pageNo = val;
    setActivePage(pageNo);
    if (genreToggle) {
      props.fetchMovieOnGenre(genreId, pageNo);
    } else {
      props.fetchTopRatedMovies(pageNo);
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

  const onGenreSelection = (genreIds) => {
    genreIds && props.fetchMovieOnGenre(genreIds, 1);
    props.movieResultsOnGenre.results &&
      setResults(props.movieResultsOnGenre.results);
    setGenreToggle(true);
    setGenreId(genreIds);
  };

  return !props.loading ? (
    <div className="top-rated">
      <div className="genre-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for Tv Shows"
            className="input-bx"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link className="search-btn" to={`/search/${search}`}>
            Search
          </Link>
        </div>
        <Chip genres={props.movieGenres} onClickHandler={onGenreSelection} />
      </div>
      <div className="top-rated-section">
        {results.length > 0 ? (
          <Row title="Top Rated Movies" shows={results} type={"movie"} />
        ) : (
          <h3>No Results Found</h3>
        )}
        {(props.topRatedMovies || props.movieResultsOnGenre) && (
          <div className="movie-pagination">
            {genreToggle && props.movieResultsOnGenre.total_pages > 1 && (
              <Pagination
                totalPages={props.movieResultsOnGenre.total_pages}
                pageChanger={pageChanger}
                activePage={activePage}
                onPageChange={onPageChangeHandler}
                decrementHandler={decrementHandler}
                incrementHandler={incrementHandler}
              />
            )}
            {!genreToggle && props.topRatedMovies.total_pages > 1 && (
              <Pagination
                totalPages={props.topRatedMovies.total_pages}
                pageChanger={pageChanger}
                activePage={activePage}
                onPageChange={onPageChangeHandler}
                decrementHandler={decrementHandler}
                incrementHandler={incrementHandler}
              />
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <CircularProgress className="spinner" />
  );
}

const mapStateToProps = (state) => {
  return {
    topRatedMovies: state.topRatedMovies,
    movieGenres: state.movieGenres,
    movieResultsOnGenre: state.movieResultsOnGenre,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopRatedMovies: (page) => {
      dispatch(fetchTopRatedMovies(page));
    },
    fetchMovieGenres: () => {
      dispatch(fetchMovieGenres());
    },
    fetchMovieOnGenre: (genreIds, pageNo) => {
      dispatch(fetchMovieDetailsOnGenre(genreIds, pageNo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
