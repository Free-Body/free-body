import React from "react";
// import { Link } from "react-router-dom";
//for now the images link to home page until we have game links
function InteractiveImage() {
  return (
    <div className="activityLandContainer">
      <div>
        <img
          src={require("./images/physicsuniversity.png")}
          alt="Interactive"
          useMap="#image-map"
          style={{
            width: "65%",
            height: "auto",
            marginLeft: "26%",
            marginBottom: "2%",
            borderRadius: "177px",
            paddingRight: "45px",
          }}
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
            href="/acceleration"
            alt="Acceleration Game"
          />
          <area
            shape="rect"
            coords="x256,y400,x93,y300"
            href="/buoyancy"
            alt="Buoyancy Game"
          />
          <area
            shape="rect"
            coords="x274,y400,x878,y300"
            href="/circuitry"
            alt="Circuitry Game"
          />
        </map>
      </div>
    </div>
  );
}

export default InteractiveImage;
