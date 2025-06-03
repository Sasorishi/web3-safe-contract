import { ethers } from 'ethers'
import contractJson from './VotingSafe.sol/VotingSafe.json'

const contractAddress = '1ccccd9fcb7b6d4b93b848f81beb90e45d18d95e1b134c89ef9f4a61a4572610'
export const contractABI = contractJson.abi

async function vote(proposalIndex) {
  if (!window.ethereum) {
    alert('MetaMask non détecté')
    return
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' })
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = new ethers.Contract(contractAddress, contractABI, signer)

  try {
    const tx = await contract.vote(proposalIndex, {
      value: ethers.parseEther('0.01'),
    })
    await tx.wait()
    alert('Vote effectué !')
  } catch (e) {
    alert('Erreur lors du vote : ' + e.message)
  }
}
