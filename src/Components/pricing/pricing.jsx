import React from "react";
import "./pricing.css";

const Pricing = () => {
  return (
    <div className="pricing-container">
      <h2 className="title">Plans & Pricing</h2>
      <p className="subtitle">
        Supercharge your job search with our premium subscription, available on a
        monthly or quarterly basis.
      </p>
      <div className="plans">
        <div className="plan free">
          <h3>Free</h3>
          <p className="price">$0<span>/month</span></p>
          <button className="current-plan">Current Plan</button>
          <p className="note">Free Forever</p>
        </div>
        <div className="plan premium-quarterly">
          <h3>Premium Quarterly</h3>
          <p className="price">$11.62<span>/month</span></p>
          <p className="billing">$34.86 Billed Every 3 Months</p>
          <button className="subscribe">Subscribe</button>
          <p className="save">Save $9.99</p>
        </div>
        <div className="plan premium-monthly">
          <h3>Premium Monthly</h3>
          <p className="price">$14.95<span>/month</span></p>
          <button className="subscribe">Subscribe</button>
          <p className="billing">$14.95 Billed Every Month</p>
        </div>
      </div>
      <div className="features-table">
        <table>
          <thead>
            <tr>
              <th>Features</th>
              <th>Free</th>
              <th>Premium Quarterly</th>
              <th>Premium Monthly</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Job Match Scans</td>
              <td>2/Week</td>
              <td className="highlight">Unlimited</td>
              <td className="highlight">Unlimited</td>
            </tr>
            <tr>
              <td>Scan History</td>
              <td>10</td>
              <td className="highlight">Unlimited</td>
              <td className="highlight">Unlimited</td>
            </tr>
            <tr>
              <td>Job Board Tracker</td>
              <td>✔</td>
              <td>✔</td>
              <td>✔</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pricing;