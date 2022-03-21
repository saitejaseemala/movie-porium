import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPeopleInfo } from "../../store/actions/fetchPeopleAction";
import { useParams } from "react-router-dom";
import Person from "../../components/Details/Person";

function CelebrityDetail(props) {
  const { personId } = useParams();
  useEffect(() => {
    props.fetchPeopleInfo(personId);
  }, []);
  return (
    <div className="person-container">
      <Person personInfo={props.personInfo} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    personInfo: state.personInfo,
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
