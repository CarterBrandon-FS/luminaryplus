import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
} from "../utils/TMDB";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieRow from "../components/MovieRow";
import "../styles/Dashboard.css";
import "../styles/Details.css";

// Importing the custom logos for the ratings section
import imdbLogo from "../assets/imdbLogo.png";
import rtLogo from "../assets/rottentomatoe 2.png";

function Details() {
  const { id } = useParams();

  // State to hold the movie data, cast list, videos, and similar movies
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    // Fetch the main movie details using the ID from the URL
    getMovieDetails(id).then((res) => setMovie(res.data));

    // Fetch the cast and limit it to the top 10 actors
    getMovieCredits(id).then((res) => setCast(res.data.cast.slice(0, 10)));

    // Fetch videos and filter to only show YouTube trailers
    getMovieVideos(id).then((res) => {
      const trailers = res.data.results.filter((v) => v.site === "YouTube");
      setVideos(trailers.slice(0, 2));
    });

    // Fetch suggested movies based on the current movie
    getSimilarMovies(id).then((res) => setSimilar(res.data.results));
  }, [id]);

  // Show a loading state until the main movie data is fetched
  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="details-page">
      <Header />

      {/* The large backdrop image at the top of the page */}
      <div
        className="details-backdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="backdrop-gradient"></div>
      </div>

      {/* Main content container that overlaps the backdrop */}
      <div className="details-content">
        {/* Top section containing poster, info, and ratings */}
        <div className="details-top">
          {/* Movie Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="details-poster"
          />

          {/* Movie Title, Tags, and Overview */}
          <div className="details-info">
            <h1>
              {movie.title}{" "}
              <span className="year">
                ({movie.release_date?.split("-")[0]})
              </span>
            </h1>

            <div className="details-tags">
              <span>Movie</span>
              {(movie.genres || []).map((g) => (
                <span key={g.id}>{g.name}</span>
              ))}
            </div>

            <p className="details-runtime">⏱ {movie.runtime} min</p>
            <p className="details-overview">{movie.overview}</p>
          </div>

          {/* Sidebar Ratings Box */}
          <div className="details-sidebar">
            <div className="ratings-box">
              <h3>Ratings</h3>

              {/* IMDb Rating Row */}
              <div className="rating-row">
                <img src={imdbLogo} alt="IMDb" className="rating-logo" />
                <span>{movie.vote_average}/10</span>
              </div>

              {/* Rotten Tomatoes Rating Row */}
              <div className="rating-row">
                <img
                  src={rtLogo}
                  alt="Rotten Tomatoes"
                  className="rating-logo"
                />
                <span>93%</span>
              </div>

              {/* Format Badges (SD, HD, 4K, 8K) */}
              <div className="format-tags">
                <span>SD</span>
                <span>HD</span>
                <span className="outline">4K</span>
                <span className="outline gold">8K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="details-section">
          <h2>Cast</h2>
          <div className="cast-row">
            {cast.map((person) => (
              <div key={person.id} className="cast-card">
                {/* Check if the actor has a profile picture */}
                {person.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                    alt={person.name}
                  />
                ) : (
                  <div className="no-photo"></div>
                )}
                <h4>{person.name}</h4>
                <p>{person.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Videos Section (Only renders if videos exist) */}
        {videos.length > 0 && (
          <div className="details-section">
            <h2>Videos</h2>
            <div className="video-row">
              {videos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="video-card"
                >
                  {/* YouTube thumbnail image */}
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                    alt={video.name}
                  />
                  <div className="video-overlay">
                    <span>▶ {video.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Movies Row (Only renders if similar movies exist) */}
        {similar.length > 0 && (
          <div className="details-section">
            <MovieRow title="Suggested Movies" movies={similar} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Details;
