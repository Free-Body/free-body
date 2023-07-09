import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

function FreeFloating() {
  const sceneRef = useRef(null);
  const massSlider = useRef(null);
  const massValue = useRef(null);
  const [engine, setEngine] = useState(null);
  const [render, setRender] = useState(null);
  const [mass, setMass] = useState(1);
  const [buoyantObjects, setBuoyantObjects] = useState([]);

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;

    let engine = Engine.create();
    setEngine(engine);
    let render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
      },
    });
    setRender(render);

    let runner = Runner.create();
    Runner.run(runner, engine);

    Render.run(render);

    let ground = Bodies.rectangle(400, 610, 810, 60, {
      isStatic: true,
      friction: 0.9,
      restitution: 1.0,
    });
    World.add(engine.world, [ground]);
  }, []);

  useEffect(() => {
    function changeMassValue() {
      setMass(massSlider.current.value);
      massValue.current.textContent = massSlider.current.value + " kg";
    }

    massSlider.current.addEventListener("input", changeMassValue);

    return () => {
      massSlider.current.removeEventListener("input", changeMassValue);
    };
  }, []);

  const addObject = () => {
    const Bodies = Matter.Bodies;
    const World = Matter.World;
    const Body = Matter.Body;

    const currentMass = parseFloat(mass);
    const density = currentMass / 100;
    const radius = currentMass;

    let circle = Bodies.circle(0, 0, radius, {
      density: density,
      friction: 0.9,
      frictionAir: 0.01,
      restitution: 0.1,
      angularVelocity: 0.01,
      angularDamping: 0.1,
    });

    Body.setPosition(circle, { x: 200, y: 200 });

    World.add(engine.world, circle);
    setBuoyantObjects([...buoyantObjects, circle]);
  };

  // The resetObjects function
  const resetObjects = () => {
    const World = Matter.World;

    buoyantObjects.forEach((object) => {
      World.remove(engine.world, object);
    });

    setBuoyantObjects([]);
  };

  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      <h1 id="header">Free Floating Simulation</h1>
      <div className="home-header">
        <p id="line1">PHYSICS PROBLEMS CAN BE THE MOST DIFFICULT TO SOLVE</p>
        <p id="line2">BUT THEY DON'T HAVE TO BE THE MOST BORING</p>
      </div>
      <div className="instructions">
        <p>Click to drag objects or the water</p>
        <p>Scroll to zoom in</p>
        <p>
          Try seeing how many items you can stack or just play around with the
          objects!
        </p>
      </div>
      <div id="objectContainer">
        <div className="object-container"></div>
      </div>
      <button id="addObjectButton" onClick={addObject}>
        Add Buoyant Object
      </button>
      <button id="resetButton" onClick={resetObjects}>
        Reset
      </button>
      <label htmlFor="massSlider">Mass:</label>
      <input
        type="range"
        id="massSlider"
        min="0.1"
        max="100"
        step="0.1"
        defaultValue="1"
        ref={massSlider}
      />
      <span id="massValue" ref={massValue}>
        1 kg
      </span>
    </div>
  );
}

export default FreeFloating;
