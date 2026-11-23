import { useEffect, useState } from "react";
import { getAdultTvShows, getTrending } from "../utils/TMDB";
import HeroBanner from "../components/HeroBanner";
import MovieRow from "../components/MovieRow";
import "../styles/Dashboard.css";

function Series() {
  const [tvShows, setTvShows] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  //   set a react state just in case the request fails from the api
  const [apiError, setApiError] = useState(false);

  // getAdultTvShows actually means "TV that isn't kids" — that's the
  // series list we want here.
  useEffect(() => {
    getAdultTvShows()
      .then((res) => setTvShows(res.data.results || []))
      .catch(() => setApiError(true));

    // Trending movies double as hero banners for visual interest.
    getAdultTvShows()
      .then((res) => setTrendingSeries(res.data.results || []))
      .catch(() => setApiError(true));
  }, []);

  return (
    <div className="dashboard-page">
      {trendingSeries.length > 0 && <HeroBanner movies={trendingSeries} />}

      <div className="dashboard-content">
        {apiError && (
          <p className="api-message">
            Some series could not load. Check again later.
          </p>
        )}

        {/* Same deal as Kids — no trilogy row on this page. */}
        <MovieRow title="Popular Series" movies={tvShows} limit={15} />
      </div>
    </div>
  );
}

export default Series;
