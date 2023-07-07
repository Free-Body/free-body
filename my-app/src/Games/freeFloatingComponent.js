import React, { useEffect } from "react";
import p2 from "p2";
import "../../p2.min.js";
import "../../p2.renderer.min.js";

const FreeFloatingComponent = () => {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function (event) {
      let app = new p2.WebGLRenderer(function () {
        let world = new p2.World({
          gravity: [0, -10],
        });

        this.setWorld(world);

        let planeShape = new p2.Plane();
        let plane = new p2.Body({
          position: [0, 0],
          collisionResponse: false,
        });
        plane.addShape(planeShape);
        world.addBody(plane);

        let objects = [];

        let objectContainer = document.getElementById("objectContainer");
        let addObjectButton = document.getElementById("addObjectButton");
        let resetButton = document.getElementById("resetButton");

        addObjectButton.addEventListener("click", function () {
          createObject();
        });

        resetButton.addEventListener("click", function () {
          objectContainer.innerHTML = "";

          objects.forEach(function (object) {
            world.removeBody(object.body);
          });

          objects = [];
        });

        function createObject() {
          let objectElement = document.createElement("div");
          objectElement.classList.add("object-container");

          let massSlider = document.createElement("input");
          massSlider.type = "range";
          massSlider.classList.add("massSlider");
          massSlider.min = "0.1";
          massSlider.max = "100";
          massSlider.step = "0.1";
          massSlider.value = "1";

          let massValue = document.createElement("span");
          massValue.classList.add("massValue");
          massValue.textContent = "1";

          let massUnit = document.createElement("span");
          massUnit.classList.add("massUnit");
          massUnit.textContent = "kg";

          objectElement.appendChild(massSlider);
          objectElement.appendChild(massValue);
          objectElement.appendChild(massUnit);

          objectContainer.appendChild(objectElement);

          let object = new p2.Body({
            mass: parseFloat(massSlider.value),
            position: [0, 2],
            angularVelocity: 0.5,
          });
          object.addShape(new p2.Circle({ radius: 0.5 }), [0.5, 0], 0);
          object.addShape(new p2.Circle({ radius: 0.5 }), [-0.5, 0], 0);
          world.addBody(object);

          objects.push({
            body: object,
            massSlider: massSlider,
            massValue: massValue,
          });

          // Update masses on slider change
          massSlider.addEventListener("input", function () {
            object.mass = parseFloat(massSlider.value);
            massValue.textContent = massSlider.value;
          });
        }

        createObject(); // Create initial object

        // Add forces every step
        world.on("postStep", function () {
          for (let i = 0; i < objects.length; i++) {
            let obj = objects[i];
            applyAABBBuoyancyForces(obj.body, plane.position, k, c);
          }
        });

        let shapePosition = [0, 0];
        let centerOfBouyancy = [0, 0];
        let liftForce = [0, 0];
        let viscousForce = [0, 0];
        let shapeAngle = 0;
        let k = 100; // up force per submerged "volume"
        let c = 0.8; // viscosity
        let v = [0, 0];
        let aabb = new p2.AABB();

        function applyAABBBuoyancyForces(body, planePosition, k, c) {
          for (let i = 0; i < body.shapes.length; i++) {
            let shape = body.shapes[i];

            // Get shape world transform
            body.vectorToWorldFrame(shapePosition, shape.position);
            p2.vec2.add(shapePosition, shapePosition, body.position);
            shapeAngle = shape.angle + body.angle;

            // Get shape AABB
            shape.computeAABB(aabb, shapePosition, shapeAngle);

            let areaUnderWater;
            if (aabb.upperBound[1] < planePosition[1]) {
              // Fully submerged
              p2.vec2.copy(centerOfBouyancy, shapePosition);
              areaUnderWater = shape.area;
            } else if (aabb.lowerBound[1] < planePosition[1]) {
              // Partially submerged
              let width = aabb.upperBound[0] - aabb.lowerBound[0];
              let height = 0 - aabb.lowerBound[1];
              areaUnderWater = width * height;
              p2.vec2.set(
                centerOfBouyancy,
                aabb.lowerBound[0] + width / 2,
                aabb.lowerBound[1] + height / 2
              );
            } else {
              continue;
            }

            // Compute lift force
            p2.vec2.subtract(liftForce, planePosition, centerOfBouyancy);
            p2.vec2.scale(liftForce, liftForce, areaUnderWater * k);
            liftForce[0] = 0;

            // Make center of buoyancy relative to the body
            p2.vec2.subtract(centerOfBouyancy, centerOfBouyancy, body.position);

            // Viscous force
            body.getVelocityAtPoint(v, centerOfBouyancy);
            p2.vec2.scale(viscousForce, v, -c);

            // Apply forces
            body.applyForce(viscousForce, centerOfBouyancy);
            body.applyForce(liftForce, centerOfBouyancy);
          }
        }
      });
    });
  }, []);

  return (
    <div>
      <link rel="stylesheet" href="../features/style.css" />

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
      <div id="objectContainer" className="object-container"></div>
      <button id="addObjectButton">Add Object</button>
      <button id="resetButton">Reset</button>
    </div>
  );
};

export default FreeFloatingComponent;
