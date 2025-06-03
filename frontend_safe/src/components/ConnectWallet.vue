<template>
  <div class="flex items-center gap-4">
    <button v-if="!account" @click="connectWallet" class="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
      Connect MetaMask
    </button>
    <div v-else class="flex items-center gap-4">
      <span class="text-gray-800 font-medium">🔗 {{ truncateAddress(account) }}</span>
      <button @click="disconnectWallet" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Déconnexion</button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['walletConnected', 'logout'])
const props = defineProps({ account: String })

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      // force MetaMask à re-demander la permission et permettre le choix d'un autre compte
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }]
      })
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      emit('walletConnected', accounts[0])
    } catch (err) {
      console.error('User rejected connection', err)
    }
  } else {
    alert('MetaMask not found')
  }
}

const disconnectWallet = () => {
  emit('logout')
}

const truncateAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`
</script>