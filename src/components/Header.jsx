import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaCog,
  FaUserCircle,
  FaAngleDown,
  FaMicrophone,
} from "react-icons/fa";
import movieLogo from "../assets/luminaryLogov2.png";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //   Keep the search box showing the current search after the page changes.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchText(params.get("query") || "");
  }, [location.search]);

  function handleSearch(event) {
    event.preventDefault();
    const params = new URLSearchParams(location.search);
    params.set("query", searchText);

    if (query) {
      navigate(`/search?query=${encodedURLComponent(query)}`);
    }
  }

  return (
    <header className="top-nav">
      <div className="logo-area">
        <Link to="/">
          <img src={movieLogo} alt="Luminary+" className="logo-img" />
        </Link>
      </div>

      {/* Dropdown Menu */}
      <div className="nav-links" ref={dropdownRef}>
        <button
          className="nav-pill"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Movies <FaAngleDown className="dropdown-arrow" />
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link
              to="/series"
              className="dropdown-item"
              onClick={() => setIsDropdownOpen(false)}
            >
              Series
            </Link>
            <Link
              to="/kids"
              className="dropdown-item"
              onClick={() => setIsDropdownOpen(false)}
            >
              Kids
            </Link>
          </div>
        )}
      </div>

      <form className="search-area" onSubmit={handleSearch} role="search">
        <FaSearch className="search-icon" aria-hidden="true" />

        <input
          type="search"
          placeholder="Search Movies, Series, Kids..."
          aria-label="Search movies"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <FaMicrophone className="mic-icon" aria-hidden="true" />
      </form>

      {/* <div className="search-area">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search..." />
        <FaMicrophone className="mic-icon" />
      </div>

      /* replace previous with this form above */}

      <div className="user-actions">
        <button className="btn-login">Login</button>
        <button className="btn-signup">Sign Up</button>
        <FaUserCircle className="icon" />
        <FaBell className="icon" />
        <FaCog className="icon" />
      </div>
    </header>
  );
}
export default Header;
