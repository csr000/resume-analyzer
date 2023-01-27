import React, { useState, useRef } from "react";
import "../styles/home.css";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { postData } from "../utils";
import swal from "sweetalert";

export default function Home() {
  const [formData, setFormData] = useState();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState([]);
  const fileInput = useRef(null);
  const [showOutput, setShowOutput] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleFileSelect = (event) => {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    const pdfUrl = URL.createObjectURL(formData.get("file"));
    setPdfUrl(pdfUrl);
    setFormData(formData);
    setFileName(fileInput.current.files[0].name);
  };

  return (
    <div className="homeContainer pb-10">
      <div className="uploadContainer">
        <BsCloudUpload size={100} color="#483EA8" />
        <div className="flex flex-col gap-5">
          {/* <h3>Drag & drop files or </h3> */}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            ref={fileInput}
            style={{ display: "none" }}
          />
          <button
            onClick={() => fileInput.current.click()}
            className="border-0 bg-transparent underline text-3xl"
            style={{ color: "#483EA8" }}
          >
            Browse
          </button>
          {fileName && <span id="pdfName">Selected File Name: {fileName}</span>}
        </div>
        <p className="formats">Supported formats: PDF</p>
      </div>
      <button
        className="start-btn font-extrabold rounded-full"
        onClick={() => {
          if (fileName) {
            setShowOutput(true);
            postData("http://127.0.0.1:8000/parse?", null, formData, {
              setName,
              setEmail,
              setLocation,
              setEducation,
              setSkills,
            });
          } else {
            swal("Please select a file!", {
              icon: "error",
            });
          }
        }}
      >
        START
      </button>
      <h2 className="upload-text">Upload a resume to start</h2>

      <div
        className={showOutput ? "output active mt-60" : "output mt-60"}
        id="output"
      >
        <div className="flex flex-col items-center justify-center">
          <embed src={pdfUrl} width="900" height="900" type="application/pdf" />
          <h3 className="font-bold text-5xl mt-10" style={{ color: "#3B2667" }}>
            Resume Analysis
          </h3>
          <div className="w-4/6 items-start mt-10">
            <div className="flex flex-row items-center">
              <p className="text-lg font-bold">Name:</p>
              <p className="ml-2">{name}</p>
            </div>

            <div className="flex flex-row items-center mt-1">
              <p className="text-lg font-bold">Mail:</p>
              <p className="ml-2">{email}</p>
            </div>

            <div className="flex flex-row items-center mt-1">
              <p className="text-lg font-bold">Location:</p>
              <p className="ml-2">{location}</p>
            </div>

            <div className="flex flex-row mt-1">
              <p className="text-lg font-bold">Education:</p>
              <p className="mt-1 ml-2">{education}</p>
            </div>
          </div>
          <div className="w-4/6 items-start">
            <h4 className="font-bold text-2xl mt-10 text-gray-700">
              Relevant Skills
            </h4>
            <div className="flex flex-row flex-wrap gap-6 mt-4">
              {skills.map((item) => {
                return (
                  <div className="flex flex-row items-center border rounded-xl p-2 gap-4 border-black mt-1">
                    <p className="text-sm">{item}</p>
                    <AiOutlineClose />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
