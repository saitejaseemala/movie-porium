import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./chip.css";

function Chip(props) {
  const [clicked, setClicked] = useState(props.genreArray);
  const [clickToggle, setClickToggle] = useState(false);
  useEffect(() => {
    clickToggle && props.onClickHandler(clicked.toString());
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
                      return [...prev, genre.id];
                    } else return prev.filter((ele) => ele !== genre.id);
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
