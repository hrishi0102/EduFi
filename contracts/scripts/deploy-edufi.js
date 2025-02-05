const hre = require("hardhat");

async function main() {
  console.log("Starting EduFi deployment...");

  try {
    // Get existing ZkIncomeVerification address
    const zkVerificationAddress = process.env.CONTRACT_ADDRESS;
    if (!zkVerificationAddress) {
      throw new Error("CONTRACT_ADDRESS not found in environment");
    }

    // Deploy EduFiLoan
    console.log("Deploying EduFiLoan contract...");
    const EduFiLoan = await ethers.getContractFactory("EduFiLoan");
    const eduFiLoan = await EduFiLoan.deploy(zkVerificationAddress);

    await eduFiLoan.waitForDeployment();
    const contractAddress = await eduFiLoan.getAddress();

    console.log("EduFiLoan deployed to:", contractAddress);

    // Wait for additional confirmations
    const deployTx = await eduFiLoan.deploymentTransaction();
    console.log("\nWaiting for additional block confirmations...");
    await deployTx.wait(5);

    console.log("Contract deployment confirmed!");

    // Verify contract on explorer (if supported)
    if (process.env.VERIFY_CONTRACT === "true") {
      console.log("\nVerifying contract on explorer...");
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [zkVerificationAddress],
      });
      console.log("Contract verified successfully!");
    }
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
