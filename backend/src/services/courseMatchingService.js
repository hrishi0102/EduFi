// src/services/courseMatchingService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

class CourseMatchingService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });

    this.systemPrompt = `You are an AI career and course advisor for EduFi, a microfinancing platform for students in developing countries. 
    Based on the user's quiz responses, recommend 3 specific courses that:
    - Match their interests and goals
    - Are highly relevant for current job market
    - Have good ROI potential
    - Are within typical microfinance loan amounts ($500-$2000)
    
    For each course recommendation, provide:
    - Course name and platform
    - Estimated duration and cost
    - Key skills learned
    - Career opportunities
    - Why it matches their profile
    
    Keep responses practical and focused on employability.`;
  }

  async getRecommendations(quizAnswers) {
    try {
      const chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "Initialize as EduFi course advisor" }],
          },
          {
            role: "model",
            parts: [{ text: "Initialized as EduFi course advisor." }],
          },
        ],
      });

      const result = await chat.sendMessage(
        `Based on these quiz responses, suggest suitable courses: ${JSON.stringify(
          quizAnswers
        )}`
      );
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Course Matching Error:", error);
      throw new Error("Failed to generate course recommendations");
    }
  }
}

module.exports = new CourseMatchingService();
