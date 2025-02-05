// src/config/constants.js
const path = require("path");

const PORT = 3001;

// Define paths relative to project root, going up one more level from backend
const PATHS = {
  ZKEY: path.join(__dirname, "../../../output/incomeProof_0001.zkey"),
  WASM: path.join(__dirname, "../../../output/incomeProof_js/incomeProof.wasm"),
  VERIFICATION_KEY: path.join(
    __dirname,
    "../../../output/verification_key.json"
  ),
};

const CONTRACT_ABIS = {
  ZKV: [
    "event AttestationPosted(uint256 indexed attestationId, bytes32 indexed root)",
  ],
  APP: [
    "function verifyIncomeProof(uint256 attestationId, bytes32[] calldata merklePath, uint256 leafCount, uint256 index)",
    "event SuccessfulProofSubmission(address indexed from)",
  ],
};

module.exports = {
  PORT,
  PATHS,
  CONTRACT_ABIS,
};
