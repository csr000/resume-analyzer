import React from "react";
import '../styles/home.css';
import UploadContainer from "../components/uploadContainer";

export default function Home() {
  return (
    <div className="homeContainer">
      <UploadContainer />
      <button className="start-btn">START</button>
      <h2 className="upload-text">Upload a resume to start</h2>
    </div>
  );
}
