import React, { useState, useRef } from "react";
import "../styles/compare.css";
import { BsCloudUpload } from "react-icons/bs";
import { postData } from "../utils";
import swal from "sweetalert";

export default function Compare() {
  const [jobDesc, setJobDesc] = useState("");
  const [formData, setFormData] = useState();
  const fileInput = useRef(null);
  const [resume1, setResume1] = useState();
  const [resume2, setResume2] = useState();
  const [compare, setCompare] = useState();
  const [showOutput, setShowOutput] = useState(false);
  const [fileName, setFileName] = useState("");

  const queries = [{ key: "job_description", value: jobDesc }];

  const handleFileSelect = (event) => {
    if (event.target.files.length > 2) {
      alert("Error: only 2 files can be selected");
    } else {
      // do something with the selected files
      let files = event.target.files;
      let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      setFormData(formData);
    }
    setFileName(fileInput.current.files.length);
  };

  return (
    <div className="compareContainer">
      <div className="uploadContainer">
        <BsCloudUpload size={100} color="#483EA8" />
        <div className="flex flex-col gap-5">
          {/* <h3>Drag & drop files or </h3> */}
          <input
            type="file"
            accept="application/pdf"
            multiple={true}
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
          {fileName && <span id="pdfName">Selected Files: {fileName}</span>}
        </div>
        <p className="formats">Supported formats: PDF</p>
      </div>
      <div className="w-full flex-col flex items-center mt-10">
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="PLEASE KEY IN JOB DESCRIPTION AND CLICK ON THE BUTTON TO RANK YOUR RESUMES"
          className="border mt-5 w-1/2 h-48 outline-none p-5"
        />
      </div>
      <button
        className="start-btn font-extrabold rounded-full"
        onClick={() => {
          if (fileName === "") {
            swal("Please select resumes!", {
              icon: "error",
            });
          } else if (jobDesc === "") {
            swal("Please enter a job description!", {
              icon: "error",
            });
          } else {
            setShowOutput(true);
            postData("http://127.0.0.1:8000/compare?", queries, formData, {
              setResume1,
              setResume2,
              setCompare,
            });
          }
        }}
      >
        START
      </button>
      <h2 className="upload-text">Upload multiple resumes to start </h2>

      <div
        className={showOutput ? "output active my-28" : "output my-28"}
        id="output"
      >
        <div className="mt-30 mx-96">
          <h3 className="font-bold text-3xl mt-10" style={{ color: "#3B2667" }}>
            Final Result
          </h3>
          <div className="bg-white p-4 shadow-xl rounded-lg mt-5">
            <p className="text-lg text-gray-500">{resume1}</p>
          </div>

          <div className="bg-white p-4 shadow-xl rounded-lg mt-5">
            <p className="text-lg text-gray-500">{resume2}</p>
          </div>
        </div>
        <div className="mt-30 mx-96">
          <h3 className="font-bold text-3xl mt-10" style={{ color: "#3B2667" }}>
            Comparison
          </h3>
          {/* <p className="text-sm text-gray-300">Best suited to least suited</p> */}
          <div className="bg-white p-4 shadow-xl rounded-lg mt-5">
            <p className="text-lg text-gray-500">{compare}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
