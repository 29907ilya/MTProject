import { getDatabase, ref, child, get, push, remove, update } from 'firebase/database'
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const operationsStore = {
  namespaced: true,
  state: {
    sessions: {},
    cinema: [],
    movie: [],
    seats: [],
    sessionToRender: {},
    seatsToRender: [],
    sessionID: ''
  },
  getters: {
    cinemaList: ({ cinema }) => cinema,
    movieList: ({ movie }) => movie,
    sessions: ({ sessions }) => sessions,
    seatsList: ({ seats }) => seats,
    sessionToRender: ({ sessionToRender }) => sessionToRender,
    seatsToRender: ({ seatsToRender }) => Array.from(seatsToRender),
    currentSessionId: ({ sessionID }) => sessionID
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
    },
    currentSessionId (state, sessionID) {
      state.sessionID = sessionID
    },
    sessionToRender (state, sessionToRender) {
      state.sessionToRender = sessionToRender
    },
    seatsToRender (state, seatsToRender) {
      state.seatsToRender = seatsToRender
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

    async sessionToRender ({ commit, dispatch }, { sessionID }) {
      const db = ref(getDatabase())
      const sessionToRender = (await get(child(db, `Sessions/${sessionID}`))).val()
      const seatsToRender = (await get(child(db, `Sessions/${sessionID}/seats`))).val()
      commit('currentSessionId', sessionID)
      commit('sessionToRender', sessionToRender)
      commit('seatsToRender', seatsToRender)
    },

    async createCinema ({ commit, dispatch }, { name }) {
      const db = getDatabase()
      await push(ref(db, 'Cinemas'), {
        name: name
      })
      dispatch('getCinema')
    },

    async createMovie ({ commit, dispatch }, payload) {
      const movieInfo = {
        Title: payload.title,
        Year: payload.year,
        Runtime: payload.runtime,
        imdbRating: payload.raiting,
        Discription: payload.discription,
        imageUrl: payload.image, // здесь чего-то не хватает
        Id: payload.id
      }
      let imageUrl
      let key
      const db = getDatabase()
      await push(ref(db, 'MovieBase'), movieInfo)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const storage = getStorage()
          const storageRef = sRef(storage, 'MovieBase/' + key)
          return uploadBytes(storageRef, payload.image)
        })
        .then(() => {
          const storage = getStorage()
          const storageRef = sRef(storage, 'MovieBase/' + key)
          imageUrl = getDownloadURL(storageRef)
          const dbRef = ref(getDatabase())
          return update(child(dbRef, `'MovieBase/${key}'`), { imageUrl: imageUrl })
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

    async removeSession ({ commit, dispatch }, id) {
      const db = getDatabase()
      await remove(ref(db, `Sessions/${id}`))
      dispatch('getSessions')
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
