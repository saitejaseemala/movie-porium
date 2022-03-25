import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./views/Homepage";
import MovieDetail from "./views/DetailsPage/MovieDetail";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TvShowDetail from "./views/DetailsPage/TvShowDetail";
import SearchPage from "./views/SearchResultPage/SearchPage";
import CelebrityDetail from "./views/DetailsPage/CelebrityDetail";
import PopularMovie from "./views/PopularPage/Movie";
import PopularTv from "./views/PopularPage/TvShow";
import PopularPeople from "./views/PeoplePage/PopularPeople";
import TopRatedMovie from "./views/TopRatedPage/Movie";
import TopRatedTv from "./views/TopRatedPage/TvShow";
import Upcoming from "./views/UpcomingPage/UpcomingMovies";

function App() {
  return (
    <Router>
      <div className="main">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route exact path="/popular-movies" element={<PopularMovie />} />
          <Route exact path="/popular-tv" element={<PopularTv />} />
          <Route exact path="/popular-people" element={<PopularPeople />} />
          <Route exact path="/top-movies" element={<TopRatedMovie />} />
          <Route exact path="/top-tv" element={<TopRatedTv />} />
          <Route exact path="/upcoming-movies" element={<Upcoming />} />
          <Route exact path="/movie/:movieId" element={<MovieDetail />} />
          <Route exact path="/tv/:tvId" element={<TvShowDetail />} />
          <Route exact path="/person/:personId" element={<CelebrityDetail />} />
          <Route exact path="/search/:searchTerm" element={<SearchPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
