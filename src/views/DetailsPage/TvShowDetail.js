import React, { useEffect } from "react";
import { connect } from "react-redux";
import Details from "../../components/Details";
import { fetchTvSeriesDetails } from "../../store/actions/fetchShowDetails";
import { useParams } from "react-router-dom";

function TvShowDetail(props) {
  const { tvId } = useParams();
  const videoKey = props?.tvInfo?.videos?.results[0]?.key;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchTvSeriesDetails(tvId);
  }, []);
  return (
    <div className="tv-show-container">
      <Details details={props.tvInfo} trailer={videoKey} type={"tv"} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tvInfo: state.tvInfo,
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
