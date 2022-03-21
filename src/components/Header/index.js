import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

function Header() {
  const [menu, setMenu] = useState(true);
  const [movieActive, setMovieActive] = useState(false);
  const [tvActive, setTvActive] = useState(false);
  const movieRef = useRef();
  const tvRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [movieActive]);

  const handleClickOutside = (e) => {
    if (movieRef.current && !movieRef.current.contains(e.target)) {
      setMovieActive(false);
    }
    if (tvRef.current && !tvRef.current.contains(e.target)) {
      setTvActive(false);
    }
  };

  return (
    <div className="header">
      <div
        className="hamburger-section"
        onClick={(e) => {
          setMenu((prevState) => {
            return !prevState;
          });
        }}
      >
        <IconButton className="hamburger">
          {menu ? (
            <MenuIcon fontSize="large" />
          ) : (
            <CloseIcon fontSize="large" />
          )}
        </IconButton>
      </div>
      <div className="header-left">
        <Link to="/">
          <img
            src={require("../../assets/images/logo.png")}
            alt="MoviePorium-Logo"
            className="header-logo"
          />
        </Link>
        <nav className="header-links">
          <ul className={`${menu ? "" : "active"}`}>
            <li className="nav-link dropdown" ref={movieRef}>
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  setMovieActive(true);
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setTvActive(false);
                }}
              >
                Movies
              </a>
              <div
                className={`dropdown-content${movieActive ? " active" : ""}`}
              >
                <Link
                  to="/popular-movies"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenu(true);
                  }}
                >
                  Popular
                </Link>
                <Link
                  to="/top-movies"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenu(true);
                  }}
                >
                  Top Rated
                </Link>
                <Link
                  to="/upcoming-movies"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenu(true);
                  }}
                >
                  Upcoming
                </Link>
              </div>
            </li>
            <li className="nav-link dropdown" ref={tvRef}>
              <a
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  setTvActive(true);
                }}
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setMovieActive(false);
                }}
              >
                TV Shows
              </a>
              <div className={`dropdown-content${tvActive ? " active" : ""}`}>
                <Link
                  to="/popular-tv"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenu(true);
                  }}
                >
                  Popular
                </Link>
                <Link
                  to="top-tv"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenu(true);
                  }}
                >
                  Top Rated
                </Link>
              </div>
            </li>
            <li className="nav-link">
              <Link
                to="popular-people"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenu(true);
                }}
              >
                People
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
