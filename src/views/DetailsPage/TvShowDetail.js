import React, { useEffect } from "react";
import { connect } from "react-redux";
import Details from "../../components/Details";
import { fetchTvSeriesDetails } from "../../store/actions/fetchShowDetails";
import { useParams } from "react-router-dom";
import {  LinearProgress } from "@mui/material";

function TvShowDetail(props) {
  const { tvId } = useParams();
  const videoKey = props?.tvInfo?.videos?.results[0]?.key;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchTvSeriesDetails(tvId);
  }, []);
  return !props.loading ? (
    <div className="tv-show-container">
      <Details details={props.tvInfo} trailer={videoKey} type={"tv"} />
    </div>
  ) : (
    <LinearProgress />
  );
}

const mapStateToProps = (state) => {
  return {
    tvInfo: state.tvInfo,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTvSeriesDetails: (tvId) => {
      dispatch(fetchTvSeriesDetails(tvId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TvShowDetail);
