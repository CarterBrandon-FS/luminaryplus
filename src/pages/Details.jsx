import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark, FaShareAlt, FaStar } from "react-icons/fa";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMovieImages,
  getSimilarMovies,
} from "../utils/TMDB";
import MovieRow from "../components/MovieRow";
import "../styles/Dashboard.css";
import "../styles/Details.css";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/";

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");
  const [videos, setVideos] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCurrentPage = true;

    async function loadMovie() {
      setLoading(true);
      setError(false);
      setMovie(null);
      setCast([]);
      setDirector("");
      setVideos([]);
      setPhotos([]);
      setSimilarMovies([]);
      setIsSaved(false);

      // Each request comes from TMDB. If one optional section fails, the page
      // can still show the movie and the sections that did load.
      const results = await Promise.allSettled([
        getMovieDetails(id),
        getMovieCredits(id),
        getMovieVideos(id),
        getMovieImages(id),
        getSimilarMovies(id),
      ]);

      if (!isCurrentPage) return;

      const [
        detailsResult,
        creditsResult,
        videosResult,
        imagesResult,
        similarResult,
      ] = results;

      if (detailsResult.status === "rejected") {
        setError(true);
        setLoading(false);
        return;
      }

      const movieData = detailsResult.value.data;
      setMovie(movieData);

      if (creditsResult.status === "fulfilled") {
        setCast((creditsResult.value.data.cast || []).slice(0, 8));
        const movieDirector = (creditsResult.value.data.crew || []).find(
          (person) => person.job === "Director",
        );
        setDirector(movieDirector ? movieDirector.name : "");
      }

      if (videosResult.status === "fulfilled") {
        const trailers = (videosResult.value.data.results || []).filter(
          (video) =>
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser"),
        );
        setVideos(trailers.slice(0, 2));
      }

      if (imagesResult.status === "fulfilled") {
        const backdrops = imagesResult.value.data.backdrops || [];
        setPhotos(
          backdrops
            .filter((photo) => photo.file_path !== movieData.backdrop_path)
            .slice(0, 8),
        );
      }

      if (similarResult.status === "fulfilled") {
        setSimilarMovies(
          (similarResult.value.data.results || [])
            .filter((similarMovie) => similarMovie.poster_path)
            .slice(0, 15),
        );
      }

      setLoading(false);
    }

    loadMovie();

    return () => {
      isCurrentPage = false;
    };
  }, [id]);

  async function shareMovie() {
    if (navigator.share) {
      await navigator.share({ title: movie.title, url: window.location.href });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
    }
  }

  if (loading) {
    return <div className="details-message">Loading movie details...</div>;
  }

  if (error || !movie) {
    return (
      <div className="details-message">
        <p>We could not load this movie.</p>
        <p>Check your TMDB token and try again.</p>
      </div>
    );
  }

  const releaseYear = movie.release_date ? movie.release_date.slice(0, 4) : "";
  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_URL}original${movie.backdrop_path}`
    : "";

  return (
    <div className="details-page">
      {/* <Header /> */}

      <section
        className="details-hero"
        style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}
        aria-label={`${movie.title} backdrop`}
      >
        <div className="details-hero-shade" />
      </section>

      <main className="details-content">
        <section className="movie-overview-layout">
          <aside className="movie-poster-column">
            {movie.poster_path && (
              <img
                className="details-poster"
                src={`${TMDB_IMAGE_URL}w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
            )}

            <div className="movie-rating-card">
              <h2>Ratings</h2>
              <p>
                <FaStar aria-hidden="true" />
                <span>TMDB</span>
                <strong>
                  {Number(movie.vote_average || 0).toFixed(1)} / 10
                </strong>
              </p>
              <p>
                <span>Votes</span>
                <strong>
                  {Number(movie.vote_count || 0).toLocaleString()}
                </strong>
              </p>
            </div>
          </aside>

          <section className="movie-info-column">
            <div className="movie-action-buttons">
              <button
                type="button"
                className={isSaved ? "movie-action active" : "movie-action"}
                onClick={() => setIsSaved(!isSaved)}
                aria-pressed={isSaved}
              >
                <FaBookmark aria-hidden="true" />
                <span>{isSaved ? "Saved" : "Watchlist"}</span>
              </button>
              <button
                type="button"
                className="movie-action"
                onClick={shareMovie}
                aria-label="Share this movie"
              >
                <FaShareAlt aria-hidden="true" />
              </button>
            </div>

            <div className="movie-title-card">
              <div className="movie-title-line">
                <h1>{movie.title}</h1>
                {releaseYear && <span>{releaseYear}</span>}
              </div>

              <div className="movie-genres">
                {(movie.genres || []).map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>

              <p className="movie-meta">
                {movie.runtime ? `${movie.runtime} min` : "Runtime unavailable"}
                {movie.original_language &&
                  ` · ${movie.original_language.toUpperCase()}`}
              </p>
            </div>

            <div className="movie-facts-card">
              {director && (
                <p>
                  <strong>Director</strong>
                  <span>{director}</span>
                </p>
              )}
              <p>
                <strong>Release date</strong>
                <span>{movie.release_date || "Not available"}</span>
              </p>
              {movie.budget > 0 && (
                <p>
                  <strong>Budget</strong>
                  <span>${movie.budget.toLocaleString()}</span>
                </p>
              )}
              {movie.revenue > 0 && (
                <p>
                  <strong>Revenue</strong>
                  <span>${movie.revenue.toLocaleString()}</span>
                </p>
              )}
            </div>

            <div className="movie-description-card">
              <h2>Overview</h2>
              <p>
                {movie.overview || "No overview is available for this movie."}
              </p>
            </div>
          </section>

          <aside className="cast-column">
            <h2>Cast</h2>
            {cast.map((person) => (
              <article
                className="cast-person"
                key={person.cast_id || person.id}
              >
                {person.profile_path ? (
                  <img
                    src={`${TMDB_IMAGE_URL}w185${person.profile_path}`}
                    alt={person.name}
                  />
                ) : (
                  <div className="cast-photo-empty" aria-hidden="true" />
                )}
                <div>
                  <h3>{person.name}</h3>
                  <p>{person.character}</p>
                </div>
              </article>
            ))}
          </aside>
        </section>

        {videos.length > 0 && (
          <section className="details-section">
            <h2>Videos</h2>
            <div className="details-video-row">
              {videos.map((video) => (
                <a
                  className="details-video-card"
                  href={`https://www.youtube.com/watch?v=${video.key}`}
                  target="_blank"
                  rel="noreferrer"
                  key={video.id}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                    alt={video.name}
                  />
                  <span>▶ {video.name}</span>
                </a>
              ))}
            </div>
            <h3 className="details-subheading">Trailers</h3>
          </section>
        )}

        <section className="details-section">
          <h2>Photos</h2>
          {photos.length > 0 ? (
            <div className="details-photo-grid">
              {photos.map((photo) => (
                <a
                  href={`${TMDB_IMAGE_URL}original${photo.file_path}`}
                  target="_blank"
                  rel="noreferrer"
                  key={photo.file_path}
                >
                  <img
                    src={`${TMDB_IMAGE_URL}w500${photo.file_path}`}
                    alt={`${movie.title} scene`}
                  />
                </a>
              ))}
            </div>
          ) : (
            <p className="no-movie-photos">
              No photos are available from TMDB for this movie.
            </p>
          )}
        </section>

        {similarMovies.length > 0 && (
          <section className="details-section suggested-section">
            <MovieRow
              title="Suggested Movies"
              movies={similarMovies}
              limit={15}
            />
          </section>
        )}

        <section
          className="details-trial-banner"
          style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}
        >
          <div className="trial-poster-grid" aria-hidden="true">
            {similarMovies.slice(0, 12).map((similarMovie) => (
              <img
                key={similarMovie.id}
                src={`${TMDB_IMAGE_URL}w342${similarMovie.poster_path}`}
                alt=""
              />
            ))}
          </div>
          <div className="trial-banner-shade" />
          <div className="trial-banner-copy">
            <h2>Start your free trial today!</h2>
            <p>Explore movies and shows with Luminary+.</p>
            <button type="button">Start Trial</button>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default Details;
