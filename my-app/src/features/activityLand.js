import React from "react";
// import { Link } from "react-router-dom";
//for now the images link to home page until we have game links
function InteractiveImage() {
  return (
    <div className="activityLandContainer">
      <div id="activityLandDiv">
        <img
          src={require("./images/physicsuniversity.png")}
          alt="Interactive"
          useMap="#image-map"
        />
        <map name="image-map">
          <area
            shape="rect"
            coords="x274,y178,x74,y40"
            href="/pizzatoss"
            alt="Projectile Game"
          />
          <area
            shape="rect"
            coords="x274,y73,x914,y196"
            href="/2fast2furious"
            alt="Acceleration Game"
          />
          <area
            shape="rect"
            coords="x256,y200,x93,y300"
            href="/freefloating"
            alt="Buoyancy Game"
          />
        </map>
      </div>
    </div>
  );
}

export default InteractiveImage;
