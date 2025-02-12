// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import VerificationPage from "./pages/VerificationPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoanApplication from "./pages/LoanApplication";
import LoansDashboard from "./pages/LoansDashboard";
import ChatInterface from "./pages/ChatInterface";
import CareerMatch from "./components/CareerMatch";
import CourseRecommendations from "./components/CourseCard";

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
                <Route path="/chat" element={<ChatInterface />} />
                <Route path="/career-match" element={<CareerMatch />} />
                <Route
                  path="/course-recommendations"
                  element={<CourseRecommendations />}
                />
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
