import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUpcomingMovies } from "../../store/actions/fetchUpcomingAction";
import { fetchMovieGenres } from "../../store/actions/fetchGenresAction";
import Row from "../../components/Row";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import "./UpcomingMovies.css";
import Chip from "../../components/Chip";
import Pagination from "../../components/Pagination";
import { fetchUpcomingOnGenre } from "../../store/actions/fetchDetailsOnGenre";
import moment from "moment";
import { LinearProgress } from "@mui/material";

function UpcomingMovies(props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState("");
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
  const date = new Date();
  const formattedDate = moment(date).format("YYYY-MM-DD");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchUpcomingMovies(formattedDate, pageParam);
    props.fetchMovieGenres();
  }, []);

  useEffect(() => {
    props.upcomingMovies.results && setResults(props.upcomingMovies.results);
    props.upcomingMovies.results &&
      setTotalPages(props.upcomingMovies.total_pages);
  }, [props.upcomingMovies]);

  useEffect(() => {
    if (genreToggle) {
      props.upcomingOnGenre.results &&
        setResults(props.upcomingOnGenre.results);
      props.upcomingOnGenre.results &&
        setTotalPages(props.upcomingOnGenre.total_pages);
    }
  }, [props.upcomingOnGenre, genreToggle]);

  const onPageChangeHandler = (val) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const pageNo = val;
    setActivePage(pageNo);
    if (genreToggle) {
      props.fetchMovieOnGenre(formattedDate, genreId.toString(), pageNo);
    } else {
      props.fetchUpcomingMovies(formattedDate, pageNo);
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
      props.fetchMovieOnGenre(formattedDate, genreIds, 1);
    } else {
      props.fetchUpcomingMovies(formattedDate, 1);
      setGenreToggle(false);
    }
    props.upcomingOnGenre.results && setResults(props.upcomingOnGenre.results);
    props.upcomingOnGenre.results &&
      setTotalPages(props.upcomingOnGenre.total_pages);
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
          <Link className="search-btn" to={`/search/${search}?page=1`}>
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
        {(props.upcomingMovies || props.upcomingOnGenre) && (
          <div className="movie-pagination">
            {console.log(totalPages)}
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
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
    <LinearProgress />
  );
}

const mapStateToProps = (state) => {
  return {
    upcomingMovies: state.upcomingMovies,
    movieGenres: state.movieGenres,
    upcomingOnGenre: state.upcomingOnGenre,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUpcomingMovies: (releaseDate, page) => {
      dispatch(fetchUpcomingMovies(releaseDate, page));
    },
    fetchMovieGenres: () => {
      dispatch(fetchMovieGenres());
    },
    fetchMovieOnGenre: (date, genreIds, pageNo) => {
      dispatch(fetchUpcomingOnGenre(date, genreIds, pageNo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovies);
