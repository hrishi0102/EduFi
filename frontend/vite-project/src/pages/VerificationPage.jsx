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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-12">
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full translate-x-1/4" />

        <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
            Verify Your Income
          </h1>

          <p className="text-sm text-slate-400 mb-4 font-mono">
            Connected Account: {account}
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Income:
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg 
                         text-slate-200 placeholder-slate-500
                         focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                         transition-all duration-300"
                placeholder="Enter your income"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Threshold:
              </label>
              <input
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(parseInt(e.target.value))}
                className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg 
                         text-slate-200 placeholder-slate-500
                         focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                         transition-all duration-300"
                placeholder="Enter the threshold"
              />
            </div>

            <button
              onClick={handleGenerateAndVerifyProof}
              disabled={loading}
              className="w-full py-3 bg-emerald-500 text-slate-900 rounded-lg font-medium 
                       hover:bg-emerald-400 focus:outline-none focus:ring-2 
                       focus:ring-emerald-500 focus:ring-offset-2 
                       focus:ring-offset-slate-800 disabled:bg-emerald-500/50
                       transition-all duration-300 hover:shadow-lg
                       hover:shadow-emerald-500/20"
            >
              {loading ? <Spinner /> : "Generate & Verify Proof"}
            </button>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-center">{error}</p>
              </div>
            )}

            {verificationResult && (
              <>
                <VerificationDetails result={verificationResult} />
                <button
                  onClick={handleEnterDapp}
                  className="w-full py-3 bg-amber-500 text-slate-900 rounded-lg font-medium 
                           hover:bg-amber-400 focus:outline-none focus:ring-2 
                           focus:ring-amber-500 focus:ring-offset-2
                           focus:ring-offset-slate-800 transition-all duration-300
                           hover:shadow-lg hover:shadow-amber-500/20"
                >
                  Enter the DApp
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
