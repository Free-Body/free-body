import React from "react";
import charlotteImage from "./images/charlotte.png";
import jessicaImage from "./images/jessica.png";
import ashleyImage from "./images/ashley.png";
import carinaImage from "./images/carina.png";

const Home = () => {
  const handleLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className='header'>
        <p id='line1'>Meet The Team</p>
        <p id='line2'>click on the image to connect linkedin</p>
      </div>
      <div className='home-pics'>
        <div className="person-card" onClick={() => handleLinkClick("https://www.linkedin.com/in/charlotte-currey/")}>
          <img src={charlotteImage} alt='Charlotte' id='charlotte.png' />
          <p className="person-name">Charlotte Currey</p>
        </div>
        <div className="person-card" onClick={() => handleLinkClick("https://www.linkedin.com/in/j-rogado/")}>
          <img src={jessicaImage} alt='Jessica' id='jessica.png' />
          <p className="person-name">Jessica Rogado</p>
        </div>
        <div className="person-card" onClick={() => handleLinkClick("https://www.linkedin.com/in/ashleynware/")}>
          <img src={ashleyImage} alt='Ashley' id='ashley.png' />
          <p className="person-name">Ashley Ware</p>
        </div>
        <div className="person-card" onClick={() => handleLinkClick("https://www.linkedin.com/in/carina-carlos/")}>
          <img src={carinaImage} alt='Carina' id='carina.png' />
          <p className="person-name">Carina Carlos</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
