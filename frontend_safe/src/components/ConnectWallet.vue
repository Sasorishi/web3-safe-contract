<template>
  <div class="flex items-center gap-4">
    <button
      v-if="!account"
      @click="connectWallet"
      class="px-5 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition"
    >
      Connect MetaMask
    </button>

    <div
      v-else
      class="flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-300 rounded-full px-4 py-1 shadow-md space-x-4"
    >
      <div class="flex items-center gap-2">
        <span class="text-gray-800 font-semibold text-sm">🔗 {{ truncateAddress(account) }}</span>
        <span class="text-xs text-indigo-700 font-medium">{{ balance }} ETH</span>
      </div>
      <button
        @click="disconnectWallet"
        class="text-gray-600 hover:text-black p-1 rounded-full hover:bg-gray-200 transition"
        title="Déconnexion"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, watch, ref } from 'vue'
import { ethers } from 'ethers'
import contractJson from '@/VotingSafe.sol/VotingSafe.json' // adapte ce chemin si besoin

// Props et events
const emit = defineEmits(['walletConnected', 'logout'])
const props = defineProps({ account: String })
const balance = ref('0.00')

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
      await fetchBalance(accounts[0])

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
  balance.value = '0.00'
}

// Formatage de l'adresse
const truncateAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

const fetchBalance = async (address) => {
  if (!window.ethereum || !address) return
  try {
    const result = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    })
    const eth = parseFloat(parseInt(result, 16) / 1e18).toFixed(4)
    balance.value = eth
  } catch (err) {
    console.error('Failed to fetch balance:', err)
  }
}

watch(
  () => props.account,
  (newAccount) => {
    if (newAccount) fetchBalance(newAccount)
  },
)
</script>
