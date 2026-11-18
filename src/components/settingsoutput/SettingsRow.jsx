function SettingsRow({ icon, label, value, action = "Edit" }) {
  return (
    <div className="settings-row">
      <div className="settings-row-label">
        <span className="settings-row-icon">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="settings-row-value">{value}</span>
      <button className="settings-small-button" type="button">
        {action}
      </button>
    </div>
  );
}

export default SettingsRow;
