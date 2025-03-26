import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResumeFile, setJobDescription, setScanResult } from "../../../store/slices/userInputSlice";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";  
import "./UserInput.css";

const UserInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const { resumeFileName, jobDescription } = useSelector((state) => state.userInput);
  const [resumeFile, setResumeFileState] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [progress, setProgress] = useState(0);  
  const [loadingMessage, setLoadingMessage] = useState("Uploading resume...");

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

    setLoading(true);  
    let progressValue = 0;

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      // Simulating progress with setInterval for demonstration
      const interval = setInterval(() => {
        progressValue += 10;
        setProgress(progressValue);

        if (progressValue < 50) {
          setLoadingMessage("Uploading resume...");
        } else if (progressValue < 80) {
          setLoadingMessage("Analyzing and making results...");
        } else {
          setLoadingMessage("Finalizing...");
        }

        if (progressValue >= 100) {
          clearInterval(interval);
        }
      }, 500); // Increment the progress by 10% every 500ms

      // 🔹 Use axios to send a POST request
      const response = await axios.post("http://localhost:8080/api/scan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Simulate completion after loading progress reaches 100%
      setTimeout(() => {
        if (response.status === 200) {
          dispatch(setScanResult(response.data));  
          setLoading(false);  
          navigate("/user-output");  
        } else {
          throw new Error("Server error");
        }
      }, 1000);  // Delay the response handling to allow finalization message to display

    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);  
    }
  };

  return (
    <div className="user-input-container">
      <h2 className="new-scan">New Scan</h2>
      <div className="input-sections">
        <div className="input-box">
          <h3>Resume (PDF)</h3>
          <input type="file" accept=".pdf" onChange={handleFileChange} disabled={loading} />
          {resumeFileName && <p>{resumeFileName}</p>}
        </div>

        <div className="input-box">
          <h3>Job Description</h3>
          <textarea
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => dispatch(setJobDescription(e.target.value))}
            disabled={loading}
          />
        </div>
      </div>

      <div className="bottom-section">
        <button className="scan-button" onClick={handleScan} disabled={loading}>
          {loading ? "Scanning..." : "Scan"}
        </button>
      </div>

      {/* Only show the progress bar pop-up during loading */}
      {loading && (
        <div className="loading-popup">
          <div className="loading-container">
            <p>{loadingMessage}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInput;
