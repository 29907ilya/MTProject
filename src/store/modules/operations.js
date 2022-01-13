import { getDatabase, ref, child, get, push, remove } from 'firebase/database'

const operationsStore = {
  namespaced: true,
  state: {
    sessions: {},
    cinema: [],
    movie: [],
    seats: []
  },
  getters: {
    cinemaList: ({ cinema }) => cinema,
    movieList: ({ movie }) => movie,
    sessions: ({ sessions }) => sessions,
    seatsList: ({ seats }) => seats
  },
  mutations: {
    setCinema (state, cinema) {
      state.cinema = cinema
    },
    setMovie (state, movie) {
      state.movie = movie
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

    async getMovie ({ commit }) {
      const db = ref(getDatabase())
      const movie = (await get(child(db, 'MovieBase'))).val()
      commit('setMovie', movie)
    },

    async createCinema ({ commit, dispatch }, { name }) {
      const db = getDatabase()
      await push(ref(db, 'Cinemas'), {
        name: name
      })
      dispatch('getCinema')
    },

    async createMovie ({ commit, dispatch }, {
      title,
      year,
      runtime,
      raiting,
      discription,
      poster,
      id
    }) {
      const db = getDatabase()
      await push(ref(db, 'MovieBase'), {
        Title: title,
        Year: year,
        Runtime: runtime,
        imdbRating: raiting,
        Discription: discription,
        Poster: poster,
        Id: id
      })
      dispatch('getMovie')
    },

    async removeCinema ({ commit, dispatch }, id) {
      const db = getDatabase()
      await remove(ref(db, `Cinemas/${id}`))
      dispatch('getCinema')
    },

    async removeMovie ({ commit, dispatch }, id) {
      const db = getDatabase()
      await remove(ref(db, `MovieBase/${id}`))
      dispatch('getMovie')
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
      dispatch('getSessions')
    },
    async getSessions ({ commit }) {
      const db = ref(getDatabase())
      const sessions = (await get(child(db, 'Sessions'))).val()
      commit('setSessions', sessions)
    }
  }
}

export default operationsStore
