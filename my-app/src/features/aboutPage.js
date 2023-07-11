import React from "react";
import tugImage from "./images/tugofwar.png";

const About = () => {
  return (
    <div className="aboutContainer">
      <img src={tugImage} alt="tug of war" id="tugimg" />
      <div className="aboutclass">
        {/* <h1 id="abouthead">About Us</h1> */}
        <p>
          Welcome to our website, where learning physics becomes an exciting
          adventure! We are dedicated to providing students with engaging and
          interactive games focused on free-body diagrams.
        </p>
        <p>
          At Free Body, we understand that learning physics can sometimes be
          challenging, which is why we have designed a collection of free games
          specifically tailored to help students grasp the fundamental concepts
          of free-body diagrams. These diagrams are essential in understanding
          the forces acting on objects and how they interact with their
          environment.
        </p>
      </div>
    </div>
  );
};

export default About;
