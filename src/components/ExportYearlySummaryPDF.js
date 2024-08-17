// ExportYearlySummaryPDF.js

import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const ExportYearlySummaryPDF = ({ yearlySummary }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();

    yearlySummary.forEach((loan, index) => {
      const { principal, yearlySummary } = loan;

      doc.text(`LoanAssist Pro - For Financial Clarity!`, 10, 10);
      doc.text(`Loan ${index + 1} Yearly Summary`, 10, 30);
      doc.autoTable({
        startY: 40,
        head: [
          [
            "Year",
            "Principal Payment (₹)",
            "Interest Payment (₹)",
            "Balance (₹)",
          ],
        ],
        body: yearlySummary.map(
          ({ year, principalPayment, interestPayment, balance }) => [
            year,
            principalPayment,
            interestPayment,
            balance,
          ]
        ),
      });

      if (index !== yearlySummary.length - 1) {
        doc.addPage();
      }
    });

    doc.save("yearly_summary.pdf");
  };

  return (
    <div className="container">
      <button className="button" onClick={exportToPDF}>
        Export to PDF
      </button>
    </div>
  );
};

export default ExportYearlySummaryPDF;
