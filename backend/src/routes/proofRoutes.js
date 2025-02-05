// src/routes/proofRoutes.js
const express = require("express");
const router = express.Router();
const proofController = require("../controllers/proofController");

router.post(
  "/generate-and-verify-proof",
  proofController.generateAndVerifyProof
);

module.exports = router;
