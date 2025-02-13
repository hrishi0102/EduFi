// src/app.js
const express = require("express");
const cors = require("cors");
const { checkEnvironment } = require("./config/environment");
const proofRoutes = require("./routes/proofRoutes");
const zkVerifyService = require("./services/zkVerifyService");
const { PORT } = require("./config/constants");
const aiRoutes = require("./routes/aiRoutes");
const courseRoutes = require("./routes/courseRoutes");
const agentRoutes = require("./routes/agentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Environment check
checkEnvironment();

// Routes
app.use("/", proofRoutes);
app.use("/ai", aiRoutes);
app.use("/api", courseRoutes);
app.use("/api/agent", agentRoutes);

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
