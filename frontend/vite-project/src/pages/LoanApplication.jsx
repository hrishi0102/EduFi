import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import contractService from "../services/contractService";
import Spinner from "../components/Spinner";
import RepaymentCalculator from "../components/RepaymentCalculator";

const LoanApplication = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAppKitAccount();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [calculatorValues, setCalculatorValues] = useState({
    amount: "",
    duration: "",
  });
  const [formData, setFormData] = useState({
    amount: "",
    duration: "",
    purpose: "",
  });

  useEffect(() => {
    const checkVerification = async () => {
      if (!isConnected || !address) {
        setLoading(false);
        return;
      }

      try {
        const verified = await contractService.isIncomeVerified(address);
        setIsVerified(verified);
      } catch (err) {
        console.error("Verification check error:", err);
        setError("Failed to check verification status");
      } finally {
        setLoading(false);
      }
    };

    checkVerification();
  }, [address, isConnected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "amount" || name === "duration") {
      setCalculatorValues({
        ...calculatorValues,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError("Please enter a valid amount");
      return false;
    }
    if (
      !formData.duration ||
      parseInt(formData.duration) <= 0 ||
      parseInt(formData.duration) > 60
    ) {
      setError("Duration must be between 1 and 60 months");
      return false;
    }
    if (!formData.purpose.trim()) {
      setError("Please enter a purpose for the loan");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await contractService.submitLoanApplication(
        formData.amount,
        formData.duration,
        formData.purpose
      );
      navigate("/loans");
    } catch (error) {
      console.error("Application error:", error);
      setError(error.message || "Failed to submit loan application");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center py-12 bg-slate-800/50 border border-slate-700/50 rounded-lg backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-slate-400">
            Please connect your wallet to apply for a loan.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center py-12 bg-slate-800/50 border border-amber-500/20 rounded-lg backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-amber-400 mb-4">
            Income Verification Required
          </h2>
          <p className="text-slate-400 mb-6">
            You need to verify your income before applying for a loan.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-amber-500 text-slate-900 rounded-lg 
                     hover:bg-amber-400 transition-all duration-300 hover:shadow-lg
                     hover:shadow-amber-500/20"
          >
            Verify Income
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-8">
      <div className="max-w-2xl mx-auto p-8 relative">
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />

        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
            Apply for Education Loan
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Loan Amount (ETH)
              </label>
              <input
                type="number"
                name="amount"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg 
                       text-slate-200 placeholder-slate-500
                       focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                       transition-all duration-300"
                placeholder="Enter amount in ETH"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration (months)
              </label>
              <input
                type="number"
                name="duration"
                min="1"
                max="60"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg 
                       text-slate-200 placeholder-slate-500
                       focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                       transition-all duration-300"
                placeholder="Enter loan duration"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Purpose
              </label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full p-3 bg-slate-900/50 border border-slate-700 rounded-lg 
                       text-slate-200 placeholder-slate-500
                       focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                       transition-all duration-300"
                placeholder="Describe your education purpose"
                rows="4"
                disabled={submitting}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-center">{error}</p>
              </div>
            )}

            {isVerified && formData.amount && formData.duration && (
              <RepaymentCalculator
                loanAmount={parseFloat(formData.amount)}
                duration={parseInt(formData.duration)}
              />
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-emerald-500 text-slate-900 rounded-lg font-medium 
                     hover:bg-emerald-400 focus:outline-none focus:ring-2 
                     focus:ring-emerald-500 focus:ring-offset-2 
                     focus:ring-offset-slate-800 disabled:bg-emerald-500/50 
                     transition-all duration-300 hover:shadow-lg
                     hover:shadow-emerald-500/20"
            >
              {submitting ? <Spinner /> : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
