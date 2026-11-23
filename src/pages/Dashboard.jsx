import { useEffect, useState } from "react";
import {
  getTrending,
  getTopRated,
  getActionMovies,
  getNewReleases,
  getUpcoming,
  getAdultTvShows,
  getCollectionDetails,
  getKidsTv,
} from "../utils/TMDB";

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
  const [actionMovies, setActionMovies] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [adultTvShows, setAdultTvShows] = useState([]);
  const [kidsTv, setKidsTv] = useState([]);
  const [trilogies, setTrilogies] = useState([]);
  const [trilogiesLoading, setTrilogiesLoading] = useState(true);
  // set error just in case it fails to laod
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    // Fetch each row. A failed request won't prevent the other rows from loading.
    const loadRow = (request, saveResults) =>
      request
        .then((res) => saveResults(res.data.results || []))
        .catch(() => setApiError(true));

    loadRow(getTrending(), setTrending);
    loadRow(getTopRated(), setTopRated);
    loadRow(getActionMovies(), setActionMovies);
    loadRow(getNewReleases(), setNewReleases);
    loadRow(getUpcoming(), setUpcoming);
    loadRow(getAdultTvShows(), setAdultTvShows);
    loadRow(getKidsTv(), setKidsTv);

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
      {/* <Header /> */}

      {trending.length > 0 && <HeroBanner movies={trending} />}

      <div className="dashboard-content">
        {apiError && (
          <p className="api-message">
            Some movies could not load. Check that VITE_TMDB_TOKEN is set in
            your .env file.
          </p>
        )}
        <MovieRow title="Top 10 Movies" movies={topRated} limit={10} />
        <MovieRow title="Action Movies" movies={actionMovies} limit={15} />
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
        <MovieRow title="New Releases" movies={newReleases} limit={15} />
        <MovieRow title="Upcoming Movies" movies={upcoming} limit={15} />
        <MovieRow
          title="Top 10 Adult TV Series"
          movies={adultTvShows}
          limit={10}
        />
        <MovieRow title="Kids TV Series" movies={kidsTv} limit={15} />
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default Dashboard;
