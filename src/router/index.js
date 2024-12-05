import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/day-1',
    name: 'day-1',
    component: () => import('../views/day-1/day-1.vue')
  },
  {
    path: '/day-2',
    name: 'day-2',
    component: () => import('../views/day-2/day-2.vue')
  },
  {
    path: '/day-3',
    name: 'day-3',
    component: () => import('../views/day-3/day-3.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
