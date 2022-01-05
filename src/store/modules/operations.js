import { getDatabase, ref, child, get } from 'firebase/database'

const operationsStore = {
  namespaced: true,
  state: {
    sessions: [],
    cinema: []

  },
  getters: {
    cinemaName: ({ cinema }) => cinema
  },
  mutations: {
    setCinema (state, cinema) {
      state.cinema = cinema
    }
  },

  actions: {
    async getCinema ({ commit }) {
      const db = ref(getDatabase())
      const cinema = (await get(child(db, 'Places/'))).val()
      console.log(cinema)
      commit('setCinema', cinema)
    }
  }
}

export default operationsStore
