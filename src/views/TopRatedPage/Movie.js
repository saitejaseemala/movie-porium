import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchTopRatedMovies } from "../../store/actions/fetchTopRatedAction";
import { fetchMovieGenres } from "../../store/actions/fetchGenresAction";
import Row from "../../components/Row";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "./TopRated.css";
import Chip from "../../components/Chip";
import Pagination from "../../components/Pagination";
import { fetchMovieDetailsOnGenre } from "../../store/actions/fetchDetailsOnGenre";
import { CircularProgress } from "@mui/material";

function Movie(props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [queryParam] = useSearchParams();
  const pageParam = queryParam.get("page");
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(parseInt(pageParam));
  const [pageChanger, setPageChanger] = useState(() => {
    if (pageParam % 10 === 0) {
      return (parseInt(parseInt(pageParam) / 10) - 1) * 10;
    } else {
      return parseInt(parseInt(pageParam) / 10) * 10;
    }
  });
  const [genreToggle, setGenreToggle] = useState(false);
  const [genreId, setGenreId] = useState([]);
  useEffect(() => {
    props.fetchTopRatedMovies(pageParam);
    console.log(activePage);
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
      props.fetchMovieOnGenre(genreId.toString(), pageNo);
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
    if (genreIds) {
      props.fetchMovieOnGenre(genreIds, 1);
    } else {
      props.fetchTopRatedMovies(1);
      setGenreToggle(false);
    }
    props.movieResultsOnGenre.results &&
      setResults(props.movieResultsOnGenre.results);
    setGenreToggle(true);
    setGenreId(genreIds.split(",").map(Number));
    navigate("/top-movies?page=1");
    setActivePage(1);
    setPageChanger(0);
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
        <Chip
          genres={props.movieGenres}
          onClickHandler={onGenreSelection}
          genreArray={genreId}
        />
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
                type={"top-movies"}
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
                type={"top-movies"}
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