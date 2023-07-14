import React from "react";
import "../howstyle.css";

const Acceleration = () => {
  return (
    <div className="howitworks">
      <h1 className="head">Learn about Acceleration on Ramps</h1>

      <section className="section">
        <h2 className="section-header">Introduction to Ramps</h2>
        <p>Ramps, also called inclined planes, are a common way to illustrate kinematics. These simple machines are an uneven surface in which one side of the plane is higher in the air than the other. When objects are on a ramp, the force of gravity is only a fraction of what it normally is because the object is at an angle to the surface of the earth.</p>
      </section>

      <img className="howimages" alt="ramp fbd" src={require("../images/rampgraph.png")} />

      <a className='source' href="https://www.dummies.com/article/academics-the-arts/science/physics/friction-on-inclined-surfaces-in-physics-problems-141159/">Source</a>

      <section className="section">
        <h2 className="section-header">Acceleration on Ramps</h2>
        <p>Using geometry, we can determine that the fraction of gravity acting on the object on a ramp would be <span className="keyword">mFgsinΘ</span>, where <span className="keyword">m</span> is the mass of the object, <span className="keyword">Fg</span> is the acceleration due to gravity, and <span className="keyword">Θ</span> is the angle of the incline. In order for an object to move up a ramp, it must overcome the downward force of gravity.</p>
      </section>

      <section className="section">
        <h2 className="section-header">Driving Up a Ramp</h2>
        <p>Now imagine a stunt car driver wants to drive up a ramp. For the car to go up the ramp, it needs enough acceleration that its force up the ramp, <span className="keyword">F = ma</span>, is greater than the force down the ramp, <span className="keyword">mFgsinΘ</span>.</p>
        <h3 className="subsection-header">Easier to Understand</h3>
        <p><strong>To make it easier to understand, let's consider a real-life example</strong>:</p>
        <p>Imagine you are pushing a heavy box up a steep hill. The force of gravity is pulling the box downward, trying to make it slide back down the hill. The force you apply in the uphill direction needs to be greater than the force of gravity to overcome it and make the box move up the hill.</p>
      </section>
      <section className='section'>
      <h2 className="section-header">Conclusion</h2>
        <p>Furthermore, in order for the stunt driver to clear a gap between two ramps, the driver must go fast enough to not only go up the ramp but also have enough velocity at the end of the first ramp to go high enough and far enough to clear the second ramp. At the gap where the car is seemingly floating in the air, the car would be moving like a projectile. This means that acceleration will not help once the car is "launched" in the air because there is no ground for the car to accelerate on.</p>
      </section>
    </div>
  );
};

export default Acceleration;
