import { FaUser } from "react-icons/fa";

// Intro to the settings panel
function SettingsIntro() {
  return (
    <section className="settings-intro">
      <div className="settings-intro-mark" aria-hidden="true">
        <FaUser />
      </div>
      <div>
        <p className="settings-eyebrow">YOUR PROFILE</p>
        <h1>Manage Your Account</h1>
        <p>Update your details, subscriptions, and more.</p>
      </div>
    </section>
  );
}

export default SettingsIntro;
