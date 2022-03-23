import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./Row.css";

function Row(props) {
  const baseImageUrl = "https://image.tmdb.org/t/p/original";
  return props.shows ? (
    <div className="row">
      <div className="row-section">
        {props.shows &&
          props.shows.map((show, index) => {
            return (
              show.poster_path && (
                <div className="poster-card" key={show.id}>
                  <div>
                    <Link to={`/${props.type}/${show.id}`}>
                      {show.poster_path && (
                        <img
                          src={`${baseImageUrl}${show.poster_path}`}
                          alt="image"
                          className="poster"
                        />
                      )}
                    </Link>
                  </div>
                  <Box
                    sx={{ position: "relative", display: "inline-flex" }}
                    className="rating-placer"
                  >
                    <CircularProgress
                      variant="determinate"
                      value={show.vote_average * 10}
                      className="rating"
                      color={
                        show.vote_average * 10 > 60 ? "success" : "warning"
                      }
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="white"
                        key={index}
                      >
                        {`${show.vote_average * 10}%`}
                      </Typography>
                    </Box>
                  </Box>
                  <div className="poster-content">
                    <h2 className="poster-title">
                      <Link to={`${props.type}/${show.id}`}>
                        {show.title || show.name}
                      </Link>
                    </h2>
                  </div>
                </div>
              )
            );
          })}
      </div>
    </div>
  ) : (
    <h3>No Results Found</h3>
  );
}

export default Row;
