import React, { useEffect } from "react";
import { carFunc, init } from "./2fast2furious";

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
            <li>Click "Start your engines" to launch the car or try again!</li>
        </ol>
        <ol>Hints: 
            <li>Going fast can be good, but what will happen if you're going too fast when you start the projectile motion?</li>
        </ol>
        <div id="areaToRender"></div>
        <div>
            <input
                type="range"
                id="velocityInput"
                min="1"
                max="81"
                step="10"
                defaultValue="20"
            />
            <p><span id="velocityValue">20 m/s</span></p>
        </div>
        <div id="playBox">
            <button onClick={carFunc}> Start your engines!</button>
        </div>
    </div>)
}

export default FastFurious;