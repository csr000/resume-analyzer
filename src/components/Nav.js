import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Compare from "../pages/Compare";
import Home from "../pages/Home";
import Rank from "../pages/Rank";
import "../styles/nav.css";

export default function Nav() {
  return (
    <>
      <nav className="navContainer">
        <ul className="navMenu active">
          <li>
            <NavLink to="/" className="navItem">
              Parse
            </NavLink>
          </li>
          <li>
            <NavLink to="/rank" className="navItem">
              Rank
            </NavLink>
          </li>
          <li>
            <NavLink to="/compare" className="navItem">
              Compare
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </>
  );
}
