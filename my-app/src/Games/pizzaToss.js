//references: https://www.codebrainer.com/blog/learn-matterjs-with-examples

import Matter from "matter-js"

let Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Body = Matter.Body,
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
export const init = function () {
  engine = Engine.create();
  render = Render.create({
    element: document.getElementById("areaToRender"),
    engine: engine,
    options: {
      width: 1000,
      height: 570,
      pixelRatio: 1,
      background: "https://sillyapron.files.wordpress.com/2014/09/kitchen062.jpg",
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
        return Bodies.rectangle(x, y, 70, 150, { label: "hitBlock", 
        render: {sprite: {texture: "https://www.pngkit.com/png/detail/938-9388574_ratatouille-ratatouille-remy.png", xScale: 70/860, yScale: 150/1593}}
       });
      }
    );
    this.blockCount = 4;
  }
  
  // Display win message
  knockOver() {
    this.blockCount--;
    if (this.blockCount === 0) {
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
  }
}

//plays game
export const StartSlingshot = function() {
  clearWorld();

  //constants
  let width = 1600;
  let height = 600;
  let groundWidth = 1600;
  let groundHeight = 100;

  // grab HTML
  let heightRange = document.getElementById("heightRange");
  let realHeight = height - heightRange.value;
  let massRange = document.getElementById("massRange");
  let realMass = massRange.value;
  let gravityRange = document.getElementById("gravityRange");

  // add bodies
  let ground = Bodies.rectangle(width / 2, height, groundWidth, groundHeight, {isStatic: true,});
  let wall = Bodies.rectangle(width, height /2, 1, height, {isStatic: true});
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

  // adjust gravity
  gravityRange.addEventListener("mouseup", function() {gravityListener()});

  // set pyramid
  let ground2_x = Math.floor(Math.random() * (1000 - 600) + 450);
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

  //checks results of collision  
  Events.on(engine, "afterUpdate", function () {
    results(pyramid, pyramidInstance, ground2, mouseConstraint, pizza, realHeight, realMass, elastic);
    if (
      mouseConstraint.mouse.button === -1 &&
      (pizza.position.x > 190 || pizza.position.y < realHeight - 0.9 * realHeight)
    ) {
      let massValue = massListener(pizza, realHeight, elastic);
      pizza = createPizza(realHeight, massValue);
      Composite.add(engine.world, pizza);
      elastic.bodyB = pizza;
    }
  });

  Composite.add(engine.world, [ground, ground2, pyramid, pizza, elastic, wall]);
  Composite.add(engine.world, mouseConstraint);
  render.mouse = mouse;
}

function createPizza(realHeight, realMass) {
  let pizzaOptions = { density: 0.004, render: {sprite: {texture: "https://static.vecteezy.com/system/resources/previews/009/384/620/original/fresh-pizza-and-pizza-box-clipart-design-illustration-free-png.png", xScale: realMass/1000, yScale: realMass/900}}};
  let pizza = Bodies.polygon(170, realHeight, 8, realMass, pizzaOptions);
  return pizza;
}

function createGround2(groundWidth, groundHeight, height, ground2_x) {
  let ground2_y = Math.floor(Math.random() * (height - 400) + 300);
  let ground2 = Bodies.rectangle(
    ground2_x,
    ground2_y,
    groundWidth / 4,
    groundHeight / 3,
    { isStatic: true }
  );
  return ground2;
}

function heightListener(height, anchor) {
  let heightRange = document.getElementById("heightRange");
  let heightVal = document.getElementById("heightVal");
  let realHeight = height - heightRange.value;
  let heightInput = parseFloat(heightRange.value);
  realHeight = height - heightRange.value;
  anchor.y = realHeight;
  heightVal.innerHTML = `${heightInput}`;
  Engine.update(engine);
}

function massListener(pizza) {
  let massRange = document.getElementById("massRange");
  let massVal = document.getElementById("massVal");
  let massValue = parseFloat(massRange.value);
  pizza.mass = massValue;
  massVal.innerHTML = `${massValue}`;
  return massValue;
}

function gravityListener() {
  let gravityRange = document.getElementById("gravityRange");
  let gravityVal = document.getElementById("gravityVal");
  let gravityValue = gravityRange.value;
  gravityVal.innerHTML = `${gravityValue}`
  engine.gravity.scale = gravityValue;
  Engine.update(engine);
}

function results(pyramid, pyramidInstance, ground2) {
  let blocksOnGround = 0;
  for (let body of pyramid.bodies) {
    if (body.label === "hitBlock" && (body.position.y > ground2.bounds.max.y || body.position.x > ground2.bounds.max.x)) {
      blocksOnGround++;
    }
  }

  if (blocksOnGround >= pyramidInstance.blockCount) {
    pyramidInstance.knockOver();
  }
}

export const Challenge = function () {
  clearWorld();

  //constants
  let width = 1600;
  let height = 600;
  let groundWidth = 1600;
  let groundHeight = 100;

  // grab HTML
  let realHeight = 600;
  let massRange = document.getElementById("massRange");
  let realMass = massRange.value;
  let gravityRange = document.getElementById("gravityRange");
  let yvelocityRange = document.getElementById("yvelocityRange");
  let yVelocity = yvelocityRange.value;
  let xvelocityRange = document.getElementById("xvelocityRange");
  let xVelocity = xvelocityRange.value;

  // add bodies
  let ground = Bodies.rectangle(width / 2, height, groundWidth, groundHeight, {isStatic: true,});
  let wall = Bodies.rectangle(width, height /2, 1, height, {isStatic: true});
  let pizza = createPizza(realHeight, realMass);


  Body.setVelocity(pizza, {x: xVelocity, y: -yVelocity})
  // adjust mass
  massRange.addEventListener("mouseup", function () {
    let massValue = massListener(pizza, realHeight);
    pizza = createPizza(realHeight, massValue);
    Composite.add(engine.world, pizza);
    Engine.update(engine);
  });

  // adjust gravity
  gravityRange.addEventListener("mouseup", function() {gravityListener()});
  yvelocityRange.addEventListener("mouseup", function() {gravityListener()});
  xvelocityRange.addEventListener("mouseup", function() {gravityListener()});

  // set pyramid
  let ground2_x = Math.floor(Math.random() * (1000 - 600) + 450);
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

  //checks results of collision  
  Events.on(engine, "afterUpdate", function () {
    results(pyramid, pyramidInstance, ground2, mouseConstraint, pizza, realHeight, realMass);
    if (
      mouseConstraint.mouse.button === -1 &&
      (pizza.position.x > 190 || pizza.position.y < realHeight - 0.9 * realHeight)
    ) {
      let massValue = massListener(pizza, realHeight);
      pizza = createPizza(realHeight, massValue);
      Composite.add(engine.world, pizza);
    }
  });

  Composite.add(engine.world, [ground, ground2, pyramid, pizza, wall]);
  Composite.add(engine.world, mouseConstraint);
  render.mouse = mouse;
}