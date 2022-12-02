import React from "react";
import "../styles/rank.css";
import UploadContainer from "../components/uploadContainer";

export default function Rank() {
  return (
    <div className="rankContainer">
      <UploadContainer />
      <button className="start-btn">START</button>
      <h2 className="upload-text">Upload multiple resumes to start </h2>
    </div>
  );
}
