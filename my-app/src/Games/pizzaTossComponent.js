import React, { useEffect } from "react";
import { StartSlingshot } from "./pizzaToss";
import { init } from "./pizzaToss";

const PizzaToss = () => {
    useEffect(() => {
        window.onload=init();
    }, [])
    return (
    <div>
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