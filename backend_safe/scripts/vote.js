const hre = require("hardhat");

async function main() {
  const contractAddress = "0x151293291B674d5A23aF9F6858c8F2364F5b5c64"; // Adresse du contrat (copie depuis le déploiement)
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
