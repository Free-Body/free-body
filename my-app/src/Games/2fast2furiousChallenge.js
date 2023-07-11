import React, { useEffect } from "react";
import { carFunc, init } from "./2fast2furious";
import { Link } from "react-router-dom";

const FastFuriousChallenge = () => {
    useEffect(() => {
        window.onload=init();
    }, [])
    return (
    <div className="pizzaToss">
        <h2>2Fast 2Furious 2Ramps - CHALLENGE MODE</h2>
        <h3>Help the stunt driver make it across the ramp by adjusting their velocity!</h3>
        <ol>Directions: 
            <li>Slide the velocity to the value you want the car to start at</li>
            <li>Click "Re-launch car" to launch the car at a different velocity!</li>
            <li>Click "Start your engines" to try again with different ramps!</li>
        </ol>
        <ol>Hints: 
            <li>In challenge mode, the road and ramps have random friction values! How can you overcome the friction force?</li>
            <li>In challenge mode, it's not enough to make it across the ramp: you must land safely as well!</li>
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
            <button id="carStartBtn" onClick={() => carFunc("challenge")}> Start your engines!</button>
            <button id="launchBtn">Re-launch car</button>
            <p>Too difficult? Try the standard mode <Link to="/2fast2furious">here!</Link></p>
        </div>
    </div>)
}

export default FastFuriousChallenge;