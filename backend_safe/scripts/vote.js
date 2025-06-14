const hre = require("hardhat");

async function main() {
  const contractAddress = "0x79D335A906Aa8a386E6B2296E9db0990524099c3"; // Adresse du contrat (copie depuis le déploiement)
  const VotingSafe = await hre.ethers.getContractFactory("VotingSafe");
  const contract = VotingSafe.attach(contractAddress);

  const [owner] = await hre.ethers.getSigners();

  const tx = await contract.connect(owner).vote(0, {
    value: hre.ethers.parseEther("0.01"),
  });

  await tx.wait();
  console.log("✅ Vote effectué !");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
