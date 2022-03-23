import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { fetchPopularMovies } from "../../store/actions/fetchPopularAction";
import { fetchMovieGenres } from "../../store/actions/fetchGenresAction";
import Row from "../../components/Row";
import "./PopularPage.css";
import Chip from "../../components/Chip";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { fetchMovieDetailsOnGenre } from "../../store/actions/fetchDetailsOnGenre";
import { LinearProgress } from "@mui/material";

function Movie(props) {
  const [search, setSearch] = useState("");
  const [queryParam] = useSearchParams();
  const pageParam = queryParam.get("page");
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState("");
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
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchPopularMovies(pageParam);
    props.fetchMovieGenres();
  }, []);

  useEffect(() => {
    props.popularMovies.results && setResults(props.popularMovies.results);
    props.popularMovies.results &&
      setTotalPages(props.popularMovies.total_pages);
  }, [props.popularMovies]);

  useEffect(() => {
    if (genreToggle) {
      props.movieResultsOnGenre.results &&
        setResults(props.movieResultsOnGenre.results);
      props.movieResultsOnGenre.results &&
        setTotalPages(props.movieResultsOnGenre.total_pages);
    }
  }, [props.movieResultsOnGenre, genreToggle]);

  const onPageChangeHandler = (val) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const pageNo = val;
    setActivePage(pageNo);
    if (genreToggle) {
      props.fetchMovieOnGenre(genreId.toString(), pageNo);
    } else {
      props.fetchPopularMovies(pageNo);
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

  const onGenreSelection = (genreIds) => {
    if (genreIds) {
      props.fetchMovieOnGenre(genreIds, 1);
    } else {
      props.fetchPopularMovies(1);
      setGenreToggle(false);
    }
    props.movieResultsOnGenre.results &&
      setResults(props.movieResultsOnGenre.results);
    props.movieResultsOnGenre.results &&
      setTotalPages(props.movieResultsOnGenre.total_pages);
    setGenreToggle(true);
    setGenreId(genreIds.split(",").map(Number));
    navigate("/popular-movies?page=1");
    setActivePage(1);
    setPageChanger(0);
  };

  return !props.loading ? (
    <div className="popular">
      <h4 className="title-header">Popular Movies</h4>
      <div className="genre-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for Movies"
            className="input-bx"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link className="search-btn" to={`/search/${search}?page=1`}>
            Search
          </Link>
        </div>
        <div>
          <Chip
            genres={props.movieGenres}
            onClickHandler={onGenreSelection}
            genreArray={genreId}
          />
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
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                pageChanger={pageChanger}
                activePage={activePage}
                onPageChange={onPageChangeHandler}
                decrementHandler={decrementHandler}
                incrementHandler={incrementHandler}
                type={"popular-movies"}
              />
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <LinearProgress className="spinner" />
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
