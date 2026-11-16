import { useEffect, useState } from "react";
import {
  getTrending,
  getTopRated,
  getPopular,
  getUpcoming,
  getTvShows,
  getCollectionDetails,
  getKidsMovies, // <-- Added
  getKidsTv, // <-- Added
} from "../utils/TMDB"; // Make sure the path matches your file name (TMDB.js or tmdb.js)

import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import TrilogyRow from "../components/TrilogyRow";
import "../styles/Dashboard.css";

const TRILOGY_IDS = [
  523855, // The Equalizer
  9518, // The Transporter
  264, // Back to the Future
  2344, // The Matrix
  119, // The Lord of the Rings
  263, // The Dark Knight Trilogy
];

function Dashboard() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  // Added Kids State
  const [kidsMovies, setKidsMovies] = useState([]);
  const [kidsTv, setKidsTv] = useState([]);

  const [trilogies, setTrilogies] = useState([]);
  const [trilogiesLoading, setTrilogiesLoading] = useState(true);

  useEffect(() => {
    // Fetch standard rows
    getTrending().then((res) => setTrending(res.data.results));
    getTopRated().then((res) => setTopRated(res.data.results));
    getPopular().then((res) => setPopular(res.data.results));
    getUpcoming().then((res) => setUpcoming(res.data.results));
    getTvShows().then((res) => setTvShows(res.data.results));

    // Fetch Kids rows
    getKidsMovies().then((res) => setKidsMovies(res.data.results));
    getKidsTv().then((res) => setKidsTv(res.data.results));

    // Fetch Trilogies
    Promise.all(TRILOGY_IDS.map((id) => getCollectionDetails(id)))
      .then((responses) => {
        const collections = responses.map((res) => res.data);
        setTrilogies(collections);
        setTrilogiesLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trilogies:", err);
        setTrilogiesLoading(false);
      });
  }, []);

  const secondHeroMovie = upcoming[0];

  return (
    <div className="dashboard-page">
      <Header />

      {trending.length > 0 && <HeroBanner movies={trending} />}

      <div className="dashboard-content">
        <MovieRow title="Trending" movies={trending} />
        <MovieRow title="Top 10" movies={topRated} />
        <MovieRow title="Action" movies={popular} />
        <TrilogyRow
          title="Trilogies"
          collections={trilogies}
          loading={trilogiesLoading}
        />
        {secondHeroMovie && (
          <div className="second-hero-banner">
            <img
              src={`https://image.tmdb.org/t/p/original${secondHeroMovie.backdrop_path}`}
              alt={secondHeroMovie.title}
              className="second-hero-bg"
            />
            <div className="second-hero-content">
              <img
                src={`https://image.tmdb.org/t/p/w500${secondHeroMovie.poster_path}`}
                alt={secondHeroMovie.title}
                className="second-hero-poster"
              />
              <div className="second-hero-info">
                <h2>{secondHeroMovie.title}</h2>
                <p>{secondHeroMovie.vote_average}/10</p>
                <button className="btn-watch">Watch Movie</button>
              </div>
            </div>
          </div>
        )}
        {/* Bottom Rows */}
        <MovieRow title="Upcoming Movies" movies={upcoming} />
        <MovieRow title="TV Shows" movies={tvShows} />
        <MovieRow title="Kids Movies" movies={kidsMovies} />
        <MovieRow title="Kids Series" movies={kidsTv} />
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
