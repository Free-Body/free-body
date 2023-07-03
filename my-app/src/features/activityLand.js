import React from "react";
// import { Link } from "react-router-dom";
//for now the images link to home page until we have game links
function InteractiveImage() {
  return (
    <div>
      <img
        src={require("./images/physicsuniversity.png")}
        alt="Interactive"
        useMap="#image-map"
        style={{
          width: "80%",
          height: "auto",
          float: "right",
          marginTop: "-30%",
          borderRadius: "177px",
          paddingRight: "45px",
        }}
      />
      <map name="image-map">
        <area
          shape="rect"
          coords="x274,y178,x74,y40"
          href="../features/HomePage/homePage"
          alt="Projectile Game"
        />
        <area
          shape="rect"
          coords="x710,y73,x914,y196"
          href="../features/HomePage/homePage"
          alt="Acceleration Game"
        />
        <area
          shape="rect"
          coords="x256,y642,x93,y478"
          href="../features/HomePage/homePage"
          alt="Buoyancy Game"
        />
        <area
          shape="rect"
          coords="x735,y532,x878,y670"
          href="../features/HomePage/homePage"
          alt="Circuitry Game"
        />
      </map>
    </div>
  );
}

export default InteractiveImage;
