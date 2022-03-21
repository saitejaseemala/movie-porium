import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPopularTvSeries } from "../../store/actions/fetchPopularAction";
import { fetchTvGenres } from "../../store/actions/fetchGenresAction";
import { fetchTvDetailsOnGenre } from "../../store/actions/fetchDetailsOnGenre";
import Row from "../../components/Row";
import { Link } from "react-router-dom";
import "./PopularPage.css";
import Chip from "../../components/Chip";
import Pagination from "../../components/Pagination";
import { CircularProgress } from "@mui/material";

function TvShow(props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageChanger, setPageChanger] = useState(0);
  const [genreToggle, setGenreToggle] = useState(false);
  const [genreId, setGenreId] = useState("");
  useEffect(() => {
    props.fetchPopularTvSeries(1);
    props.fetchTvGenres();
  }, []);

  useEffect(() => {
    props.popularTvSeries.results && setResults(props.popularTvSeries.results);
  }, [props.popularTvSeries]);

  useEffect(() => {
    if (genreToggle) {
      props.tvResultsOnGenre.results &&
        setResults(props.tvResultsOnGenre.results);
    }
  }, [props.tvResultsOnGenre, genreToggle]);

  const onPageChangeHandler = (val) => {
    const pageNo = val;
    setActivePage(pageNo);
    if (genreToggle) {
      props.fetchTvDetailsOnGenre(genreId, pageNo);
    } else {
      props.fetchPopularTvSeries(pageNo);
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
    genreIds && props.fetchTvDetailsOnGenre(genreIds, 1);
    props.tvResultsOnGenre.results &&
      setResults(props.tvResultsOnGenre.results);
    setGenreToggle(true);
    setGenreId(genreIds);
  };

  return !props.loading ? (
    <div className="popular">
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
        <Chip genres={props.tvGenres} onClickHandler={onGenreSelection} />
      </div>
      <div className="tv-show-section">
        {results.length > 0 ? (
          <Row title="Popular TV Shows" shows={results} type="tv" />
        ) : (
          <h3 className="no-results">No Results Found</h3>
        )}
        {(props.popularTvSeries || props.tvResultsOnGenre) && (
          <div className="movie-pagination">
            {genreToggle && props.tvResultsOnGenre.total_pages > 1 && (
              <Pagination
                totalPages={props.tvResultsOnGenre.total_pages}
                pageChanger={pageChanger}
                activePage={activePage}
                onPageChange={onPageChangeHandler}
                decrementHandler={decrementHandler}
                incrementHandler={incrementHandler}
              />
            )}
            {!genreToggle && props.popularTvSeries.total_pages > 1 && (
              <Pagination
                totalPages={props.popularTvSeries.total_pages}
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
    popularTvSeries: state.popularTvSeries,
    tvGenres: state.tvGenres,
    tvResultsOnGenre: state.tvResultsOnGenre,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPopularTvSeries: (page) => {
      dispatch(fetchPopularTvSeries(page));
    },
    fetchTvGenres: () => {
      dispatch(fetchTvGenres());
    },
    fetchTvDetailsOnGenre: (genreIds, pageNo) => {
      dispatch(fetchTvDetailsOnGenre(genreIds, pageNo));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TvShow);
