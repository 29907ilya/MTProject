import { getDatabase, ref, child, get } from 'firebase/database'

const movieStore = {
  namespaced: true,
  state: {
    movieBase: [],
    moviesPerPage: 15,
    currentPage: 1
  },
  getters: {
    moviesToRender: ({ movieBase }) => movieBase,
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage
  },
  mutations: {
    setMovieBase (state, moviesToRender) {
      state.movieBase = moviesToRender
    }
  },
  actions: {
    async getMovieBase ({ commit, getters }) {
      try {
        const db = ref(getDatabase())
        const response = (await get(child(db, 'MovieBase'))).val()
        const { currentPage, moviesPerPage } = getters
        const from = currentPage * moviesPerPage - moviesPerPage
        const to = currentPage * moviesPerPage
        const moviesToRender = response.slice(from, to)
        console.log(moviesToRender)
        commit('setMovieBase', moviesToRender)
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}

export default movieStore
