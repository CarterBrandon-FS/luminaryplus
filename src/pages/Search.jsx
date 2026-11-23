import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getMovieSearch, getMovieRecommendations } from "../utils/TMDB";
import "../styles/Dashboard.css";
import "../styles/Search.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCurrentSearch = true;

    async function searchForMovies() {
      setMovies([]);
      setRecommendedMovies([]);
      setError(false);

      if (!query.trim()) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Search movie titles with the text from the navigation search box.
        const response = await getMovieSearch(query);
        const searchResults = (response.data.results || []).filter(
          (movie) => movie.poster_path,
        );

        if (!isCurrentSearch) return;
        setMovies(searchResults);

        // Use TMDB recommendations for the first search result.
        if (searchResults.length > 0) {
          try {
            const recommendationResponse = await getMovieRecommendations(
              searchResults[0].id,
            );
            const recommendations = (
              recommendationResponse.data.results || []
            ).filter((movie) => movie.poster_path);

            if (isCurrentSearch) {
              setRecommendedMovies(recommendations);
            }
          } catch {
            // Search results can still be shown if recommendations fail.
            setRecommendedMovies([]);
          }
        }
      } catch {
        if (isCurrentSearch) setError(true);
      } finally {
        if (isCurrentSearch) setLoading(false);
      }
    }

    searchForMovies();

    return () => {
      isCurrentSearch = false;
    };
  }, [query]);

  const bannerMovies =
    recommendedMovies.length > 0
      ? recommendedMovies.slice(0, 18)
      : movies.slice(0, 18);
  const bannerImage = movies[0]?.backdrop_path;

  function renderMovieCards(movieList) {
    return movieList.map((movie) => (
      <Link
        className="search-movie-card"
        to={`/movie/${movie.id}`}
        key={movie.id}
      >
        <img src={`${IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
      </Link>
    ));
  }

  return (
    <div className="search-page">
      {/* <Header /> */}

      <main className="search-content">
        {query && (
          <h1 className="search-heading">
            Results with your search: <strong>“{query}”</strong>
          </h1>
        )}

        {!query && (
          <p className="search-message">
            Search for a movie using the box above.
          </p>
        )}

        {loading && <p className="search-message">Searching TMDB...</p>}

        {error && (
          <p className="search-message">
            Search could not load. Check your TMDB token and try again.
          </p>
        )}

        {!loading && !error && query && movies.length === 0 && (
          <p className="search-message">No movies matched “{query}”.</p>
        )}

        {movies.length > 0 && (
          <section className="search-section">
            <div className="search-movie-grid">{renderMovieCards(movies)}</div>
          </section>
        )}

        {recommendedMovies.length > 0 && (
          <section className="search-section recommended-section">
            <h2>Recommended titles as search results:</h2>
            <div className="search-movie-grid">
              {renderMovieCards(recommendedMovies)}
            </div>
          </section>
        )}

        <section
          className="search-trial-banner"
          style={
            bannerImage
              ? {
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${bannerImage})`,
                }
              : {}
          }
        >
          <div className="search-trial-poster-grid" aria-hidden="true">
            {bannerMovies.map((movie) => (
              <img
                key={movie.id}
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt=""
              />
            ))}
          </div>
          <div className="search-trial-shade" />
          <div className="search-trial-copy">
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

export default Search;
