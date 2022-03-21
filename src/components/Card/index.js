import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card(props) {
  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  return (
    <div className="card">
      <div className="card-section">
        {props.people &&
          props.people.map((person) => {
            return (
              person.profile_path && (
                <div className="poster-card" key={person.id}>
                  <div>
                    <Link to={`/person/${person.id}`}>
                      {person.profile_path && (
                        <img
                          src={`${baseImageUrl}${person.profile_path}`}
                          alt="image"
                          className="card-image"
                        />
                      )}
                    </Link>
                  </div>
                  <div className="meta">
                    <p className="name">
                      <a href="#">{person.name}</a>
                    </p>
                  </div>
                </div>
              )
            );
          })}
      </div>
    </div>
  );
}

export default Card;
