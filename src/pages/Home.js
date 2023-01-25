import React, { useState } from "react";
import "../styles/home.css";
// import swal from "sweetalert";
import { BsCloudUpload } from "react-icons/bs";

export default function Home() {
  const [formData, setFormData] = useState();
  const [pdfUrl, setPdfUrl] = useState(null);

  const postData = () => {
    const query = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      console.log(key + ": " + value);
    }

    fetch("http://127.0.0.1:8000/parse?" + query, {
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
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    const pdfUrl = URL.createObjectURL(formData.get("file"));
    setPdfUrl(pdfUrl);
    setFormData(formData);
  };

  return (
    <div className="homeContainer">
      <div className="uploadContainer">
        <BsCloudUpload size={100} color="#483EA8" />
        <div className="upload-files">
          <h3>Drag & drop files or </h3>
          <input type="file" onChange={handleFileSelect} />
          {/* <button onClick={handleFileSelect}>Browse</button> */}
        </div>
        <p className="formats">Supported formats: PDF</p>
      </div>
      <embed src={pdfUrl} width="500" height="700" type="application/pdf" />
      <button className="start-btn" onClick={() => postData()}>
        START
      </button>
      <h2 className="upload-text">Upload a resume to start</h2>
    </div>
  );
}
