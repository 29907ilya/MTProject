import { createStore } from 'vuex'
import auth from './modules/auth'
import reg from './modules/reg'
import info from './modules/info'
import movies from './modules/movies'
import loader from './modules/loader'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, reg, info, movies, loader
  }
})
