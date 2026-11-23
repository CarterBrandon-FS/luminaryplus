import { useState, useEffect, useRef } from "react";
import {
  FaCog,
  FaUserCircle,
  FaMicrophone,
  FaSearch,
  FaAngleDown,
} from "react-icons/fa";
import NotificationBell from "./NotificationBell";
import { Link, useNavigate, useLocation } from "react-router-dom";
import appLogo from "../assets/LuminaryLogov2.png";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropBoxOpen, setIsDropBoxOpen] = useState(false);
  const dropBoxRef = useRef(null);
  const navigateSearch = useNavigate();
  const readLocation = useLocation();

  //  the dropdown menu box that shows up when you click the down arrow that will close when you click outside the box

  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropBoxRef.current && !dropBoxRef.current.contains(event.target)) {
        setIsDropBoxOpen(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // the search bar that will show up when you click the search icon and will stay open after the search ahs been made or the page changes

  useEffect(() => {
    const params = new URLSearchParams(readLocation.search);
    setSearchQuery(params.get("query") || "");
  }, [readLocation.search]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    const searchTerm = searchQuery.trim();
    if (searchTerm) {
      navigateSearch(`/search?query=${encodeURLComponent(searchTerm)}`);
    }
  }

  // the navbar that will show up at the top of the page and will have the search bar and logo and the respective icons, the dropdown menu

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={appLogo} alt="Luminary logo" />
        </Link>
      </div>

      {/* the dropbox menu button that appears when you click the arrow */}
      <div className="navbar-menu" ref={dropBoxRef}>
        <button
          className="navbar-menu-btn"
          onClick={() => setIsDropBoxOpen(!isDropBoxOpen)}
        >
          {readLocation.pathname === "/kids"
            ? "Kids"
            : readLocation.pathname === "/series"
              ? "Series"
              : "Movies"}
          <FaAngleDown className="dropdown-arrow" />
        </button>

        {isDropBoxOpen && (
          <div className="navbar-menu-dropdown">
            <Link
              to="/series"
              className="dropbox-item"
              onClick={() => setIsDropBoxOpen(false)}
            >
              Series
            </Link>
            <Link
              to="/kids"
              className="dropbox-item"
              onClick={() => setIsDropBoxOpen(false)}
            >
              Kids
            </Link>
          </div>
        )}
      </div>

      {/* Form field area for the text in the search input area */}

      <form className="search-form" onSubmit={handleSearchSubmit} role="search">
        {/* Search icon will have functions like a button*/}
        <button type="submit" className="search-sub-btn" aria-label="Search">
          <FaSearch className="search-icon" aria-hidden="true" />
        </button>

        <input
          type="search"
          placeholder="Search Movies, Series, Actors, Directors, etc."
          aria-label="Search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        {/* the microphone icon will be placed at the end of the search pill */}
        <FaMicrophone className="mic-icon" aria-hidden="true" />
      </form>

      {/* Login sign up button thats placed on the end of the navbar */}
      <div className="user-action">
        <button className="signup-btn">Sign Up</button>
        <button className="login-btn">Login</button>
        <FaUserCircle className="user-icon" />
        <NotificationBell />
        {/* Link it to the settings page */}
        <Link to="/settings" className="settings-icon-link">
          <FaCog className="settings-icon" />
        </Link>
      </div>
    </header>
  );
}
export default Navbar;
