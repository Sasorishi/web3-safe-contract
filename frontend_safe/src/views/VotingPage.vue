<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
    <!-- Navbar -->
    <nav class="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-800">PokeVote</h1>
      <ConnectWallet :account="account" @walletConnected="setAccount" @logout="disconnectWallet" />
    </nav>

    <!-- Main Content -->
    <div class="flex items-center justify-center px-4 py-10 bg-[url('https://assets.pokemon.com//assets/cms2-fr-fr/img/misc/virtual-backgrounds/sword-shield/dynamax-battle.png')] bg-cover bg-center">
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <VoteForm :account="account" @voted="setVotes" />
        <VoteResult :votes="votes" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ConnectWallet from '../components/ConnectWallet.vue'
import VoteForm from '../components/VoteForm.vue'
import VoteResult from '../components/VoteResult.vue'

const account = ref(null)

const setAccount = (addr) => {
  account.value = addr
}

const disconnectWallet = () => {
  account.value = null
}
</script>
