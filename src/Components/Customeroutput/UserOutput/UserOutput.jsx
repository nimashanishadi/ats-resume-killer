// UserOutput.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserOutput = () => {
  const { extractedResumeText, scannedJobDescription } = useSelector((state) => state.userInput);
  const navigate = useNavigate();

  return (
    <div className="user-output-container">
      <h2>Scan Result</h2>
      <div>
        <h3>Extracted Resume Text</h3>
        <pre>{extractedResumeText}</pre>
      </div>
      <div>
        <h3>Job Description</h3>
        <pre>{scannedJobDescription}</pre>
      </div>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default UserOutput;
