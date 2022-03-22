import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPeopleInfo } from "../../store/actions/fetchPeopleAction";
import { useParams } from "react-router-dom";
import Person from "../../components/Details/Person";
import { LinearProgress } from "@mui/material";

function CelebrityDetail(props) {
  const { personId } = useParams();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchPeopleInfo(personId);
  }, []);
  return !props.loading ? (
    <div className="person-container">
      <Person personInfo={props.personInfo} />
    </div>
  ) : (
    <LinearProgress />
  );
}

const mapStateToProps = (state) => {
  return {
    personInfo: state.personInfo,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPeopleInfo: (tvId) => {
      dispatch(fetchPeopleInfo(tvId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CelebrityDetail);
