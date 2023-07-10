import React, { useEffect, useRef, useState } from "react";
import { startFreeFloat, init } from "./freeFloating"

function FreeFloating() {

  useEffect(() => {
    window.onload=init();
  }, []);

  return (
    <div className="pizzaToss">
      <h1>Free Floating Simulation</h1>
      <div>
        <p>Click to drag objects or the water</p>
        <p>Scroll to zoom in</p>
        <p>
          Try seeing how many items you can stack or just play around with the
          objects!
        </p>
      </div>
      
      <div id="areaToRender"></div>
      
      <div className="ui">
        <button onClick={startFreeFloat}>Start Game</button>

        <button id="addObjectButton"> Add Buoyant Object </button>

        <button id="resetButton"> Reset </button>
        <label htmlFor="massSlider">Mass:</label>
        <input type="range" id="massSlider" min="1" max="101" step="10" defaultValue="50"/>
        <p><span id="massValue">50</span> kg</p>
      </div>
    </div>
  );
}

export default FreeFloating;