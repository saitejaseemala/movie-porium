import React, { useEffect } from "react";
import { connect } from "react-redux";
import Details from "../../components/Details";
import { fetchMovieDetails } from "../../store/actions/fetchShowDetails";
import { useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";

function MovieDetail(props) {
  const { movieId } = useParams();
  const videoKey = props?.movieInfo?.videos?.results[0]?.key;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchMovieDetails(movieId);
  }, []);
  return !props.loading ? (
    <div className="movie-detail-container">
      <Details details={props.movieInfo} trailer={videoKey} type={"movie"} />
    </div>
  ) : (
    <LinearProgress className="spinner" />
  );
}

const mapStateToProps = (state) => {
  return {
    movieInfo: state.movieInfo,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovieDetails: (movieId) => {
      dispatch(fetchMovieDetails(movieId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
