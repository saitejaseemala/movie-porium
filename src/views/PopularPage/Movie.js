import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { fetchPopularMovies } from "../../store/actions/fetchPopularAction";
import { fetchMovieGenres } from "../../store/actions/fetchGenresAction";
import Row from "../../components/Row";
import "./PopularPage.css";
import Chip from "../../components/Chip";
import { Link } from "react-router-dom";
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
    props.fetchPopularMovies(1);
    props.fetchMovieGenres();
  }, []);

  useEffect(() => {
    props.popularMovies.results && setResults(props.popularMovies.results);
  }, [props.popularMovies]);

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
      props.fetchPopularMovies(pageNo);
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
    <div className="popular">
      <div className="genre-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for Movies"
            className="input-bx"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link className="search-btn" to={`/search/${search}`}>
            Search
          </Link>
        </div>
        <div>
          <Chip genres={props.movieGenres} onClickHandler={onGenreSelection} />
        </div>
      </div>
      <div className="movie-section">
        {results.length > 0 ? (
          <Row title="Popular Movies" shows={results} type={"movie"} />
        ) : (
          <h3 className="no-results">No Results Found</h3>
        )}
        {(props.popularMovies || props.movieResultsOnGenre) && (
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
            {!genreToggle && props.popularMovies.total_pages > 1 && (
              <Pagination
                totalPages={props.popularMovies.total_pages}
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
    popularMovies: state.popularMoviesBucket,
    movieGenres: state.movieGenres,
    movieResultsOnGenre: state.movieResultsOnGenre,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPopularMovies: (page) => {
      dispatch(fetchPopularMovies(page));
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
