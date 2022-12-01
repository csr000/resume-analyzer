import React from "react";
import { Link, Route, Routes } from "react-router-dom";
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
            <Link to="/" className="navItem">
              Parse
            </Link>
          </li>
          <li>
            <Link to="/rank" className="navItem">
              Rank
            </Link>
          </li>
          <li>
            <Link to="/compare" className="navItem">
              Compare
            </Link>
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
