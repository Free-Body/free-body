import React from "react";
import { Link } from "react-router-dom";
import "./howstyle.css";

const How = () => {
  return (
    <div>
      <h1 id="how-head">How it Works</h1>
      <h2 id="how-header">Learn more about each of the following topics!</h2>
      <div className="howimages">
        <div className="image-wrapper">
          <Link to="/projectile-motion">
            <img
              id="boyimage"
              src={require("./images/boythrowing.png")}
              alt="boy throwing ball"
            />
          </Link>
          <h2>Projectile Motion</h2>
        </div>
        <div className="image-wrapper">
          <Link to="/acceleration">
            <img
              id="speedometerimage"
              src={require("./images/speedometer.png")}
              alt="speedometer"
            />
          </Link>
          <h2>Acceleration</h2>
        </div>
        <div className="image-wrapper">
          <Link to="/buoyancy">
            <img
              id="buoyancyimage"
              src={require("./images/buoyancy.png")}
              alt="buoyancy"
            />
          </Link>
          <h2>Buoyancy</h2>
        </div>
        <div className="image-wrapper">
          <Link to="/circuitry">
            <img
              id="circuitimage"
              src={require("./images/circuitry.png")}
              alt="a circuit"
            />
          </Link>
          <h2>Circuitry</h2>
        </div>
      </div>
    </div>
  );
};

export default How;
