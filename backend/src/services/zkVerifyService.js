// src/services/zkVerifyService.js
const {
  zkVerifySession,
  ZkVerifyEvents,
  Library,
  CurveType,
} = require("zkverifyjs");
const fs = require("fs");
const { PATHS } = require("../config/constants");

class ZkVerifyService {
  constructor() {
    this.session = null;
    this.vkey = JSON.parse(fs.readFileSync(PATHS.VERIFICATION_KEY));
    console.log("Verification key loaded successfully");
  }

  async initSession() {
    try {
      this.session = await zkVerifySession
        .start()
        .Custom(process.env.ZKV_RPC_URL)
        .withAccount(process.env.ZKV_SEED_PHRASE);
      console.log("ZkVerify session initialized successfully");
    } catch (error) {
      console.error("Failed to initialize zkVerify session:", error);
      throw error;
    }
  }

  async submitProof(proof, publicSignals) {
    console.log("Submitting proof to zkVerify...");

    const { events, transactionResult } = await this.session
      .verify()
      .groth16(Library.snarkjs, CurveType.bn128)
      .waitForPublishedAttestation()
      .execute({
        proofData: { vk: this.vkey, proof, publicSignals },
      });

    this._attachEventListeners(events);
    const { attestationId, leafDigest } = await transactionResult;

    console.log("Attestation published on zkVerify:", {
      attestationId,
      leafDigest,
    });
    return { attestationId, leafDigest };
  }

  async getMerkleProofDetails(attestationId, leafDigest) {
    console.log("Getting Merkle proof details for:", {
      attestationId,
      leafDigest,
    });

    const proofDetails = await this.session.poe(attestationId, leafDigest);
    console.log("Merkle proof details received:", {
      numberOfLeaves: proofDetails.numberOfLeaves,
      leafIndex: proofDetails.leafIndex,
      proofLength: proofDetails.proof,
    });

    return {
      proof: proofDetails.proof,
      numberOfLeaves: proofDetails.numberOfLeaves,
      leafIndex: proofDetails.leafIndex,
    };
  }

  _attachEventListeners(events) {
    events.on(ZkVerifyEvents.IncludedInBlock, ({ txHash }) => {
      console.log(`Transaction accepted in zkVerify, tx-hash: ${txHash}`);
    });

    events.on(ZkVerifyEvents.Finalized, ({ blockHash }) => {
      console.log(
        `Transaction finalized in zkVerify, block-hash: ${blockHash}`
      );
    });

    events.on("error", (error) => {
      console.error("An error occurred during zkVerify transaction:", error);
    });
  }
}

module.exports = new ZkVerifyService();
