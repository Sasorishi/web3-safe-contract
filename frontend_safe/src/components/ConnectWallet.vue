<template>
  <div class="flex items-center gap-4">
    <button
      v-if="!account"
      @click="connectWallet"
      class="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
    >
      Connect MetaMask
    </button>
    <div v-else class="flex items-center gap-4">
      <span class="text-gray-800 font-medium">🔗 {{ truncateAddress(account) }}</span>
      <button
        @click="disconnectWallet"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
import { ref } from 'vue'
import { ethers } from 'ethers'
import contractJson from '@/VotingSafe.sol/VotingSafe.json' // adapte ce chemin si besoin

// Props et events
const emit = defineEmits(['walletConnected', 'logout'])
const props = defineProps({ account: String })

// Adresse du contrat (remplace par la tienne si besoin)
const contractAddress = '0x151293291B674d5A23aF9F6858c8F2364F5b5c64'
const contractABI = contractJson.abi

// Variables d'état
const contract = ref(null)

// Connexion au wallet + contrat
const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      })

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      emit('walletConnected', accounts[0])

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      contract.value = new ethers.Contract(contractAddress, contractABI, signer)

      console.log('✅ Contrat connecté :', contract.value)
    } catch (err) {
      console.error('User rejected connection', err)
    }
  } else {
    alert('MetaMask non détecté')
  }
}

// Déconnexion
const disconnectWallet = () => {
  contract.value = null
  emit('logout')
}

// Formatage de l'adresse
const truncateAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`
</script>
