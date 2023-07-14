import React, { useEffect } from "react";
import { carFunc, init } from "./2fast2furious";
import { Link } from "react-router-dom";

const FastFurious = () => {
    useEffect(() => {
        window.onload=init();
    }, [])
    return (
    <div className="pizzaToss">
        <h2>2Fast 2Furious 2Ramps</h2>
        <h3>Help the stunt driver make it across the ramp by adjusting their velocity!</h3>
        <ol>Directions: 
            <li>Slide the velocity to the value you want the car to start at</li>
            <li>Click "Re-launch car" to launch the car over the same ramps at a different velocity!</li>
            <li>Click "Start your engines" to reset the game completely and try again with different ramps!</li>
        </ol>
        <ol>Hints: 
            <li>Going fast can be good, but what will happen if you're going too fast when you start the projectile motion?</li>
        </ol>
        <ol  className="questions">Think like a scientist:
            <li>What is the minimum velocity you need to move up the ramp?</li>
            <li>How does increasing the velocity affect how high the car goes? What about where it lands?</li>
            <li>Try reseting the game. How does the minimum velocity needed to move up the ramp change when the angle increases or decreases?</li>
            <li>How can you tie the above information to the equations you know?</li>
        </ol>
        <div id="areaToRender"></div>
        <div>
            <label htmlFor="velocityInput">Velocity: </label>
            <input
                type="range"
                id="velocityInput"
                min="1"
                max="101"
                step="1"
                defaultValue="20"
            />
            <p><span id="velocityValue">20 m/s</span></p>
        </div>
        <div id="playBox">
            <button id="carStartBtn" onClick={() => carFunc("standard")}> Start your engines!</button>
            <button id="launchBtn">Re-launch car</button>
            <p>Too easy? Try the challenge mode <Link to="/2fast2furiouschallenge">here!</Link></p>
        </div>
    </div>)
}

export default FastFurious;