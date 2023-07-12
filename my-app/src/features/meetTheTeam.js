import React from "react";
import charlotteImage from "./images/charlotte.png";
import jessicaImage from "./images/jessica.png";
import ashleyImage from "./images/ashley.png";
import carinaImage from "./images/carina.png";
import backImage from "./images/earth.png";

const Home = () => {
  const handleLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="teamContainer">
      <div><p id="meet">Meet our team on LinkedIn!</p></div>
      <div className="teamContainer2">
        <img src={backImage} alt="background" id="backimg" />
        <div className="grid">
          <div
            className="person-card"
            id="charlotte"
            onClick={() =>
              handleLinkClick("https://www.linkedin.com/in/charlotte-currey/")
            }
          >
            <img src={charlotteImage} alt="Charlotte" id="charlotte.png" />
            <p className="person-name">Charlotte Currey</p>
          </div>
          <div
            className="person-card"
            id="jessica"
            onClick={() =>
              handleLinkClick("https://www.linkedin.com/in/j-rogado/")
            }
          >
            <img src={jessicaImage} alt="Jessica" id="jessica.png" />
            <p className="person-name">Jessica Rogado</p>
          </div>
          <div
            className="person-card"
            id="ashley"
            onClick={() =>
              handleLinkClick("https://www.linkedin.com/in/ashleynware/")
            }
          >
            <img src={ashleyImage} alt="Ashley" id="ashley.png" />
            <p className="person-name">Ashley Ware</p>
          </div>
          <div
            className="person-card"
            id="carina"
            onClick={() =>
              handleLinkClick("https://www.linkedin.com/in/carina-carlos/")
            }
          >
            <img src={carinaImage} alt="Carina" id="carina.png" />
            <p className="person-name">Carina Carlos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
