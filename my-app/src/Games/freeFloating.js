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
    let radiusRange = document.getElementById("radiusSlider");

    massRange.addEventListener("mouseup", function () {
        let mass = massRange.value;
        let massValue = document.getElementById("massValue");
        massValue.innerText = `${mass}`
        Engine.update(engine);
    });
    
    radiusRange.addEventListener("mouseup", function () {
        let radius = radiusRange.value;
        let radiusValue = document.getElementById("radiusValue");
        radiusValue.innerText = `${radius}`
        Engine.update(engine);
    });

    let buoyantObjects = [];

    let addObjectButton = document.getElementById("addObjectButton");
    
    addObjectButton.addEventListener("click", function () {
        let mass = parseFloat(massRange.value);
        let radius = parseFloat(radiusRange.value); // Adjusting the radius based on the mass
        let density = mass / (1.33*3.14*radius**3); // density of a sphere is mass/volume, and the volume of a sphere is 4/3 pi r^3
        let circle = Bodies.circle(0, 0, radius*2, {
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
        //   // Apply linear damping
          var linearDamping = 0.11;
          Body.setVelocity(obj, {
            x: obj.velocity.x * (1 - linearDamping),
            y: obj.velocity.y * (1 - linearDamping)
          });

          // Check if object is below the water level
          if (obj.density < waterDensity) {
            var submergedHeight = obj.position.y - waterLevel;
            var submergedVolume = submergedHeight * obj.bounds.max.x * 2;

            // Adjust the buoyancy force based on the object's vertical velocity
            var adjustedBuoyancyForce = submergedVolume * (waterDensity - obj.density) * 0.0001;
            adjustedBuoyancyForce *= Math.abs(obj.velocity.y) > 0.01 ? 1 : 0.1;

            Body.applyForce(obj, obj.position, { x: 0, y: -adjustedBuoyancyForce });
          } else {
            console.log(obj.density)
            Body.applyForce(obj, obj.position, { x: 0, y: 0.0001-adjustedBuoyancyForce });
          }
        }
    });

    Composite.add(engine.world, [ground]);
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;
}

