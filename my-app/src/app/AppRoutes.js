import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/HomePage/homePage";
import About from "../features/aboutPage";
import Meet from "../features/meetTheTeam";
import How from "../features/howItWorks";
import Activity from "../features/activityLand";
import Projectiles from "../features/LearnAbout/projectiles";
import Acceleration from "../features/LearnAbout/acceleration";
import AboutBuoyancy from "../features/LearnAbout/buoyancy";
import Circuitry from "../features/LearnAbout/circuits";
import PizzaToss from "../Games/pizzaTossComponent";
import FreeFloatingComponent from "../Games/freeFloatingComponent";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/meettheteam" element={<Meet />} />
        <Route path="/howitworks" element={<How />} />
        <Route path="/activityland" element={<Activity />} />
        <Route path="/freefloating" element={<FreeFloatingComponent />} />

        <Route path="/projectile-motion" element={<Projectiles />} />
        <Route path="/acceleration" element={<Acceleration />} />
        <Route path="/aboutbuoyancy" element={<AboutBuoyancy />} />
        <Route path="/circuitry" element={<Circuitry />} />
        <Route path="/pizzatoss" element={<PizzaToss />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
