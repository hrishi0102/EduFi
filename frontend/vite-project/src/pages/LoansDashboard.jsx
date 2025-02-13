import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppKitAccount } from "@reown/appkit/react";
import contractService from "../services/contractService";
import Spinner from "../components/Spinner";

const LoanCard = ({ loan }) => {
  const getStatusStyle = (loan) => {
    if (loan.isFunded) {
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    }
    if (loan.isApproved) {
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
    return "bg-slate-700/50 text-slate-400 border-slate-600/30";
  };

  const getStatusText = (loan) => {
    if (loan.isFunded) return "Funded";
    if (loan.isApproved) return "Approved";
    return "Pending";
  };

  return (
    <div
      className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50
                  hover:border-emerald-500/30 transition-all duration-300
                  hover:shadow-lg hover:shadow-emerald-500/10"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-emerald-400">
            {loan.amount} ETH
          </h3>
          <p className="text-sm text-slate-400">
            {new Date(loan.timestamp).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-3 py-1 text-sm rounded-full border ${getStatusStyle(
            loan
          )}`}
        >
          {getStatusText(loan)}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Duration:</span>
          <span className="font-medium text-slate-200">
            {loan.duration} months
          </span>
        </div>
        <div>
          <span className="text-slate-400">Purpose:</span>
          <p className="mt-1 text-slate-300">{loan.purpose}</p>
        </div>
      </div>
    </div>
  );
};

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
        <div className="text-center py-12 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-slate-400">
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
        <div className="text-center py-12 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-amber-500/20">
          <h2 className="text-xl font-semibold text-amber-400 mb-4">
            Income Verification Required
          </h2>
          <p className="text-slate-400 mb-6">
            Please verify your income before applying for loans.
          </p>
          <Link
            to="/"
            className="px-6 py-2 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400 
                     transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
          >
            Verify Income
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto p-8 relative">
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />

        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
              Your Loans
            </h1>
            <Link
              to="/apply"
              className="px-4 py-2 bg-emerald-500 text-slate-900 rounded-lg 
                       hover:bg-emerald-400 transition-all duration-300
                       hover:shadow-lg hover:shadow-emerald-500/20"
            >
              Apply for Loan
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          {loans.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50">
              <p className="text-slate-400 mb-4">
                You haven't applied for any loans yet.
              </p>
              <Link
                to="/apply"
                className="text-emerald-400 hover:text-emerald-300 font-medium"
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
      </div>
    </div>
  );
};

export default LoanDashboard;
