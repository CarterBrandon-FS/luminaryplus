import { Link } from "react-router-dom";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function HeroBanner({ movies }) {
  const scrollRef = useRef(null);
  if (!movies || movies.length === 0) return null;

  // The background image
  const mainMovie = movies[0];
  // The posters in the slider
  const scrollMovies = movies.slice(0, 15);

  //   Scroll effect
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

  return (
    <div className="hero-container">
      {/* 1. The Giant Background Image */}
      <div
        className="hero-background-img"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${mainMovie.backdrop_path})`,
        }}
      >
        <div className="hero-gradient-overlay"></div>

        {/* Optional: The main title text */}
        <div className="hero-text">
          <h1>{mainMovie.title}</h1>
          <br />
          <p>{mainMovie.vote_average}/10</p>
          <button className="btn-watch">Watch Now</button>
        </div>
      </div>

      {/* Add the arrow icons */}
      <button className="hero-arrow left" onClick={scrollLeft}>
        <FaChevronLeft />
      </button>
      <button className="hero-arrow right" onClick={scrollRight}>
        <FaChevronRight />
      </button>

      {/* 2. The Scrolling Posters on top */}
      <div className="hero-scroll-row" ref={scrollRef}>
        {scrollMovies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="hero-poster-card"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HeroBanner;
