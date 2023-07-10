import React, { useEffect, useRef, useState } from "react";
import { startFreeFloat, init } from "./freeFloating"

function FreeFloating() {

  useEffect(() => {
    window.onload=init();
  }, []);

  return (
    <div className="pizzaToss">
      <h1>Free Floating Simulation</h1>
      <ul> Directions
        <li>Click to drag objects or the water</li>
        <li>Scroll to zoom in</li>
        <li>
          Try seeing how many items you can stack or just play around with the
          objects!
        </li>
      </ul>

      <ul> Hints
        <li>Why might a boat float but a rock sink?</li>
        <li>Smaller radii objects can be hard to see, so look closely! They might be bouncing or sinking!</li>
        <li>Notice the objects aren't starting at sea level. Consider how this might affect their net force! </li>
      </ul>

      <div id="areaToRender"></div>
      
      <div className="ui">
        <button onClick={startFreeFloat}>Start Game</button>

        <button id="addObjectButton"> Add Buoyant Object </button>

        <button id="resetButton"> Reset </button>
        <label htmlFor="massSlider">Mass:</label>
        <input type="range" id="massSlider" min="1" max="300" step="1" defaultValue="50"/>
        <p><span id="massValue">50</span> kg</p>
        
        <label htmlFor="radiusSlider">Radius:</label>
        <input type="range" id="radiusSlider" min="1" max="20" step="0.5" defaultValue="10"/>
        <p><span id="radiusValue">10</span> m</p>
      </div>
    </div>
  );
}

export default FreeFloating;