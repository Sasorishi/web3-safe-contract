<template>
  <div class="text-center">
    <p class="mb-4 text-lg font-semibold text-gray-700">Quel starter Pokémon choisis-tu ?</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="starter in starters"
        :key="starter.name"
        class="relative border rounded-xl p-3 bg-white hover:shadow-lg hover:-translate-y-1 transition transform text-center overflow-hidden"
      >
        <div class="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-5" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg')"></div>
        <div class="relative z-10 flex justify-center">
          <img :src="starter.img" :alt="starter.name" class="w-20 h-20 mb-2" />
        </div>
        <h3 class="relative z-10 font-semibold text-gray-800 text-sm">{{ starter.name }}</h3>
        <button
          @click="vote(starter.name)"
          :disabled="!account || hasVoted"
          class="relative z-10 mt-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-600"
        >
          Voter
        </button>
      </div>
    </div>

    <div v-if="!account" class="mt-4 text-red-500 font-medium">
      Veuillez connecter votre wallet pour voter.
    </div>

    <div v-if="hasVoted && account" class="mt-12 animate-fade-in">
      <p class="text-xl text-green-700 font-bold mb-6">Merci pour votre vote !</p>
      <div class="flex justify-center gap-6 items-end">
        <div v-if="topStarters[1]" class="flex flex-col items-center">
          <img :src="getImg(topStarters[1].name)" class="w-16 h-16 mb-2 rounded-full ring-2 ring-gray-400 shadow-sm" />
          <div class="bg-gray-200 px-3 py-1 rounded-t text-sm">🥈 {{ topStarters[1].name }}</div>
          <div class="bg-gray-300 w-10 h-20 rounded-b"></div>
          <span class="text-xs mt-1 text-gray-500">{{ getPercentage(topStarters[1].count) }}%</span>
        </div>
        <div v-if="topStarters[0]" class="flex flex-col items-center">
          <img :src="getImg(topStarters[0].name)" class="w-20 h-20 mb-2 rounded-full ring-4 ring-yellow-400 shadow-lg" />
          <div class="bg-yellow-300 px-4 py-1 rounded-t font-bold text-sm">🥇 {{ topStarters[0].name }}</div>
          <div class="bg-yellow-400 w-10 h-28 rounded-b"></div>
          <span class="text-xs mt-1 text-gray-700 font-medium">{{ getPercentage(topStarters[0].count) }}%</span>
        </div>
        <div v-if="topStarters[2]" class="flex flex-col items-center">
          <img :src="getImg(topStarters[2].name)" class="w-14 h-14 mb-2 rounded-full ring-2 ring-orange-300 shadow-sm" />
          <div class="bg-orange-200 px-3 py-1 rounded-t text-sm">🥉 {{ topStarters[2].name }}</div>
          <div class="bg-orange-300 w-10 h-16 rounded-b"></div>
          <span class="text-xs mt-1 text-gray-500">{{ getPercentage(topStarters[2].count) }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({ account: String })
const emit = defineEmits(['voted'])
const hasVoted = ref(false)

const starters = [
  { name: 'Bulbizarre', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { name: 'Salamèche', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { name: 'Carapuce', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { name: 'Germignon', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png' },
  { name: 'Héricendre', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png' },
  { name: 'Kaiminus', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png' },
  { name: 'Arcko', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/252.png' },
  { name: 'Poussifeu', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/255.png' },
  { name: 'Gobou', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png' }
]

const vote = (choice) => {
  const votes = JSON.parse(localStorage.getItem('votes') || '{}')
  if (!votes[props.account]) {
    votes[props.account] = choice
    localStorage.setItem('votes', JSON.stringify(votes))
    hasVoted.value = true
    emit('voted', votes)
  }
}

watch(() => props.account, (newAccount) => {
  const votes = JSON.parse(localStorage.getItem('votes') || '{}')
  hasVoted.value = !!votes[newAccount]
})

const topStarters = computed(() => {
  const votes = JSON.parse(localStorage.getItem('votes') || '{}')
  const counts = {}
  for (const name of starters.map(s => s.name)) {
    counts[name] = 0
  }
  for (const vote of Object.values(votes)) {
    if (counts.hasOwnProperty(vote)) counts[vote]++
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
})

const getImg = (name) => {
  const found = starters.find((s) => s.name === name)
  return found ? found.img : ''
}

const getPercentage = (count) => {
  const votes = JSON.parse(localStorage.getItem('votes') || '{}')
  const total = Object.values(votes).length
  return total === 0 ? 0 : ((count / total) * 100).toFixed(1)
}
</script>
