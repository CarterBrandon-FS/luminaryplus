import { useEffect, useState } from "react";
import { getKidsMovies, getKidsTv } from "../utils/TMDB";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import "../styles/Dashboard.css";

function Kids() {
  const [kidsMovies, setKidsMovies] = useState([]);
  const [kidsTv, setKidsTv] = useState([]);
  //   set a react state just in case the request fails from the api
  const [apiError, setApiError] = useState(false);

  // Load both kids movie and kids TV lists. If one fails we still show the other.
  useEffect(() => {
    getKidsMovies()
      .then((res) => setKidsMovies(res.data.results || []))
      .catch(() => setApiError(true));

    getKidsTv()
      .then((res) => setKidsTv(res.data.results || []))
      .catch(() => setApiError(true));
  }, []);

  // Use the first kids movie as the big hero banner, like the dashboard does.
  return (
    <div className="dashboard-page">
      {kidsMovies.length > 0 && <HeroBanner movies={kidsMovies} />}

      <div className="dashboard-content">
        {apiError && (
          <p className="api-message">
            Some kids content could not load. Check your TMDB token.
          </p>
        )}

        {/* No trilogy row here on purpose — this page is kids stuff only. */}
        <MovieRow title="Kids Movies" movies={kidsMovies} limit={15} />
        <MovieRow title="Kids TV Shows" movies={kidsTv} limit={15} />
      </div>
    </div>
  );
}

export default Kids;
