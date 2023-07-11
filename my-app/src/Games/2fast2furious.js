import Matter from "matter-js";
let road = require("../features/images/road.jpg");

let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
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
  Composite.clear(engine.world, false, true);
}

export const carFunc = function(mode) {
  clearWorld();

  let bodies = createBodies(mode);
  
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

  let launchBtn = document.getElementById('launchBtn');
  let carBody = car(60, 570, 150 * scale, 30 * scale, 30 * scale, velocity, true);
  Composite.add(engine.world, carBody);

  launchBtn.addEventListener("click", function() {
    Composite.remove(engine.world, carBody);
    let newCar = car(60, 570, 150 * scale, 30 * scale, 30 * scale, velocity, false);
    Composite.add(engine.world, newCar);
    carBody = newCar;
  });
  
  let hasWon = false; // Track if the player has already won

  // Check the win condition continuously
  Events.on(engine, "beforeUpdate", checkWinCondition);

  function checkWinCondition() {
    if (carBody.bodies.length > 0) {
      if (!hasWon && carBody.bodies[0].position.x > 800) {
        displayWinMessage();
        Composite.remove(engine.world, carBody, false)
        Events.off(engine, "beforeUpdate", checkWinCondition); // Stop checking the win condition
        hasWon = true;
      }
    }
  }
}


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
function car(xx, yy, width, height, wheelSize, v, first) {
  if (!first) {
    Matter.Composite.clear(engine.world, true, true);  
  }

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

function createBodies(mode ) {
  let angle  = Math.random() * .3+ .1;
  let friction;
  if (mode === "challenge") {
    friction = Math.random() * .9 + .1;
  } else {
    friction = .1;
  }
  return [
    // Grounds
    Bodies.rectangle(400, 590, 800, 20, { isStatic: true , friction: friction}),

    // Left ramp
    Bodies.rectangle(260, 550, 400, 20, {
      isStatic: true,
      angle: -Math.PI * angle,
      label: "Left ramp",
      friction: friction,
      density: 1
    }),
  
    // Right ramp
    Bodies.rectangle(600, 550, 400, 20, {
      isStatic: true,
      angle: Math.PI * angle,
      label: "Right ramp",
      friction: friction,
      density: 1
    }),
  ]
}

// Display the win message
function displayWinMessage() {
  const areaToRender = document.getElementById("areaToRender");
  const launchBtn = document.getElementById('launchBtn');
  const startBtn =  document.getElementById('carStartBtn');

  areaToRender.style.opacity = 0.75;
  const h1 = document.createElement("h1");
  h1.textContent = "YOU WIN! Click the button to play again!"
  areaToRender.prepend(h1);

  launchBtn.disabled = true;
  startBtn.disabled = true;
  launchBtn.style.opacity = 0.5;
  startBtn.style.opacity = 0.5;

  setTimeout(function () {
    h1.remove()
    areaToRender.style.opacity = 1;
    launchBtn.disabled = false;
    startBtn.disabled = false;
    launchBtn.style.opacity = 1;
    startBtn.style.opacity = 1;
  }, 6000);
}