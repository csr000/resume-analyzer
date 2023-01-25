import React, { useState, useRef } from "react";
import "../styles/home.css";
// import swal from "sweetalert";
import { BsCloudUpload } from "react-icons/bs";

export default function Home() {
  const [formData, setFormData] = useState();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const fileInput = useRef(null);
  const [click, setClick] = useState(false);

  const postData = () => {
    setClick(!click);
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
        setName(data.name);
        setEmail(data.email);
        setLocation(data.location);
        setEducation(data.education);
        setSkills(data.skills);
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
    <div className="homeContainer pb-10">
      <div className="uploadContainer">
        <BsCloudUpload size={100} color="#483EA8" />
        <div className="upload-files">
          <h3>Drag & drop files or </h3>
          <input
            type="file"
            onChange={handleFileSelect}
            ref={fileInput}
            style={{ display: "none" }}
          />
          <button
            onClick={() => fileInput.current.click()}
            className="border-0 bg-transparent underline"
            style={{ color: "#483EA8" }}
          >
            Browse
          </button>
        </div>
        <p className="formats">Supported formats: PDF</p>
      </div>
      <button
        className="start-btn font-extrabold rounded-full"
        onClick={() => postData()}
      >
        START
      </button>
      <h2 className="upload-text">Upload a resume to start</h2>
      <div className={click ? "nav-menu active" : "nav-menu"}>
        <div className=" flex flex-col items-center justify-center mt-60">
          <embed src={pdfUrl} width="900" height="900" type="application/pdf" />
          <h3 className="font-bold text-3xl mt-10" style={{ color: "#3B2667" }}>
            Resume Analysis
          </h3>
          <div className="w-4/6 items-start">
            <p className="text-xl">Name : {name}</p>
            <p className="text-xl mt-2">Mail : {email}</p>
            <p className="text-xl mt-2">Location : {location} </p>
            <p className="text-xl mt-2">Education : {education} </p>
          </div>
          <div className="w-4/6 items-start">
            <h4
              className="font-bold text-2xl mt-10"
              style={{ color: "#8F8F8F" }}
            >
              Relevant Keywords
            </h4>
            <div>{skills}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
