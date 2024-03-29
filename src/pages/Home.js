import React, { useState, useRef, useEffect } from "react";
import "../styles/home.css";
import { BsCloudUpload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { load, scrollToSection, showErr, truncate } from "../utils";
import postData from "../utils/postData";
import { AnalysisSectionLoader } from "../utils/loaders";
import { Document, Page, pdfjs } from "react-pdf";
import Typewriter from "typewriter-effect";
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
  const [summary, setSummary] = useState(load(screen, "summary") || null);

  const [showOutput, setShowOutput] = useState(load(screen, "showOutput") || false);
  const [summaryIsViewed, setSummaryIsViewed] = useState();
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
    localStorage.setItem(`${screen}.summary`, JSON.stringify(summary));
    localStorage.setItem(`${screen}.showOutput`, JSON.stringify(showOutput));

    showOutput && scrollToSection("output");
  }, [pdfUrl, name, email, location, education, summary, showOutput]);

  // pdf doc
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="uploadContainer mt-[-40px] tablet:mt-[-30px] w-11/12 tablet:w-3/5 h-72 tablet:h-96 rounded-sm flex flex-col items-center justify-center">
        <BsCloudUpload size={100} color="#483EA8" />
        <div className="flex flex-col gap-5">
          {/* <h3>Drag & drop files or </h3> */}
          <input type="file" accept="application/pdf" onChange={handleFileSelect} ref={fileInput} style={{ display: "none" }} />
          <button
            onClick={() => fileInput.current.click()}
            className="border-0 bg-transparent underline text-2xl tablet:text-3xl capitalize"
            style={{ color: "#483EA8" }}
          >
            select file
          </button>
          {fileName && <span id="pdfName">Selected File Name: {truncate(fileName)}</span>}
        </div>
        <p className="mt-1 text-md text-gray-500">Supported formats: PDF</p>
      </div>
      <button
        className="start-btn text-white text-xl tablet:text-3xl font-bold tablet:font-extrabold rounded-full mt-8 w-2/5 tablet:w-1/5 h-10 tablet:h-16 cursor-pointer z-50"
        onClick={() => {
          if (fileName) {
            setShowOutput(true);

            postData("http://127.0.0.1:8000/parse?", null, formData, {
              setName,
              setEmail,
              setLocation,
              setEducation,
              setSkills,
              setSummary,
            });
          } else {
            showErr("Please select a file!");
          }
        }}
      >
        START
      </button>

      <h2 className="my-5 tablet:my-10 xl tablet:text-2xl text-gray-500">Upload a resume to start</h2>

      <div className={showOutput ? "output active mt-30 pb-20 w-full" : "output mt-30 pb-20"} id="output">
        <div className="flex flex-col items-center justify-center tablet:w-4/5 w-11/12 ">
          {/* {console.log({ pdfUrl })} */}
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <h3 className="font-bold tablet:text-5xl text-3xl my-10" style={{ color: "#3B2667" }}>
            Resume Analysis
          </h3>
          {name ? (
            <>
              <div className="desktop:w-4/6 grid grid-cols-2 gap-2 tablet:mt-10 justify-center items-center">
                <div className="flex flex-col gap-0 ">
                  <div className="h-12 mb-10">
                    <p className="tablet:text-lg font-bold">Name:</p>
                    <p className="mt-0.5 mb-1 tablet:text-base text-sm">{name}</p>
                  </div>

                  <div className="h-12 mb-10">
                    <p className="tablet:text-lg font-bold">Location:</p>
                    <p className="mt-0.5 mb-1 tablet:text-base text-sm">{location}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-0">
                  <div className="h-12 mb-10">
                    <p className="tablet:text-lg font-bold">Mail:</p>
                    <p className="mt-0.5 mb-1 tablet:text-base text-sm">{email}</p>
                  </div>

                  <div className="h-12 mb-10">
                    <p className="tablet:text-lg font-bold">Education:</p>
                    <p className="mt-0.5 mb-1 tablet:text-base text-sm">{education}</p>
                  </div>
                </div>
              </div>
              {summaryIsViewed ? (
                <div className="flex desktop:w-5/6 bg-white p-4 shadow-xl rounded-lg mt-20 justify-center">
                  <p className="text-sm tablet:text-lg text-gray-500 leading-5 ">
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter.typeString(summary).start();
                      }}
                      options={{ delay: 25 }}
                    />
                  </p>
                </div>
              ) : (
                <button
                  className="bg-[#3B2667] hover:bg-[#4e3b76] text-white font-bold py-2 px-4 mt-20 rounded-full"
                  onClick={() => setSummaryIsViewed(true)}
                >
                  View Candidates Summary
                </button>
              )}
              <div className="desktop:w-5/6 tablet:mt-10 mt-4">
                <h4 className="font-bold tablet:text-2xl text-xl mt-10 text-gray-700">Relevant Skills</h4>
                <div className="flex flex-row flex-wrap gap-6 mt-4 ">
                  {skills &&
                    skills.map((item, index) => {
                      return (
                        <div className="flex flex-row items-center border tablet:rounded-xl rounded-lg p-2 tablet:gap-4 gap-2 border-black mt-1">
                          <p className="tablet:text-sm text-xs">{item}</p>
                          <AiOutlineClose size={14} onClick={() => setSkills(skills.filter((_, i) => i !== index))} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          ) : (
            <AnalysisSectionLoader />
          )}
        </div>
      </div>
    </div>
  );
}
