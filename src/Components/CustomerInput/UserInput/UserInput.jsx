import React, { useState } from "react";
import "./UserInput.css";

const UserInput = () => {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  return (
    <div className="user-input-container">
      <h2 className="new-scan">New scan</h2>
      <div className="input-sections">
        {/* Resume Input */}
        <div className="input-box">
          <h3>Resume</h3>
          <textarea
            placeholder="Paste resume text..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
          <div className="upload-box">
            <input type="file" id="resumeUpload" hidden />
            <label htmlFor="resumeUpload" className="upload-button">
              Drag & Drop or Upload
            </label>
          </div>
        </div>

        {/* Job Description Input */}
        <div className="input-box">
          <h3>Job Description</h3>
          <textarea
            placeholder="Copy and paste job description here"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="bottom-section">
        <span className="scan-count">Available scans: 0</span>
        <a href="#" className="upgrade-link">Upgrade</a>
        <button className="scan-button" disabled>
          Scan
        </button>
      </div>
    </div>
  );
};

export default UserInput;
