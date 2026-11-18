import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import popcornImg from "../assets/popcornV2.png";
import movieLogo from "../assets/movieLogov2.png";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={movieLogo} alt="Luminary+" className="logo-img" />
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Home</h4>
            <p>Categories</p>
            <p>Subscriptions</p>
            <p>Devices</p>
            <p>Pricing</p>
            <p>FAQ</p>
          </div>
          <div className="footer-column">
            <h4>Movies</h4>
            <p>Genres</p>
            <p>Trending</p>
            <p>New Releases</p>
            <p>Popular</p>
          </div>
          <div className="footer-column">
            <h4>Shows</h4>
            <p>Genres</p>
            <p>Trending</p>
            <p>New Releases</p>
            <p>Popular</p>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <p>Contact Us</p>
            <p>Return Policy</p>
          </div>
          <div className="footer-column">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>©2026 Luminary+. All Rights Reserved.</p>
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
