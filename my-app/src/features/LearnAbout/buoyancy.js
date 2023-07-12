import React from "react";
import "../howstyle.css";

const Buoyancy = () => {
  return (
    <div class="howitworks">
      <h1 className="head">Learn about Buoyancy</h1>
      <p>Buoyancy force is an upward force of pressure when an object is placed in fluid, like water, and determines whether it floats or sinks. </p>
      <p>When a beach ball is placed in water, there is a force pushing it down while the water is pushing the beach ball up. The total upward force that keeps the beach ball afloat is the magnitudes of the force. The magnitude is defined as the difference between the upwards buoyant force and the downwards gravitational force. </p>
      <p>F<sub>net</sub>= F<sub>up</sub>- F<sub>down</sub> (Note: magnitude is considered a quantity, therefore does not have a negative sign.)</p>
      <img src={require("../images/buoy.png")} alt="buoyancy fbd" /> <a href="https://en.wikipedia.org/wiki/Buoyancy">Source</a>
      <ul>Factors that affect the buoyant force
        <li>density of the fluid</li>
        <li>volume of the displaced fluid</li>
        <li>gravity</li>
      </ul>
      <p>These factors are described by Archimedes' principle.</p>
      <p>F<sub>a</sub>=pgV where F<sub>a</sub>: buoyant force applied to object, p: density of the fluid, V: volume of displaced fluid, g: acceleration due to gravity </p>
    </div>
  );
};

export default Buoyancy;
