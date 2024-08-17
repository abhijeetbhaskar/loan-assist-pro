// ExportMonthlySchedulePDF.js

import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ExportMonthlySchedulePDF = ({ monthlySchedule }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();

    monthlySchedule.forEach((loan, index) => {
      const { principal, monthlySchedule } = loan;

      doc.text(`LoanAssist Pro - For Financial Clarity!`, 10, 10);
      doc.text(`Loan ${index + 1} Monthly Schedule`, 10, 30);
      doc.autoTable({
        startY: 40,
        head: [
          [
            "Month",
            "Principal Payment (₹)",
            "Interest Payment (₹)",
            "Balance (₹)",
          ],
        ],
        body: monthlySchedule.map(
          ({ month, principalPayment, interestPayment, balance }) => [
            month,
            principalPayment,
            interestPayment,
            balance,
          ]
        ),
      });

      if (index !== monthlySchedule.length - 1) {
        doc.addPage();
      }
    });

    doc.save("monthly_schedule.pdf");
  };

  return (
    <div className="container">
      <button className="button" onClick={exportToPDF}>
        Export to PDF
      </button>
    </div>
  );
};

export default ExportMonthlySchedulePDF;
