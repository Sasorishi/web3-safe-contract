<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
    <div class="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center">Système de Vote</h1>

      <div v-if="!hasVoted" class="space-y-4">
        <p class="text-center">Veuillez choisir une option :</p>
        <div class="flex flex-col space-y-2">
          <button
            v-for="option in options"
            :key="option"
            @click="vote(option)"
            class="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div v-else class="text-center">
        <h2 class="text-xl font-semibold mb-4">Résultats</h2>
        <ul class="space-y-2">
          <li v-for="(count, option) in votes" :key="option" class="bg-gray-100 p-2 rounded-xl">
            {{ option }} : {{ count }} vote{{ count > 1 ? 's' : '' }}
          </li>
        </ul>
        <button @click="reset" class="mt-4 text-sm text-gray-500 hover:underline">
          Réinitialiser
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ['Option A', 'Option B', 'Option C'],
      votes: {
        'Option A': 0,
        'Option B': 0,
        'Option C': 0,
      },
      hasVoted: false,
    }
  },
  methods: {
    vote(option) {
      this.votes[option]++
      this.hasVoted = true
    },
    reset() {
      for (const option in this.votes) {
        this.votes[option] = 0
      }
      this.hasVoted = false
    },
  },
}
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
