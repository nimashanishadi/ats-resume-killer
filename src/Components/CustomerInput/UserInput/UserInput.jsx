import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResumeFile, setJobDescription, resetInputs } from "../../../store/slices/userInputSlice";
import { sendUserData } from "../../../api/api";
import "./UserInput.css";

const UserInput = () => {
  const dispatch = useDispatch();
  const { resumeFileName, jobDescription } = useSelector((state) => state.userInput);
  const [resumeFile, setResumeFileState] = useState(null); // Local state for the actual file

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFileState(file); // Store file in local state
      dispatch(setResumeFile(file.name)); // Store only file name in Redux
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleScan = async () => {
    if (!resumeFile) {
      alert("Please upload a resume.");
      return;
    }
  
    const formData = new FormData();
    formData.append("resume", resumeFile); // File
    formData.append("jobDescription", jobDescription); // Text input
  
    try {
      const response = await fetch("http://localhost:8080/api/scan", {
        method: "POST",
        body: formData, // FormData must be the body
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      console.log("Upload successful!");
      dispatch(resetInputs());
      setResumeFileState(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  

  return (
    <div className="user-input-container">
      <h2 className="new-scan">New Scan</h2>
      <div className="input-sections">
        <div className="input-box">
          <h3>Resume (PDF)</h3>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
          {resumeFileName && <p>{resumeFileName}</p>} {/* Display file name */}
        </div>

        <div className="input-box">
          <h3>Job Description</h3>
          <textarea
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => dispatch(setJobDescription(e.target.value))}
          />
        </div>
      </div>

      <div className="bottom-section">
        <button className="scan-button" onClick={handleScan}>
          Scan
        </button>
      </div>
    </div>
  );
};

export default UserInput;
