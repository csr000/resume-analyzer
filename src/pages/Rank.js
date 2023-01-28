import React, { useState, useRef } from "react";
import "../styles/rank.css";
// import swal from "sweetalert";
import { BsCloudUpload } from "react-icons/bs";
import MUIDataTable from "mui-datatables";
import { scrollToSection } from "../utils";

export default function Rank() {
  const [jobDesc, setJobDesc] = useState("");
  const [formData, setFormData] = useState();
  const fileInput = useRef(null);
  const [resumeData, setResumeData] = useState([]);
  const [click, setClick] = useState(false);
  const [fileName, setFileName] = useState();

  const postData = () => {
    setClick(true);
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
        setResumeData(data);
        scrollToSection("output");
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
    setFileName(fileInput.current.files.length);
  };

  const columns = [
    {
      name: "file",
      label: "Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "grade",
      label: "Rank Score",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    responsive: "vertical",
    filterType: "checkbox",
    searchAlwaysOpen: true,
  };

  return (
    <div className="rankContainer">
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
          <span id="pdfName">Selected Files: {fileName}</span>
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
        onClick={() => postData()}
      >
        START
      </button>
      <h2 className="upload-text">Upload multiple resumes to start </h2>

      <div id="output" className={click ? "nav-menu active" : "nav-menu"}>
        <div className="w-11/12 mt-10 pb-20">
          <MUIDataTable
            title={"RANK ORDER"}
            data={resumeData}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}
