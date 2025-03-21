import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserOutput.css";
import Sidebar from "./../../Sidebar/Sidebar";

const UserOutput = () => {
  const {
    extractedResumeText,
    scannedJobDescription,
    phone,
    email,
    address,
    linkedin,
    hardskillsjd, // Job Description Skills
    hardskillsre, // Resume Skills
    matchingjdre,
    keywordsjd,
    keywordsre, // Resume Keywords
    softskillsjd, // Job Description Soft Skills
    softskillsre, // Resume Soft Skills
  } = useSelector((state) => state.userInput);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resume");

  // Function to render the skill comparison table
  const renderSkillsTable = () => {
    return (
      <table className="skills-table">
        <thead>
          <tr>
            <th>Tech Skills</th>
            <th>Resume</th>
            <th>Job Description</th>
          </tr>
        </thead>
        <tbody>
          {hardskillsjd.map((skill, index) => (
            <tr key={index}>
              <td>{skill}</td>
              <td>
                {hardskillsre.includes(skill) ? (
                  <span className="green-check">✅</span>
                ) : (
                  <span className="red-cross">❌</span>
                )}
              </td>
              <td><span className="green-check">✅</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Function to render the soft skills comparison table
  const renderSoftSkillsTable = () => {
    return (
      <table className="skills-table">
        <thead>
          <tr>
            <th>Soft Skills</th>
            <th>Resume</th>
            <th>Job Description</th>
          </tr>
        </thead>
        <tbody>
          {softskillsjd.map((skill, index) => (
            <tr key={index}>
              <td>{skill}</td>
              <td>
                {softskillsre.includes(skill) ? (
                  <span className="green-check">✅</span>
                ) : (
                  <span className="red-cross">❌</span>
                )}
              </td>
              <td><span className="green-check">✅</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Function to render the keywords comparison table
  const renderKeywordsTable = () => {
    return (
      <table className="skills-table">
        <thead>
          <tr>
            <th>Keywords</th>
            <th>Resume</th>
            <th>Job Description</th>
          </tr>
        </thead>
        <tbody>
          {keywordsjd.map((keyword, index) => (
            <tr key={index}>
              <td>{keyword}</td>
              <td>
                {keywordsre.includes(keyword) ? (
                  <span className="green-check">✅</span>
                ) : (
                  <span className="red-cross">❌</span>
                )}
              </td>
              <td><span className="green-check">✅</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Function to highlight keywords in job description
  const highlightJobDescription = (text) => {
    if (!text) return "";
    return text.split(" ").map((word, index) => {
      if (matchingjdre.includes(word)) {
        return (
          <span key={index} className="highlight-keyword-green">
            {word}{" "}
          </span>
        );
      } else if (keywordsjd.includes(word)) {
        return (
          <span key={index} className="highlight-keyword-red">
            {word}{" "}
          </span>
        );
      }
      return word + " ";
    });
  };

  // Calculate the percentage of matching hard skills
  const matchingHardSkills = hardskillsjd.filter((skill) =>
    hardskillsre.includes(skill)
  ).length;

  const matchingPercentage = (
    (matchingHardSkills / hardskillsjd.length) *
    100
  ).toFixed(2); // Rounded to 2 decimal places

  return (
    <div className="container">
      <Sidebar />
      <div className="user-output-content">
        <h2>Scan Result</h2>
        <div className="tabs">
          <button
            className={activeTab === "resume" ? "active" : ""}
            onClick={() => setActiveTab("resume")}
          >
            Resume
          </button>
          <button
            className={activeTab === "job" ? "active" : ""}
            onClick={() => setActiveTab("job")}
          >
            Job Description
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "resume" && (
            <div>
              {/* <h3>Extracted Resume Text</h3>// remove showing the extraction of resume
              <pre>{extractedResumeText}</pre> */}

              {/* Contact Details */}
              {phone && (
                <div className="contact-section">
                  <h3>📞 Phone Number</h3>
                  <p>Your resume shows you have <strong>{phone}</strong> as your contact phone number.</p>
                </div>
              )}

              {email && (
                <div className="contact-section">
                  <h3>📧 Email</h3>
                  <p>Your resume shows you have <strong>{email}</strong> as your contact email address.</p>
                </div>
              )}

              {address && (
                <div className="contact-section">
                  <h3>🏠 Address</h3>
                  <p>Your resume shows your address as: <strong>{address}</strong>.</p>
                </div>
              )}

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

              {/* Displaying the Percentage of Matching Hard Skills */}
              <div className="contact-section">
                <h3>💡 Skills Comparison</h3>
                <p>
                  Out of {hardskillsjd.length} hard skills in the job description, you have {matchingHardSkills} matching skills in your resume. This is {matchingPercentage}% of the required skills.
                </p>
                {renderSkillsTable()}
              </div>

              {/* Soft Skills Table */}
              <div className="contact-section">
                <h3>💡 Soft Skills Comparison</h3>
                {renderSoftSkillsTable()}
              </div>

              {/* Keywords Table */}
              <div className="contact-section">
                <h3>💡 Keywords Comparison</h3>
                {renderKeywordsTable()}
              </div>
            </div>
          )}
          {activeTab === "job" && (
            <div className="job-content">
              <h3>Job Description</h3>
              <pre>{highlightJobDescription(scannedJobDescription)}</pre>
            </div>
          )}
        </div>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    </div>
  );
};

export default UserOutput;
