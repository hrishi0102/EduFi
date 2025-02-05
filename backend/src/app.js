// src/app.js
const express = require("express");
const cors = require("cors");
const { checkEnvironment } = require("./config/environment");
const proofRoutes = require("./routes/proofRoutes");
const zkVerifyService = require("./services/zkVerifyService");
const { PORT } = require("./config/constants");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment check
checkEnvironment();

// Routes
app.use("/", proofRoutes);

// Start server
async function startServer() {
  try {
    await zkVerifyService.initSession();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log("Initial setup complete - ready to process requests");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
