// src/controllers/aiController.js
const aiService = require("../services/aiService");

async function getChatResponse(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await aiService.getResponse(message);
    res.json({ response });
  } catch (error) {
    console.error("Chat Response Error:", error);
    res.status(500).json({ error: "Failed to get chat response" });
  }
}

module.exports = {
  getChatResponse,
};
