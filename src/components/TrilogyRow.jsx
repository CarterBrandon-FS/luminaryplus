import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function TrilogyRow({ title, collections = [], loading = false }) {
  const [expandedId, setExpandedId] = useState(null);
  const scrollRef = useRef(null);
  const contentWrapperRef = useRef(null);

  // Close the expanded trilogy when the user clicks outside the poster
  // scroll area, or presses Escape.
  useEffect(() => {
    if (expandedId === null) return;

    function handleOutsideClick(event) {
      if (
        contentWrapperRef.current &&
        !contentWrapperRef.current.contains(event.target)
      ) {
        setExpandedId(null);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setExpandedId(null);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedId]);

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

      {loading && <p className="trilogy-status">Loading trilogies...</p>}

      {!loading && (
        <div className="row-wrapper">
          <button
            className="row-arrow left"
            type="button"
            onClick={() => scrollRow(-600)}
            aria-label="Scroll trilogies left"
          >
            <FaChevronLeft />
          </button>

          <div
            className="row-content trilogy-scroll"
            ref={(node) => {
              // One ref callback feeds both refs:
              // scrollRef for the arrow scrollBy, contentWrapperRef for the
              // outside-click detection.
              scrollRef.current = node;
              contentWrapperRef.current = node;
            }}
          >
            {collections.map((collection) => {
              const expanded = expandedId === collection.id;
              const movies = [...(collection.parts || [])].sort((a, b) =>
                (a.release_date || "").localeCompare(b.release_date || ""),
              );

              return (
                <div
                  key={collection.id}
                  className={`trilogy-group ${expanded ? "expanded" : ""}`}
                  onClick={(event) => {
                    if (expanded && event.target.closest("a")) return;
                    setExpandedId(expanded ? null : collection.id);
                  }}
                >
                  {movies.map((movie, index) => (
                    <Link
                      to={`/movie/${movie.id}`}
                      key={movie.id}
                      className={`trilogy-card card-${index}`}
                      onClick={(event) => {
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

          <button
            className="row-arrow right"
            type="button"
            onClick={() => scrollRow(600)}
            aria-label="Scroll trilogies right"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default TrilogyRow;
