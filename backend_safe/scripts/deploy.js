const hre = require("hardhat");

// async function main() {
//   const Safe = await hre.ethers.getContractFactory("Safe");
//   const safeInstance = await Safe.deploy();

//   await safeInstance.waitForDeployment();
//   const [owner] = await hre.ethers.getSigners();
//   console.log("Deploying contract with address:", owner.address);

//   const contractAddress = await safeInstance.getAddress();
//   console.log(`✅ Contract deployed at: ${contractAddress}`);
// }

async function main() {
  // Liste des propositions à passer au constructeur
  const proposalNames = [
    "Bulbizarre",
    "Salamèche",
    "Carapuce",
    "Germignon",
    "Héricendre",
    "Kaiminus",
    "Arcko",
    "Poussifeu",
    "Gobou",
  ];

  const VotingSafe = await hre.ethers.getContractFactory("VotingSafe");
  const votingSafe = await VotingSafe.deploy(proposalNames);

  await votingSafe.waitForDeployment();

  const address = await votingSafe.getAddress();
  console.log("Contract deployed at:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
