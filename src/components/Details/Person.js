import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import "./Details.css";

function Person(props) {
  const baseImageUrl = "https://image.tmdb.org/t/p/original";

  const navigate = useNavigate();

  const knownAs =
    props.personInfo &&
    props.personInfo.also_known_as &&
    props.personInfo.also_known_as.toString();

  return (
    <div className="details-container">
      <div className="details-poster">
        {props.personInfo &&
          (props.personInfo.profile_path ? (
            <img
              src={`${baseImageUrl}${props.personInfo.profile_path}`}
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
        <h1 className="title">{props.personInfo.name}</h1>
        {props.personInfo.place_of_birth && (
          <div className="birth-container">
            <h3>Place of Birth : </h3>
            <p className="birth-place">{props.personInfo.place_of_birth}</p>
          </div>
        )}
        {knownAs && (
          <div className="alternate-names">
            <h3>Also Known As :</h3>
            <p className="known-as">{knownAs}</p>{" "}
          </div>
        )}
        <div className="biography-content">
          <h3>Biography</h3>
          {props.personInfo.biography ? (
            <p className="biography">{props.personInfo.biography}</p>
          ) : (
            <p className="biography">
              We don't have a biography for {props.personInfo.name}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Person;
