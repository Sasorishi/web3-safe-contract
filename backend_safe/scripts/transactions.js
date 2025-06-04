import hre from "hardhat";

// async function main() {
//   const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//   const Safe = await hre.ethers.getContractFactory("Safe");
//   const safeAdresse = Safe.attach(contractAddress);

//   const [owner, wallet2, wallet3] = await hre.ethers.getSigners();

//   const tx = await safeAdresse.connect(owner).sendMoney({
//     value: hre.ethers.parseEther("0.1"),
//   });
//   await tx.wait();

//   const balance = await safeAdresse.viewBalance();
//   console.log("Ton solde est :", hre.ethers.formatEther(balance));
// }

async function main() {
  const contractAddress = "0x79D335A906Aa8a386E6B2296E9db0990524099c3";
  const VotingSafe = await hre.ethers.getContractFactory("VotingSafe");
  const votingSafe = VotingSafe.attach(contractAddress);

  const [owner] = await hre.ethers.getSigners();

  // voter pour la proposition 0 en envoyant 0.01 ETH
  const tx = await votingSafe.connect(owner).vote(0, {
    value: hre.ethers.parseEther("0.01"),
  });
  await tx.wait();

  const balance = await votingSafe.getContractBalance();
  console.log("Solde contrat (ETH) :", hre.ethers.formatEther(balance));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
