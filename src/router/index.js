import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
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
    path: '/sessions',
    name: 'sessions',
    meta: {
      layout: 'main',
      auth: true,
      isAdmin: true
    },
    component: () => import('../views/Sessions.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('../views/Profile.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const currentUser = auth.currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }

  //   const requiredAuth = to.meta.auth

  //   if(requiredAuth && store.getters['auth/isAuth']) {
  //     next()
  //   } else if (requiredAuth && !store.getters['auth/isAuth']) {
  //     next('/login')
  //   } else {
  //     next()
  //   }
})

export default router
