import React, { useState, useRef, useEffect } from "react";
import "../styles/home.css";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { load, scrollToSection, getResult, showErr } from "../utils";
import postData from "../utils/postData";
import { RectLoader, RevelantSectionLoader } from "../utils/loaders";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const screen = "parse";

export default function Home() {
  const [formData, setFormData] = useState();
  const [pdfUrl, setPdfUrl] = useState(load(screen, "pdfUrl") || null);

  const [name, setName] = useState(load(screen, "name") || "");
  const [email, setEmail] = useState(load(screen, "email") || "");
  const [location, setLocation] = useState(load(screen, "location") || "");
  const [education, setEducation] = useState(load(screen, "education") || "");
  const [skills, setSkills] = useState(load(screen, "skills") || null);

  const [showOutput, setShowOutput] = useState(load(screen, "showOutput") || false);
  const fileInput = useRef(null);
  const [fileName, setFileName] = useState(null);

  const handleFileSelect = (event) => {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    const pdfUrl = URL.createObjectURL(formData.get("file"));
    setPdfUrl(pdfUrl + "#toolbar=0&navpanes=0&scrollbar=0");
    setFormData(formData);
    setFileName(fileInput.current.files[0].name);
  };

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(`${screen}.pdfUrl`, JSON.stringify(pdfUrl));
    localStorage.setItem(`${screen}.name`, JSON.stringify(name));
    localStorage.setItem(`${screen}.email`, JSON.stringify(email));
    localStorage.setItem(`${screen}.location`, JSON.stringify(location));
    localStorage.setItem(`${screen}.education`, JSON.stringify(education));
    localStorage.setItem(`${screen}.skills`, JSON.stringify(skills));
    localStorage.setItem(`${screen}.showOutput`, JSON.stringify(showOutput));

    showOutput && scrollToSection("output");
  }, [pdfUrl, name, email, location, education, skills, showOutput]);

  // pdf doc
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="homeContainer pb-10">
      <div className="uploadContainer">
        <BsCloudUpload size={100} color="#483EA8" />
        <div className="flex flex-col gap-5">
          {/* <h3>Drag & drop files or </h3> */}
          <input type="file" accept="application/pdf" onChange={handleFileSelect} ref={fileInput} style={{ display: "none" }} />
          <button onClick={() => fileInput.current.click()} className="border-0 bg-transparent underline text-3xl" style={{ color: "#483EA8" }}>
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
            showErr("Please select a file!");
          }
        }}
      >
        START
      </button>

      <h2 className="upload-text">Upload a resume to start</h2>

      <div className={showOutput ? "output active mt-60" : "output mt-60"} id="output">
        <div className="flex flex-col items-center justify-center">
          {console.log({ pdfUrl })}
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <h3 className="font-bold text-5xl mt-10" style={{ color: "#3B2667" }}>
            Resume Analysis
          </h3>
          <div className="w-full items-start mt-10 ">
            <div className="flex flex-row h-12 w-8/12  justify-between">
              <p className="text-lg font-bold">Name:</p>
              <p className=" ">{getResult(name, RectLoader)}</p>
            </div>

            <div className="flex flex-row h-12 w-8/12  justify-between">
              <p className="text-lg font-bold">Mail:</p>
              <p className="">{getResult(email, RectLoader)}</p>
            </div>

            <div className="flex flex-row h-12 w-8/12  justify-between">
              <p className="text-lg font-bold">Location:</p>
              <p className="ml-2">{getResult(location, RectLoader)}</p>
            </div>

            <div className="flex flex-row h-12 w-8/12 justify-between">
              <p className="text-lg font-bold">Education:</p>
              <p className="mt-1 ml-2">{getResult(education, RectLoader)}</p>
            </div>
          </div>
          <div className="w-full items-start">
            <h4 className="font-bold text-2xl mt-10 text-gray-700">Relevant Skills</h4>
            <div className="flex flex-row flex-wrap gap-6 mt-4 w-full border">
              {skills ? (
                skills.map((item, index) => {
                  return (
                    <div className="flex flex-row items-center border rounded-xl p-2 gap-4 border-black mt-1 w-full">
                      <p className="text-sm">{item}</p>
                      <AiOutlineClose onClick={() => setSkills(skills.filter((_, i) => i !== index))} />
                    </div>
                  );
                })
              ) : (
                <RevelantSectionLoader />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// ;
//
