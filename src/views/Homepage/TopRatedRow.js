import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchTopRatedMovies,
  fetchTopRatedTvSeries,
} from "../../store/actions/fetchTopRatedAction";
import "./Homepage.css";
import Row from "../../components/Row";

function TopRated(props) {
  useEffect(() => {
    props.fetchTopRatedMovies();
    props.fetchTopRatedTvSeries();
  }, []);

  return (
    <div className="top">
      <div className="movies">
        {props.topRatedMovies && (
          <Row
            title="Top Rated Movies"
            shows={props.topRatedMovies}
            type={"movie"}
          />
        )}
      </div>
      <div className="tv-series">
        {props.topRatedTvSeries && (
          <Row
            title="Top Rated On TV"
            shows={props.topRatedTvSeries}
            type={"tv"}
          />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    topRatedMovies: state.topRatedMovies.results,
    topRatedTvSeries: state.topRatedTvSeries.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopRatedMovies: () => {
      dispatch(fetchTopRatedMovies());
    },
    fetchTopRatedTvSeries: () => {
      dispatch(fetchTopRatedTvSeries());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopRated);
