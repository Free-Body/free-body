
// velocity toggle

let velocity = 0;
let isVelocityIncreasing = false;
let velocityInterval;

function updateVelocity(value) {
  velocity = parseInt(value);
  document.getElementById("velocityValue").textContent = velocity + " m/s";
}

function toggleVelocity() {
  if (isVelocityIncreasing) {
    clearInterval(velocityInterval);
  } else {
    velocityInterval = setInterval(increaseVelocity, 1000);
  }
  isVelocityIncreasing = !isVelocityIncreasing;
}

function increaseVelocity() {
  let currentVelocity = parseInt(velocityInput.value);
  let newVelocity = currentVelocity + 1;
  velocityInput.value = newVelocity;
  updateVelocity(newVelocity);
}

let velocityInput = document.getElementById("velocityInput");

velocityInput.addEventListener("input", function (event) {
  let velocity = parseInt(event.target.value);
  updateVelocity(velocity);
});
//////////////////////////////////////////////////////////////////////////////////

let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Body = Matter.Body,
  Events = Matter.Events;

let engine;
let render;
let runner;
let world;

function init() {
  // create an engine
  engine = Engine.create();
  world = engine.world;
  // create a renderer
  render = Render.create({
    element: document.getElementById("areaToRender"),
    engine: engine,
    options: {
      width: 800,
      height: 600,
      pixelRatio: 1,
      background: "#FAFAFA",
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
}

//this function clears world between games
function clearWorld() {
  Matter.Composite.clear(world, false);
}

function carFunc() {
  clearWorld();

  // Add bodies
  Composite.add(world, [
    // Grounds
    Bodies.rectangle(400, 590, 800, 20, { isStatic: true }), // Bottom ground

    // Left ramp
    Bodies.rectangle(260, 550, 400, 20, {
      isStatic: true,
      angle: -Math.PI * 0.1,
      render: { fillStyle: "#060a19" },
      label: "Left ramp",
    }),

    // Right ramp
    Bodies.rectangle(600, 550, 400, 20, {
      isStatic: true,
      angle: Math.PI * 0.1,
      render: { fillStyle: "#060a19" },
      label: "Right ramp",
    }),

    // Gap
    Bodies.rectangle(400, 550, 100, 150, {
      isStatic: true,
      render: { fillStyle: "#FAFAFA" },
      label: "Gap",
    }),
  ]);

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
  Composite.add(world, carBody);

  let hasWon = false; // Track if the player has already won

  // Check car position on the right side of the canvas
  function checkWinCondition() {
    if (!hasWon && carBody.bodies[0].position.x > render.options.width) {
      hasWon = true; // Set the flag to true to prevent further checks
      displayWinMessage();
      Events.off(engine, "beforeUpdate", checkWinCondition); // Stop checking the win condition
    }
  }

  // Display the win message
  function displayWinMessage() {
    let winMessage = document.createElement("div");
    winMessage.textContent = "Congratulations! You won!";
    winMessage.classList.add("win-message");
    document.body.appendChild(winMessage);
  }


  // Check the win condition continuously
  Events.on(engine, "beforeUpdate", checkWinCondition);
}

let boundaryWidth = 20; // Adjust the width as needed
let boundaryHeight = render.options.height; // Use the height of the render canvas
let boundaryThickness = 40; // Adjust the thickness as needed

let boundaryLeft = Bodies.rectangle(
  -boundaryThickness / 2,
  boundaryHeight / 2 + 40, // Adjust the drop point by modifying the constant value
  boundaryThickness,
  boundaryHeight + 80, // Adjust the height by modifying the constant value
  { isStatic: true }
);

Composite.add(world, boundaryLeft);

// Fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 800, y: 600 },
});

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

  console.log(body);
  Composite.addBody(car, body);
  Composite.addBody(car, wheelA);
  Composite.addBody(car, wheelB);
  Composite.addConstraint(car, axelA);
  Composite.addConstraint(car, axelB);

  return car;
}
