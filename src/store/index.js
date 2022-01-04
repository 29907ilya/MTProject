import { createStore } from 'vuex'
import auth from './modules/auth'
import reg from './modules/reg'
// import info from './modules/info'
import movies from './modules/movies'
import operations from './modules/operations'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, reg, movies, operations
    // info,
  }
})
