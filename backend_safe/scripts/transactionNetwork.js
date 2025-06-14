import hre from "hardhat";
import fs from "fs";

// const abi = JSON.parse(fs.readFileSync('/Users/alexcoda/Documents/Projets/IIM/SAFE/backend_safe/artifacts/contracts/Safe.sol/Safe.json')).abi;
// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const abi = JSON.parse(
  fs.readFileSync(
    "/Applications/MAMP/htdocs/workspace/web3-safe-contract/backend_safe/artifacts/contracts/VotingSafe.sol/VotingSafe.json"
  )
).abi;
const contractAddress = "0x79D335A906Aa8a386E6B2296E9db0990524099c3";

const safe = new ethers.Contract(contractAddress, abi, hre.ethers.provider);

async function main() {
  const balance = await safe.viewBalance();
  console.log("Solde total:", hre.ethers.formatEther(balance));
}

main();
