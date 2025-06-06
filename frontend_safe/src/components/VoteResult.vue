<template>
  <div class="pt-6 border-t border-gray-200">
    <h3 class="text-2xl font-semibold mb-6 text-center text-gray-800">Résultats des votes</h3>
    <div class="space-y-6">
      <div v-for="starter in allStarters" :key="starter.name" class="px-4">
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center gap-3">
            <img :src="starter.img" :alt="starter.name" class="w-8 h-8" />
            <span class="text-gray-700 font-medium">{{ starter.name }}</span>
          </div>
          <span class="text-gray-600"
            >{{ counts[starter.name] }} votes ({{ getPercentage(counts[starter.name]) }}%)</span
          >
        </div>
        <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            class="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
            :style="{ width: getPercentage(counts[starter.name]) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ethers } from 'ethers'
import contractJson from '@/VotingSafe.sol/VotingSafe.json'

const contractAddress = import.meta.env.VITE_API_PRIVATE_KEY
const contractABI = contractJson.abi

const counts = ref({})
const totalVotes = ref(0)

const allStarters = [
  {
    name: 'Bulbizarre',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    name: 'Salamèche',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  {
    name: 'Carapuce',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
  {
    name: 'Germignon',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png',
  },
  {
    name: 'Héricendre',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png',
  },
  {
    name: 'Kaiminus',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png',
  },
  {
    name: 'Arcko',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/252.png',
  },
  {
    name: 'Poussifeu',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png',
  },
  {
    name: 'Gobou',
    img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png',
  },
]

// Récupérer les votes depuis le contrat
const fetchVotes = async () => {
  if (!window.ethereum) return

  const provider = new ethers.BrowserProvider(window.ethereum)
  const contract = new ethers.Contract(contractAddress, contractABI, provider)

  let newCounts = {}
  let total = 0

  for (let i = 0; i < allStarters.length; i++) {
    const [name, voteCount] = await contract.getProposal(i)
    newCounts[name] = Number(voteCount)
    total += Number(voteCount)
  }

  counts.value = newCounts
  totalVotes.value = total
}

onMounted(() => {
  fetchVotes()
})

const getPercentage = (count) => {
  if (totalVotes.value === 0) return 0
  return ((count / totalVotes.value) * 100).toFixed(1)
}
</script>
