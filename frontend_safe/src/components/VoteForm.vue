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

    <div v-if="hasVoted && account" class="mt-10">
      <p class="text-xl text-green-700 font-bold mb-4">✅ Merci pour votre vote !</p>
      <div class="max-w-md mx-auto text-left">
        <h3 class="text-lg font-semibold mb-2 text-gray-700">🥇 Top 3 des starters :</h3>
        <ol class="list-decimal list-inside text-gray-800 space-y-1">
          <li v-for="(entry, index) in topStarters" :key="index">
            {{ entry.name }} — {{ entry.count }} vote(s)
          </li>
        </ol>
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
</script>
