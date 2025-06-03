// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Safe from './components/Safe.vue'
import Vote from './components/Vote.vue'

const routes = [
  { path: '/vote', component: Vote },
  { path: '/', component: Safe },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
