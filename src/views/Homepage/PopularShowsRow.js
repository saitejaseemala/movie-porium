import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchPopularMovies,
  fetchPopularTvSeries,
} from "../../store/actions/fetchPopularAction";
import "./Homepage.css";
import Row from "../../components/Row";

function PopularShows(props) {
  useEffect(() => {
    props.fetchPopularMovies();
    props.fetchPopularTvSeries();
  }, []);

  return (
    <div className="popular-container">
      <div className="movies">
        {props.popularMovies && (
          <Row
            title="What's Popular"
            shows={props.popularMovies}
            type={"movie"}
          />
        )}
      </div>
      <div className="tv-series">
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
