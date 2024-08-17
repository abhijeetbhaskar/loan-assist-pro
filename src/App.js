// App.js
// import "./styles.css";
import "./App.css";
import React, { useState } from "react";
import InputForm from "./components/InputForm";
import EMIResult from "./components/EMIResult";
import YearlySummary from "./components/YearlySummary";
import MonthlySchedule from "./components/MonthlySchedule";
import ThemeToggle from "./components/ThemeToggle";
import ExportToPDF from "./components/ExportToPDF";
import About from "./components/About";
import logo from "./assets/logo.png";

const App = () => {
  const [loanInputs, setLoanInputs] = useState([]);

  const addLoan = (newLoan) => {
    setLoanInputs([...loanInputs, newLoan]);
  };

  const deleteLoan = (updatedLoan) => {
    setLoanInputs(updatedLoan);
  };

  return (
    <div className="App">
      <h1>LoanAssist Pro</h1>
      <h3>For Financial Clarity!</h3>
      <ThemeToggle />
      <InputForm
        addLoan={addLoan}
        deleteLoan={deleteLoan}
        loanInputs={loanInputs}
      />
      {loanInputs.length > 0 && (
        <>
          {/* <EMIResult loanInputs={loanInputs} />
          <YearlySummary loanInputs={loanInputs} />
          <MonthlySchedule loanInputs={loanInputs} /> */}
          <ExportToPDF
            elementId="exportContent"
            fileName="LoanDetails.pdf"
            logoUrl={logo}
            watermarkText="LoanAssist Pro"
          />
        </>
      )}
      {loanInputs.length > 0 ? (
        <div id="exportContent">
          {/* Content to export as PDF */}
          <EMIResult loanInputs={loanInputs} />
          <YearlySummary loanInputs={loanInputs} />
          <MonthlySchedule loanInputs={loanInputs} />
        </div>
      ) : (
        <div className="container">Your loan details will show up here.</div>
      )}
      <About />
    </div>
  );
};

export default App;
