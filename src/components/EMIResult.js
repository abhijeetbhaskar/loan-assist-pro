// EMIResult.js

import React from "react";

const EMIResult = ({ loanInputs }) => {
  const calculateEMI = (principal, tenure, roi) => {
    const monthlyInterestRatio = roi / 100 / 12;
    const tenureMonths = tenure * 12;
    const emi =
      (principal *
        monthlyInterestRatio *
        Math.pow(1 + monthlyInterestRatio, tenureMonths)) /
      (Math.pow(1 + monthlyInterestRatio, tenureMonths) - 1);
    return emi.toFixed(2);
  };

  const calculateTIP = (principle, tenure, roi) => {
    return (
      calculateEMI(principle, tenure, roi) * tenure * 12 -
      principle
    ).toFixed(2);
  };

  return (
    <div className="container">
      <h2>EMI Results</h2>
      <table>
        <thead>
          <tr>
            <th>Loan</th>
            <th>Principal (₹)</th>
            <th>Tenure (years)</th>
            <th>Rate of Interest (%)</th>
            <th>EMI (₹)</th>
            <th>Total Interest Paid (₹)</th>
          </tr>
        </thead>
        <tbody>
          {loanInputs.map((loan, index) => (
            <tr key={index}>
              <td>Loan {index + 1}</td>
              <td>{loan.principal}</td>
              <td>{loan.tenure}</td>
              <td>{loan.roi}</td>
              <td>{calculateEMI(loan.principal, loan.tenure, loan.roi)}</td>
              <td>{calculateTIP(loan.principal, loan.tenure, loan.roi)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default EMIResult;
