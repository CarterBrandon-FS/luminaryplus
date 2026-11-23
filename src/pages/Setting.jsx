import { useEffect, useState } from "react";
import { getTrending } from "../utils/TMDB";
import SettingsIntro from "../components/settingsoutput/SettingsIntro";
import AccountPanel from "../components/settingsoutput/AccountPanel";
import FaqSection from "../components/settingsoutput/FaqSection";
import SupportSection from "../components/settingsoutput/SupportSection";
import SettingsTrialBanner from "../components/settingsoutput/SettingsTrialBanner";
import Footer from "../components/Footer";
import "../styles/Setting.css";

// console.log(
//   "SettingsIntro:",
//   typeof SettingsIntro,
//   Array.isArray(SettingsIntro),
//   "AccountPanel:",
//   typeof AccountPanel,
//   Array.isArray(AccountPanel),
//   "FaqSection:",
//   typeof FaqSection,
//   Array.isArray(FaqSection),
//   "SupportSection:",
//   typeof SupportSection,
//   Array.isArray(SupportSection),
//   "SettingsTrialBanner:",
//   typeof SettingsTrialBanner,
//   Array.isArray(SettingsTrialBanner),
// );

function Setting() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    // Load movie images from TMDB for the support artwork and banner.
    getTrending()
      .then((response) => setPosters(response.data.results.slice(0, 8)))
      .catch((error) => console.log("Could not load trending images:", error));
  }, []);

  return (
    <>
      <main className="settings-page">
        <SettingsIntro />
        <AccountPanel />
        <FaqSection />
        <SupportSection posters={posters} />
        <SettingsTrialBanner posters={posters} />
      </main>

      {/* <Footer /> */}
    </>
  );
}

export default Setting;
