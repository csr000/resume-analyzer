import React, { useState } from "react";
import "../styles/rank.css";
// import swal from "sweetalert";
import { BsCloudUpload } from "react-icons/bs";

export default function Rank() {
  const [jobDesc, setJobDesc] = useState("");
  const [formData, setFormData] = useState();
  const postData = () => {
    // swal({
    //   text: "Analyzing . . . . .",
    //   timer: 3000,
    //   buttons: false,
    //   closeOnClickOutside: false,
    // }).then((value) => {
    //   swal({
    //     text: "Analyzing Complete.",
    //     timer: 3000,
    //     buttons: false,
    //     icon: "success",
    //     closeOnClickOutside: false,
    //   });
    // });

    const query = new URLSearchParams();
    query.append("job_description", jobDesc);

    for (const [key, value] of formData.entries()) {
      console.log(key + ": " + value);
    }

    fetch("http://127.0.0.1:8000/rank?" + query, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFileSelect = (event) => {
    let files = event.target.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    setFormData(formData);
  };

  return (
    <div className="rankContainer">
      <div className="uploadContainer">
        <BsCloudUpload size={100} color="#483EA8" />
        <div className="upload-files">
          <h3>Drag & drop files or </h3>
          <input type="file" multiple={true} onChange={handleFileSelect} />
          {/* <button onClick={handleFileSelect}>Browse</button> */}
        </div>
        <p className="formats">Supported formats: PDF</p>
      </div>
      <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} />
      <button className="start-btn" onClick={() => postData()}>
        START
      </button>
      <h2 className="upload-text">Upload multiple resumes to start </h2>
    </div>
  );
}
