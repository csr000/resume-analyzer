import React, { useState, useRef, useEffect } from "react";
import "../styles/compare.css";
import { BsCloudUpload } from "react-icons/bs";
import { load } from "../utils";
import postData, { validateBeforePost } from "../utils/postData";

const screen = "compare";

export default function Compare() {
  const [formData, setFormData] = useState();

  const [jobDesc, setJobDesc] = useState(load(screen, "jobDesc") || "");
  const [resume1, setResume1] = useState(load(screen, "resume1") || "");
  const [resume2, setResume2] = useState(load(screen, "resume2") || "");
  const [compare, setCompare] = useState(load(screen, "compare") || "");
  const [showOutput, setShowOutput] = useState(load(screen, "showOutput") || false);

  const [fileName, setFileName] = useState("");
  const fileInput = useRef(null);

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

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(`${screen}.jobDesc`, JSON.stringify(jobDesc));
    localStorage.setItem(`${screen}.resume1`, JSON.stringify(resume1));
    localStorage.setItem(`${screen}.resume2`, JSON.stringify(resume2));
    localStorage.setItem(`${screen}.compare`, JSON.stringify(compare));
    localStorage.setItem(`${screen}.showOutput`, JSON.stringify(showOutput));
  }, [jobDesc, resume1, resume2, compare, showOutput]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="uploadContainer mt-[-40px] tablet:mt-[-30px] w-9/12 tablet:w-3/5 h-72 tablet:h-96 rounded-sm flex flex-col items-center justify-center">
        <BsCloudUpload size={100} color="#483EA8" />
        <div className="flex flex-col gap-5">
          {/* <h3>Drag & drop files or </h3> */}
          <input type="file" accept="application/pdf" multiple={true} onChange={handleFileSelect} ref={fileInput} style={{ display: "none" }} />
          <button
            onClick={() => fileInput.current.click()}
            className="border-0 bg-transparent underline text-2xl tablet:text-3xl capitalize"
            style={{ color: "#483EA8" }}
          >
            select file
          </button>
          {fileName && <span id="pdfName">Selected Files: {fileName}</span>}
        </div>
        <p className="mt-1 text-md text-gray-500">Supported formats: PDF</p>
      </div>
      <div className="w-full flex-col flex items-center mt-10">
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="PLEASE KEY IN JOB DESCRIPTION AND CLICK ON THE BUTTON TO COMPARE THE RESUMES"
          className="border tablet:mt-5 w-9/12 tablet:w-3/5 h-48 outline-none p-5"
        />
      </div>
      <button
        className="start-btn text-white text-xl tablet:text-3xl font-bold tablet:font-extrabold rounded-full mt-8 w-2/5 tablet:w-1/5 h-10 tablet:h-16 cursor-pointer z-50"
        onClick={() => {
          if (validateBeforePost(fileName, jobDesc)) {
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
      <h2 className="my-5 tablet:my-10 xl tablet:text-2xl text-gray-500">Upload multiple resumes to start </h2>

      <div className={showOutput ? "output active my-28 w-full flex flex-col" : "output my-28"} id="output">
        <div className="mt-30 mx-96 w-10/12">
          <h3 className="font-bold text-2xl tablet:text-3xl mt-10" style={{ color: "#3B2667" }}>
            Final Result
          </h3>
          {resume1 && (
            <div className="bg-white p-4 shadow-xl rounded-lg mt-5">
              <p className="text-base tablet:text-lg text-gray-500">{resume1}</p>
            </div>
          )}
          {resume2 && (
            <div className="bg-white p-4 shadow-xl rounded-lg mt-5">
              <p className="text-base tablet:text-lg text-gray-500">{resume2}</p>
            </div>
          )}
        </div>
        {compare && (
          <div className="mt-30 mx-96 w-10/12">
            <h3 className="font-bold text-2xl tablet:text-3xl mt-10" style={{ color: "#3B2667" }}>
              Comparison
            </h3>
            <div className="bg-white p-4 shadow-xl rounded-lg mt-5">
              <p className="text-base tablet:text-lg text-gray-500">{compare}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
