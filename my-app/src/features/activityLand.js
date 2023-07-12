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
        <a href="/pizzatoss" style={{ position: "absolute", top: "0%", left: "-1%" }}>
          <img id="pizzacar" src={PizzacarImage} alt="Pizza Car" style={{ width: "15vw" }} />
        </a>
        <a href="/2fast2furious" style={{ position: "absolute", top: "5%", right: "25%" }}>
          <img id="car" src={CarImage} alt="2 Fast 2 Furious" style={{ width: "15vw" }} />
        </a>
        <a href="/freefloating" style={{ position: "absolute", bottom: "12%", left: "4%" }}>
          <img id="buoy" src={BuoyImage} alt="Buoy" style={{ width: "11vw" }} />
        </a>
      </div>
    </div>
  );
}

export default InteractiveImage;
