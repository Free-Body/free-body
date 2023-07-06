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
          wireframes: false, // <-- important
          showAngleIndicator: true,
          showCollisions: true
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



function carFunc () {
  clearWorld();

  // add bodies
  Composite.add(world, [
    // walls
    Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
    Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
    Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),
  ]);
 
    // see car function defined later in this file
    var scale = 0.9;
    Composite.add(world, car(150, 100, 150 * scale, 30 * scale, 30 * scale));
    
    scale = 0.8;
    Composite.add(world, car(350, 300, 150 * scale, 30 * scale, 30 * scale));
    
    Composite.add(world, [
        Bodies.rectangle(200, 150, 400, 20, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: '#060a19' }}),
        Bodies.rectangle(500, 350, 650, 20, { isStatic: true, angle: -Math.PI * 0.06, render: { fillStyle: '#060a19' }}),
        Bodies.rectangle(300, 560, 600, 20, { isStatic: true, angle: Math.PI * 0.04, render: { fillStyle: '#060a19' }})
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

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
function car (xx, yy, width, height, wheelSize) {
  var Body = Matter.Body,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Constraint = Matter.Constraint;

  var group = Body.nextGroup(true),
      wheelBase = 20,
      wheelAOffset = -width * 0.5 + wheelBase,
      wheelBOffset = width * 0.5 - wheelBase,
      wheelYOffset = 0;

  var car = Composite.create({ label: 'Car' }),
      body = Bodies.rectangle(xx, yy, width, height, { 
          collisionFilter: {
              group: group
          },
          chamfer: {
              radius: height * 0.5
          },
          density: 0.0002
      });

  var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, { 
      collisionFilter: {
          group: group
      },
      friction: 0.8
  });
              
  var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, { 
      collisionFilter: {
          group: group
      },
      friction: 0.8
  });
              
  var axelA = Constraint.create({
      bodyB: body,
      pointB: { x: wheelAOffset, y: wheelYOffset },
      bodyA: wheelA,
      stiffness: 1,
      length: 0
  });
                  
  var axelB = Constraint.create({
      bodyB: body,
      pointB: { x: wheelBOffset, y: wheelYOffset },
      bodyA: wheelB,
      stiffness: 1,
      length: 0
  });
  
  Composite.addBody(car, body);
  Composite.addBody(car, wheelA);
  Composite.addBody(car, wheelB);
  Composite.addConstraint(car, axelA);
  Composite.addConstraint(car, axelB);

  return car;
};