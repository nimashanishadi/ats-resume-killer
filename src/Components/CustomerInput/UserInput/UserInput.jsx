import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResume, setJobDescription, resetInputs } from "../../../store/slices/userInputSlice";
import { sendUserData } from "../../../api/api";
import "./UserInput.css";

const UserInput = () => {
  const dispatch = useDispatch();
  const { resume, jobDescription } = useSelector((state) => state.userInput);

  const handleScan = async () => {
    await sendUserData({ resume, jobDescription });
    dispatch(resetInputs()); // Clear fields after sending
  };

  return (
    <div className="user-input-container">
      <h2 className="new-scan">New scan</h2>
      <div className="input-sections">
        <div className="input-box">
          <h3>Resume</h3>
          <textarea
            placeholder="Paste resume text..."
            value={resume}
            onChange={(e) => dispatch(setResume(e.target.value))}
          />
          <div className="upload-box">
            <input type="file" id="resumeUpload" hidden />
            <label htmlFor="resumeUpload" className="upload-button">
              Drag & Drop or Upload
            </label>
          </div>
        </div>

        <div className="input-box">
          <h3>Job Description</h3>
          <textarea
            placeholder="Copy and paste job description here"
            value={jobDescription}
            onChange={(e) => dispatch(setJobDescription(e.target.value))}
          />
        </div>
      </div>

      <div className="bottom-section">
        <span className="scan-count">Available scans: 0</span>
        <a href="#" className="upgrade-link">Upgrade</a>
        <button className="scan-button" onClick={handleScan} > 
          Scan
        </button>
      </div>
    </div>
  );
};

export default UserInput;
