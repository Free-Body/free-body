import React from "react";
import "../howstyle.css";

const Projectiles = () => {
  return (
    <div class="howitworks">
      <h1 className="head">Learn about Projectile Motion</h1>
      <p>Kinematics relates to the physics of motion. It is one of the core concepts of physics. Projectile motion is a common scenario used when explaining kinematics of objects. Projectile motion is the motion of  an object thrown or projected  in the air under the influence of gravity. Motion refers to the change in position of an object over time.</p>
      <p>Kinematic equations are a set of equations that can be used to describe the object’s motion using algebra to help us understand how objects move.</p>
      <ul>Variables used in the kinematic equations
        <li>Speed is how fast an object is moving (e.g., a car is moving at 5 meters per second) </li>
        <li>Velocity includes speed and direction (e.g., a car is moving 5 meters per second north) </li>
        <li>Acceleration is how quickly the velocity to slow down or speed up. It accounts for change in magnitude and direction. ( e.g., car is initially moving 5 meters per second, speeds up by 1 meter per second over a three second interval, but then brakes for a stop light)</li>
      </ul>
      <ul>We use metric units to measure these variables. Units are like the names we give to people: they identify something.
        <li>position/distance: meters (m)</li>
        <li>velocity: meter/second (m/s)</li>
        <li>acceleration: meters/seconds squared (m/s<sup>2</sup>)</li>
      </ul>
      <ul>The equations that make up the basis of kinematics are as follows:
        <li>Δv = v<sub>0</sub>+at where v: final velocity, v<sub>0</sub>: initial velocity, a: acceleration (gravity), t: time. This equation shows velocity increases depending on the acceleration and time traveled.</li>
        <li>Δx =(v+v<sub>0</sub><sup>2</sup>) where Δx: change of distance (xfinal-xinitial). This equation shows position will change depending on the change in velocity over time and the time traveled.</li>
        <li>Δx = v<sub>0</sub> t + 1/2 a t<sup>2</sup> where a: acceleration. This equation is similar to the previous, but uses acceleration instead of change in velocity, since change in velocity and acceleration are the same!</li>
        <li>v<sup>2</sup> = v<sub>0</sub><sup>2</sup> + 2aΔx. This equation is similar to the first equation, but it uses change in position instead of time. It shows that an increase in velocity will lead to more of a position displacement. </li>
      </ul>
      <p>In projectile motion, objects are launched an an angle and are under the influence of gravity. Gravity itself is acceleration towards the earth, and since acceleration changes velocity, this will affect either the magnitude or direction of the velocity of an object. This is why objects in projectile motion move in an arc rather than a straight line!  </p>
      <img src={require("../images/pm.jpeg")} alt="projectile motion graph" /> <a href="https://www.pathwayz.org/Tree/Plain/PROJECTILE+MOTION">Source</a>
    </div>
  );
};

export default Projectiles;
