import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/HomePage/homePage";
import About from "../features/aboutPage";
import Meet from "../features/meetTheTeam";
import How from "../features/howItWorks";
import Activity from "../features/activityLand";
import Projectiles from "../features/LearnAbout/projectiles";
import Acceleration from "../features/LearnAbout/acceleration";
import Buoyancy from "../features/LearnAbout/buoyancy";
import PizzaToss from "../Games/pizzaTossComponent";
import Header from "../features/HomePage/header";


import PizzaChallenge from "../Games/pizzaChallengeComponent";

const AppRoutes = () => {
  return (
    <div className="appRoutesContainer">
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/meettheteam" element={<Meet />} />
        <Route path="/howitworks" element={<How />} />
        <Route path="/activityland" element={<Activity />} />

        <Route path="/projectile-motion" element={<Projectiles />} />
        <Route path="/acceleration" element={<Acceleration />} />
        <Route path="/buoyancy" element={<Buoyancy />} />

        <Route path="/pizzatoss" element={<PizzaToss />} />

        <Route path="/pizzachallenge" element={<PizzaChallenge/>} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
