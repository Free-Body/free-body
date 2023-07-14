import React, { useEffect, useState } from "react";
import { Challenge } from "./pizzaToss";
import { init } from "./pizzaToss";
import { Link } from "react-router-dom";

const PizzaChallenge = () => {
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
      <h1>Pizza Toss - CHALLENGE MODE</h1>
      <h2>Looks like rats have taken over the kitchen! Toss them some pizzas to lure them out!</h2>
      <ol className="directions">
        Directions:
        <li>Choose a starting velocity using the sliders</li>
        <li>You can still change the mass of the pizza and the gravity if you would like</li>
        <li>When all the rats have fallen off the platform, you win!</li>
      </ol>
      <ol className="questions">
        Think like a scientist:
        <li>Keep the y velocity constant and change the x velocity. How does the x velocity change your path?</li>
        <li>Keep the x velocity constant and change the y velocity. How does the y velocity change the path?</li>
        <li>Change both velocities. How can you best approach optimizing the path?</li>
        <li>How do different magnitudes of gravity affect your path?</li>
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
              <ol className="hints">
                 <li>Velocity is a vector! How do we get the sum of two vectors?</li>
                 <li>Mass doesn't affect projectile motion, but size helps with knocking down more things!</li>
                </ol>
            </div>
          )}
        </div>
        <div className="helpLink">
          <Link to="/projectile-motion" style={{ textDecoration: "none", color: "inherit" }}>
            Need More Help?
          </Link>
        </div>
      </div>
      <div id="areaToRender"></div>
      <div>
        <label htmlFor="xvelocityRange">
          X Velocity: <span id="xvelocityVal">10</span> m/s
        </label>
        <input type="range" id="xvelocityRange" min="10" max="40" step="5" defaultValue="15" />

        <label htmlFor="yvelocityRange">
          Y Velocity: <span id="yvelocityVal">10</span> m/s
        </label>
        <input type="range" id="yvelocityRange" min="1" max="40" step="5" defaultValue="15" />

        <label htmlFor="massRange">
          Mass: <span id="massVal">50</span> grams
        </label>
        <input type="range" id="massRange" min="1" max="50" step="10" defaultValue="25" />

        <label htmlFor="gravityRange">
          Gravity: <span id="gravityVal">0.001 </span> m/s2
        </label>
        <input type="range" id="gravityRange" min="0.0005" max="0.003" step="0.0005" defaultValue="0.001" />
      </div>
      <div id="playBox">
        <button id="pizzaStart" onClick={Challenge}>
          Pizza Toss
        </button>
        <p>
          Too difficult? Try the standard mode <Link to="/pizzatoss">here!</Link>
        </p>
      </div>
    </div>
  );
};

export default PizzaChallenge;
