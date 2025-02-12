import React, { useState, useEffect } from "react";
import { Calculator } from "lucide-react";

const RepaymentCalculator = ({ income, loanAmount, duration }) => {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const interestRate = 0.05; // 5% annual interest rate

  useEffect(() => {
    if (loanAmount && duration) {
      // Simple loan calculation formula
      const r = interestRate / 12; // monthly interest rate
      const n = duration; // number of months
      const monthlyPmt =
        (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPmt = monthlyPmt * duration;

      setMonthlyPayment(monthlyPmt);
      setTotalPayment(totalPmt);
    }
  }, [loanAmount, duration]);

  const getAffordabilityStatus = () => {
    if (!income || !monthlyPayment) return null;
    const monthlyIncome = income / 12;
    const paymentRatio = (monthlyPayment / monthlyIncome) * 100;

    if (paymentRatio <= 20) return { status: "Good", color: "text-green-600" };
    if (paymentRatio <= 35)
      return { status: "Moderate", color: "text-yellow-600" };
    return { status: "High", color: "text-red-600" };
  };

  const affordability = getAffordabilityStatus();

  return (
    <div className="bg-white rounded-lg shadow p-6 my-4">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Repayment Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
          <p className="text-2xl font-bold text-blue-600">
            {monthlyPayment ? `${monthlyPayment.toFixed(2)} ETH` : "-"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Payment</p>
          <p className="text-2xl font-bold text-blue-600">
            {totalPayment ? `${totalPayment.toFixed(2)} ETH` : "-"}
          </p>
        </div>
      </div>

      {affordability && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Affordability Status</p>
          <p className={`font-semibold ${affordability.color}`}>
            {affordability.status}
          </p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        * Calculations based on {(interestRate * 100).toFixed(1)}% annual
        interest rate
      </div>
    </div>
  );
};

export default RepaymentCalculator;
