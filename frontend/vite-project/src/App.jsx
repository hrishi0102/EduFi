// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import VerificationPage from "./pages/VerificationPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoanApplication from "./pages/LoanApplication";
import LoansDashboard from "./pages/LoansDashboard";

const App = () => {
  const { isConnected } = useAppKitAccount();

  return (
    <div>
      <Routes>
        <Route path="/" element={<VerificationPage />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/apply" element={<LoanApplication />} />
                <Route path="/loans" element={<LoansDashboard />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
