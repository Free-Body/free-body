import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  return (
    <div>
      <nav>
        
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/products">Flowers</Link>
            <Link to="/cart">Cart</Link>
          </div>
      </nav>
    </div>
  );
};

export default Navbar;