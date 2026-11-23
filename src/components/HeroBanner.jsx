import { Link } from "react-router-dom";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function HeroBanner({ movies }) {
  const scrollRef = useRef(null);
  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];
  const scrollMovies = movies.slice(0, 15);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Helper to get the correct path
  const getPath = (item) => {
    const isTv = item.name && !item.title;
    return isTv ? `/tv/${item.id}` : `/movie/${item.id}`;
  };

  return (
    <div className="hero-container">
      <div
        className="hero-background-img"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${mainMovie.backdrop_path})`,
        }}
      >
        <div className="hero-gradient-overlay"></div>

        <div className="hero-text">
          <h1>{mainMovie.title || mainMovie.name}</h1>
          <br />
          <p>{mainMovie.vote_average}/10</p>
          {/* Make the Watch Now button a link too! */}
          <Link to={getPath(mainMovie)}>
            <button className="btn-watch">Watch Now</button>
          </Link>
        </div>
      </div>

      <button className="hero-arrow left" onClick={scrollLeft}>
        <FaChevronLeft />
      </button>
      <button className="hero-arrow right" onClick={scrollRight}>
        <FaChevronRight />
      </button>

      <div className="hero-scroll-row" ref={scrollRef}>
        {scrollMovies.map((movie) => (
          <Link
            to={getPath(movie)} // <--- THIS IS THE FIX
            key={movie.id}
            className="hero-poster-card"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HeroBanner;
