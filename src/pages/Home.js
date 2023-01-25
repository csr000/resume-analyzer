import React, { useState, useRef } from "react";
import "../styles/home.css";
// import swal from "sweetalert";
import { BsCloudUpload } from "react-icons/bs";

export default function Home() {
  const [formData, setFormData] = useState();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [user, setUser] = useState([]);
  const fileInput = useRef(null)

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
        setUser(data)
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
          <input type="file" onChange={handleFileSelect} ref={fileInput} style={{ display: 'none' }} />
          <button onClick={() => fileInput.current.click()} className="border-0 bg-transparent underline" style={{color:'#483EA8'}}>Browse</button>
        </div>
        <p className="formats">Supported formats: PDF</p>
      </div>
      <button  onClick={() => postData()} className="font-extrabold rounded-full">
        START
      </button>
      <h2 className="upload-text">Upload a resume to start</h2>
      <embed src={pdfUrl} width="500" height="700" type="application/pdf" className="mt-10" />
      <p>{user}</p>
    </div>
  );
}
