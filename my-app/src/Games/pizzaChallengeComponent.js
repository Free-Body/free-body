import React, { useEffect } from "react";
import { Challenge } from "./pizzaToss";
import { init } from "./pizzaToss";
import { Link } from "react-router-dom";

const PizzaChallenge = () => {
    useEffect(() => {
        window.onload=init();
    }, [])
    
    return (
    <div className="pizzaToss">
        <h2>Pizza Toss - CHALLENGE MODE</h2>
        <h3>Looks like rats have taken over the kitchen! Toss them some pizzas to lure them out!</h3>
        <ol>Directions: 
            <li>Choose a starting velocity using the sliders</li>
            <li>You can still change the mass of the pizza and the gravity if you would like</li>
            <li>When all the rats have fallen off the platform, you win!</li>
        </ol>
        <ol>Hints: 
            <li>Velocity is a vector! How do we get the sum of two vectors?</li>
            <li>Mass doesn't affect projectile motion, but size helps with knocking down more things!</li>
        </ol>
        <div id="areaToRender"></div>
        <div>
            <label htmlFor="xvelocityRange">X Velocity: <span id="xvelocityVal">10</span> m/s</label>
            <input type="range" id="xvelocityRange" min="10" max="40" step="5"  defaultValue="15"/>

            <label htmlFor="yvelocityRange">Y Velocity: <span id="yvelocityVal">10</span> m/s</label>
            <input type="range" id="yvelocityRange" min="1" max="40" step="5"  defaultValue="15"/>

            <label htmlFor="massRange">Mass: <span id="massVal">50</span> grams</label>
            <input type="range" id="massRange" min="1" max="50" step="10"  defaultValue="25"/>

            <label htmlFor="gravityRange">Gravity: <span id="gravityVal">0.001 </span> m/s2 </label>
            <input type="range" id="gravityRange" min="0.0005" max="0.003" step="0.0005"  defaultValue="0.001"/>
        </div>
        <div id="playBox">
            <button onClick={Challenge}>Pizza Toss</button>
            <p>Too difficult? Try the standard mode <Link to="/pizzatoss">here!</Link></p>
        </div>
    </div>)
}

export default PizzaChallenge;