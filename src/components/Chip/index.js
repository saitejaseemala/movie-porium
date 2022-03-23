import React, { useEffect, useRef, useState } from "react";
import "./chip.css";

function Chip(props) {
  const [clicked, setClicked] = useState(props.genreArray);
  const [clickToggle, setClickToggle] = useState(false);
  useEffect(() => {
    const genresClicked = clicked;
    const index = genresClicked.indexOf(0);
    if (index > -1) {
      genresClicked.splice(index, 1);
    }
    clickToggle && props.onClickHandler(genresClicked.toString());
    setClickToggle(false);
  }, [clickToggle]);
  return (
    <div className="genre-container">
      <div className="genre-card">
        <p className="genre-title">Genres</p>
        {props.genres &&
          props.genres.map((genre) => {
            return (
              <button
                className={`genre-chip ${
                  clicked.includes(genre.id) ? "clicked" : ""
                }`}
                key={genre.id}
                onClick={() => {
                  setClicked((prev) => {
                    if (!prev.includes(genre.id)) {
                      const index = prev.indexOf(0);
                      if (index > -1) {
                        prev.splice(index, 1);
                      }
                      return [...prev, genre.id];
                    } else {
                      const index = prev.indexOf(0);
                      if (index > -1) {
                        prev.splice(index, 1);
                      }
                      return prev.filter((ele) => ele !== genre.id);
                    }
                  });
                  setClickToggle(true);
                }}
              >
                {genre.name}
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default Chip;
