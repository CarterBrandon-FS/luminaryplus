import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaCog,
  FaUserCircle,
  FaAngleDown,
  FaMicrophone,
} from "react-icons/fa";
import movieLogo from "../assets/movieLogov2.png";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

      <div className="search-area">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search..." />
        <FaMicrophone className="mic-icon" />
      </div>

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
