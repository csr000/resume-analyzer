import React from 'react'
import { BsCloudUpload } from "react-icons/bs";

export default function UploadContainer() {
  return (
    <div className="uploadContainer">
        <BsCloudUpload size={100} color="#483EA8" />
        <div className="upload-files">
          <h3>Drag & drop files or </h3>
          <a href="/">Browse</a>
        </div>
        <p className="formats">Supported formats: PDF</p>
      </div>
  )
}
