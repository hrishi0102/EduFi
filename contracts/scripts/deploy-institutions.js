const hre = require("hardhat");

async function main() {
  console.log("Deploying EduFiInstitutions contract...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const EduFiInstitutions = await ethers.getContractFactory(
    "EduFiInstitutions"
  );
  const institutions = await EduFiInstitutions.deploy();

  await institutions.waitForDeployment();
  const contractAddress = await institutions.getAddress();

  console.log("EduFiInstitutions deployed to:", contractAddress);

  // Save deployment information
  const deploymentInfo = {
    network: network.name,
    contractAddress: contractAddress,
    deploymentTime: new Date().toISOString(),
    deployer: deployer.address,
  };

  console.log("Deployment Info:", deploymentInfo);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
