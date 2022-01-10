import { getDatabase, ref, child, get, set } from 'firebase/database'

const operationsStore = {
  namespaced: true,
  state: {
    sessions: {},
    cinema: {},
    seats: {}

  },
  getters: {
    cinemaName: ({ cinema }) => cinema,
    sessions: ({ sessions }) => sessions,
    seatsList: ({ seats }) => seats
  },
  mutations: {
    setCinema (state, cinema) {
      state.cinema = cinema
    },
    setSeats (state, seats) {
      state.seats = seats
    },
    setSessions (state, sessions) {
      state.sessions = sessions
    }
  },

  actions: {
    async getCinema ({ commit }) {
      const db = ref(getDatabase())
      const cinema = (await get(child(db, 'Places'))).val()
      const seats = (await get(child(db, 'Seats'))).val()
      commit('setCinema', cinema)
      commit('setSeats', seats)
    },

    async createSession ({ dispatch }, { movie, date, time, cinema, seats }) {
      const db = getDatabase()
      await set(ref(db, 'Sessions/id' + Math.round(Math.random() * 1e7)), {
        movie: movie,
        date: date,
        time: time,
        cinema: cinema,
        seats: seats
      })
    },
    async getSessions ({ commit }) {
      const db = ref(getDatabase())
      const sessions = (await get(child(db, 'Sessions/'))).val()
      commit('setSessions', sessions)
    }
  }
}

export default operationsStore
