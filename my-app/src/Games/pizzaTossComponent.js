import React, { useEffect } from "react";
import { StartSlingshot } from "./pizzaToss";
import { init } from "./pizzaToss";

const PizzaToss = () => {
    useEffect(() => {
        window.onload=init();
    }, [])
    return (
    <div>
        <h2>Pizza Toss</h2>
        <h3>Looks like rats have taken over the kitchen! Toss them some pizzas to lure them out!</h3>
        <ol>Directions: 
            <li>Pull the pizza back and let go of the mouse to launch it</li>
            <li>If you don't have enough velocity, the pizza won't launch</li>
            <li>You can change the height of the toss and the mass/size of the pizza using the sliders below</li>
            <li>When all the rats have fallen off the platform, you win!</li>
        </ol>
        <ol>Hints: 
            <li>Pulling the pizza further back will increase its initial velocity</li>
            <li>You can change the path of the pizza toss by changin the angle or the height you toss at</li>
            <li>Mass doesn't affect projectile motion, but size helps with knocking down more things!</li>
        </ol>
        <div id="areaToRender"></div>
        <div>
            <label htmlFor="heightRange">Height: <span id="heightVal">210</span> m</label>

            <input type="range" id="heightRange" min="130" max="400" step="1"  defaultValue="210"/>

            <label htmlFor="massRange">Mass: <span id="massVal">50</span> grams</label>
            <input type="range" id="massRange" min="10" max="50" step="10"  defaultValue="25"/>
        </div>
        <div>
            <button onClick={StartSlingshot}>Pizza Toss</button>
        </div>
    </div>)
}

export default PizzaToss;