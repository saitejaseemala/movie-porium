import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./SearchCard.css";

function SearchCard(props) {
  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  const knownFor = (titles) => {
    let popularFor = "";
    titles.map((item) => {
      popularFor =
        (item.original_title || item.title || item.name || item.original_name) +
        ", " +
        popularFor;
    });
    return popularFor.slice(0, -2);
  };

  const fetchDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = moment(date).format("MMMM DD, YYYY");
    return formattedDate;
  };
  return (
    <div className="search-card">
      <div className="search-results">
        {props.search &&
          props.search.map((result) => {
            return (
              <div className="search-poster-card" key={result.id}>
                <div className="poster-section">
                  {result.genre_ids ? (
                    result.poster_path ? (
                      <Link
                        to={`${result.title ? "/movie" : "/tv"}/${result.id}`}
                      >
                        <img
                          src={`${baseImageUrl}${result.poster_path}`}
                          alt="show-image"
                          className="search-poster-image"
                        />
                      </Link>
                    ) : (
                      <Link
                        to={`${result.title ? "/movie" : "/tv"}/${result.id}`}
                      >
                        <img
                          src={require("../../assets/images/noimage.png")}
                          alt="show-image"
                          className="no-image"
                        />
                      </Link>
                    )
                  ) : result.profile_path ? (
                    <Link to={`/person/${result.id}`}>
                      <img
                        src={`${baseImageUrl}${result.profile_path}`}
                        alt="person-image"
                        className="search-profile-image"
                      />
                    </Link>
                  ) : (
                    <Link to={`/person/${result.id}`}>
                      <img
                        src={require("../../assets/images/noimage.png")}
                        alt="show-image"
                        className="no-image"
                      />
                    </Link>
                  )}
                </div>
                <div className="content-section">
                  {result.genre_ids ? (
                    <>
                      <Link
                        to={`${result.title ? "/movie" : "/tv"}/${result.id}`}
                      >
                        <h3 className="release-title">
                          {result.title ||
                            result.original_title ||
                            result.original_name ||
                            result.name}
                        </h3>
                      </Link>
                      <p className="search-release-date">
                        {result.release_date
                          ? fetchDate(result.release_date)
                          : result.first_air_date &&
                            fetchDate(result.first_air_date)}
                      </p>
                      <div className="overview-section">{result.overview}</div>
                    </>
                  ) : (
                    <>
                      <Link to={`/person/${result.id}`}>
                        <h3 className="person-name">{result.name}</h3>
                      </Link>
                      <p className="person-department">
                        {result.known_for_department}
                      </p>
                      <div className="overview-section">
                        Known for: {knownFor(result.known_for)}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SearchCard;
