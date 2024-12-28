import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../layout/_main-layout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/dashboard/_dashboard.vue'),
        }
      ]
    },

  ],
})

export default router
