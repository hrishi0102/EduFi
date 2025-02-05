// src/services/contractService.js
import { ethers } from "ethers";

const ARBITRUM_CHAIN_ID = 421614; // Arbitrum Sepolia Chain ID
const ZK_INCOME_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const EDUFI_ADDRESS = import.meta.env.VITE_EDUFI_CONTRACT_ADDRESS;

// ABIs only containing what we need
const ZK_INCOME_ABI = [
  "function hasSubmittedValidProof(address user) external view returns (bool)",
];

const EDUFI_ABI = [
  // Read functions
  "function getLoanDetails(uint256 loanId) external view returns (tuple(address borrower, uint256 loanAmount, uint256 duration, uint256 timestamp, bool isApproved, bool isFunded, address lender, string purpose))",
  "function getUserLoans(address user) external view returns (uint256[])",
  // Write functions
  "function applyForLoan(uint256 amount, uint256 duration, string purpose) external",
  // Events
  "event LoanApplicationCreated(uint256 indexed loanId, address indexed borrower, uint256 amount)",
];

class ContractService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.zkIncomeContract = null;
    this.edufiContract = null;
  }

  async init() {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask");
    }

    try {
      // Initialize provider and check network
      this.provider = new ethers.BrowserProvider(window.ethereum);
      await this.checkNetwork();

      // Get signer
      this.signer = await this.provider.getSigner();

      // Initialize contracts
      this.zkIncomeContract = new ethers.Contract(
        ZK_INCOME_ADDRESS,
        ZK_INCOME_ABI,
        this.signer
      );

      this.edufiContract = new ethers.Contract(
        EDUFI_ADDRESS,
        EDUFI_ABI,
        this.signer
      );

      // Setup network change listener
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      console.log("Contract service initialized");
    } catch (error) {
      console.error("Failed to initialize contract service:", error);
      throw error;
    }
  }

  async checkNetwork() {
    const network = await this.provider.getNetwork();
    const chainId = Number(network.chainId);

    if (chainId !== ARBITRUM_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${ARBITRUM_CHAIN_ID.toString(16)}` }],
        });
      } catch (error) {
        if (error.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${ARBITRUM_CHAIN_ID.toString(16)}`,
                chainName: "Arbitrum Sepolia",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
                blockExplorerUrls: ["https://sepolia.arbiscan.io"],
              },
            ],
          });
        } else {
          throw new Error("Please switch to Arbitrum Sepolia network");
        }
      }
      // Get fresh provider after network switch
      this.provider = new ethers.BrowserProvider(window.ethereum);
    }
  }

  async ensureInitialized() {
    if (
      !this.provider ||
      !this.signer ||
      !this.zkIncomeContract ||
      !this.edufiContract
    ) {
      await this.init();
    }
  }

  // Income Verification Methods
  async isIncomeVerified(address) {
    await this.ensureInitialized();
    try {
      return await this.zkIncomeContract.hasSubmittedValidProof(address);
    } catch (error) {
      console.error("Error checking income verification:", error);
      return false;
    }
  }

  // Loan Methods
  async submitLoanApplication(amount, duration, purpose) {
    await this.ensureInitialized();
    try {
      const amountInWei = ethers.parseEther(amount.toString());
      const tx = await this.edufiContract.applyForLoan(
        amountInWei,
        duration,
        purpose
      );
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      console.error("Error submitting loan:", error);
      throw this.formatError(error);
    }
  }

  async getUserLoans(address) {
    await this.ensureInitialized();
    try {
      const loanIds = await this.edufiContract.getUserLoans(address);
      if (!loanIds || loanIds.length === 0) return [];

      const loans = await Promise.all(
        loanIds.map(async (id) => {
          const loan = await this.edufiContract.getLoanDetails(id);
          return {
            id: id.toString(),
            borrower: loan.borrower,
            amount: ethers.formatEther(loan.loanAmount),
            duration: loan.duration.toString(),
            timestamp: new Date(Number(loan.timestamp) * 1000),
            isApproved: loan.isApproved,
            isFunded: loan.isFunded,
            lender: loan.lender,
            purpose: loan.purpose,
          };
        })
      );
      return loans;
    } catch (error) {
      console.error("Error fetching user loans:", error);
      return [];
    }
  }

  formatError(error) {
    if (error.reason) return error.reason;
    if (error.message) {
      return error.message
        .replace("MetaMask Tx Signature: ", "")
        .replace("execution reverted: ", "");
    }
    return "Transaction failed";
  }
}

export default new ContractService();
