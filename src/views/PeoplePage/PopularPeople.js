import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import "./PopularPeople.css";
import { connect } from "react-redux";
import { fetchPopularPeople } from "../../store/actions/fetchPeopleAction";
import Pagination from "../../components/Pagination";
import { CircularProgress } from "@mui/material";

function PopularPeople(props) {
  const [results, setResults] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageChanger, setPageChanger] = useState(0);
  useEffect(() => {
    props.fetchPopularPeople(1);
  }, []);

  useEffect(() => {
    props.people.results && setResults(props.people.results);
  }, [props.people]);

  const onPageChangeHandler = (val) => {
    const pageNo = val;
    setActivePage(pageNo);
    props.fetchPopularPeople(pageNo);
  };

  const decrementHandler = (e) => {
    setPageChanger(pageChanger - 10);
    setActivePage(pageChanger - 9);
    onPageChangeHandler(pageChanger - 9);
  };

  const incrementHandler = (e) => {
    setPageChanger(pageChanger + 10);
    setActivePage(pageChanger + 11);
    onPageChangeHandler(pageChanger + 11);
  };

  return !props.loading ? (
    <div className="popular-content">
      <h2>Popular People</h2>
      <Card people={results} />
      {props.people && (
        <div className="people-pagination">
          {props.people.total_pages > 1 && (
            <Pagination
              totalPages={props.people.total_pages}
              pageChanger={pageChanger}
              activePage={activePage}
              onPageChange={onPageChangeHandler}
              decrementHandler={decrementHandler}
              incrementHandler={incrementHandler}
            />
          )}
        </div>
      )}
    </div>
  ) : (
    <CircularProgress className="spinner" />
  );
}

const mapStateToProps = (state) => {
  return {
    people: state.people,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPopularPeople: (page) => {
      dispatch(fetchPopularPeople(page));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularPeople);
