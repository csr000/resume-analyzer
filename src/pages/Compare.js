import React from "react";
import "../styles/compare.css";
import UploadContainer from "../components/uploadContainer";

export default function Compare() {
  return (
    <div className="compareContainer">
      <UploadContainer />
      <button className="start-btn">START</button>
      <h2 className="upload-text">Upload multiple resumes to start </h2>
    </div>
  );
}
