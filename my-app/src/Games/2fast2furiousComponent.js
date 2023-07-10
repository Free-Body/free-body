import React, { useEffect } from "react";


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
                value="0"
                oninput="updateVelocity(this.value)"
            />
            <span id="velocityValue">0 m/s</span>
        </div>
        <div id="playBox">
            <button>Start your engines!</button>
        </div>
    </div>)
}

export default FastFurious;