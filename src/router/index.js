import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'empty',
      requiresAuth: false
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'empty',
      requiresAuth: false
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/sessions',
    name: 'sessions',
    meta: {
      layout: 'main',
      requiresAuth: true,
      isAdmin: true
    },
    component: () => import('../views/Sessions.vue')
  },
  {
    path: '/cinemas',
    name: 'cinemas',
    meta: {
      layout: 'main',
      requiresAuth: true,
      isAdmin: true
    },
    component: () => import('../views/Cinemas.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && store.info === '') { next('/login') } else { next() }
})

export default router
