import React from "react";
import aboutImage from "../images/about.png";
import activityLandImage from "../images/activityland-home.png";
import howItWorksImage from "../images/how-it-works.png";
import meetTheTeamImage from "../images/meet-the-team.png";

const Home = () => {
  return (
    <div>
      <div className='home-header'>
        <p id='line1'>PHYSICS PROBLEMS CAN BE THE MOST DIFFICULT TO SOLVE</p>
        <p id='line2'>BUT THEY DON'T HAVE TO BE THE MOST BORING</p>
      </div>
      <div className='home-pics'>
        <img src={aboutImage} alt='About' id='about.png' />
        <img src={howItWorksImage} alt='How It Works' id='how-it-works.png' />
        <img src={meetTheTeamImage} alt='Meet the Team' id='meet-the-team.png' />
        <img src={activityLandImage} alt='Activity Land Home' id='activityland-home.png' />
      </div>
    </div>
  );
};

export default Home;
