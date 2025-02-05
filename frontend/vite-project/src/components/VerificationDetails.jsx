import React from "react";
import JsonDisplay from "./JsonDisplay";

const DetailBox = ({ label, value }) => (
  <div className="p-3 bg-white rounded shadow-sm">
    <p className="text-sm font-medium text-gray-600">{label}</p>
    <p className="text-gray-900">{value}</p>
  </div>
);

const HashDisplay = ({ label, value }) => (
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-600">{label}</p>
    <div className="p-2 bg-gray-50 rounded-md">
      <p className="text-xs text-gray-700 break-all">{value}</p>
    </div>
  </div>
);

const VerificationDetails = ({ result }) => (
  <div className="mt-6 space-y-4">
    <div
      className={`p-4 rounded-lg ${
        result.isValid
          ? "bg-green-50 border border-green-200"
          : "bg-red-50 border border-red-200"
      }`}
    >
      <h3 className="text-lg font-medium mb-4 text-center">
        Verification Result:{" "}
        <span className={result.isValid ? "text-green-600" : "text-red-600"}>
          {result.isValid ? "Valid" : "Invalid"}
        </span>
      </h3>

      {result.isValid && result.details && (
        <div className="space-y-4">
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
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-blue-800 font-medium mb-2">
                Smart Contract Verification
              </h4>
              <p className="text-blue-600 break-all">
                Status:{" "}
                {result.contractVerification.success ? "Success" : "Failed"}
              </p>
              {result.contractVerification.txHash && (
                <p className="text-blue-600 break-all text-sm mt-2">
                  Transaction Hash: {result.contractVerification.txHash}
                </p>
              )}
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Merkle Proof
            </p>
            <JsonDisplay data={result.details.merkleProof.proof} />
          </div>
        </div>
      )}
    </div>
  </div>
);

export default VerificationDetails;
