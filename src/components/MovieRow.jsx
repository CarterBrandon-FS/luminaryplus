import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";

function MovieRow({ title, movies, limit }) {
  const scrollRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <div className="movie-row">
      <div className="row-header">
        <h3>{title}</h3>
      </div>

      <div className="row-wrapper">
        <button className="row-arrow left" onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div className="row-content" ref={scrollRef}>
          {movies.slice(0, limit || movies.length).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button className="row-arrow right" onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default MovieRow;
