import { createRouter, createWebHistory } from 'vue-router'
// import { getAuth } from 'firebase/auth'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'empty',
      guest: true
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'empty',
      guest: true
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/sessions',
    name: 'sessions',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Sessions.vue')
  },
  {
    path: '/cinemas',
    name: 'cinemas',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Cinemas.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
