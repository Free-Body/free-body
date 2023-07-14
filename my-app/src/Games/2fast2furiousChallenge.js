import React, { useEffect, useState } from "react";
import { carFunc, init } from "./2fast2furious";
import { Link } from "react-router-dom";

const FastFuriousChallenge = () => {
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
      <h1>2Fast 2Furious 2Ramps - CHALLENGE MODE</h1>
      <h2>Help the stunt driver make it across the ramp by adjusting their velocity!</h2>
      <ol className="directions">
        Directions:
        <li>Slide the velocity to the value you want the car to start at</li>
        <li>Click "Re-launch car" to launch the car at a different velocity!</li>
        <li>Click "Start your engines" to try again with different ramps!</li>
      </ol>
      <ol className="questions">
        Think like a scientist:
        <li>How can you optimize the velocity so the car lands on the ground safely?</li>
        <li>
          When you reset the game, try to see how the same velocity looks different for different ramps. Hypothesize
          how friction is affecting the different scenarios.
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
                          In challenge mode, the road and ramps have random friction values! How can you overcome the friction force?
                        </li>
                        <li>In challenge mode, it's not enough to make it across the ramp: you must land safely as well!</li>
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
        <button id="carStartBtn" onClick={() => carFunc("challenge")}>
          Start your engines!
        </button>
        <button id="launchBtn">Re-launch car</button>
        <p className='challenge'>Too difficult? Try the standard mode <Link to="/2fast2furious">here!</Link></p>
      </div>
    </div>
  );
};

export default FastFuriousChallenge;
