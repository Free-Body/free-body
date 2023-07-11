import Matter from "matter-js";
let road = require("../features/images/road.jpg");

let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Events = Matter.Events;

let engine;
let render;
let runner;

export const init = function () {
  // create an engine
  engine = Engine.create();
  // create a renderer
  render = Render.create({
    element: document.getElementById("areaToRender"),
    engine: engine,
    options: {
      width: 800,
      height: 600,
      pixelRatio: 1,
      background: road,
      wireframes: false,
      showAngleIndicator: true,
      showCollisions: true,
    },
  });
  // run the renderer
  Render.run(render);
  // create runner
  runner = Runner.create();
  // run the engine
  Runner.run(runner, engine);
};

//this function clears world between games
function clearWorld() {
  Matter.Composite.clear(engine.world, false);
}

export const carFunc = function () {
  clearWorld();

  let bodies = createBodies();
  
  // Add bodies
  Composite.add(engine.world, bodies);

  let velocityInput = document.getElementById("velocityInput");
  let velocityValue = document.getElementById("velocityValue");
  let velocity;

  velocityInput.addEventListener("input", function () {
    velocity = parseFloat(velocityInput.value);
    velocityValue.textContent = velocity + " m/s";
  });

  velocity = parseFloat(velocityInput.value);

  // See car function defined later in this file
  let scale = 0.9;
  let carBody = car(60, 570, 150 * scale, 30 * scale, 30 * scale, velocity); // Adjust the position of the car as needed
  // Add the car body to the world
  Composite.add(engine.world, [carBody]);

  let launchBtn = document.getElementById('launchBtn');

  launchBtn.addEventListener("click", function() {
    Composite.remove(engine.world, [carBody])
    carBody = car(60, 570, 150 * scale, 30 * scale, 30 * scale, velocity);
    Composite.add(engine.world, [carBody]);
  });
  
  let hasWon = false; // Track if the player has already won

  // Check car position on the right side of the canvas
  function checkWinCondition() {
    if (!hasWon && carBody.bodies[0].position.x > 800) {
      hasWon = true; // Set the flag to true to prevent further checks
      displayWinMessage();
      Events.off(engine, "beforeUpdate", checkWinCondition); // Stop checking the win condition
    }
  }

  // Check the win condition continuously
  Events.on(engine, "beforeUpdate", checkWinCondition);
};

/**
 * Creates a composite with simple car setup of bodies and constraints.
 * @method car
 * @param {number} xx
 * @param {number} yy
 * @param {number} width
 * @param {number} height
 * @param {number} wheelSize
 * @param {number} velocity
 * @return {composite} A new composite car body
 */
function car(xx, yy, width, height, wheelSize, v) {
  let Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint;

  let group = Body.nextGroup(true),
    wheelBase = 20,
    wheelAOffset = -width * 0.5 + wheelBase,
    wheelBOffset = width * 0.5 - wheelBase,
    wheelYOffset = 0;

  let car = Composite.create({ label: "Car" }),
    body = Bodies.rectangle(xx, yy, width, height, {
      collisionFilter: {
        group: group,
      },
      chamfer: {
        radius: height * 0.5,
      },
      density: 0.0002,
    });
    
  let wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
    collisionFilter: {
      group: group,
    },
    friction: 0.8,
  });

  let wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
    collisionFilter: {
      group: group,
    },
    friction: 0.8,
  });

  let axelA = Constraint.create({
    bodyB: body,
    pointB: { x: wheelAOffset, y: wheelYOffset },
    bodyA: wheelA,
    stiffness: 1,
    length: 0,
  });

  let axelB = Constraint.create({
    bodyB: body,
    pointB: { x: wheelBOffset, y: wheelYOffset },
    bodyA: wheelB,
    stiffness: 1,
    length: 0,
  });

  Body.setVelocity(body, { x: v, y: 0 });
  Body.setVelocity(wheelA, { x: v, y: 0 });
  Body.setVelocity(wheelB, { x: v, y: 0 });

  Composite.addBody(car, body);
  Composite.addBody(car, wheelA);
  Composite.addBody(car, wheelB);
  Composite.addConstraint(car, axelA);
  Composite.addConstraint(car, axelB);

  return car;
}

function createBodies() {
  let angle  = Math.random() * .3+ .1;
  return [
    // Grounds
    Bodies.rectangle(400, 590, 800, 20, { isStatic: true }),

    // Left ramp
    Bodies.rectangle(260, 550, 400, 20, {
      isStatic: true,
      angle: -Math.PI * angle,
      label: "Left ramp",
    }),
  
    // Right ramp
    Bodies.rectangle(600, 550, 400, 20, {
      isStatic: true,
      angle: Math.PI * angle,
      label: "Right ramp",
    }),
  ]
}

// Display the win message
function displayWinMessage() {
  const areaToRender = document.getElementById("areaToRender");
  areaToRender.style.opacity = 0.75;
  const h1 = document.createElement("h1");
  h1.textContent = "YOU WIN! Click the button to play again!"
  areaToRender.prepend(h1);
  setTimeout(function () {
    h1.remove()
    areaToRender.style.opacity = 1;
  }, 6000);
}
