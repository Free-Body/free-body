import Matter from "matter-js"
let ocean = require("../features/images/ocean.jpg");

let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Events = Matter.Events;

//variables dedicated to the objects for the work with matter.js
let engine;
let render;
let runner;

//this function initializes the aggregate
export const init = function () {
  engine = Engine.create();
  render = Render.create({
    element: document.getElementById("areaToRender"),
    engine: engine,
    options: {
      width: 770,
      height: 600,
      pixelRatio: 1,
      background: ocean,
      wireframes: false,
    },
  });
  Render.run(render);
  runner = Runner.create();
  Runner.run(runner, engine);
}

//this function clears world between games
function clearWorld() {
  Matter.Composite.clear(engine.world, false);
}

export const startFreeFloat = function () {
    clearWorld();

    let ground = Bodies.rectangle(400, 610, 1500, 60, {
        isStatic: true,
        friction: 0.9,
        restitution: 1.0,
    });

    let massRange = document.getElementById("massSlider");

    // adjust mass
    massRange.addEventListener("mouseup", function () {
        let mass = massRange.value;
        let massValue = document.getElementById("massValue");
        massValue.innerText = `${mass}`
        Engine.update(engine);
    });

    let buoyantObjects = [];

    let addObjectButton = document.getElementById("addObjectButton");
    
    addObjectButton.addEventListener("click", function () {
        let mass = parseFloat(massRange.value);
        let density = mass / 100; // Density now ranges from 0.001 to 1 kg/m³

        let radius = mass; // Adjusting the radius based on the mass

        let circle = Bodies.circle(0, 0, radius, { // Use the radius here
          density: density,
          friction: 0.9,
          frictionAir: 0.01,
          restitution: 0.1,
          angularVelocity: 0.01,
          angularDamping: 0.1
        });

        Body.setPosition(circle, { x: 200, y: 200 });

        Composite.add(engine.world, circle);
        buoyantObjects.push(circle);
    });

    let resetButton = document.getElementById("resetButton");
    
    resetButton.addEventListener("click", function () {
        for (let i = 0; i < buoyantObjects.length; i++) {
          Composite.remove(engine.world, buoyantObjects[i]);
        }
        buoyantObjects = [];
      });

    // Add mouse control
    let mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false
            }
          }
        });
    let waterDensity = 1;
    let waterLevel = 300;

    Events.on(engine, "afterUpdate", function () {
        for (let i = 0; i < buoyantObjects.length; i++) {
          let obj = buoyantObjects[i];

          // Check if object's speed is below threshold
          let speed = Math.sqrt(Math.pow(obj.velocity.x, 2) + Math.pow(obj.velocity.y, 2));
          if (speed < 0.5) {
            // Apply "braking force"
            var forceMagnitude = 0.055;
            Body.applyForce(obj, obj.position, {
              x: -forceMagnitude * obj.velocity.x / speed,
              y: -forceMagnitude * obj.velocity.y / speed
            });
          }
          // Apply linear damping
          var linearDamping = 0.11;
          Body.setVelocity(obj, {
            x: obj.velocity.x * (1 - linearDamping),
            y: obj.velocity.y * (1 - linearDamping)
          });

          // Check if object is below the water level
          if (obj.position.y > waterLevel) {
            var submergedHeight = render.canvas.height - obj.position.y;
            var submergedVolume = submergedHeight * obj.bounds.max.x * 2;

            // Adjust the buoyancy force based on the object's vertical velocity
            var adjustedBuoyancyForce = submergedVolume * (waterDensity - obj.density) * 0.0001;
            adjustedBuoyancyForce *= Math.abs(obj.velocity.y) > 0.01 ? 1 : 0.1;

            Body.applyForce(obj, obj.position, { x: 0, y: -adjustedBuoyancyForce });
          }
        }
    });

    Composite.add(engine.world, [ground]);
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;
}

