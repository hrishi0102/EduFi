// src/services/aiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

    // System prompt for loan assistance
    this.systemPrompt = `You are an AI loan advisor for EduFi, a decentralized education financing platform. 
    Help users understand:
    - Loan application process
    - Required documentation
    - Loan terms and conditions
    - Repayment schedules and strategies
    - Income-based repayment calculations
    - Interest calculations
    - Affordability assessment
    - Budget planning for loan repayment
    Keep responses concise, friendly, and focused on education loans.
    Do not make promises about loan approval.
    Provide practical advice for managing loan repayments.`;
  }

  async getResponse(userMessage) {
    try {
      const chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Initialize as EduFi loan advisor" }],
          },
          {
            role: "model",
            parts: [
              {
                text: "Initialized as EduFi loan advisor. How can I help you with your education financing needs?",
              },
            ],
          },
        ],
      });

      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("AI Service Error:", error);
      throw new Error("Failed to get AI response");
    }
  }
}

module.exports = new AIService();
