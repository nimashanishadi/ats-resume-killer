import React from "react";
import "./MatchScoreComponent.css";

const MatchScoreComponent = ({ overallScore }) => {
  return (
    <div className="match-score-container">
      <div className="circle-progress">
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path
            className="circle-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            strokeDasharray={`${overallScore}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage-text">
            {overallScore}
          </text>
        </svg>
      </div>
      <div className="match-score-text">
        <h3>Keep adding those missing keywords to raise your score!</h3>
        <p>
          Your computed match rate is below the recommended score of 80 to be competitive for this
          job. There is a small probability that your resume may be skipped over for a more
          qualified candidate. Please review the below report and add any relevant missing skills or
          keywords to increase your Match Score above 80.
        </p>
      </div>
    </div>
  );
};

export default MatchScoreComponent;
