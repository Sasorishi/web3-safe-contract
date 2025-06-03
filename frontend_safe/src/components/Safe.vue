<template>
  <div>
    <h1>Coffre d’Ether 🪙</h1>

    <button @click="connectWallet">Connecter Metamask</button>
    <div v-if="account">Connecté : {{ account }}</div>

    <button @click="getSoldeCoffre">Consulter Solde Coffre</button>
    <div>Solde total du coffre : {{ soldeCoffre }} ETH</div>

    <input v-model="montant" placeholder="Montant en ETH" type="number" />
    <button @click="send">Déposer</button>

  </div>
</template>

<script setup>

import { ref } from 'vue';
import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import SafeABI from '@/abis/Safe.json';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const provider = ref(null);
const signer = ref(null);
const contract = ref(null);
const account = ref('');
const soldeCoffre = ref('0');
const montant = ref('');

async function connectWallet() {

  if (!window.ethereum) {
    alert("Veuillez installer MetaMask");
    throw new Error("MetaMask manquant");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contractSign = new Contract(contractAddress, SafeABI.abi, signer);

  contract.value = contractSign;
}


async function getSoldeCoffre() {
  if (!contract.value) {
    alert("Connecte ton wallet");
    return;
  }
  try {
    const balance = await contract.value.viewBalance();
    soldeCoffre.value = formatEther(balance);
  } catch (error) {
    console.error("Erreur lecture solde :", error);
  }
}

async function send() {
  if (!contract.value) {
    alert("Connecte ton wallet");
    return;
  }
  try {
    const tx = await contract.value.sendMoney({ value: parseEther(montant.value.toString()) });
    await tx.wait();
    alert("Dépôt effectué !");
  } catch (error) {
    console.error("Erreur lors du dépôt :", error);
  }
}

</script>