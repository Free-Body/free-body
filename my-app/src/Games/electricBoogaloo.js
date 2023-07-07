import Matter from "matter-js"

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
  engine = Engine.create();
  render = Render.create({
    element: document.getElementById("areaToRender"),
    engine: engine,
    options: {
      width: 1000,
      height: 570,
      pixelRatio: 1,
      background: "#FFF",
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

function StartCircuit() {
    clearWorld();
}