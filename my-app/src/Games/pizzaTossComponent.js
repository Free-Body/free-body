import React, { useEffect, useState } from "react";
import { StartSlingshot } from "./pizzaToss";
import { init } from "./pizzaToss";
import { Link } from "react-router-dom";

const PizzaToss = () => {
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
      <h1>Pizza Toss</h1>
      <h2>Looks like rats have taken over the kitchen! Toss them some pizzas to lure them out!</h2>
      <ol className="directions">
        Directions:
        <li>Pull the pizza back and let go of the mouse to launch it</li>
        <li>If you don't have enough velocity, the pizza won't launch</li>
        <li>You can change the height of the toss and the mass/size of the pizza using the sliders below</li>
        <li>When all the rats have fallen off the platform, you win!</li>
      </ol>
      <ol className="questions">
        Think like a scientist:
        <li>What happens to the path of the pizza when you pull back more? What about when you pull back less?</li>
        <li>
          Challenge yourself! Try not to adjust the height too much and knock down the rats with a projectile path. Why
          would this be more difficult?
        </li>
        <li>
          Try changing gravity. How does that affect the path of the projectile? Is it easier or harder at higher
          magnitudes of gravity, and why?
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
                      <li>Pulling the pizza further back will increase its initial velocity</li>
                      <li>You can change the path of the pizza toss by changing the angle or the height you toss at</li>
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
        <label htmlFor="heightRange">
          Height: <span id="heightVal">210</span> m
        </label>
        <input type="range" id="heightRange" min="130" max="400" step="1" defaultValue="210" />

        <label htmlFor="massRange">
          Mass: <span id="massVal">50</span> grams
        </label>
        <input type="range" id="massRange" min="10" max="50" step="10" defaultValue="25" />

        <label htmlFor="gravityRange">
          Gravity: <span id="gravityVal">0.001 </span> m/s2
        </label>
        <input type="range" id="gravityRange" min="0.0005" max="0.003" step="0.0005" defaultValue="0.001" />
      </div>
      <div id="playBox">
        <button id="pizzaStart" onClick={StartSlingshot}>
          Pizza Toss
        </button>
        <p className='challenge'>
          Too easy? Checkout the challenge mode <Link to="/pizzachallenge">here!</Link>
        </p>
      </div>
    </div>
  );
};

export default PizzaToss;
