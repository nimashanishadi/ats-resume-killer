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
    missingKeywords,
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

  // Function to highlight matching jdre in the extracted resume text
  const highlightMatchingJDRE = (text) => {
    if (!text) return "";

    let highlightedText = text;

    // Loop through each term in matchingjdre and highlight them in green
    matchingjdre.forEach((term) => {
      const regex = new RegExp(`\\b${term}\\b`, "gi"); // Case-insensitive matching
      highlightedText = highlightedText.replace(regex, (match) =>
        `<span class="highlight-keyword-green">${match}</span>`
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  // Function to highlight keywords in job description
  const highlightJobDescription = (text) => {
    if (!text) return "";

    let highlightedText = text;

    // Function to wrap matched words/phrases with span
    const highlightWords = (words, className) => {
      words.forEach((phrase) => {
        const regex = new RegExp(`\\b${phrase}\\b`, "gi"); // Case-insensitive matching
        highlightedText = highlightedText.replace(regex, (match) =>
          `<span class="${className}">${match}</span>`
        );
      });
    };

    highlightWords(matchingjdre, "highlight-keyword-green");
    highlightWords(missingKeywords, "highlight-keyword-red");

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  // Calculate the percentage of matching hard skills
  const matchingHardSkills = hardskillsjd.filter((skill) =>
    hardskillsre.includes(skill)
  ).length;

  const matchingPercentage = (
    (matchingHardSkills / hardskillsjd.length) *
    100
  ).toFixed(2); // Rounded to 2 decimal places

  // Calculate the percentage of matching soft skills
  const matchingSoftSkills = softskillsjd.filter((skill) =>
    softskillsre.includes(skill)
  ).length;

  const matchingSoftSkillsPercentage = (
    (matchingSoftSkills / softskillsjd.length) *
    100
  ).toFixed(2);

  // Calculate the percentage of matching keywords
  const matchingKeywords = keywordsjd.filter((keyword) =>
    keywordsre.includes(keyword)
  ).length;

  const matchingKeywordsPercentage = (
    (matchingKeywords / keywordsjd.length) *
    100
  ).toFixed(2);

  // Calculate overall score by considering all matching words (no duplicates)
  const uniqueMatchingWords = new Set([
    ...hardskillsjd.filter((skill) => hardskillsre.includes(skill)),
    ...softskillsjd.filter((skill) => softskillsre.includes(skill)),
    ...keywordsjd.filter((keyword) => keywordsre.includes(keyword)),
  ]);

  const overallScore = ((uniqueMatchingWords.size /
    (hardskillsjd.length + softskillsjd.length + keywordsjd.length)) * 100).toFixed(2);

  return (
    <div className="container">
      <Sidebar />
      <div className="user-output-content">
        <h2>Scan Result</h2>
        <h3>Overall Matching Score: {overallScore}%</h3>
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
              {/* Personal Information Section */}
              <div className="contact-section">
                <p>
                  These are the personal details found on your resume through our ATS (Applicant Tracking System) scan. They help in ensuring your contact information is correctly presented.
                </p>
              </div>

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

              {/* Displaying the Percentage of Matching Soft Skills */}
              <div className="contact-section">
                <h3>💡 Soft Skills Comparison</h3>
                <p>
                  Out of {softskillsjd.length} soft skills in the job description, you have {matchingSoftSkills} matching skills in your resume. This is {matchingSoftSkillsPercentage}% of the required skills.
                </p>
                {renderSoftSkillsTable()}
              </div>

              {/* Displaying the Percentage of Matching Keywords */}
              <div className="contact-section">
                <h3>💡 Keywords Comparison</h3>
                <p>
                  Out of {keywordsjd.length} keywords in the job description, you have {matchingKeywords} matching keywords in your resume. Try to add more keywords from here.
                </p>
                {renderKeywordsTable()}
              </div>

              {/* Extracted Resume Text at the End */}
              <h3>Extracted Resume Text</h3>
              <pre>{highlightMatchingJDRE(extractedResumeText)}</pre>
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
