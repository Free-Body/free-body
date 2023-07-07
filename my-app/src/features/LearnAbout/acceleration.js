import React from "react";
import "../howstyle.css";

const Acceleration = () => {
  return (
    <div class="howitworks">
      <h1 className="head">Learn about Acceleration on Ramps</h1>
      <p>Ramps, also called inclined planes, are a common way to illustrate kinematics. These simple machines are an uneven surface in which one side of the plane is higher in the air than the other. When objects are on a ramp, the force of gravity is only a fraction of what it normally is because the object is at an angle to the surface of the earth. Using geometry, we can determine that the fraction of gravity acting on the object would be mFgsinΘ, where m is the mass of the object, Fg is the acceleration due to gravity, and Θ is the angle of the incline. In order for an object to move up a ramp, it must overcome the downward force of gravity. </p>
      <img alt="ramp fbd" src={require("../images/fbd.png")}/> 
      <a href="https://www.dummies.com/article/academics-the-arts/science/physics/friction-on-inclined-surfaces-in-physics-problems-141159/">Source</a>
      <p> Now imagine a stunt car driver wants to drive up a ramp. If they want to go up the ramp, they need the car to have enough acceleration that its force up the ramp, F=ma, is greater than the force down the ramp, mFgsinΘ. Furthermore, in order for the stunt driver to clear a gap between two ramps, the driver must go fast enough to not only go up the ramp, but also have enough velocity at the end of the first ramp to go high enough and far enough to clear the second ramp. At the gap where the car is seemingly floating in the air, the car would be moving like a projectile! Acceleration will not help once the car is “launched” in the air because there is no ground for the car to accelerate on. </p>
    </div>
  );
};

export default Acceleration;
