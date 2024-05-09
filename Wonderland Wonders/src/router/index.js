import { createRouter, createWebHistory } from 'vue-router'
import TheHareQuestView from '../views/TheHareQuestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheHareQuestView
    },
    {
      path: '/theharequestyoushouldntknow',
      name: 'theharequest',
      component: () => import('../views/TheHareQuestView.vue')
    }
  ]
})

export default router
