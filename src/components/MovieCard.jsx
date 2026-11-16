import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  if (!movie.poster_path) return null;

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
    </Link>
  );
}

export default MovieCard;
