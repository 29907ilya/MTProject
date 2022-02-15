import { getDatabase, ref, child, get } from 'firebase/database'

const movieStore = {
  namespaced: true,
  state: {
    movieBase: {},
    moviesPerPage: 10,
    currentPage: 1,
    fullBase: {}
  },
  getters: {
    moviesToRender: ({ movieBase }) => movieBase,
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    fullBase: ({ fullBase }) => fullBase,
    moviesLength: ({ fullBase }) => Object.keys(fullBase).length
  },
  mutations: {
    setMovieBase (state, moviesToRender) {
      state.movieBase = moviesToRender
    },
    setFullBase (state, value) {
      state.fullBase = value
    },
    setCurrentPage (state, value) {
      state.currentPage = value
    },
    setMainPage (state, value) {
      state.currentPage = value
    }
  },
  actions: {
    async getMovieBase ({ commit, dispatch, getters }) {
      try {
        const { currentPage, moviesPerPage } = getters
        const db = ref(getDatabase())
        const response = (await get(child(db, 'MovieBase'))).val()
        commit('setFullBase', response)
        const from = currentPage * moviesPerPage - moviesPerPage
        const to = currentPage * moviesPerPage
        const result = Object.values(response)
        const moviesToRender = result.slice(from, to)
        console.log(moviesToRender)
        commit('setMovieBase', moviesToRender)
      } catch (error) {
        console.log(error.message)
      }
    },
    changeCurrentPage ({ commit, dispatch }, page) {
      commit('setCurrentPage', page)
      dispatch('getMovieBase')
    },

    async searchMovies ({ getters, commit }, query) {
      try {
        const { currentPage, moviesPerPage } = getters
        const db = ref(getDatabase())
        const response = (await get(child(db, 'MovieBase'))).val()
        const result = Object.values(response).filter(key => key.Title.toLowerCase().includes(query.toLowerCase().trim()))
        commit('setFullBase', result)
        const from = currentPage * moviesPerPage - moviesPerPage
        const to = currentPage * moviesPerPage
        const moviesToRender = result.slice(from, to)
        commit('setMovieBase', moviesToRender)
      } catch (e) {
        console.warn(e.message)
      }
    },

    async sortByYear ({ getters, commit }, payload) {
      try {
        const { fullBase } = getters
        console.log(fullBase)
        const newMovieRenderList = Object.values(fullBase).filter((value) => value.Year === payload)
        console.log(newMovieRenderList)
        commit('setFullBase', newMovieRenderList)
        commit('setMovieBase', newMovieRenderList)
      } catch (e) {
        console.log(e)
      }
    },
    async goToMainPage ({ commit }) {
      const currentPage = 1
      commit('setMainPage', currentPage)
      // commit('setFullBase')
    }
  }
}

export default movieStore
