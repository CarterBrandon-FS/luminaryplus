import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import popcornImg from "../assets/popcornV2.png";
import movieLogo from "../assets/movieLogov2.png";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-logo">
          {/* Make the logo take you to the homepage */}
          <Link to="/">
            <img src={movieLogo} alt="Luminary+" className="logo-img" />
          </Link>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Home</h4>
            {/* Add links to these so it makes it functional */}
            <Link to="/">Categories</Link>
            <Link to="/subscriptions">Subscriptions</Link>
            <Link to="/settings">Devices</Link>
            <Link to="/subscriptions">Pricing</Link>
            <Link to="/settings">FAQ</Link>
          </div>
          <div className="footer-column">
            <h4>Movies</h4>
            {/* No dedicated genre pages yet, so these run a search instead. */}
            <Link to="/search?query=action">Genres</Link>
            <Link to="/search?query=popular">Trending</Link>
            <Link to="/search?query=new">New Releases</Link>
            <Link to="/search?query=popular">Popular</Link>
          </div>
          <div className="footer-column">
            <h4>Shows</h4>
            {/* Series/kids pages now exist, so send people there. */}
            <Link to="/series">Genres</Link>
            <Link to="/series">Trending</Link>
            <Link to="/series">New Releases</Link>
            <Link to="/kids">Popular</Link>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <Link to="/settings">Contact Us</Link>
            <Link to="/settings">Return Policy</Link>
          </div>

          <div className="footer-column">
            <h4>Connect With Us</h4>
            {/* Social links stay as normal external links — not React Router. */}
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="no-referrer"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="no-referrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="no-referrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="no-referrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        {/* use emoji for the copyrigth */}

        <p>©️2026 Luminary+. All Rights Reserved.</p>
        <div className="footer-legal">
          <span>Terms Of Use</span>
          <span>Privacy Policy</span>
          <span>Cookie Policy</span>
        </div>
      </div>

      <div className="popcorn-border">
        <img src={popcornImg} alt="Popcorn" />
      </div>
    </footer>
  );
}
export default Footer;
