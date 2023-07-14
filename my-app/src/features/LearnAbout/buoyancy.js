import React from "react";
import "../howstyle.css";

const Buoyancy = () => {
  return (
    <div className="howitworks">
      <h1 className="head">Learn about Buoyancy</h1>

      <section className="section">
        <h2 className="section-header">Introduction to Buoyancy</h2>
        <p>Buoyancy force is an upward force of pressure that acts on an object when it is placed in a fluid, such as water. It determines whether the object floats or sinks.</p>
      </section>

      <section className="section">
        <h2 className="section-header">Buoyant Force and Magnitude</h2>
        <p>When a beach ball is placed in water, there is a force pushing it down (gravity) while the water exerts an upward force on the beach ball. The total upward force that keeps the beach ball afloat is called the <span className="keyword">buoyant force</span>. The magnitude of the buoyant force is defined as the difference between the upwards buoyant force and the downwards gravitational force.</p>
        <p><span className="formula">F<sub>net</sub> = F<sub>up</sub> - F<sub>down</sub></span> (Note: magnitude is considered a quantity and does not have a negative sign.)</p>
      </section>

      <img className='howimages' src={require("../images/boy.png")} alt="buoyancy fbd" />

      <section className="section">
        <h2 className="section-header">Factors Affecting Buoyant Force</h2>
        <ul className="factors">
          <li><span className="keyword">Density</span> of the fluid</li>
          <li><span className="keyword">Volume</span> of the displaced fluid</li>
          <li><span className="keyword">Gravity</span></li>
        </ul>
        <p>These factors are described by <span className="keyword">Archimedes' principle</span>:</p>
        <p><span className="formula">F<sub>a</sub> = pgV</span>, where <span className="variable">F<sub>a</sub></span>: buoyant force applied to the object, <span className="variable">p</span>: density of the fluid, <span className="variable">V</span>: volume of the displaced fluid, <span className="variable">g</span>: acceleration due to gravity.</p>
      </section>

      <section className="section">
        <h2 className="section-header">Bernoulli's Principle and Buoyancy</h2>
        <p><span className="keyword">Bernoulli's principle</span> also plays a role in buoyancy. According to Bernoulli's principle, an increase in fluid speed (velocity) results in a decrease in pressure. This principle helps explain how objects like airplanes and boats can achieve lift and stay afloat by manipulating the flow of fluid around them.</p>
      </section>

      <a href="https://en.wikipedia.org/wiki/Buoyancy">Source</a>
    </div>
  );
};

export default Buoyancy;
