import React from "react";
import "../howstyle.css";

const Projectiles = () => {
  return (
    <div className="howitworks">
      <h1 className="head">Learn about Projectile Motion</h1>
      <section>
        <h2>Introduction</h2>
        <p>
          Kinematics relates to the physics of motion. It is one of the core concepts of physics. <span className="keyword">Projectile motion</span> is a common scenario used when explaining kinematics of objects. It refers to the motion of an object thrown or projected in the air under the influence of <span className="keyword">gravity</span>. Motion refers to the change in position of an object over time.
        </p>
      </section>
      <section>
        <h2>Kinematic Equations</h2>
        <p>
          <span className="keyword">Kinematic equations</span> are a set of equations that describe an object's motion. They help us understand how objects move using algebra.
        </p>
        <ul className="variables">
          <li><span className="keyword">Speed</span>: It measures how fast an object is moving (e.g., a car moving at 5 meters per second).</li>
          <li><span className="keyword">Velocity</span>: It includes both speed and direction (e.g., a car moving 5 meters per second north).</li>
          <li><span className="keyword">Acceleration</span>: It represents how quickly the velocity changes to slow down or speed up. It accounts for changes in magnitude and direction (e.g., a car initially moving at 5 meters per second, then speeding up by 1 meter per second over a three-second interval, and finally braking for a stoplight).</li>
        </ul>
      </section>
      <section>
        <h2>Units of Measurement</h2>
        <p>
          We use metric units to measure these variables. Units are like the names we give to people: they identify something.
        </p>
        <ul className="units">
          <li><span className="keyword">Position/Distance</span>: It is measured in meters (m).</li>
          <li><span className="keyword">Velocity</span>: It is measured in meters per second (m/s).</li>
          <li><span className="keyword">Acceleration</span>: It is measured in meters per second squared (m/s<sup>2</sup>).</li>
        </ul>
      </section>
      <section>
        <h2>Kinematic Equations</h2>
        <div className="equations">
          <p>The equations that make up the basis of kinematics are as follows:</p>
          <ul>
            <li><span className="keyword">Δv = v<sub>0</sub> + at</span> where <span className="keyword">v</span> represents the final velocity, <span className="keyword">v<sub>0</sub></span> represents the initial velocity, <span className="keyword">a</span> represents the acceleration (gravity), and <span className="keyword">t</span> represents time. This equation shows that velocity increases depending on the acceleration and time traveled.</li>
            <li><span className="keyword">Δx = (v + v<sub>0</sub>)<sup>2</sup></span> where <span className="keyword">Δx</span> represents the change in distance (xfinal - xinitial). This equation shows that position changes depending on the change in velocity over time and the time traveled.</li>
            <li><span className="keyword">Δx = v<sub>0</sub>t + 1/2at<sup>2</sup></span> where <span className="keyword">a</span> represents the acceleration. This equation is similar to the previous one but uses acceleration instead of change in velocity since change in velocity and acceleration are the same!</li>
            <li><span className="keyword">v<sup>2</sup> = v<sub>0</sub><sup>2</sup> + 2aΔx</span>. This equation is similar to the first equation but uses change in position instead of time. It shows that an increase in velocity will lead to more of a position displacement.</li>
          </ul>
        </div>
      </section>
      <section>
        <h2>Projectile Motion</h2>
        <p>
          In projectile motion, objects are launched at an angle and are under the influence of <span className="keyword">gravity</span>. <span className="keyword">Gravity</span> is the force that pulls objects towards the Earth. Since acceleration changes velocity, it affects either the magnitude or direction of an object's velocity. This is why objects in projectile motion move in an arc rather than a straight line! Velocity is a vector quantity, meaning it has both a vertical and horizontal component. Since <span className="keyword">gravity</span> acts in the same direction as the vertical component, the vertical velocity of the object will change. As the object moves upwards, its vertical velocity will slow down. At the peak, the vertical velocity will switch directions and move downwards. As it moves downwards, its vertical velocity will speed up.
        </p>
        <img src={require("../images/path.png")} alt="projectile motion graph" />
      </section>
      <a className="source" href="https://www.pathwayz.org/Tree/Plain/PROJECTILE+MOTION">Source</a>
    </div>
  );
};

export default Projectiles;
