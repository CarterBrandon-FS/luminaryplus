import { useState } from "react";

const imageBase = "https://image.tmdb.org/t/p/w500";

function SupportSection({ posters }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // This example shows confirmation but does not send the message to a server.
    setSent(true);
  }

  return (
    <>
      <section className="settings-panel settings-support">
        <div className="settings-support-art" aria-hidden="true">
          {posters
            .slice(0, 6)
            .map(
              (movie, index) =>
                movie.poster_path && (
                  <img
                    className={`support-art-card support-art-card-${index + 1}`}
                    key={movie.id}
                    src={`${imageBase}${movie.poster_path}`}
                    alt=""
                  />
                ),
            )}
        </div>
        <div className="settings-support-content">
          <h2>Contact Support</h2>
          <form className="settings-support-form" onSubmit={handleSubmit}>
            <label>
              <span>Your name</span>
              <input name="name" type="text" placeholder="Your name" required />
            </label>
            <label>
              <span>Email address</span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              <span>Topic</span>
              <select name="topic" defaultValue="account">
                <option value="account">Account help</option>
                <option value="membership">Membership</option>
                <option value="technical">Technical issue</option>
              </select>
            </label>
            <label>
              <span>Device</span>
              <input
                name="device"
                type="text"
                placeholder="What device are you using?"
              />
            </label>
            <label className="settings-message-field">
              <span>Message</span>
              <textarea
                name="message"
                placeholder="Tell us how we can help"
                rows="4"
                required
              />
            </label>
            <label className="settings-consent">
              <input type="checkbox" required />
              <span>I agree to be contacted about this support request.</span>
            </label>
            <div className="settings-submit-line">
              {sent && (
                <p role="status">
                  Your message is ready. Connect this form to your support
                  service to send it.
                </p>
              )}
              <button className="settings-primary-button" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SupportSection;
