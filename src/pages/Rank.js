import React from "react";
import '../styles/rank.css';
import { BsCloudUpload } from "react-icons/bs";

export default function Rank() {
  return (
    <div className="rankContainer">
      <div className="uploadContainer">
        <BsCloudUpload size={100} color="#483EA8" />
        <div className="upload-files">
          <h3>Drag & drop files or </h3>
          <a href="/">Browse</a>
        </div>
        <p className="formats">Supported formats: PDF</p>
      </div>
      <button className="start-btn">START</button>
      <h2 className="upload-text">Upload multiple resumes to start </h2>
    </div>
  );
}
