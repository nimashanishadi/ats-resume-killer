// UserInput.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResumeFile, setJobDescription, setScanResult, resetInputs } from "../../../store/slices/userInputSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./UserInput.css";

const UserInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize the navigate function
  const { resumeFileName, jobDescription } = useSelector((state) => state.userInput);
  const [resumeFile, setResumeFileState] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFileState(file);
      dispatch(setResumeFile(file.name));
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
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("http://localhost:8080/api/scan", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      dispatch(setScanResult(data));  // Dispatch the result from the backend

      //dispatch(resetInputs());
      setResumeFileState(null);

      // Navigate to UserOutput page after successful scan
      navigate("/user-output");
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
          {resumeFileName && <p>{resumeFileName}</p>}
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
