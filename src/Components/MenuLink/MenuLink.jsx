import React from 'react';
import './MenuLink.css'; // Import the CSS file
import { Link } from 'react-router-dom';

function MenuLink(props) {
  return (
    <div className="menu-link">
      {/* Adding class 'menu-link-text' to Link component for proper styling */}
      <Link to={props.url} className="menu-link-text">
        {props.linkname}
      </Link>
    </div>
  );
}

export default MenuLink;
