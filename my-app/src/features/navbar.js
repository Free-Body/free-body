import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav>
        <link rel="icon" href="../public/logo.png" />
        <div>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/meettheteam">Meet The Team</Link>
          <Link to="/howitworks">How It Works</Link>
          <Link to="/activityland">Activity Land</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
