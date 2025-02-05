// src/config/environment.js
const checkEnvironment = () => {
  console.log("Environment check:", {
    ETH_RPC_URL: process.env.ETH_RPC_URL ? "Set" : "Not set",
    ARBITRUM_SEPOLIA_RPC_URL: process.env.ARBITRUM_SEPOLIA_RPC_URL
      ? "Set"
      : "Not set",
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    HAS_PRIVATE_KEY: !!process.env.ETH_PRIVATE_KEY,
    ZKV_RPC_URL: process.env.ZKV_RPC_URL ? "Set" : "Not set",
  });
};

module.exports = { checkEnvironment };
