import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    meta: { layout: 'empty' },
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/sessions',
    name: 'sessions',
    meta: { layout: 'main' },
    component: () => import('../views/Sessions.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main' },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/',
    name: 'main',
    meta: { layout: 'main' },
    component: () => import('../views/MainPage.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
