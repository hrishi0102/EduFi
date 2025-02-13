# **EduFi - AI-Powered Private Education Financing with ZK-Proofs**

## **Deployments**

# Deployed Contract Addresses

| Contract | ARB Address                                                                                                                    | Edu Chain Address                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| ZKIncome | [`0x3e4DD76CC6433274d676244eA7162f1aCE559Dbb`](https://sepolia.arbiscan.io/address/0x3e4DD76CC6433274d676244eA7162f1aCE559Dbb) | [`0x8030d7e5b94F4D6bb6C2638dEa9aFb2D5E7f5d31`](https://edu-chain-testnet.blockscout.com/address/0x8030d7e5b94F4D6bb6C2638dEa9aFb2D5E7f5d31) |
| EduFi    | [`0x56F6DDc14A5AB38Ae03f6437f7b4a9bE6252327a`](https://sepolia.arbiscan.io/address/0x56F6DDc14A5AB38Ae03f6437f7b4a9bE6252327a) | [`0x6674256E7461518B5Be7F2FB43029132d9385385`](https://edu-chain-testnet.blockscout.com/address/0x6674256E7461518B5Be7F2FB43029132d9385385) |
| ZKV      | [`0x82941a739E74eBFaC72D0d0f8E81B1Dac2f586D5`](https://sepolia.arbiscan.io/address/0x82941a739E74eBFaC72D0d0f8E81B1Dac2f586D5) | [`0x147AD899D1773f5De5e064C33088b58c7acb7acf`](https://edu-chain-testnet.blockscout.com/address/0x147AD899D1773f5De5e064C33088b58c7acb7acf) |

## **Problem Statement**

Education is a powerful tool for social mobility, but access to quality education remains a challenge, especially in underdeveloped and developing countries. Many students struggle with financial constraints and lack access to fair, transparent, and secure education financing options.

Traditional student loans often come with high-interest rates, complex paperwork, and predatory lending practices that discourage students from pursuing higher education. Additionally, existing scholarship and fundraising models focus on charity rather than sustainable financial responsibility.

### **Key Challenges**

- **Financial Accessibility:** Students in low-income families have no way to secure loans without collateral or high credit scores.
- **Lack of Privacy:** Loan applications require users to disclose sensitive financial data, leading to security risks and bias.
- **Inefficiency of Existing Loan Systems:** Traditional student loans are slow, centralized, and bureaucratic.
- **Lack of Personalized Learning Paths:** Students struggle to find the right courses that align with their career goals.
- **Absence of Incentives for Learning:** No mechanism exists to reward students for completing courses and repaying loans responsibly.

## **🎯 Our Solution - EduFi**

EduFi is a decentralized education financing platform that combines **privacy-preserving micro-financing with AI-driven course matching**. It enables students to access education loans **without exposing sensitive financial data** while ensuring responsible repayment.

With **zero-knowledge proofs (ZK-Proofs)** for income verification and **AI-powered recommendations**, EduFi makes education financing secure, personalized, and accessible. Students receive micro-loans that they must **pay back based on hard work and reputation**, fostering financial responsibility rather than reliance on charity.

The platform also introduces a **Decentralized Reputation System**, where students build an **on-chain education score** (similar to a credit score) based on completed courses and timely loan repayments. This incentivized learning system ensures that students not only upskill themselves but also contribute back to the ecosystem.

## **🚀 Key Features**

### **1️⃣ Zero-Knowledge Income Verification**

- Uses **Groth16 ZK-Proofs** (Circom + SnarkJS) to verify income without exposing raw financial data.
- Proof is verified on-chain using **ZKVerify smart contract** deployed on **EduChain and Arbitrum Sepolia**.
- Ensures **privacy-first financing**, removing bias and fraud risks.

### **2️⃣ AI-Based Course and Career Matchmaking**

- **AI-driven questionnaire** to assess the user’s goals, skills, and market trends.
- Matches students with the **best courses** based on:
  - Market demand and industry trends.
  - User's education background and time commitment.
  - Course completion rates and outcomes.
- Helps students **maximize their education ROI** while ensuring they can repay loans.

### **3️⃣ Decentralized Micro-Loans for Education**

- Students apply for **small, manageable loans** based on their income and career goals.
- **Transparent repayment schedules** with a built-in **loan calculator**.
- **Loans are recorded on-chain**, ensuring security, trust, and auditability.
- EduFi smart contract verifies **ZK income proof** before approving loans.

### **4️⃣ Decentralized Certifications & Reputation Score**

- Students upload **course completion certificates** to **IPFS**, ensuring permanent, tamper-proof storage.
- A **dynamic reputation score** (like a credit score for education) is awarded based on:
  - Completed courses.
  - Timely loan repayments.
- A **higher reputation score** grants access to **better loan terms** and **higher funding amounts**.

### **5️⃣ AI-Powered Assistant for Students**

- **Integrated AI chatbot** (Gemini 1.5) to guide students through:
  - **Platform usage** and onboarding.
  - **Financial guidance** for loan management.
  - **Technical and academic support** for coursework.

### **6️⃣ On-Chain AI Agent for Web3 Simplification**

- **Powered by Coinbase AgentKit + GAIA + Hyperbolic LLM nodes.**
- **Executes on-chain transactions** using **natural language commands** (e.g., "Repay my loan").
- Automates:
  - Wallet creation and funding.
  - Loan repayments and transactions.
  - Future scope: Automating all smart contract interactions for a **completely gas-abstracted experience**.

## **📜 User Flow**

1️⃣ **Wallet Connection**

- Users connect via **Reown AppKit WalletConnect SDK**.

2️⃣ **ZK Income Verification**

- User enters their income.
- A **Groth16 ZK-Proof** is generated (Circom + SnarkJS).
- The proof is verified on-chain using **ZKVerify smart contract** (EduChain + Arbitrum Sepolia).
- **EduFi smart contract** validates attestation proof and emits an event.

3️⃣ **AI-Powered Career & Course Matchmaking**

- Users fill a questionnaire.
- AI recommends personalized learning paths.

4️⃣ **Loan Application & Approval**

- Users apply for a micro-loan with a transparent repayment plan.
- **EduFi smart contract** verifies ZK proof before approving loans.

5️⃣ **Course Completion & Certification**

- Users complete courses and upload proof to **IPFS**.
- A **reputation score** is assigned based on completed courses and timely repayments.

6️⃣ **Loan Repayment & Reputation Growth**

- Loans are repaid on-chain.
- Users with high reputation scores get **better loan terms** and **higher funding limits** in the future.

## **🛠️ Technology Stack**

### **Blockchain & Smart Contracts**

- **EduFi Smart Contract:** Deployed on **EduChain + Arbitrum Sepolia**
- **ZKProofs:** Circom, SnarkJS, ZKVerify
- **Storage:** IPFS for decentralized certification storage

### **AI & Machine Learning**

- **Course & Career Matchmaking:** Custom AI model
- **AI Assistant:** Gemini 1.5
- **Onchain AI Agent:** Coinbase AgentKit, GAIA, Hyperbolic LLM

### **Frontend & Wallet Integration**

- **Wallet:** Reown AppKit WalletConnect SDK
- **Frontend:** Next.js, Tailwind CSS

## **🌍 Impact**

✅ **Empowers students in underdeveloped/developing nations** with affordable education financing.  
✅ **Teaches financial responsibility** through micro-loans instead of unsustainable donations.  
✅ **Enables skill-based lending**, ensuring funding reaches serious learners.  
✅ **Creates an on-chain reputation system**, incentivizing continuous upskilling.  
✅ **Bridges Web2 and Web3**, making blockchain technology accessible to non-tech-savvy students.

## **🔮 Future Work**

- **Enforcing loan repayments & adding penalties for non-repayment.**
- **Implementing dynamic reputation scoring** (decays over time if user does not upskill/contribute back).
- **Supporting partial loans** based on financial constraints.
- **Abstracting all smart contract interactions** (no manual signing required).
- **Integrating stable yield mechanisms** to **grow repaid loans & fund future learners.**

## Generating ZK Proofs

### 1. Compile Circuit

```bash
circom incomeProof.circom --r1cs --wasm --sym
```

### 2. Generate the proving and verification keys:

```bash
snarkjs powersoftau new bn128 12 pot12_0000.ptau
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau
snarkjs groth16 setup incomeProof.r1cs pot12_final.ptau incomeProof_0000.zkey
snarkjs zkey contribute incomeProof_0000.zkey incomeProof_0001.zkey
snarkjs zkey export verificationkey incomeProof_0001.zkey verification_key.json
```

### 3. Deploy contract

```bash
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/deploy.js --network opencampus
```

### Add all .env files in backend, frontend, contracts folders.

### 4 . In backend folder generate vk hash

```bash
cd backend
node register_vk.js
```

### 5. Add VK_HASH to .env in contracts folder

### 6 . Run backend

```bash
cd backend
node index.js
```

### 7 . Run frontend

```bash
cd frontend
cd vite-project
npm run dev
```
