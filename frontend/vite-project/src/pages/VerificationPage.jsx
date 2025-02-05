// src/pages/VerificationPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import axios from "axios";
import Spinner from "../components/Spinner";
import VerificationDetails from "../components/VerificationDetails";
import ConnectWallet from "../components/ConnectWallet";

const VerificationPage = () => {
  const navigate = useNavigate();
  const { address: account, isConnected } = useAppKitAccount();
  const [income, setIncome] = useState("");
  const [threshold, setThreshold] = useState(50000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const validateInput = () => {
    if (!income || isNaN(income) || parseInt(income) <= 0) {
      setError("Please enter a valid income amount");
      return false;
    }

    if (!isConnected) {
      setError("Please connect your wallet first");
      return false;
    }

    return true;
  };

  const handleGenerateAndVerifyProof = async () => {
    if (!validateInput()) return;

    setLoading(true);
    setError("");
    setVerificationResult(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/generate-and-verify-proof`,
        {
          income: parseInt(income),
          threshold,
          address: account,
        }
      );

      const result = response.data;

      if (!result.isValid) {
        throw new Error("Proof verification failed");
      }

      setVerificationResult(result);
    } catch (error) {
      console.error("Error in proof generation:", error);
      setError(
        error.response?.data?.error ||
          error.message ||
          "Failed to generate and verify proof"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEnterDapp = () => {
    navigate("/home");
  };

  if (!isConnected) {
    return <ConnectWallet />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Verify Your Income
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          Connected Account: {account}
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Income:
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your income"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Threshold:
            </label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the threshold"
            />
          </div>

          <button
            onClick={handleGenerateAndVerifyProof}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium 
                     hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 
                     transition-colors"
          >
            {loading ? <Spinner /> : "Generate & Verify Proof"}
          </button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          {verificationResult && (
            <>
              <VerificationDetails result={verificationResult} />
              <button
                onClick={handleEnterDapp}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-medium 
                         hover:bg-green-700 focus:outline-none focus:ring-2 
                         focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Enter the DApp
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
