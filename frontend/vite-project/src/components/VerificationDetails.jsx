import React from "react";
import JsonDisplay from "./JsonDisplay";
import {
  CheckCircle,
  XCircle,
  Lock,
  GitCommit,
  GitBranch,
  FileDigit,
} from "lucide-react";

const DetailBox = ({ label, value }) => (
  <div
    className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50
                hover:border-emerald-500/30 transition-all duration-300"
  >
    <p className="text-sm font-medium text-slate-400 mb-1 flex items-center">
      <FileDigit className="w-4 h-4 mr-2 text-emerald-400" />
      {label}
    </p>
    <p className="text-slate-200 font-mono text-sm break-all">{value}</p>
  </div>
);

const HashDisplay = ({ label, value }) => (
  <div
    className="mb-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50
                hover:border-emerald-500/30 transition-all duration-300"
  >
    <p className="text-sm font-medium text-slate-400 mb-2 flex items-center">
      <Lock className="w-4 h-4 mr-2 text-emerald-400" />
      {label}
    </p>
    <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
      <p className="text-xs text-emerald-400 font-mono break-all leading-relaxed">
        {value}
      </p>
    </div>
  </div>
);

const VerificationDetails = ({ result }) => (
  <div className="mt-6 space-y-6">
    <div
      className={`p-6 rounded-xl backdrop-blur-sm border-2 transition-all duration-500
        ${
          result.isValid
            ? "bg-emerald-500/5 border-emerald-500/30"
            : "bg-red-500/5 border-red-500/30"
        }`}
    >
      <div className="flex items-center justify-center mb-6 space-x-3">
        {result.isValid ? (
          <CheckCircle className="w-8 h-8 text-emerald-400 animate-pulse" />
        ) : (
          <XCircle className="w-8 h-8 text-red-400 animate-pulse" />
        )}
        <h3 className="text-xl font-medium text-center">
          Verification Status:{" "}
          <span
            className={`font-bold ${
              result.isValid ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {result.isValid ? "Valid" : "Invalid"}
          </span>
        </h3>
      </div>

      {result.isValid && result.details && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <DetailBox
              label="Attestation ID"
              value={result.details.attestationId}
            />
            <DetailBox
              label="Number of Leaves"
              value={result.details.merkleProof.numberOfLeaves}
            />
          </div>

          <HashDisplay label="Leaf Digest" value={result.details.leafDigest} />

          {result.contractVerification && (
            <div
              className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border-2 
                        border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center mb-3">
                <GitCommit className="w-5 h-5 text-blue-400 mr-2" />
                <h4 className="text-lg font-medium text-blue-400">
                  Smart Contract Verification
                </h4>
              </div>
              <div className="space-y-2">
                <p className="text-slate-200 flex items-center">
                  <span className="text-slate-400 mr-2">Status:</span>
                  <span
                    className={
                      result.contractVerification.success
                        ? "text-emerald-400"
                        : "text-red-400"
                    }
                  >
                    {result.contractVerification.success ? "Success" : "Failed"}
                  </span>
                </p>
                {result.contractVerification.txHash && (
                  <div className="pt-2 border-t border-slate-700/50">
                    <p className="text-slate-400 text-sm mb-1">
                      Transaction Hash:
                    </p>
                    <p className="font-mono text-xs text-emerald-400 break-all">
                      {result.contractVerification.txHash}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50">
            <div className="flex items-center mb-3">
              <GitBranch className="w-5 h-5 text-emerald-400 mr-2" />
              <p className="text-sm font-medium text-slate-300">Merkle Proof</p>
            </div>
            <JsonDisplay data={result.details.merkleProof.proof} />
          </div>
        </div>
      )}
    </div>
  </div>
);

export default VerificationDetails;
