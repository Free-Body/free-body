//https://www.codebrainer.com/blog/learn-matterjs-with-examples

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
            background: '#fafafa',
            wireframes: false // <-- important
        }
    });
   
    // run the renderer
    Render.run(render);
   
    // create runner
    runner = Runner.create();
   
    // run the engine
    Runner.run(runner, engine);
}

let lastClear = "(not given)"

//this function clears world between examples
function clearWorld(exampleName) {
 if (lastClear != exampleName) {
    lastClear = exampleName

    Matter.Composite.clear(engine.world, false)
 }
}

function StartBoxes() {
    clearWorld("Boxes")
    // create two boxes and a ground
    let boxA = Bodies.rectangle(400, 200, 80, 80);
    let boxB = Bodies.rectangle(450, 50, 80, 80, {
        render: {
            fillStyle: 'red',
            strokeStyle: 'blue',
            lineWidth: 3
        }
    });
    let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
   
    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, ground]);
   
    Engine.update(engine);
}

function StartBalloon() {
    clearWorld("Balloon")
    // engine.gravity = -0.6
    engine.world.density = 1
   
    // create two boxes and a ground
    let balloon1 = Bodies.circle(450, 450, 80, {
        mass: 0.001,
        render: {
            fillStyle: 'red',
            strokeStyle: 'blue',
            lineWidth: 3,
        }
    });
    let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
   
   
    // add all of the bodies to the world
    Composite.add(engine.world, [balloon1, ground]);
   
    setInterval(() => {
        Matter.Body.applyForce(balloon1, balloon1.position, { x: 0, y: -balloon1.mass / 100 })
    }, 100)
   
    Engine.update(engine);
   }

let ropes = [];
function StartBalloonWithString() {
    clearWorld("BalloonWitString")
    engine.world.density = 1

    // create two boxes and a ground
    let balloon1 = Bodies.circle(500, 500, 80, {
        mass: 0.001,
        render: {
            fillStyle: 'red',
            strokeStyle: 'blue',
            lineWidth: 3,
        }
    });
    let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });


    // add all of the bodies to the world
    Composite.add(engine.world, [balloon1, ground]);

     //add a string
 let rope = Constraint.create({
    pointA: { x: 200, y: 550 },
    bodyB: balloon1,
    render: { strokeStyle: 'gray', lineWidth: 2, }
    })
    Composite.add(engine.world, rope);
    ropes.push(rope)
   
   
    setInterval(() => {
    Matter.Body.applyForce(balloon1, balloon1.position, { x: 0, y: -balloon1.mass / 100 })
    }, 100)
   
   
    Engine.update(engine);
}

function CutTheRope() {
    let rope = ropes[0]
    Composite.remove(engine.world, rope)
    ropes.shift()
}

function StartSlingshot() {
    clearWorld("Slingshot")
   
    // add bodies
    let ground = Bodies.rectangle(395, 600, 815, 50, { isStatic: true });
    let rockOptions = { density: 0.004 };
    let rock = Bodies.polygon(170, 450, 8, 20, rockOptions);
    let anchor = { x: 170, y: 450 };
    let elastic = Constraint.create({
        pointA: anchor,
        bodyB: rock,
        stiffness: 0.05,
        render: { strokeStyle: 'gray', lineWidth: 2 }
    });
    let ground2 = Bodies.rectangle(610, 250, 200, 20, { isStatic: true });
   
    let pyramid = Composites.pyramid(550, 0, 5, 10, 0, 0, function (x, y) {
    return Bodies.rectangle(x, y, 25, 40);
    });

    // add mouse control
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

    Events.on(engine, 'afterUpdate', function () {
        if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
            rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
            Composite.add(engine.world, rock);
            elastic.bodyB = rock;
        }
        });

        Composite.add(engine.world, [ground, ground2, pyramid, rock, elastic]);
        Composite.add(engine.world, mouseConstraint);
       
        // keep the mouse in sync with rendering
        render.mouse = mouse;
}

