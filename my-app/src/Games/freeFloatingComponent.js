import React, { useEffect, useRef, useState } from "react";
import { startFreeFloat, init } from "./freeFloating";
import { Link } from "react-router-dom";

function FreeFloating() {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    window.onload = init();
  }, []);

  const handleHintMouseEnter = () => {
    setShowHint(true);
  };

  const handleHintMouseLeave = () => {
    setShowHint(false);
  };

  return (
    <div className="pizzaToss">
      <h1>Free Floating Simulation</h1>
      <ol className="directions">
        Directions:
        <li>Click to drag objects around the screen</li>
        <li>
          Try seeing how many items you can stack or just play around with the
          objects!
        </li>
      </ol>

      <ol className="questions">
        Think like a scientist:
        <li>Why might a boat float but a rock sink?</li>
        <li>Can you get an object to sink? What conditions make something sink?</li>
        <li>Try stacking two objects on top of each other. How do they react? Recall that this scenario has no air resistance. How might something like that affect real world scenarios versus this simulation?</li>
        <li>Which affects buoyancy more, mass or radius? How can you tie that back to the equations?</li>
      </ol>

      <div className="hintHelpContainer">
        <div className="hintPopup">
          <div
            className={`hintButton ${showHint ? "active" : ""}`}
            onMouseEnter={handleHintMouseEnter}
            onMouseLeave={handleHintMouseLeave}
          >
            Hint
          </div>
          {showHint && (
            <div className="hintText">
              <ol>
               <li>Smaller radii objects can be hard to see, so look closely! They might be bouncing or sinking!</li>
               <li>Notice the objects aren't starting at sea level. Consider how this might affect their net force! </li>
              </ol>
            </div>
          )}
        </div>
        <div className="helpLink">
          <Link to="/buoyancy" style={{ textDecoration: "none", color: "inherit" }}>
            Need More Help?
          </Link>
        </div>
      </div>

      <div id="areaToRender"></div>

      <div className="ui">
        <button onClick={startFreeFloat}>Start Game</button>

        <button id="addObjectButton"> Add Buoyant Object </button>

        <button id="resetButton"> Reset </button>
        <label htmlFor="massSlider">Mass:</label>
        <input type="range" id="massSlider" min="1" max="300" step="1" defaultValue="50" />
        <p>
          <span id="massValue">50</span> kg
        </p>

        <label htmlFor="radiusSlider">Radius:</label>
        <input type="range" id="radiusSlider" min="1" max="20" step="0.5" defaultValue="10" />
        <p>
          <span id="radiusValue">10</span> m
        </p>
      </div>
    </div>
  );
}

export default FreeFloating;
