import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="logo">Your Logo</div>
      <ul className="nav-list">
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/job-scans")}>Job Scans</li>
        <li onClick={() => navigate("/resumes")}>Resumes</li>
        <li className="new-scan" onClick={() => navigate("/new-scan")}>+ New Scan</li>
      </ul>
    </div>
  );
};

export default Sidebar;
