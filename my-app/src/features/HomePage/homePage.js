import React from "react";
import { Link } from "react-router-dom";
import aboutImage from "../images/about.png";
import activityLandImage from "../images/physicsuniversity.png";
import howItWorksImage from "../images/how-it-works.png";
import meetTheTeamImage from "../images/meet-the-team.png";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-pics">
        <div className="row">
          <div className="home-pic white-bg">
            <Link to="/about" className="picture-link">
              <p className="picture-tag">About</p>
              <img id="About-pic" src={aboutImage} alt="About" />
            </Link>
          </div>
          <div className="home-pic white-bg">
            <Link to="/meettheteam" className="picture-link">
              <p className="picture-tag">Meet The Team</p>
              <img src={meetTheTeamImage} alt="Meet the Team" />
            </Link>
          </div>
          <div className="home-pic white-bg">
            <Link to="/howitworks" className="picture-link">
              <p className="picture-tag">How it Works</p>
              <img id="HTW-pic" src={howItWorksImage} alt="How It Works" />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="home-picAL">
            <Link to="/activityland" className="picture-link">
              <img src={activityLandImage} alt="Activity Land Home" id="AL" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
