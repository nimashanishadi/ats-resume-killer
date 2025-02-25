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
          <h3>Perfect every job application</h3>
          <ul>
            <li>🔒 <em>Unlimited</em> resume and cover letter scans</li>
            <li>🔒 Power Edit your resume</li>
          </ul>
        </div>

        <div className="section">
          <h3>Discover ebooks and templates</h3>
          <ul>
            <li>🔒 ATS Revealed eBook</li>
            <li>🔒 Cover letter template</li>
            <li>🔹 <a href="#">20 ATS friendly resume templates</a></li>
          </ul>
        </div>

        <div className="section">
          <h3>Brush up on the basics</h3>
          <ul>
            <li>🔹 <a href="#">Learning center</a> with how-tos on every aspect of your job search</li>
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
