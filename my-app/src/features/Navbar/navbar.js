import React from "react";
import { Link } from "react-router-dom";
import logo from "../Navbar/logo.png";
import "../style.css"; // Import the CSS file

const Navbar = () => {
  return (
    <div className="navbar-container">
      <img className="logo" src={logo} alt="Logo" />
      <nav className="nav">
        <div className="nav-links">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/meettheteam" className="nav-link">Meet The Team</Link>
          <Link to="/howitworks" className="nav-link">How It Works</Link>
          <Link to="/activityland" className="nav-link">Activity Land</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
