import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import "./PopularPeople.css";
import { connect } from "react-redux";
import { fetchPopularPeople } from "../../store/actions/fetchPeopleAction";
import Pagination from "../../components/Pagination";
import { LinearProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function PopularPeople(props) {
  const [results, setResults] = useState([]);
  const [queryParam] = useSearchParams();
  const pageParam = queryParam.get("page");
  const [activePage, setActivePage] = useState(parseInt(pageParam));
  const [pageChanger, setPageChanger] = useState(() => {
    if (pageParam % 10 === 0) {
      return (parseInt(parseInt(pageParam) / 10) - 1) * 10;
    } else {
      return parseInt(parseInt(pageParam) / 10) * 10;
    }
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchPopularPeople(pageParam);
  }, []);

  useEffect(() => {
    props.people.results && setResults(props.people.results);
  }, [props.people]);

  const onPageChangeHandler = (val) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const pageNo = val;
    setActivePage(pageNo);
    props.fetchPopularPeople(pageNo);
  };

  const decrementHandler = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageChanger(pageChanger - 10);
    setActivePage(pageChanger - 9);
    onPageChangeHandler(pageChanger - 9);
  };

  const incrementHandler = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageChanger(pageChanger + 10);
    setActivePage(pageChanger + 11);
    onPageChangeHandler(pageChanger + 11);
  };

  return !props.loading ? (
    <div className="popular-content">
      <h2>Popular People</h2>
      <Card people={results} />
      <div className="people-pagination">
        {props.people.total_pages > 1 && (
          <Pagination
            totalPages={props.people.total_pages}
            pageChanger={pageChanger}
            activePage={activePage}
            onPageChange={onPageChangeHandler}
            decrementHandler={decrementHandler}
            incrementHandler={incrementHandler}
            type={"popular-people"}
          />
        )}
      </div>
    </div>
  ) : (
    <LinearProgress />
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
