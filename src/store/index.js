import { createStore } from 'vuex'
import auth from './modules/auth'
import info from './modules/info'
import movies from './modules/movies'
import operations from './modules/operations'

export default createStore({
  state: {
    isAuth: false,
    isAdmin: false
  },

  mutations: {
    setAuth (state, payload) {
      state.isAuth = payload
    },
    setAdmin (state, payload) {
      state.isAdmin = payload
    }
  },
  actions: {
  },
  modules: {
    auth,
    movies,
    operations,
    info
  }
})
