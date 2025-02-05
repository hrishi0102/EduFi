// src/controllers/proofController.js
const zkVerifyService = require("../services/zkVerifyService");
const proofService = require("../services/proofService");
const contractService = require("../services/contractService");

async function generateAndVerifyProof(req, res) {
  console.log("Received proof generation request");

  try {
    const { income, threshold } = req.body;
    console.log("Request parameters:", { income, threshold });

    // Ensure zkSession is initialized
    if (!zkVerifyService.session) {
      console.log("Initializing zkSession...");
      await zkVerifyService.initSession();
    }

    // Step 1: Generate proof
    console.log("Step 1: Generating proof...");
    const { proof, publicSignals } = await proofService.generateProof(
      income,
      threshold
    );

    // Step 2: Submit to zkVerify
    console.log("Step 2: Submitting to zkVerify...");
    const { attestationId, leafDigest } = await zkVerifyService.submitProof(
      proof,
      publicSignals
    );

    // Step 3: Get Merkle proof details
    console.log("Step 3: Getting Merkle proof details...");
    const merkleProofDetails = await zkVerifyService.getMerkleProofDetails(
      attestationId,
      leafDigest
    );

    // Step 4: Verify on contract
    console.log("Step 4: Verifying on contract...");
    const contractVerification = await contractService.verifyProof(
      attestationId,
      merkleProofDetails
    );

    // Step 5: Prepare and send response
    const response = {
      isValid: true,
      details: {
        attestationId,
        leafDigest,
        merkleProof: merkleProofDetails,
      },
      contractVerification,
    };

    console.log(
      "Sending successful response:",
      JSON.stringify(response, null, 2)
    );
    res.json(response);
  } catch (error) {
    console.error("Error in proof generation and verification:", error);
    const errorResponse = {
      isValid: false,
      details: { error: error.message },
      contractVerification: null,
    };
    console.log(
      "Sending error response:",
      JSON.stringify(errorResponse, null, 2)
    );
    res.status(500).json(errorResponse);
  }
}

module.exports = {
  generateAndVerifyProof,
};
