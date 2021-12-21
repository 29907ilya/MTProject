import { getDatabase, ref, child, get } from 'firebase/database'

const movieStore = {
  namespaced: true,
  state: {
    movieBase: [],
    moviesPerPage: 15,
    currentPage: 1,
    fullBase: []
  },
  getters: {
    moviesToRender: ({ movieBase }) => movieBase,
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    moviesLength: ({ fullBase }) => Object.keys(fullBase).length
  },
  mutations: {
    setMovieBase (state, moviesToRender) {
      state.movieBase = moviesToRender
    },
    setFullBase (state, response) {
      state.fullBase = response
    },
    setCurrentPage (state, value) {
      state.currentPage = value
    }
  },
  actions: {
    async getMovieBase ({ commit, dispatch, getters }) {
      try {
        // dispatch('toggleLoader', true, { root: true })
        const { currentPage, moviesPerPage } = getters
        const db = ref(getDatabase())
        const response = (await get(child(db, 'MovieBase'))).val()
        commit('setFullBase', response)
        const from = currentPage * moviesPerPage - moviesPerPage
        const to = currentPage * moviesPerPage
        const moviesToRender = response.slice(from, to)
        commit('setMovieBase', moviesToRender)
      } catch (error) {
        console.log(error.message)
      } finally {
        // dispatch('toggleLoader', false, { root: true })
      }
    },
    changeCurrentPage ({ commit, dispatch }, page) {
      commit('setCurrentPage', page)
      dispatch('getMovieBase')
    }
  }
}

export default movieStore
