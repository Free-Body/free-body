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
    }),

    // Right ramp
    Bodies.rectangle(600, 550, 400, 20, {
      isStatic: true,
      angle: Math.PI * 0.1,
      render: { fillStyle: "#060a19" },
    }),

    // Gap
    Bodies.rectangle(400, 550, 100, 150, {
      isStatic: true,
      render: { fillStyle: "#FAFAFA" },
    }),
  ]);

  // See car function defined later in this file
  let scale = 0.9;
  let carBody = car(60, 100, 150 * scale, 30 * scale, 30 * scale); // Adjust the position of the car as needed

  // Add the car body to the world
  Composite.add(world, carBody);

  // Adjust the position of the car to match the bottom of the left ramp
  let leftRamp = world.bodies.find((body) => body.label === "Left ramp");
  let carBottom = carBody.position.y + carBody.bounds.max.y;
  let yPos = leftRamp.bounds.min.y - carBottom;

  Body.translate(carBody, { x: 0, y: yPos });

  // Create a constraint to restrict the car's movement on the left side
  let leftWall = Bodies.rectangle(
    -10,
    render.bounds.height / 2,
    20,
    render.bounds.height,
    {
      isStatic: true,
      render: { visible: false },
    }
  );

  let constraint = Constraint.create({
    bodyA: leftWall,
    bodyB: carBody,
    pointB: { x: -carBody.bounds.max.x, y: 0 },
    stiffness: 1,
  });

  Composite.add(world, [leftWall, constraint]);

  // Add mouse control (optional)
  let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

  Composite.add(world, mouseConstraint);

  // Keep the mouse in sync with rendering
  render.mouse = mouse;

  // Fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 },
  });

  // Context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
  };
}

/**
 * Creates a composite with simple car setup of bodies and constraints.
 * @method car
 * @param {number} xx
 * @param {number} yy
 * @param {number} width
 * @param {number} height
 * @param {number} wheelSize
 * @return {composite} A new composite car body
 */
function car(xx, yy, width, height, wheelSize) {
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

  Composite.addBody(car, body);
  Composite.addBody(car, wheelA);
  Composite.addBody(car, wheelB);
  Composite.addConstraint(car, axelA);
  Composite.addConstraint(car, axelB);

  return car;
}
