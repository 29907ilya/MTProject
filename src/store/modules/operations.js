import { getDatabase, ref, child, get, push, remove } from 'firebase/database'

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
      const cinema = (await get(child(db, 'Cinemas'))).val()
      const seats = (await get(child(db, 'Seats'))).val()
      commit('setCinema', cinema)
      commit('setSeats', seats)
    },

    async createCinema ({ commit, dispatch }, { name }) {
      const db = getDatabase()
      await push(ref(db, 'Cinemas'), {
        name: name
      })
    },

    async removeCinema ({ dispatch }, id) {
      const db = getDatabase()
      await remove(ref(db, `Cinemas/${id}`))
    },

    async createSession ({ dispatch }, { movie, date, time, cinema, seats }) {
      const db = getDatabase()
      await push(ref(db, 'Sessions'), {
        movie: movie,
        date: date,
        time: time,
        cinema: cinema,
        seats: seats
      })
    },
    async getSessions ({ commit }) {
      const db = ref(getDatabase())
      const sessions = (await get(child(db, 'Sessions'))).val()
      commit('setSessions', sessions)
    }
  }
}

export default operationsStore
