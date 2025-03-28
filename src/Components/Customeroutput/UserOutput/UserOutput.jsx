import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserOutput.css";
import Sidebar from "./../../Sidebar/Sidebar";
import MatchScoreComponent from "./../../../Components/MatchScoreComponent/MatchScoreComponent";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
      <div className="table-container">
        <table className="styled-table">
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
                    <span className="modern-check"></span>
                  ) : (
                    <span className="modern-cross"></span>
                  )}
                </td>
                <td><span className="modern-check"></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  

  // Function to render the soft skills comparison table
  const renderSoftSkillsTable = () => {
    return (
      <div className="table-container">
        <table className="styled-table">
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
                    <span className="modern-check"></span>
                  ) : (
                    <span className="modern-cross"></span>
                  )}
                </td>
                <td><span className="modern-check"></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  

  // Function to render the keywords comparison table
  const renderKeywordsTable = () => {
    return (
      <div className="table-container">
        <table className="styled-table">
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
                    <span className="modern-check"></span>
                  ) : (
                    <span className="modern-cross"></span>
                  )}
                </td>
                <td><span className="modern-check"></span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  const calculateOverallScore = (state) => {
    const {
      keywordsjd, softskillsjd, hardskillsjd, // Job Description Keywords
      keywordsre, softskillsre, hardskillsre, matchingjdre, // Resume Keywords
      phone, email, address, linkedin,
      structure,
      wordcount,
    } = state.userInput;
  
    // Combine all keywords from job description and resume, removing duplicates
    const jobDescriptionKeywords = [...new Set([...keywordsjd, ...softskillsjd, ...hardskillsjd])];
    const resumeKeywords = [...new Set([...keywordsre, ...softskillsre, ...hardskillsre, ...matchingjdre])];
  
    // Count matching keywords
    const matchingKeywords = jobDescriptionKeywords.filter(keyword => resumeKeywords.includes(keyword)).length;
    
    // Calculate keyword matching percentage
    const keywordMatchingPercentage = (matchingKeywords / jobDescriptionKeywords.length) || 0;
  
    // Weight it based on 60
    const keywordMatching = (keywordMatchingPercentage * 60).toFixed(2);
  
    // 2. Essential Info (10/100)
    let essentialInfo = 10;
    const missingFields = [phone, email, address, linkedin].filter(field => !field).length;
    essentialInfo -= missingFields * 2.5;
  
    // 3. Structure Info (10/100)
    let structureInfo = structure === "good" ? 10 : structure === "average" ? 5 : 0;
  
    // 4. Word Count Info (20/100)
    let wordcountInfo = 0;
    if (wordcount >= 475 && wordcount <= 600) wordcountInfo = 20;
    else if ((wordcount > 600 && wordcount <= 800) || (wordcount >= 300 && wordcount < 475)) wordcountInfo = 10;
  
    // Final Overall Score Calculation
    const overallScore = (
      parseFloat(keywordMatching) + essentialInfo + structureInfo + wordcountInfo
    ).toFixed(2);
  
    // Print the values
    console.log("Keyword Matching Score:", keywordMatching);
    console.log("Essential Info Score:", essentialInfo);
    console.log("Structure Info Score:", structureInfo);
    console.log("Word Count Score:", wordcountInfo);
    console.log("Final Overall Score:", overallScore);
  
    return overallScore;
};

  
  // Example usage in the component
  const overallScore = calculateOverallScore(useSelector(state => state));
  

  return (
    <div className="container">
      <Sidebar />
      <div className="user-output-content">
        <h2>Here is your Resume Scan Result</h2>
        <MatchScoreComponent overallScore={overallScore} />
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
              <div className="contact-section white-background">
                <p>
                  These are the personal details found on your resume through our ATS (Applicant Tracking System) scan. They help in ensuring your contact information is correctly presented.
                </p>
              </div>

              {phone && (
                <div className="contact-section white-background">
                  <div className="contact-header">
                  <span className="contact-icon">📞</span>
                    <h3 className="contact-title">Phone Number</h3>
                  </div>
                  <p className="contact-details">
                    Your resume shows you have <strong>{phone}</strong> as your contact phone number.
                  </p>
                </div>
              )}



              {email && (
                <div className="contact-section white-background">
                  <div className="contact-header">
                    <span className="contact-icon">📧</span>
                    <h3 className="contact-title">Email</h3>
                  </div>
                  <p className="contact-details">Your resume shows you have <strong>{email}</strong> as your contact email address.</p>
                </div>
              )}

              {address && (
                <div className="contact-section white-background">
                  <div className="contact-header">
                    <span className="contact-icon ">🏠</span>
                    <h3 className="contact-title">Address</h3>
                  </div>
                  <p className="contact-details">Your resume shows your address as: <strong>{address}</strong>.</p>
                </div>
              )}

              {linkedin && (
                <div className="contact-section white-background">
                  <div className="contact-header">
                    <span className="contact-icon ">🔗</span>
                    <h3 className="contact-title">LinkedIn Profile</h3>
                  </div>
                  {linkedin.startsWith("http") ? (
                    <p>
                      Your LinkedIn profile:{" "}
                      <a href={linkedin} target="_blank" rel="noopener noreferrer">
                        {linkedin}
                      </a>
                    </p>
                  ) : (
                    <p className="contact-details">Your resume contains the LinkedIn information: <strong>{linkedin}</strong></p>
                  )}
                </div>
              )}


              {/* Displaying the Percentage of Matching Hard Skills */}
              <div className="contact-section">
              <div className="score-container">
                <div className="score-label">
                  
                  <CircularProgressbar value={matchingPercentage} text={`${matchingPercentage}%`} />
                  </div>
                <div className="skills-comparison">
                  <h3>💡 Skills Comparison</h3>
                  <p>
                    Out of <strong>{hardskillsjd.length}</strong> hard skills in the job description, you have <strong>{matchingHardSkills}</strong> matching skills in your resume. This is {matchingPercentage}% of the required skills.
                  </p>
                </div>
              </div>
              {renderSkillsTable()}
            </div>


              {/* Displaying the Percentage of Matching Soft Skills */}
              <div className="contact-section">
                <div className="score-container">
                  <div className="score-label">
                    {/* {matchingSoftSkillsPercentage}% */}
                    <CircularProgressbar value={matchingSoftSkillsPercentage} text={`${matchingSoftSkillsPercentage}%`} />
                    </div>
                  <div className="skills-comparison">
                    <h3>💡 Soft Skills Comparison</h3>
                    <p>
                      Out of <strong>{softskillsjd.length}</strong> soft skills in the job description, you have <strong>{matchingSoftSkills}</strong> matching skills in your resume. This is {matchingSoftSkillsPercentage}% of the required skills.
                    </p>
                  </div>
                </div>
                {renderSoftSkillsTable()}
              </div>


              {/* Displaying the Percentage of Matching Keywords */}
              <div className="contact-section">
                <div className="score-container">
                  <div className="score-label">
                    <CircularProgressbar
                      value={matchingKeywordsPercentage}
                      text={`${matchingKeywordsPercentage}%`}
                    />
                  </div>
                  <div className="skills-comparison">
                    <h3>💡 Keywords Comparison</h3>
                    <p>
                      Out of <strong>{keywordsjd.length}</strong> keywords in the job description, you have <strong>{matchingKeywords}</strong> matching keywords in your resume. Try to add more keywords from here.
                    </p>
                  </div>
                </div>
                {renderKeywordsTable()}
              </div>


              {/* Extracted Resume Text at the End */}
              <div className="resume-section">
                <h3>Extracted Resume Text</h3>
                <pre>{highlightMatchingJDRE(extractedResumeText)}</pre>
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
