import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchPopularMovies,
  fetchPopularTvSeries,
} from "../../store/actions/fetchPopularAction";
import "./Homepage.css";
import Row from "../../components/Row";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function PopularShows(props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchPopularMovies();
    props.fetchPopularTvSeries();
  }, []);

  const chevronHandler = (e) => {
    console.log(e);
    window.scrollBy(100, 0);
  };

  return (
    <div className="popular-container">
      <div className="movies">
        <h2 className="home-title">What's Popular</h2>
        {props.popularMovies && (
          <Row
            title="What's Popular"
            shows={props.popularMovies}
            type={"movie"}
          />
        )}
      </div>
      <div className="tv-series">
        <h2 className="home-title">Popular On TV</h2>
        {props.popularTvSeries && (
          <Row
            title="Popular On TV"
            shows={props.popularTvSeries}
            type={"tv"}
          />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    popularMovies: state.popularMoviesBucket.results,
    popularTvSeries: state.popularTvSeries.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPopularMovies: () => {
      dispatch(fetchPopularMovies());
    },
    fetchPopularTvSeries: () => {
      dispatch(fetchPopularTvSeries());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularShows);
