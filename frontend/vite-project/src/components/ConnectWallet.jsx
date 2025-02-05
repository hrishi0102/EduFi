import React from "react";
import { useAppKit } from "@reown/appkit/react";
import { Wallet } from "lucide-react";

const ConnectWallet = () => {
  const { open } = useAppKit();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center">
          <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center">
            <Wallet className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div>
          <h2 className="mt-2 text-center text-3xl font-bold text-gray-800">
            Zero Knowledge Proof of Income
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Verify your income privately and securely
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            Connect your wallet to get started
          </p>
        </div>

        <button
          onClick={open}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium 
                   hover:bg-blue-700 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:ring-offset-2 
                   transition-colors flex items-center justify-center"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Connect Wallet
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Your data remains private and secure through zero-knowledge proofs
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
