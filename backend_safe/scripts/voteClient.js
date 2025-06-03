import { ethers } from "ethers";
import contractAbi from "./VotingSafe.json"; // ABI généré par Hardhat

const CONTRACT_ADDRESS = "0x..."; // Adresse du contrat déployé

export async function vote(proposalIndex) {
  if (!window.ethereum) {
    alert("Installez Metamask !");
    return;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractAbi.abi,
    signer
  );

  try {
    const tx = await contract.vote(proposalIndex, {
      value: ethers.parseEther("0.01"),
    });
    await tx.wait();
    alert("✅ Vote enregistré !");
  } catch (err) {
    console.error("Erreur lors du vote :", err);
    alert("❌ Erreur pendant le vote");
  }
}
