import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchTopRatedTvSeries } from "../../store/actions/fetchTopRatedAction";
import { fetchTvGenres } from "../../store/actions/fetchGenresAction";
import Row from "../../components/Row";
import "./TopRated.css";
import Chip from "../../components/Chip";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { fetchTvDetailsOnGenre } from "../../store/actions/fetchDetailsOnGenre";
import { LinearProgress } from "@mui/material";

function TvShow(props) {
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchTopRatedTvSeries(pageParam);
    props.fetchTvGenres();
  }, []);

  useEffect(() => {
    props.topRatedTvSeries.results &&
      setResults(props.topRatedTvSeries.results);
    props.topRatedTvSeries.results &&
      setTotalPages(props.topRatedTvSeries.total_pages);
  }, [props.topRatedTvSeries]);

  useEffect(() => {
    if (genreToggle) {
      props.tvResultsOnGenre.results &&
        setResults(props.tvResultsOnGenre.results);
      props.tvResultsOnGenre.results &&
        setTotalPages(props.tvResultsOnGenre.total_pages);
    }
  }, [props.tvResultsOnGenre, genreToggle]);

  const onPageChangeHandler = (val) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const pageNo = val;
    setActivePage(pageNo);
    if (genreToggle) {
      props.fetchTvDetailsOnGenre(genreId.toString(), pageNo);
    } else {
      props.fetchTopRatedTvSeries(pageNo);
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
      props.fetchTvDetailsOnGenre(genreIds, 1);
    } else {
      props.fetchTopRatedTvSeries(1);
      setGenreToggle(false);
    }
    props.tvResultsOnGenre.results &&
      setResults(props.tvResultsOnGenre.results);
    props.tvResultsOnGenre.results &&
      setTotalPages(props.tvResultsOnGenre.total_pages);
    setGenreToggle(true);
    setGenreId(genreIds.split(",").map(Number));
    navigate("/top-tv?page=1");
    setActivePage(1);
    setPageChanger(0);
  };
  return !props.loading ? (
    <div className="top-rated">
      <h4 className="title-header">Top Rated Tv Shows</h4>
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
          genres={props.tvGenres}
          onClickHandler={onGenreSelection}
          genreArray={genreId}
        />
      </div>
      <div className="toprated-tv-show-section">
        {results.length > 0 ? (
          <Row title="Top Rated TV Shows" shows={results} type="tv" />
        ) : (
          <h3 className="no-results">No Results Found</h3>
        )}
        {(props.topRatedTvSeries || props.tvResultsOnGenre) && (
          <div className="movie-pagination">
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                pageChanger={pageChanger}
                activePage={activePage}
                onPageChange={onPageChangeHandler}
                decrementHandler={decrementHandler}
                incrementHandler={incrementHandler}
                type={"top-tv"}
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
    topRatedTvSeries: state.topRatedTvSeries,
    tvGenres: state.tvGenres,
    tvResultsOnGenre: state.tvResultsOnGenre,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopRatedTvSeries: (page) => {
      dispatch(fetchTopRatedTvSeries(page));
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
