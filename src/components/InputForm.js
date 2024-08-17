// InputForm.js

import React, { useState } from "react";

const InputForm = ({ addLoan, deleteLoan, loanInputs }) => {
  const [principal, setPrincipal] = useState("");
  const [tenure, setTenure] = useState("");
  const [roi, setRoi] = useState("");

  const handleAddLoan = () => {
    if (principal > 0 && tenure > 0 && roi > 0) {
      const newLoanInput = {
        principal: parseFloat(principal),
        tenure: parseFloat(tenure),
        roi: parseFloat(roi),
      };
      setPrincipal("");
      setTenure("");
      setRoi("");
      addLoan(newLoanInput);
    } else {
      alert("Please enter all fields and it should be non-negative.");
    }
  };

  const handleDeleteLoan = (index) => {
    const updatedLoans = loanInputs.filter((_, i) => i !== index);
    deleteLoan(updatedLoans);
  };

  return (
    <div className="container">
      <h2>Loan Details Input</h2>
      <div className="form-group">
        <label>Principal Amount (₹)</label>
        <input
          type="number"
          className="input-field"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Loan Tenure (years)</label>
        <input
          type="number"
          className="input-field"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Rate of Interest (%)</label>
        <input
          type="number"
          step="0.01"
          className="input-field"
          value={roi}
          onChange={(e) => setRoi(e.target.value)}
        />
      </div>
      <button className="button" onClick={handleAddLoan}>
        Add Loan
      </button>
      <hr />
      <div>
        {loanInputs.length > 0 && (
          <div>
            <h3>Current Loans Entered:</h3>
            <ul>
              {loanInputs.map((loan, index) => (
                <li key={index}>
                  Principal: ₹{loan.principal}, Tenure: {loan.tenure} years,
                  ROI: {loan.roi}%
                  <button
                    className="button"
                    onClick={() => handleDeleteLoan(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;
