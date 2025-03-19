import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserOutput.css";
import Sidebar from "./../../Sidebar/Sidebar"; // Import Sidebar

const UserOutput = () => {
  const { extractedResumeText, scannedJobDescription, phone, email, matchingjdre } = useSelector((state) => state.userInput);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resume");

  // Function to highlight matching keywords in job description
  const highlightKeywords = (text, keywords) => {
    if (!keywords || keywords.length === 0) return text;

    const regex = new RegExp(`(${keywords.join("|")})`, "gi"); // Create regex for all keywords
    return text.split(regex).map((part, index) =>
      keywords.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
        <span key={index} className="highlight-keyword">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container">
      <Sidebar /> {/* Left Navigation Bar */}
      <div className="user-output-content">
        <h2>Scan Result</h2>
        <div className="tabs">
          <button className={activeTab === "resume" ? "active" : ""} onClick={() => setActiveTab("resume")}>
            Resume
          </button>
          <button className={activeTab === "job" ? "active" : ""} onClick={() => setActiveTab("job")}>
            Job Description
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "resume" && (
            <div>
              <h3>Extracted Resume Text</h3>
              <pre>{extractedResumeText}</pre>

              {/* Phone Number Section */}
              {phone && (
                <div className="contact-section">
                  <h3>📞 Phone Number</h3>
                  <p>Your resume shows you have <strong>{phone}</strong> as your contact phone number.</p>
                </div>
              )}

              {/* Email Section */}
              {email && (
                <div className="contact-section">
                  <h3>📧 Email</h3>
                  <p>Your resume shows you have <strong>{email}</strong> as your contact email address.</p>
                </div>
              )}
            </div>
          )}
          {activeTab === "job" && (
            <div className="job-content">
              <h3>Job Description</h3>
              <pre>{highlightKeywords(scannedJobDescription, matchingjdre)}</pre>
            </div>
          )}
        </div>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    </div>
  );
};

export default UserOutput;
