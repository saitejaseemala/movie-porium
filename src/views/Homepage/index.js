import React from "react";
import Banner from "./Banner";
import PopularShowRow from "./PopularShowsRow";
import TopRatedRow from "./TopRatedRow";

function Homepage() {
  return (
    <div className="homepage">
      <Banner />
      <PopularShowRow />
      <TopRatedRow />
    </div>
  );
}

export default Homepage;
