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

//this function initializes the aggregate
function init() {
  const winMessage = document.createElement("h2");
  winMessage.id = "winMessage";
  document.body.appendChild(winMessage);
  engine = Engine.create();
  render = Render.create({
    element: document.getElementById("areaToRender"),
    engine: engine,
    options: {
      width: 1000,
      height: 600,
      pixelRatio: 1,
      background: "#FAFAFA",
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

// pyramid class
class Pyramid {
  constructor(ground2_x) {
    this.position = ground2_x - 100;
    this.body = Composites.pyramid(
      ground2_x - 80,
      0,
      3,
      6,
      0,
      0,
      function (x, y) {
        return Bodies.rectangle(x, y, 70, 100, { label: "hitBlock", render: {sprite: {texture: "../../public/remy.png", xScale: 80/595, yScale: 100/858}} });
      }
    );
    this.blockCount = 4;
  }
  
  // Display win message
  knockOver() {
    this.blockCount--;
    if (this.blockCount === 0) {
      const winMessage = document.createElement("h2");
      winMessage.textContent = "You won!";
      document.body.appendChild(winMessage);

      setTimeout(function () {
        winMessage.remove();
      }, 5000);
    }
  }
}

//plays game
function StartSlingshot() {
  clearWorld();

  //constants
  let width = 1000;
  let height = 600;
  let groundWidth = 1000;
  let groundHeight = 50;

  // grab HTML
  let heightRange = document.getElementById("heightRange");
  let realHeight = height - heightRange.value;
  let massRange = document.getElementById("massRange");
  let realMass = massRange.value;

  // add bodies
  let ground = Bodies.rectangle(width / 2, height, groundWidth, groundHeight, {
    isStatic: true,
  });
  let pizza = createPizza(realHeight, realMass);
  let anchor = { x: 170, y: realHeight };
  let elastic = Constraint.create({
    pointA: anchor,
    bodyB: pizza,
    length: 0.01,
    damping: 0.01,
    stiffness: 0.05,
    render: { strokeStyle: "gray", lineWidth: 2 },
  });

  // adjust height
  heightRange.addEventListener("mouseup",  function() {heightListener(height, anchor)});

  // adjust mass
  massRange.addEventListener("mouseup", function () {
    let massValue = massListener(pizza, realHeight, elastic);
    pizza = createPizza(realHeight, massValue);
    Composite.add(engine.world, pizza);
    elastic.bodyB = pizza;
    Engine.update(engine);
  });

  // set pyramid
  let ground2_x = Math.floor(Math.random() * (width - 500) + 450);
  let ground2 = createGround2(groundWidth, groundHeight, height, ground2_x);

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
    results(pyramid, pyramidInstance, ground2, mouseConstraint, pizza, realHeight, realMass, elastic);
    if (
      mouseConstraint.mouse.button === -1 &&
      (pizza.position.x > 190 || pizza.position.y < realHeight - 0.9 * realHeight)
    ) {
      pizza = createPizza(realHeight, realMass);
      Composite.add(engine.world, pizza);
      elastic.bodyB = pizza;
    }
  });

  Composite.add(engine.world, [ground, ground2, pyramid, pizza, elastic]);
  Composite.add(engine.world, mouseConstraint);
  render.mouse = mouse;
}

function createPizza(realHeight, realMass) {
  let pizzaOptions = { density: 0.004, render: { sprite: {texture: "../../public/pizza.png", xScale: realMass/2000, yScale: realMass/2011}} };
  let pizza = Bodies.polygon(170, realHeight, 8, realMass, pizzaOptions);
  return pizza;
}

function createGround2(groundWidth, groundHeight, height, ground2_x) {
  let ground2_y = Math.floor(Math.random() * (height - 400) + 300);
  let ground2 = Bodies.rectangle(
    ground2_x,
    ground2_y,
    groundWidth / 2,
    groundHeight / 3,
    { isStatic: true }
  );
  return ground2;
}

function heightListener(height, anchor) {
  let heightRange = document.getElementById("heightRange");
  let heightVal = document.getElementById("heightVal");
  let realHeight = height - heightRange.value;
  console.log(heightRange.value)
  let heightInput = parseFloat(heightRange.value);
  realHeight = height - heightRange.value;
  anchor.y = realHeight;
  heightVal.innerHTML = `${heightInput}`;
  Engine.update(engine);
}

function massListener(pizza, realHeight, elastic) {
  let massRange = document.getElementById("massRange");
  let massVal = document.getElementById("massVal");
  let massValue = parseFloat(massRange.value);
  pizza.mass = massValue;
  massVal.innerHTML = `${massValue}`;
  return massValue;
}

function results(pyramid, pyramidInstance, ground2) {
  let blocksOnGround = 0;
  for (let body of pyramid.bodies) {
    if (body.label === "hitBlock" && body.position.y > ground2.bounds.max.y) {
      blocksOnGround++;
    }
  }

  if (blocksOnGround >= pyramidInstance.blockCount) {
    pyramidInstance.knockOver();
  }
}