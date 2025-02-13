import React from "react";
import { useAppKit } from "@reown/appkit/react";
import { Wallet, Shield, Lock, Key } from "lucide-react";

const ConnectWallet = () => {
  const { open } = useAppKit();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-emerald-500/10 blur-3xl rounded-full" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-amber-500/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-md w-full space-y-8 p-8 relative">
        <div
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50
                     shadow-xl p-8 hover:border-emerald-500/30 transition-all duration-500"
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
              <div
                className="h-20 w-20 bg-slate-800 rounded-full flex items-center justify-center
                          border border-slate-700/50 relative"
              >
                <Wallet className="h-10 w-10 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h2
                className="text-3xl font-bold mb-4 text-transparent bg-clip-text 
                          bg-gradient-to-r from-emerald-400 to-emerald-200"
              >
                Zero Knowledge Proof of Income
              </h2>
              <p className="text-slate-300 text-lg mb-2">
                Verify your income privately and securely
              </p>
              <p className="text-slate-400 text-sm">
                Connect your wallet to get started
              </p>
            </div>

            <button
              onClick={open}
              className="w-full py-4 bg-emerald-500 text-slate-900 rounded-lg font-medium
                       hover:bg-emerald-400 focus:outline-none focus:ring-2
                       focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800
                       transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20
                       flex items-center justify-center space-x-3"
            >
              <Wallet className="h-5 w-5" />
              <span>Connect Wallet</span>
            </button>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-700/50">
              <div className="flex flex-col items-center text-center p-3">
                <Shield className="h-6 w-6 text-emerald-400 mb-2" />
                <span className="text-xs text-slate-400">Secure</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <Lock className="h-6 w-6 text-emerald-400 mb-2" />
                <span className="text-xs text-slate-400">Private</span>
              </div>
              <div className="flex flex-col items-center text-center p-3">
                <Key className="h-6 w-6 text-emerald-400 mb-2" />
                <span className="text-xs text-slate-400">Decentralized</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-slate-500 leading-relaxed">
                Your data remains private and secure through zero-knowledge
                proofs. No sensitive information is stored on-chain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
