import React, { useEffect, useState } from "react";
import { carFunc, init } from "./2fast2furious";
import { Link } from "react-router-dom";

const FastFurious = () => {
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
      <h1>2Fast 2Furious 2Ramps</h1>
      <h2>Help the stunt driver make it across the ramp by adjusting their velocity!</h2>
      <ol className="directions">
        Directions:
        <li>Slide the velocity to the value you want the car to start at</li>
        <li>Click "Re-launch car" to launch the car over the same ramps at a different velocity!</li>
        <li>Click "Start your engines" to reset the game completely and try again with different ramps!</li>
      </ol>
      <ol className="questions">
        Think like a scientist:
        <li>What is the minimum velocity you need to move up the ramp?</li>
        <li>How does increasing the velocity affect how high the car goes? What about where it lands?</li>
        <li>
          Try resetting the game. How does the minimum velocity needed to move up the ramp change when the angle
          increases or decreases?
        </li>
        <li>How can you tie the above information to the equations you know?</li>
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
          <li>
            Going fast can be good, but what will happen if you're going too fast when you start the projectile
            motion?
          </li>
        </ol>
      </div>
    )}
  </div>
  <div className="helpLink">
    <Link to="/acceleration" style={{ textDecoration: "none", color: "inherit" }}>
      Need More Help?
    </Link>
  </div>
</div>
      <div id="areaToRender"></div>
      <div>
        <label htmlFor="velocityInput">Velocity: </label>
        <input type="range" id="velocityInput" min="1" max="101" step="1" defaultValue="20" />
        <p>
          <span id="velocityValue">20 m/s</span>
        </p>
      </div>
      <div id="playBox">
        <button id="carStartBtn" onClick={() => carFunc("standard")}>
          Start your engines!
        </button>
        <button id="launchBtn">Re-launch car</button>
        <p className='challenge'>
          Too easy? Try the challenge mode <Link to="/2fast2furiouschallenge">here!</Link>
        </p>
      </div>
    </div>
  );
};

export default FastFurious;
