let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Events = Matter.Events;
//variables dedicated to the objects for the work with matter.js
let engine;
let render;
let runner;
let knockedBlocks = 0;
//this function initializes the aggregate
function init() {
  const winMessage = document.createElement("h2");
  winMessage.id = "winMessage";
  document.body.appendChild(winMessage);
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
      background: "#FAFAFA",
      wireframes: false, // <-- important
    },
  });
  // run the renderer
  Render.run(render);
  // create runner
  runner = Runner.create();
  // run the engine
  Runner.run(runner, engine);
}
let lastClear = "(not given)";
//this function clears world between games
function clearWorld() {
  Matter.Composite.clear(engine.world, false);
}

// pyramid class
class Pyramid {
  constructor(ground2_x) {
    this.position = ground2_x - 60;
    this.body = Composites.pyramid(
      ground2_x - 60,
      0,
      3,
      6,
      0,
      0,
      function (x, y) {
        return Bodies.rectangle(x, y, 25, 40, { label: "hitBlock" });
      }
    );
    this.blockCount = 4;
  }
  knockOver() {
    this.blockCount--;
    if (this.blockCount === 0) {
      // Display win message
      const winMessage = document.createElement("h2");
      winMessage.textContent = "You won!";
      document.body.appendChild(winMessage);

      setTimeout(function () {
        winMessage.remove();
      }, 5000);
    }
  }
}
function StartSlingshot() {
  clearWorld();
  //constants
  let width = 800;
  let height = 600;
  let groundWidth = 815;
  let groundHeight = 50;
  // grab HTML
  let heightRange = document.getElementById("heightRange");
  let heightVal = document.getElementById("heightVal");
  let realHeight = height - heightRange.value;
  let massRange = document.getElementById("massRange");
  let massVal = document.getElementById("massVal");
  let realMass = massRange.value;
  // add bodies
  let ground = Bodies.rectangle(width / 2, height, groundWidth, groundHeight, {
    isStatic: true,
  });
  let rockOptions = { density: 0.004 };
  let rock = Bodies.polygon(170, realHeight, 8, realMass, rockOptions);
  let anchor = { x: 170, y: realHeight };
  let elastic = Constraint.create({
    pointA: anchor,
    bodyB: rock,
    length: 0.01,
    damping: 0.01,
    stiffness: 0.05,
    render: { strokeStyle: "gray", lineWidth: 2 },
  });
  // adjust height
  heightRange.addEventListener("input", function () {
    let heightInput = parseFloat(heightRange.value);
    realHeight = height - heightRange.value;
    anchor.y = realHeight;
    heightVal.innerHTML = `${heightInput}`;
    Engine.update(engine);
  });
  // adjust mass
  massRange.addEventListener("input", function () {
    let massValue = parseFloat(massRange.value);
    realMass = massValue;
    rock.mass = massValue;
    massVal.innerHTML = `${massValue}`;
    rock = Bodies.polygon(170, realHeight, 7, massValue, rockOptions);
    Composite.add(engine.world, rock);
    elastic.bodyB = rock;
    Engine.update(engine);
  });
  // set pyramid
  let ground2_x = Math.floor(Math.random() * (width - 500) + 500);
  let ground2_y = Math.floor(Math.random() * (height - 100) + 100);
  let ground2 = Bodies.rectangle(
    ground2_x,
    ground2_y,
    groundWidth / 3,
    groundHeight / 3,
    { isStatic: true }
  );
  //   let pyramid = Composites.pyramid(ground2_x - 60, 0, 3, 6, 0, 0, function (x, y) {
  //     return Bodies.rectangle(x, y, 25, 40, {label: "hitBlock"});
  //   });
  let pyramidInstance = new Pyramid(ground2_x);
  let pyramid = pyramidInstance.body;
  // add mouse control
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
  Events.on(engine, "afterUpdate", function () {
    let blocksOnGround = 0;
    for (let body of pyramid.bodies) {
      if (body.label === "hitBlock" && body.position.y > ground2.bounds.max.y) {
        blocksOnGround++;
      }
    }

    if (blocksOnGround >= pyramidInstance.blockCount) {
      pyramidInstance.knockOver();
    }

    if (
      mouseConstraint.mouse.button === -1 &&
      (rock.position.x > 190 || rock.position.y < realHeight - 0.9 * realHeight)
    ) {
      rock = Bodies.polygon(170, realHeight, 7, realMass, rockOptions);
      Composite.add(engine.world, rock);
      elastic.bodyB = rock;
    }
  });
  Composite.add(engine.world, [ground, ground2, pyramid, rock, elastic]);
  Composite.add(engine.world, mouseConstraint);
  // keep the mouse in sync with rendering
  render.mouse = mouse;
}