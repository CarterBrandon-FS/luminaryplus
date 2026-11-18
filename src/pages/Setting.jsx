import { useEffect, useState } from "react";
import { getTrending } from "../utils/TMDB";
import SettingsIntro from "../components/settingsoutput/SettingsIntro";
import AccountPanel from "../components/settingsoutput/AccountPanel";
import FaqSection from "../components/settingsoutput/FaqSection";
import SupportSection from "../components/settingsoutput/SupportSection";
import SettingsTrialBanner from "../components/settingsoutput/SettingsTrialBanner";
import "../styles/Setting.css";

function Setting() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    // Load movie images from TMDB for the support artwork and banner.
    getTrending()
      .then((response) => setPosters(response.data.results.slice(0, 8)))
      .catch((error) => console.log("Could not load trending images:", error));
  }, []);

  return (
    <main className="settings-page">
      <SettingsIntro />
      <AccountPanel />
      <FaqSection />
      <SupportSection posters={posters} />
      <SettingsTrialBanner posters={posters} />
    </main>
  );
}

export default Setting;
