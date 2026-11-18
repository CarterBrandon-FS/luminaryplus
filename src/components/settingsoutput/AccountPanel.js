import { FaLock, FaTv, FaUser } from "react-icons/fa";
import SettingsRow from "../components/settingsoutput/SettingsRow";

function AccountPanel() {
  return (
    <section className="settings-panel settings-account-panel">
      <h2>Account</h2>
      <SettingsRow icon={<FaUser />} label="Name" value="Add your name" />
      <SettingsRow icon={<FaUser />} label="Email" value="Add your email" />
      <SettingsRow
        icon={<FaLock />}
        label="Phone number"
        value="Add a phone number"
      />

      <h2 className="settings-subheading">Membership</h2>
      <SettingsRow
        icon={<FaTv />}
        label="Current plan"
        value="View your membership"
        action="Manage"
      />
      <SettingsRow
        icon={<FaTv />}
        label="Billing details"
        value="Manage payment details"
      />

      <h2 className="settings-subheading">Security</h2>
      <SettingsRow
        icon={<FaLock />}
        label="Password"
        value="Keep your account secure"
        action="Change"
      />
      <SettingsRow
        icon={<FaLock />}
        label="Two-step verification"
        value="Extra sign-in protection"
        action="Manage"
      />

      <h2 className="settings-subheading">Devices</h2>
      <SettingsRow
        icon={<FaTv />}
        label="Your devices"
        value="Review devices signed in"
        action="Manage"
      />
      <SettingsRow
        icon={<FaTv />}
        label="Playback settings"
        value="Choose your viewing preferences"
      />
    </section>
  );
}

export default AccountPanel;
