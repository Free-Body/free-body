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
import FastFurious from "../Games/2fast2furiousComponent.js";
import PizzaChallenge from "../Games/pizzaChallengeComponent";
import FreeFloating from "../Games/freeFloatingComponent";
import FastFuriousChallenge from "../Games/2fast2furiousChallenge";

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
        <Route path="/2fast2furious" element={<FastFurious />} />
        <Route path="/pizzachallenge" element={<PizzaChallenge/>} />
        <Route path="/2fast2furiouschallenge" element={<FastFuriousChallenge />} />
        <Route path="/freefloating" element={<FreeFloating />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
