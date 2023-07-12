import React from "react";
import FreeBodyImage from "./images/FreeBody.png";
import PizzacarImage from "./images/pizzacar.png";
import CarImage from "./images/car.png";
import BuoyImage from "./images/buoy.png";

function InteractiveImage() {
  return (
    <div className="activityLandContainer">
      <div id="activityLandDiv" style={{ position: "relative" }}>
        <img src={FreeBodyImage} alt="Interactive" />
        <a href="/pizzatoss" style={{ position: "absolute", top: "0", left: "0" }}>
          <img id="pizzacar" src={PizzacarImage} alt="Pizza Car" style={{ width: "15vw" }} />
        </a>
        <a href="/2fast2furious" style={{ position: "absolute", top: "0", right: "0", transform: "translate(-330px, 20px)" }}>
          <img id="car" src={CarImage} alt="2 Fast 2 Furious" style={{ width: "15vw" }} />
        </a>
        <a href="/freefloating" style={{ position: "absolute", bottom: "0", left: "0", transform: "translate(23px, -49px)" }}>
          <img id="buoy" src={BuoyImage} alt="Buoy" style={{ width: "13vw" }} />
        </a>
      </div>
    </div>
  );
}

export default InteractiveImage;
