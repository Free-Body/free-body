import React, { useEffect, useRef } from "react";
import p2 from "p2";

const BuoyancySimulation = () => {
  const objectContainerRef = useRef();
  const addObjectButtonRef = useRef();
  const resetButtonRef = useRef();

  useEffect(() => {
    const objectContainer = objectContainerRef.current;
    const addObjectButton = addObjectButtonRef.current;
    const resetButton = resetButtonRef.current;

    addObjectButton.addEventListener("click", createObject);
    resetButton.addEventListener("click", resetObjects);

    let world;
    let plane;

    function initializeSimulation() {
      world = new p2.World({
        gravity: [0, -10],
      });

      plane = new p2.Body({
        position: [0, 0],
        collisionResponse: false,
      });
      const planeShape = new p2.Plane();
      plane.addShape(planeShape);
      world.addBody(plane);

      createObject();
      animate();
    }

    function createObject() {
      const objectElement = document.createElement("div");
      objectElement.classList.add("object-container");

      const massSlider = document.createElement("input");
      massSlider.type = "range";
      massSlider.classList.add("massSlider");
      massSlider.min = "0.1";
      massSlider.max = "100";
      massSlider.step = "0.1";
      massSlider.value = "1";

      const massValue = document.createElement("span");
      massValue.classList.add("massValue");
      massValue.textContent = "1";

      const massUnit = document.createElement("span");
      massUnit.classList.add("massUnit");
      massUnit.textContent = "kg";

      objectElement.appendChild(massSlider);
      objectElement.appendChild(massValue);
      objectElement.appendChild(massUnit);
      objectContainer.appendChild(objectElement);

      const object = new p2.Body({
        mass: parseFloat(massSlider.value),
        position: [0, 2],
        angularVelocity: 0.5,
      });
      object.addShape(new p2.Circle({ radius: 0.5 }), [0.5, 0], 0);
      object.addShape(new p2.Circle({ radius: 0.5 }), [-0.5, 0], 0);
      world.addBody(object);
    }

    function resetObjects() {
      objectContainer.innerHTML = "";
      world.bodies.forEach((body) => world.removeBody(body));
    }

    function animate() {
      world.step(1 / 60);

      // Update the objects' positions
      for (let i = 0; i < world.bodies.length; i++) {
        const body = world.bodies[i];
        if (body.shapes.length === 0) continue;

        const objectElement = objectContainer.children[i];
        const position = body.position;
        const angle = body.angle;

        objectElement.style.transform = `translate(${position[0] * 100}px, ${
          -position[1] * 100
        }px) rotate(${angle}rad)`;
      }

      requestAnimationFrame(animate);
    }

    initializeSimulation();
  }, []);

  return (
    <div>
      <h1 id="header">Free Floating Simulation</h1>
      <div>
        <div className="instructions">
          <p>Click to drag objects or the water</p>
          <p>Scroll to zoom in</p>
          <p>
            Try seeing how many items you can stack or just play around with the
            objects!
          </p>
          <p>
            Press A once to draw circles/Press A again to go back to draggable
            objects
          </p>
          <p>
            Press D once to draw custom shapes/Press D again to go back to
            draggable objects
          </p>
          <p>
            Press F once to draw solid rectangles as obstacles/Press F again to
            go back to draggable objects
          </p>
        </div>
      </div>

      <div id="objectContainer" ref={objectContainerRef}>
        <div className="object-container"></div>
      </div>
      <button id="addObjectButton" ref={addObjectButtonRef}>
        Add Object
      </button>
      <button id="resetButton" ref={resetButtonRef}>
        Reset
      </button>
    </div>
  );
};

export default BuoyancySimulation;
