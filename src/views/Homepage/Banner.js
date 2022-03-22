import React, { useState, useEffect, useRef } from "react";
import { fetchPopularMovies } from "../../store/actions/fetchPopularAction";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

function Banner(props) {
  const [popularMovieBanner, setPopularMovieBanner] = useState("");
  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    props.fetchPopularMovies();
  }, []);

  const navigate = useNavigate();
  const inputRef = useRef("");
  const mobileRef = useRef("");

  useEffect(() => {
    if (props.popularMovies) {
      const bannerImg = props.popularMovies && props.popularMovies[1];
      bannerImg?.backdrop_path &&
        setPopularMovieBanner(bannerImg.backdrop_path);
    }
  }, [props.popularMovies]);

  const onSearchHandler = () => {
    const searchTerm = inputRef.current.value || mobileRef.current.value;
    console.log("spi", searchTerm);
    const path = "search/" + searchTerm + "?page=1";
    navigate(path);
  };

  return (
    <div className="banner">
      {popularMovieBanner && (
        <header
          className="banner-img"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage: `linear-gradient(
                to right,
                rgba(0, 0, 0, 0.8) 0%,
                rgba(0, 0, 0, 0) 100%
              ), url("${baseImageUrl}${popularMovieBanner}")`,
          }}
        >
          <div className="banner-content">
            <h2>Welcome.</h2>
            <p>
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
            <div className="search-bx">
              <form onSubmit={onSearchHandler}>
                <input
                  type="text"
                  className="window"
                  placeholder="Search for a movie, tv show, person..."
                  ref={inputRef}
                ></input>
                <input
                  type="text"
                  className="mobile"
                  placeholder="Search..."
                  ref={mobileRef}
                ></input>
                <button className="search-button btn" onClick={onSearchHandler}>
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="banner-gradient"></div>
        </header>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    popularMovies: state.popularMoviesBucket.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPopularMovies: () => {
      dispatch(fetchPopularMovies());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
