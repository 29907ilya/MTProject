import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import store from '../store/modules/auth'

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
    path: '/movies',
    name: 'movies',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/movies/:id',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import('../components/app/MoviePage.vue')
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

router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  const currentUser = auth.currentUser
  const admin = store.state.isAdminAuth
  const requriesAuth = to.matched.some(record => record.meta.requiresAuth)
  // const isAdmin = to.matched.some(record => record.meta.isAdmin)

  if (requriesAuth && !currentUser) {
    next('/login')
  } else if (to.meta.isAdmin && !admin) {
    next('/movies')
  } else {
    next()
  }
})

export default router
