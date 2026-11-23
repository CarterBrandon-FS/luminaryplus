import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  if (!movie.poster_path) return null;

  // If the object has a name intead of title its a tv show
  const isTvShow = movie.name && !movie.title;
  const linkPath = isTvShow ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  return (
    <Link to={linkPath} className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name}
      />
    </Link>
  );
}

export default MovieCard;
