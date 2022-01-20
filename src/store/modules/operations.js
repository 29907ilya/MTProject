import { getDatabase, ref, child, get, push, remove } from 'firebase/database'

const operationsStore = {
  namespaced: true,
  state: {
    sessions: {},
    cinema: [],
    movie: [],
    seats: [],
    sessionToRender: {},
    seatsToRender: {}
  },
  getters: {
    cinemaList: ({ cinema }) => cinema,
    movieList: ({ movie }) => movie,
    sessions: ({ sessions }) => sessions,
    seatsList: ({ seats }) => seats,
    sessionToRender: ({ sessionToRender }) => sessionToRender,
    seatsToRender: ({ seatsToRender }) => seatsToRender
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
      console.log(sessionID)
      const db = ref(getDatabase())
      const sessionToRender = (await get(child(db, `Sessions/${sessionID}`))).val()
      const seatsToRender = (await get(child(db, `Sessions/${sessionID}/seats`))).val()
      console.log(sessionToRender)
      console.log(seatsToRender)
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

// const obj = {
//   -Mt9c5aDh85r5tda4HOi: {cinema: '-Mt4wS9PANdwUBgtjc4s', date: '2022-02-01', movie: '-Mt9ZUCu91i2ZUpP3rjf', seats: Array(20), time: '17:00'}
// -Mt9c7k_3llaMuaKFXqM: {cinema: '-Mt4wS9PANdwUBgtjc4s', date: '2022-02-01', movie: '-Mt9ZUCu91i2ZUpP3rjf', seats: Array(20), time: '21:00'}
// -Mt9cFxJm5NRD_uO5gzT: {cinema: '-Mt4wS9PANdwUBgtjc4s', date: '2022-02-01', movie: '-Mt9_3_wMdzRDKk6XNWA', seats: Array(20), time: '22:00'}
// -Mt9cHMb2tjOQn4AYwwx: {cinema: '-Mt4wS9PANdwUBgtjc4s', date: '2022-02-01', movie: '-Mt9_3_wMdzRDKk6XNWA', seats: Array(20), time: '20:00'}
// -Mt9cLKLXyvw5qx7AEog: {cinema: '-Mt4wS9PANdwUBgtjc4s', date: '2022-02-01', movie: '-Mt9_SJoAqerbxU7TmFQ', seats: Array(20), time: '15:00'}
// -Mt9cNo5iDyGgw7eKbRP: {cinema: '-Mt4wS9PANdwUBgtjc4s', date: '2022-02-01', movie: '-Mt9_hc_hE6WrLM2-VBb', seats: Array(20), time: '13:00'}
// -Mt9cPW3BTHZjivnjqWb: {cinema: '-Mt7Deq64i_ZZW_q6Z1O', date: '2022-02-01', movie: '-Mt9_hc_hE6WrLM2-VBb', seats: Array(20), time: '14:00'}
// -Mt9cQjTssMarHuzo0kH: {cinema: '-Mt7Deq64i_ZZW_q6Z1O', date: '2022-02-01', movie: '-Mt9_hc_hE6WrLM2-VBb', seats: Array(20), time: '17:00'}
// -Mt9cS6KF7gscVMNe0C4: {cinema: '-Mt7Es0LtgI1CN4BppRZ', date: '2022-02-01', movie: '-Mt9_hc_hE6WrLM2-VBb', seats: Array(20), time: '22:00'}
// -Mt9cTUtdvrm1vjMqPTA: {cinema: '-Mt7Es0LtgI1CN4BppRZ', date: '2022-02-01', movie: '-Mt9_hc_hE6WrLM2-VBb', seats: Array(20), time: '14:00'}
// -Mt9cWGyAH0ajXuYgM3t: {cinema: '-Mt7Es0LtgI1CN4BppRZ', date: '2022-02-01', movie: '-Mt9a31SSg---kLbSu3T', seats: Array(20), time: '15:00'}
// -Mt9cX0I0mU3ZEnuQ8cH: {cinema: '-Mt7Es0LtgI1CN4BppRZ', date: '2022-02-01', movie: '-Mt9a31SSg---kLbSu3T', seats: Array(20), time: '18:00'}
// -Mt9cXjaISG_maIaivP-: {cinema: '-Mt7Es0LtgI1CN4BppRZ', date: '2022-02-01', movie: '-Mt9a31SSg---kLbSu3T', seats: Array(20), time: '23:00'}
// -Mt9cYpu5FFcd04zn3dk: {cinema: '-Mt7Deq64i_ZZW_q6Z1O', date: '2022-02-01', movie: '-Mt9a31SSg---kLbSu3T', seats: Array(20), time: '23:00'}
// -Mt9cZszZeVzA8W2r7io: {cinema: '-Mt7Deq64i_ZZW_q6Z1O', date: '2022-02-01', movie: '-Mt9a31SSg---kLbSu3T', seats: Array(20), time: '20:00'}
// -Mt9c_crKe6la2uUBZFi: {cinema: '-Mt4wS9PANdwUBgtjc4s', date: '2022-02-01', movie: '-Mt9a31SSg---kLbSu3T', seats: Array(20), time: '20:00'}
// -Mt9cad8DS0n1fVt4Jqv: {cinema: '-Mt4wS9PANdwUBgtjc4s', date: '2022-02-01', movie: '-Mt9a31SSg---kLbSu3T', seats: Array(20), time: '22:00'}
// -Mt9ce5Wis4DZEiH6BA9: {cinema: '-Mt4wS9PANdwUBgtjc4s', date: '2022-02-01', movie: '-Mt9aYiZH2t3K38pglFw', seats: Array(20), time: '19:00'}
// -Mt9cf6GxYjG9r0G9fyo: {cinema: '-Mt4wS9PANdwUBgtjc4s', date: '2022-02-01', movie: '-Mt9aYiZH2t3K38pglFw', seats: Array(20), time: '23:00'}
// -Mt9chGT2smJRirvZ-wV: {cinema: '-Mt7Deq64i_ZZW_q6Z1O', date: '2022-02-01', movie: '-Mt9aYiZH2t3K38pglFw', seats: Array(20), time: '22:00'}
// -Mt9cjDUOpwZi_Tru82O: {cinema: '-Mt7Es0LtgI1CN4BppRZ', date: '2022-02-01', movie: '-Mt9aYiZH2t3K38pglFw', seats: Array(20), time: '19:00'}
// -Mt9ckC46dKhgbrFbr8G: {cinema: '-Mt7Es0LtgI1CN4BppRZ', date: '2022-02-01', movie: '-Mt9aYiZH2t3K38pglFw', seats: Array(20), time: '16:00'}
// }
