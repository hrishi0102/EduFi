// src/pages/LoanDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import contractService from "../services/contractService";
import Spinner from "../components/Spinner";

// LoanCard sub-component
const LoanCard = ({ loan }) => {
  const getStatusColor = (loan) => {
    if (loan.isFunded) {
      return "bg-green-100 text-green-800";
    }
    if (loan.isApproved) {
      return "bg-blue-100 text-blue-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  const getStatusText = (loan) => {
    if (loan.isFunded) return "Funded";
    if (loan.isApproved) return "Approved";
    return "Pending";
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {loan.amount} ETH
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(loan.timestamp).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-2 py-1 text-sm rounded-full ${getStatusColor(loan)}`}
        >
          {getStatusText(loan)}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium">{loan.duration} months</span>
        </div>
        <div>
          <span className="text-gray-600">Purpose:</span>
          <p className="mt-1 text-gray-800">{loan.purpose}</p>
        </div>
      </div>
    </div>
  );
};

// Main component
const LoanDashboard = () => {
  const { address, isConnected } = useAppKitAccount();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isConnected || !address) {
        setLoading(false);
        return;
      }

      try {
        const verified = await contractService.isIncomeVerified(address);
        setIsVerified(verified);

        if (verified) {
          const userLoans = await contractService.getUserLoans(address);
          setLoans(userLoans);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch loans. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center py-12 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-yellow-700">
            Please connect your wallet to view your loans.
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
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center py-12 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">
            Income Verification Required
          </h2>
          <p className="text-yellow-700 mb-6">
            Please verify your income before applying for loans.
          </p>
          <Link
            to="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition-colors inline-block"
          >
            Verify Income
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Loans</h1>
        <Link
          to="/apply"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 transition-colors"
        >
          Apply for Loan
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}

      {loans.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">
            You haven't applied for any loans yet.
          </p>
          <Link
            to="/apply"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Apply for your first loan
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {loans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanDashboard;
