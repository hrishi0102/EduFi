// backend/src/controllers/agentController.js
const { initializeAgent } = require("../services/agentService.js");
const { HumanMessage } = require("@langchain/core/messages");

async function chatWithAgent(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const { agent, config } = await initializeAgent();

    let response = "";
    const stream = await agent.stream(
      { messages: [new HumanMessage(message)] },
      config
    );

    for await (const chunk of stream) {
      if ("agent" in chunk) {
        response += chunk.agent.messages[0].content + "\n";
      } else if ("tools" in chunk) {
        response += chunk.tools.messages[0].content + "\n";
      }
    }

    res.json({ response: response.trim() });
  } catch (error) {
    console.error("Error in chat:", error);

    // Send more informative error messages to the client
    const errorMessage = error.message || "Internal server error";
    const statusCode = error.message.includes(
      "Missing required CDP API credentials"
    )
      ? 400
      : 500;

    res.status(statusCode).json({
      error: errorMessage,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
}

module.exports = {
  chatWithAgent,
};
