import { getDatabase, ref, child, get, set } from 'firebase/database'

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
    },

    async createSession ({ movie, date, time, cinema }) {
      const db = getDatabase()
      await set(ref(db, 'Sessions/'), {
        movie: movie,
        date: date,
        time: time,
        cinema: cinema
      })
      console.log('++++')
    }
  }
}

export default operationsStore
