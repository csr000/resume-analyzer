import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Compare from "../pages/Compare";
import Home from "../pages/Home";
import Rank from "../pages/Rank";
import "../styles/nav.css";

export default function Nav() {
  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <nav className="w-full z-1 flex items-center justify-center ">
        <div className="navMenu active flex items-center w-full ">
          <div className=" h-20 w-4/5 laptop:w-1/2 mx-auto px-5 flex items-center justify-evenly text-sm tablet:text-xl font-bold navContainer">
            <NavLink to="/" className="navItem ">
              Parse
            </NavLink>
            <NavLink to="/rank" className="navItem ">
              Rank
            </NavLink>
            <NavLink to="/compare" className="navItem ">
              Compare
            </NavLink>
          </div>
        </div>
      </nav>
      <div className="mt-24 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </div>
    </div>
  );
}
