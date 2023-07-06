import React from "react";
import Navbar from "../features/Navbar/navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <div className="appContainer">
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
