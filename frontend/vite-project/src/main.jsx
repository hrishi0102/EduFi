import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import {
  arbitrum,
  arbitrumSepolia,
  mainnet,
  polygon,
  sepolia,
} from "@reown/appkit/networks";
import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";

// Configure AppKit
const projectId = "a0c03874a5caec0f3bdcd4de5cd862ae";

const metadata = {
  name: "EduFi",
  description: "AI-Powered Private Education Financing Platform",
  url: "https://example.com", // Your website
  icons: ["https://your-icon-url.com"], // Your app icon
};

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet, polygon, sepolia, arbitrumSepolia, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
