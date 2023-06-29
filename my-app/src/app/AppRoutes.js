import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/homePage";
import About from "../features/aboutPage";
import Meet from "../features/meetTheTeam";
import How from "../features/howItWorks";
import Activity from "../features/activityLand";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/meettheteam" element={<Meet />} />
        <Route path="/howitworks" element={<How />} />
        <Route path="/activityland" element={<Activity />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
