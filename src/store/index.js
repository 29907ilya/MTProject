import { createStore } from 'vuex'
import auth from './modules/auth'
import info from './modules/info'
import movies from './modules/movies'
import operations from './modules/operations'

export default createStore({
  state: {
    auth: false,
    isAdmin: false
  },

  mutations: {
    setAuth (state, payload) {
      state.auth = payload
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
