import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUpcomingMovies } from "../../store/actions/fetchUpcomingAction";
import { fetchMovieGenres } from "../../store/actions/fetchGenresAction";
import Row from "../../components/Row";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "./UpcomingMovies.css";
import Chip from "../../components/Chip";
import Pagination from "../../components/Pagination";
import { fetchMovieDetailsOnGenre } from "../../store/actions/fetchDetailsOnGenre";
import { CircularProgress } from "@mui/material";

function UpcomingMovies(props) {
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
    props.fetchUpcomingMovies(pageParam);
    props.fetchMovieGenres();
  }, []);

  useEffect(() => {
    props.upcomingMovies.results && setResults(props.upcomingMovies.results);
  }, [props.upcomingMovies]);

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
      props.fetchUpcomingMovies(pageNo);
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
      props.fetchUpcomingMovies(1);
      setGenreToggle(false);
    }
    props.movieResultsOnGenre.results &&
      setResults(props.movieResultsOnGenre.results);
    setGenreToggle(true);
    setGenreId(genreIds.split(",").map(Number));
    navigate("/upcoming-movies?page=1");
    setActivePage(1);
    setPageChanger(0);
  };

  return !props.loading ? (
    <div className="upcoming">
      <h4 className="title-header">Upcoming Movies</h4>
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
        <Chip
          genres={props.movieGenres}
          onClickHandler={onGenreSelection}
          genreArray={genreId}
        />
      </div>
      <div className="upcoming-movie-section">
        {results.length > 0 ? (
          <Row title="Upcoming Movies" shows={results} type={"movie"} />
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
                type={"upcoming-movies"}
              />
            )}
            {!genreToggle && props.upcomingMovies.total_pages > 1 && (
              <Pagination
                totalPages={props.upcomingMovies.total_pages}
                pageChanger={pageChanger}
                activePage={activePage}
                onPageChange={onPageChangeHandler}
                decrementHandler={decrementHandler}
                incrementHandler={incrementHandler}
                type={"upcoming-movies"}
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
    upcomingMovies: state.upcomingMovies,
    movieGenres: state.movieGenres,
    movieResultsOnGenre: state.movieResultsOnGenre,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpcomingMovies: (page) => {
      dispatch(fetchUpcomingMovies(page));
    },
    fetchMovieGenres: () => {
      dispatch(fetchMovieGenres());
    },
    fetchMovieOnGenre: (genreIds, pageNo) => {
      dispatch(fetchMovieDetailsOnGenre(genreIds, pageNo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovies);
