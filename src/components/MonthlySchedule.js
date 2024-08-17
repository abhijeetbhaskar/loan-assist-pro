// MonthlySchedule.js

import React, { useState, useEffect } from "react";
import ExportMonthlySchedulePDF from "./ExportMonthlySchedulePDF";

const MonthlySchedule = ({ loanInputs }) => {
  const [monthlySchedule, setMonthlySchedule] = useState([]);

  useEffect(() => {
    generateMonthlySchedule();
  }, [loanInputs]);

  const generateMonthlySchedule = () => {
    const results = loanInputs.map((loan) => {
      const principal = loan.principal;
      const tenureYears = loan.tenure;
      const monthlyInterestRatio = loan.roi / 100 / 12;
      const tenureMonths = tenureYears * 12;
      const emi = calculateEMI(principal, tenureMonths, monthlyInterestRatio);

      let remainingPrincipal = principal;
      let monthlySchedule = [];

      for (let month = 1; month <= tenureMonths; month++) {
        const interestPayment = remainingPrincipal * monthlyInterestRatio;
        const principalPayment = emi - interestPayment;
        remainingPrincipal -= principalPayment;

        monthlySchedule.push({
          month: month,
          principalPayment: principalPayment.toFixed(2),
          interestPayment: interestPayment.toFixed(2),
          balance: remainingPrincipal.toFixed(2),
        });
      }

      return {
        principal: principal,
        monthlySchedule: monthlySchedule,
      };
    });

    setMonthlySchedule(results);
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
      <h2>Monthly Payment Schedule</h2>
      {monthlySchedule.length > 0 && (
        <div>
          {monthlySchedule.map((result, index) => (
            <div key={index}>
              <h3>Loan {index + 1}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Principal Payment (₹)</th>
                    <th>Interest Payment (₹)</th>
                    <th>Balance (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {result.monthlySchedule.map((monthData, idx) => (
                    <tr key={idx}>
                      <td>{monthData.month}</td>
                      <td>{monthData.principalPayment}</td>
                      <td>{monthData.interestPayment}</td>
                      <td>{monthData.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
            </div>
          ))}
        </div>
      )}
      <ExportMonthlySchedulePDF monthlySchedule={monthlySchedule} />
    </div>
  );
};

export default MonthlySchedule;
