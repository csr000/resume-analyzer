import React from "react";
import "../styles/compare.css";
import UploadContainer from "../components/uploadContainer";
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
      <UploadContainer />
      <button className="start-btn" onClick={() => handleChange()}>
        START
      </button>
      <h2 className="upload-text">Upload multiple resumes to start </h2>
    </div>
  );
}
