import { getDatabase, ref, child, get } from 'firebase/database'

const operationsStore = {
  namespaced: true,
  state: {
    sessions: [],
    cinema: []

  },
  getters: {
    cinemaName: ({ cinema }) => console.log(cinema)
  },
  mutations: {
    setCinema (state, cinema) {
      state.cinema = cinema
      console.log(state.cinema)
    }
  },
  actions: {
    async getCinema ({ commit }) {
      const db = ref(getDatabase())
      const cinema = (await get(child(db, 'Places/'))).val()
      console.log(cinema)
      commit('setCinema', cinema)
    }
    // async addSession({ commit }) {
    // }
  }
}

export default operationsStore
