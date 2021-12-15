import { createStore } from 'vuex'
import auth from './auth'
import reg from './reg'
import info from './info'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, reg, info
  }
})
