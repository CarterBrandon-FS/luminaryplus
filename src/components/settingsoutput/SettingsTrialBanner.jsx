import { Link } from "react-router-dom";

const imageBase = "https://image.tmdb.org/t/p/w500";

function SettingsTrialBanner({ posters }) {
  const backgroundPoster = posters[0]?.backdrop_path || posters[0]?.poster_path;

  return (
    <section
      className="settings-trial-banner"
      style={
        backgroundPoster
          ? { backgroundImage: `url(${imageBase}${backgroundPoster})` }
          : undefined
      }
    >
      <div className="settings-trial-shade" />
      <div className="settings-trial-copy">
        <h2>Start your free trial today!</h2>
        <p>Find your next favorite movie or show on Luminary+.</p>
        <Link to="/subscriptions" className="settings-primary-button">
          Start Trial
        </Link>
      </div>
    </section>
  );
}

export default SettingsTrialBanner;
