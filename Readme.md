# Generating ZK Proofs

## 1. Install Rust and Verify

```bash
rustc --version
```

## 2. Install and Verify Circom

```bash
circom --version
```

## 3. Install snark.js

```bash
npm i -g snarkjs
```

## 4. Compile Circuit

```bash
circom incomeProof.circom --r1cs --wasm --sym
```

## 5. Generate the proving and verification keys:

```bash
snarkjs powersoftau new bn128 12 pot12_0000.ptau
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau
snarkjs groth16 setup incomeProof.r1cs pot12_final.ptau incomeProof_0000.zkey
snarkjs zkey contribute incomeProof_0000.zkey incomeProof_0001.zkey
snarkjs zkey export verificationkey incomeProof_0001.zkey verification_key.json
```

## Deploy contract

```bash
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

## Add all .env files in backend, frontend, contracts folders.

## 6 . In backend folder generate vk hash

```bash
cd backend
node register_vk.js
```

## 7. Add VK_HASH to .env in contracts folder

## 8 . Run backend

```bash
cd backend
node index.js
```

## 9 . Run frontend

```bash
cd frontend
cd vite-project
npm run dev
```
