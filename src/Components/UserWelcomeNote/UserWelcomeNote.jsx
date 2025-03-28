import React from "react";
import "./UserWelcomeNote.css";

const UserWelcomeNote = ({ onClose }) => {
  return (
    <div className="welcome-note-container">
      <div className="header">
        <div className="title">
          <span className="lock-icon">🔒</span> Upgrade Perks
        </div>
        <button className="close-button" onClick={onClose}>✖</button>
      </div>

      <div className="content">
        <div className="section-1">
        <div className="section">
          <h3>Perfect for every job application</h3>
          <ul>
            <li>🔒 <em>Unlimited </em>  _resume scans</li>
            <li>🔒 Generate your Cover Letter</li>
          </ul>
        </div>

        <div className="section">
          <h3>Discover ebooks and templates</h3>
          <ul>
            <li>🔒 ATS Revealed eBooks</li>
            <li>🔒 Cover letter template</li>
            <li>🔹 <a href="#">ATS friendly resume templates</a></li>
          </ul>
        </div>

        <div className="section">
          <h3>Validate and Match your Skills</h3>
          <ul>
            <li>🔹 <a href="#">Scan here</a> with how-tos on every aspect of your job search</li>
            <li>🔹 <a href="#">Scan here</a> with crack down all ket words </li>
          </ul>
        </div>

        </div>
        <div className="section-1">
        <div className="section">
          <h3>Boost your professional e-presence</h3>
          <ul>
            <li>🔒 <a href="#">Optimize your LinkedIn profile</a> for the jobs you want</li>
            <li>🔒 <a href="#">Track your LinkedIn profile</a> improvements</li>
          </ul>
        </div>

        <div className="section">
          <h3>Find better jobs</h3>
          <ul>
            <li>🔹 <a href="#">Career Change tool</a></li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserWelcomeNote;
