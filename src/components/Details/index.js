import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import "./Details.css";

function Details({ details, trailer, type }) {
  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  const runTime = `${Math.floor(details.runtime / 60)}h ${Math.floor(
    details.runtime % 60
  )}m`;

  const navigate = useNavigate();

  const renderGenres = () => {
    return (
      details.genres &&
      details.genres.map((genre) => {
        return (
          <button className="genre-btn" key={genre.id}>
            {genre.name}
          </button>
        );
      })
    );
  };

  return (
    <div className="details-container">
      <div className="details-poster">
        {details &&
          (details.poster_path ? (
            <img
              src={`${baseImageUrl}${details.poster_path}`}
              alt="image"
              className="poster-image"
            />
          ) : (
            <img
              src={require("../../assets/images/noimage.png")}
              alt="image"
              className="no-content-image"
            />
          ))}
      </div>
      <div className="content">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon className="back-arrow" fontSize="small" />
          Go back
        </button>
        <h1 className="title">
          {details.title || details.original_title || details.name}
        </h1>
        {details.release_date && (
          <p className="release-date">Release Date: {details.release_date}</p>
        )}
        {type === "movie"
          ? details.run_time && <p className="run-time">Run time: {runTime}</p>
          : details.number_of_seasons && (
              <p className="run-time">
                No of Seasons: {details.number_of_seasons}
              </p>
            )}
        {details.vote_average != 0 && (
          <div className="rating-content">
            <p className="show-rating"> Rating: {details.vote_average}</p>
          </div>
        )}
        {details.genres && details.genres.length > 0 && (
          <div className="genres">
            <p className="genre-text">Genre: {renderGenres()}</p>
          </div>
        )}
        {details.overview ? (
          <div className="overview-content">
            <h3>Overview</h3>
            <p className="overview">{details.overview}</p>
          </div>
        ) : (
          <div className="overview-content">
            <p className="overview">Details Not Found</p>
          </div>
        )}
        {trailer && (
          <a
            href={`https://www.youtube.com/watch?v=${trailer}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="trailer-btn">
              {" "}
              <PlayArrowIcon className="play-icon" />
              Play Trailer
            </button>
          </a>
        )}
      </div>
    </div>
  );
}

export default Details;
