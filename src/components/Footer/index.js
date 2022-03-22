import { GitHub, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-section">
      <footer className="footer">
        <div className="footer-container">
          <div className="copyright">
            <Link to="/">
              <img
                src={require("../../assets/images/logo.png")}
                alt="MoviePorium-Logo"
                className="footer-logo"
              />
            </Link>
            <p className="copy-p">Copyright &copy; 2022</p>
          </div>
          <nav className="footer-nav">
            <ul>
              <li>
                <Link to="/popular-movies?page=1">Popular</Link>
              </li>
              <li>
                <Link to="top-movies?page=1">Top Rated</Link>
              </li>
              <li>
                <Link to="popular-people?page=1">People</Link>
              </li>
            </ul>
          </nav>
          <div className="social">
            <a href="https://github.com/saitejaseemala" target="_blank">
              <GitHub fontSize="large" />
            </a>
            <a
              href="https://www.linkedin.com/in/saiteja-seemala"
              target="_blank"
            >
              <LinkedIn fontSize="large" />
            </a>
            <a href="https://www.instagram.com/s_.a_.i_/?hl=en" target="_blank">
              <Instagram fontSize="large" />
            </a>
            <a href="https://twitter.com/SaitejaSeemala" target="_blank">
              <Twitter fontSize="large" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
