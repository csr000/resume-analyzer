import React from "react";
import "../styles/compare.css";
import { BsCloudUpload } from "react-icons/bs";
import swal from "sweetalert";

export default function Compare() {
  const handleChange = () => {
    swal({
      text: "Analyzing . . . . .",
      timer: 3000,
      buttons: false,
      closeOnClickOutside: false,
    }).then((value) => {
      swal({
        text: "Analyzing Complete.",
        timer: 3000,
        buttons: false,
        icon: "success",
        closeOnClickOutside: false,
      });
    });
  };
  return (
    <div className="compareContainer">
      <div className="uploadContainer">
        <BsCloudUpload size={100} color="#483EA8" />
        <div className="upload-files">
          <h3>Drag & drop files or </h3>
          <a href="/">Browse</a>
        </div>
        <p className="formats">Supported formats: PDF</p>
      </div>
      <button className="start-btn" onClick={() => handleChange()}>
        START
      </button>
      <h2 className="upload-text">Upload multiple resumes to start </h2>
    </div>
  );
}
