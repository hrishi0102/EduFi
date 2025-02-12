// src/services/contractService.js
const { ethers } = require("ethers");
const { CONTRACT_ABIS } = require("../config/constants");

class ContractService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      // process.env.ARBITRUM_SEPOLIA_RPC_URL,
      process.env.EDU_RPC_URL,
      null,
      { polling: true }
    );
    this.wallet = new ethers.Wallet(process.env.ETH_PRIVATE_KEY, this.provider);
    console.log("Wallet and provider initialized successfully");
  }

  async verifyProof(attestationId, merkleProofDetails) {
    console.log("Initializing contract verification...");
    console.log("Contract address:", process.env.CONTRACT_ADDRESS_EDU);

    const appContract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS_EDU,
      // process.env.CONTRACT_ADDRESS_EDU,
      CONTRACT_ABIS.APP,
      this.wallet
    );
    const zkvContract = new ethers.Contract(
      process.env.ZKV_CONTRACT_ADDRESS_EDU,
      // process.env.ZKV_CONTRACT_ADDRESS_EDU,
      CONTRACT_ABIS.ZKV,
      this.provider
    );

    return new Promise((resolve, reject) => {
      const filterAttestationsById = zkvContract.filters.AttestationPosted(
        attestationId,
        null
      );
      console.log("Filtering for attestationId:", attestationId);

      console.log("Transaction parameters:", {
        attestationId: BigInt(attestationId),
        numberOfLeaves: BigInt(merkleProofDetails.numberOfLeaves),
        leafIndex: BigInt(merkleProofDetails.leafIndex),
      });

      zkvContract.once(filterAttestationsById, async () => {
        try {
          const txResponse = await appContract.verifyIncomeProof(
            BigInt(attestationId),
            merkleProofDetails.proof.map((p) => ethers.hexlify(p)),
            BigInt(merkleProofDetails.numberOfLeaves),
            BigInt(merkleProofDetails.leafIndex)
          );

          console.log(`Transaction sent to EVM, tx-hash: ${txResponse.hash}`);
          console.log("Waiting for confirmation...");

          const receipt = await txResponse.wait();
          console.log("Transaction confirmed:", receipt.hash);

          // Listen for successful proof submission
          const filter = appContract.filters.SuccessfulProofSubmission(
            this.wallet.address
          );
          appContract.once(filter, () => {
            console.log("Income proof verification successful!");
          });

          resolve({ success: true, txHash: receipt.hash });
        } catch (error) {
          console.error("Contract verification failed:", error);
          console.error("Error details:", {
            message: error.message,
            code: error.code,
            data: error.data,
            transaction: error.transaction,
          });
          reject({ success: false, error: error.message });
        }
      });
    });
  }
}

module.exports = new ContractService();
