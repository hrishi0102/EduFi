// src/pages/LoanApplication.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import contractService from "../services/contractService";
import Spinner from "../components/Spinner";

const LoanApplication = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAppKitAccount();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        <div className="text-center py-12 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-yellow-700">
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
        <div className="text-center py-12 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">
            Income Verification Required
          </h2>
          <p className="text-yellow-700 mb-6">
            You need to verify your income before applying for a loan.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition-colors"
          >
            Verify Income
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Apply for Education Loan</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Amount (ETH)
          </label>
          <input
            type="number"
            name="amount"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter amount in ETH"
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (months)
          </label>
          <input
            type="number"
            name="duration"
            min="1"
            max="60"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter loan duration"
            disabled={submitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purpose
          </label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your education purpose"
            rows="4"
            disabled={submitting}
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium 
                   hover:bg-blue-700 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 
                   transition-colors"
        >
          {submitting ? <Spinner /> : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default LoanApplication;
