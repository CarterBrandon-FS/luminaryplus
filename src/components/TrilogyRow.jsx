import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function TrilogyRow({ title, collections = [], loading = false }) {
  // State to track which trilogy stack is currently expanded (clicked)
  const [expandedId, setExpandedId] = useState(null);
  //   scroll to use
  const scrollRef = useRef(null);

  function scrollRow(amount) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: amount,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="movie-row">
      <div className="row-header">
        <h3>{title}</h3>
      </div>

      <div className="row-content trilogy-scroll">
        {/* Show a loading message while the API calls are resolving */}
        {loading && <p style={{ color: "white" }}>Loading trilogies...</p>}

        {!loading &&
          collections.map((collection) => {
            // Check if this specific collection is the one we clicked on
            const expanded = expandedId === collection.id;

            // Sort the movies in the collection by release date so they stack in order
            // code helped by Mike Oston from linkedIn
            const movies = [...(collection.parts || [])].sort((a, b) =>
              (a.release_date || "").localeCompare(b.release_date || ""),
            );

            return (
              <div
                key={collection.id}
                // We add the "expanded" class here so CSS can trigger the animation
                className={`trilogy-group ${expanded ? "expanded" : ""}`}
                onClick={() => setExpandedId(expanded ? null : collection.id)}
              >
                {movies.map((movie, index) => (
                  <Link
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    // Notice we rely on the CSS classes (card-0, card-1, card-2)
                    // to handle the stacking, rather than inline styles.
                    className={`trilogy-card card-${index}`}
                    onClick={(event) => {
                      // If the stack isn't open yet, the first click should just open it,
                      // not navigate to the movie detail page.
                      if (!expanded) event.preventDefault();
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TrilogyRow;
