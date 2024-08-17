// YearlySummary.js

import React, { useState, useEffect } from "react";
import ExportYearlySummaryPDF from "./ExportYearlySummaryPDF";

const YearlySummary = ({ loanInputs }) => {
  const [yearlySummary, setYearlySummary] = useState([]);

  useEffect(() => {
    generateYearlySummary();
  }, [loanInputs]);

  const generateYearlySummary = () => {
    const results = loanInputs.map((loan) => {
      const principal = loan.principal;
      const tenureYears = loan.tenure;
      const monthlyInterestRatio = loan.roi / 100 / 12;
      const tenureMonths = tenureYears * 12;
      const emi = calculateEMI(principal, tenureMonths, monthlyInterestRatio);

      let remainingPrincipal = principal;
      let yearlySummary = [];

      for (let year = 1; year <= tenureYears; year++) {
        let yearlyPayment = 0;
        let yearlyInterest = 0;

        for (let month = 1; month <= 12; month++) {
          const interestPayment = remainingPrincipal * monthlyInterestRatio;
          const principalPayment = Math.min(
            emi - interestPayment,
            remainingPrincipal
          );
          remainingPrincipal -= principalPayment;
          yearlyPayment += principalPayment + interestPayment;
          yearlyInterest += interestPayment;
        }

        yearlySummary.push({
          year: year,
          principalPayment: yearlyPayment.toFixed(2),
          interestPayment: yearlyInterest.toFixed(2),
          balance: remainingPrincipal.toFixed(2),
        });
      }

      return {
        principal: principal,
        yearlySummary: yearlySummary,
      };
    });

    setYearlySummary(results);
  };

  const calculateEMI = (principal, tenureMonths, monthlyInterestRatio) => {
    const emi =
      (principal *
        monthlyInterestRatio *
        Math.pow(1 + monthlyInterestRatio, tenureMonths)) /
      (Math.pow(1 + monthlyInterestRatio, tenureMonths) - 1);
    return emi;
  };

  return (
    <div className="container">
      <h2>Yearly Summary</h2>
      {yearlySummary.length > 0 && (
        <div>
          {yearlySummary.map((result, index) => (
            <div key={index}>
              <h3>Loan {index + 1}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Principal Payment (₹)</th>
                    <th>Interest Payment (₹)</th>
                    <th>Balance (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlySummary.map((yearData, idx) => (
                    <tr key={idx}>
                      <td>{yearData.year}</td>
                      <td>{yearData.principalPayment}</td>
                      <td>{yearData.interestPayment}</td>
                      <td>{yearData.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
            </div>
          ))}
        </div>
      )}
      <ExportYearlySummaryPDF yearlySummary={yearlySummary} />
    </div>
  );
};

export default YearlySummary;
