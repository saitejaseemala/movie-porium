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
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchTopRatedMovies();
    props.fetchTopRatedTvSeries();
  }, []);

  return (
    <div className="top">
      <div className="movies">
        <h2 className="home-title">Top Rated Movies</h2>
        {props.topRatedMovies && (
          <Row
            title="Top Rated Movies"
            shows={props.topRatedMovies}
            type={"movie"}
          />
        )}
      </div>
      <div className="tv-series">
        <h2 className="home-title">Top Rated On TV</h2>
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
