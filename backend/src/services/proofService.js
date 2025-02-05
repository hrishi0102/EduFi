// src/services/proofService.js
const { groth16 } = require("snarkjs");
const { ethers } = require("ethers");
const { PATHS } = require("../config/constants");

class ProofService {
  constructor() {
    this.evmAccount = ethers.computeAddress(process.env.ETH_PRIVATE_KEY);
    console.log("Ethereum account initialized:", this.evmAccount);
  }

  async generateProof(income, threshold) {
    console.log("Generating proof for:", { income, threshold });
    const result = await groth16.fullProve(
      { address: this.evmAccount, income, threshold },
      PATHS.WASM,
      PATHS.ZKEY
    );
    console.log("Proof generated successfully");
    console.log("Public signals:", result.publicSignals);
    return result;
  }
}

module.exports = new ProofService();
