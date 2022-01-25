import { createStore } from 'vuex'
import auth from './modules/auth'
import info from './modules/info'
import movies from './modules/movies'
import operations from './modules/operations'

export default createStore({
  state: {
    loading: false,
    information: null
  },
  getters: {
    getInformation (state) {
      return state.information
    },
    getLoading (state) {
      return state.loading
    }
  },
  mutations: {
    setInformation (state, payload) {
      state.information = payload
    },
    setLoading (state, payload) {
      state.loading = payload
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
