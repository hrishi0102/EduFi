const express = require("express");
const { chatWithAgent } = require("../controllers/agentController.js");

const router = express.Router();

router.post("/chat-agent", chatWithAgent);

module.exports = router;
