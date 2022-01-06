import { getDatabase, ref, child, get, set } from 'firebase/database'

const operationsStore = {
  namespaced: true,
  state: {
    sessions: {},
    cinema: []

  },
  getters: {
    cinemaName: ({ cinema }) => cinema,
    sessions: ({ sessions }) => sessions
  },
  mutations: {
    setCinema (state, cinema) {
      state.cinema = cinema
    },
    setSessions (state, sessions) {
      state.sessions = sessions
    }
  },

  actions: {
    async getCinema ({ commit }) {
      const db = ref(getDatabase())
      const cinema = (await get(child(db, 'Places/'))).val()
      console.log(cinema)
      commit('setCinema', cinema)
    },

    async createSession ({ dispatch }, { movie, date, time, cinema }) {
      const db = getDatabase()
      await set(ref(db, 'Sessions/id' + Math.round(Math.random() * 1e7)), {
        movie: movie,
        date: date,
        time: time,
        cinema: cinema
      })
    },
    async getSessions ({ commit }) {
      const db = ref(getDatabase())
      const sessions = (await get(child(db, 'Sessions/'))).val()
      console.log(sessions)
      commit('setSessions', sessions)
    }
  }
}

export default operationsStore
