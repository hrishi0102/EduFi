import React, { useState, useEffect } from "react";
import { Calculator, DollarSign, Wallet, PiggyBank, Info } from "lucide-react";

const RepaymentCalculator = ({ loanAmount, duration }) => {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const interestRate = 0.05; // 5% annual interest rate

  useEffect(() => {
    if (loanAmount && duration) {
      const r = interestRate / 12;
      const n = duration;
      const monthlyPmt =
        (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPmt = monthlyPmt * duration;
      const totalInt = totalPmt - loanAmount;

      setMonthlyPayment(monthlyPmt);
      setTotalPayment(totalPmt);
      setTotalInterest(totalInt);
    }
  }, [loanAmount, duration]);

  return (
    <div
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 my-6 
                  hover:border-emerald-500/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Calculator className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-200">
          Loan Repayment Calculator
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50
                    hover:border-emerald-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-emerald-400" />
            <p className="text-sm text-slate-400">Monthly Payment</p>
          </div>
          <p
            className="text-2xl font-bold text-transparent bg-clip-text 
                      bg-gradient-to-r from-emerald-400 to-emerald-200"
          >
            {monthlyPayment ? `${monthlyPayment.toFixed(4)} ETH` : "-"}
          </p>
        </div>

        <div
          className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50
                    hover:border-emerald-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <p className="text-sm text-slate-400">Total Payment</p>
          </div>
          <p
            className="text-2xl font-bold text-transparent bg-clip-text 
                      bg-gradient-to-r from-emerald-400 to-emerald-200"
          >
            {totalPayment ? `${totalPayment.toFixed(4)} ETH` : "-"}
          </p>
        </div>

        <div
          className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50
                    hover:border-emerald-500/30 transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank className="w-4 h-4 text-amber-400" />
            <p className="text-sm text-slate-400">Total Interest</p>
          </div>
          <p
            className="text-2xl font-bold text-transparent bg-clip-text 
                      bg-gradient-to-r from-amber-400 to-amber-200"
          >
            {totalInterest ? `${totalInterest.toFixed(4)} ETH` : "-"}
          </p>
        </div>
      </div>

      <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-lg mb-4">
        <div className="flex items-start gap-2">
          <div className="mt-1">
            <Info className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your income has been securely verified through zero-knowledge
            proofs, confirming your eligibility for this loan amount while
            maintaining your privacy.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Calculator className="w-4 h-4 text-slate-500" />
        <p className="text-sm text-slate-500">
          Annual interest rate: {(interestRate * 100).toFixed(1)}%
        </p>
      </div>

      {duration > 24 && (
        <div className="mt-2 text-sm text-amber-400">
          Note: Consider a shorter loan duration to reduce total interest
          payments.
        </div>
      )}
    </div>
  );
};

export default RepaymentCalculator;
