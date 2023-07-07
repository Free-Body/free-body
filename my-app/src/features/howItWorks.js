import React from "react";
import { Link } from "react-router-dom";
import "./howstyle.css";

const How = () => {
  return (
    <div className="howContainer">
      {/* <h1 id="how-head">How it Works</h1> */}
      <h2 id="how-header">Learn more about each of the following topics!</h2>
      <div className="howimages">
        <div className="image-wrapper">
          <Link to="/projectile-motion">
            <img
              id="boyimage"
              src={require("./images/projectiles.png")}
              alt="pizza"
            />
          <h2>Projectile Motion</h2>
          </Link>
        </div>
        <div className="image-wrapper">
          <Link to="/acceleration">
            <img
              id="speedometerimage"
              src={require("./images/acceleration.png")}
              alt="speedometer"
            />
          <h2>Acceleration on a Ramp</h2>
          </Link>
        </div>
        <div className="image-wrapper">
          <Link to="/buoyancy">
            <img
              id="buoyancyimage"
              src={require("./images/buoyancy.png")}
              alt="buoyancy"
            />
          <h2>Buoyancy</h2>
          </Link>
        </div>
        <div className="image-wrapper">
          <Link to="/activityland">
            <img
              src={require("./images/physicsuniversity.png")}
              alt="a circuit"
            />
          <h2>Play Games</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default How;
