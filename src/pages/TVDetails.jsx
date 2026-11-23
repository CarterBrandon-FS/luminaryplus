import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import {
  getTvDetails,
  getTvCredits,
  getTvVideos,
  getSimilarTv,
} from "../utils/TMDB";
import MovieRow from "../components/MovieRow";
import "../styles/Dashboard.css";
import "../styles/Details.css";

const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/";

function TVDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCurrentPage = true;

    async function loadShow() {
      setLoading(true);
      setError(false);

      const results = await Promise.allSettled([
        getTvDetails(id),
        getTvCredits(id),
        getTvVideos(id),
        getSimilarTv(id),
      ]);

      if (!isCurrentPage) return;

      const [detailsRes, creditsRes, videosRes, similarRes] = results;

      if (detailsRes.status === "rejected") {
        setError(true);
        setLoading(false);
        return;
      }

      setShow(detailsRes.value.data);

      if (creditsRes.status === "fulfilled") {
        setCast((creditsRes.value.data.cast || []).slice(0, 8));
      }

      if (videosRes.status === "fulfilled") {
        const trailers = (videosRes.value.data.results || []).filter(
          (v) =>
            v.site === "YouTube" &&
            (v.type === "Trailer" || v.type === "Teaser"),
        );
        setVideos(trailers.slice(0, 2));
      }

      if (similarRes.status === "fulfilled") {
        setSimilarShows(
          (similarRes.value.data.results || [])
            .filter((s) => s.poster_path)
            .slice(0, 15),
        );
      }

      setLoading(false);
    }

    loadShow();
    return () => {
      isCurrentPage = false;
    };
  }, [id]);

  if (loading)
    return <div className="details-message">Loading show details...</div>;
  if (error || !show)
    return <div className="details-message">We could not load this show.</div>;

  const backdropUrl = show.backdrop_path
    ? `${TMDB_IMAGE_URL}original${show.backdrop_path}`
    : "";

  return (
    <div className="details-page">
      <section
        className="details-hero"
        style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}
      >
        <div className="details-hero-shade" />
      </section>

      <main className="details-content">
        <section className="movie-overview-layout">
          <aside className="movie-poster-column">
            {show.poster_path && (
              <img
                className="details-poster"
                src={`${TMDB_IMAGE_URL}w500${show.poster_path}`}
                alt={`${show.name} poster`}
              />
            )}
            <div className="movie-rating-card">
              <h2>Ratings</h2>
              <p>
                <FaStar /> <span>TMDB</span>{" "}
                <strong>
                  {Number(show.vote_average || 0).toFixed(1)} / 10
                </strong>
              </p>
            </div>
          </aside>

          <section className="movie-info-column">
            <div className="movie-title-card">
              <div className="movie-title-line">
                <h1>{show.name}</h1>
                {show.first_air_date && (
                  <span>{show.first_air_date.slice(0, 4)}</span>
                )}
              </div>
              <div className="movie-genres">
                {(show.genres || []).map((g) => (
                  <span key={g.id}>{g.name}</span>
                ))}
              </div>
              <p className="movie-meta">
                {show.number_of_seasons} Seasons ·{" "}
                {show.original_language.toUpperCase()}
              </p>
            </div>

            <div className="movie-description-card">
              <h2>Overview</h2>
              <p>{show.overview || "No overview available."}</p>
            </div>
          </section>

          <aside className="cast-column">
            <h2>Cast</h2>
            {cast.map((person) => (
              <article className="cast-person" key={person.id}>
                {person.profile_path ? (
                  <img
                    src={`${TMDB_IMAGE_URL}w185${person.profile_path}`}
                    alt={person.name}
                  />
                ) : (
                  <div className="cast-photo-empty" />
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
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.key}`}
                  target="_blank"
                  rel="noreferrer"
                  className="details-video-card"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                    alt={video.name}
                  />
                  <span>▶ {video.name}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {similarShows.length > 0 && (
          <section className="details-section suggested-section">
            <MovieRow title="More Like This" movies={similarShows} limit={15} />
          </section>
        )}
      </main>
    </div>
  );
}

export default TVDetails;
