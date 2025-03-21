import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserOutput.css";
import Sidebar from "./../../Sidebar/Sidebar"; // Import Sidebar

const UserOutput = () => {
  const { extractedResumeText, scannedJobDescription, phone, email, address, linkedin, matchingjdre, keywordsjd } = useSelector((state) => state.userInput);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resume");

  // Function to highlight keywords
  const highlightKeywords = (text, matchingKeywords = [], otherKeywords = []) => {
    if (!text) return "";

    // Convert keyword lists to lowercase for case-insensitive matching
    const matchSet = new Set(matchingKeywords.map(word => word.toLowerCase())); // Green highlight
    const uniqueOtherKeywords = otherKeywords
      .filter(word => !matchSet.has(word.toLowerCase())) // Exclude already highlighted words
      .map(word => word.toLowerCase());

    const regex = new RegExp(`(${[...matchSet, ...uniqueOtherKeywords].join("|")})`, "gi");

    return text.split(regex).map((part, index) => {
      if (!part) return part; // Prevent undefined errors

      if (matchSet.has(part.toLowerCase())) {
        return <span key={index} className="highlight-keyword-green">{part}</span>;
      }
      if (uniqueOtherKeywords.includes(part.toLowerCase())) {
        return <span key={index} className="highlight-keyword-red">{part}</span>;
      }
      return part;
    });
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

              {/* Address Section */}
              {address && (
                <div className="contact-section">
                  <h3>🏠 Address</h3>
                  <p>Your resume shows your address as: <strong>{address}</strong>.</p>
                </div>
              )}

              {/* LinkedIn Section */}
              {linkedin && (
                <div className="contact-section">
                  <h3>🔗 LinkedIn Profile</h3>
                  {linkedin.startsWith("http") ? (
                    <p>
                      Your LinkedIn profile:{" "}
                      <a href={linkedin} target="_blank" rel="noopener noreferrer">
                        {linkedin}
                      </a>
                    </p>
                  ) : (
                    <p>Your resume contains the LinkedIn information: <strong>{linkedin}</strong></p>
                  )}
                </div>
              )}
            </div>
          )}
          {activeTab === "job" && (
            <div className="job-content">
              <h3>Job Description</h3>
              <pre>{highlightKeywords(scannedJobDescription, matchingjdre, keywordsjd)}</pre>
            </div>
          )}
        </div>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    </div>
  );
};

export default UserOutput;
