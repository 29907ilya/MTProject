import { getDatabase, ref, child, get } from 'firebase/database'

const movieStore = {
  namespaced: true,
  state: {
    movieBase: {},
    moviesPerPage: 15,
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
    }
  },
  actions: {
    // async getMovieBase ({ commit, dispatch, getters }) {
    //   try {
    //     const { currentPage, moviesPerPage } = getters
    //     const db = ref(getDatabase())
    //     const response = (await get(child(db, 'MovieBase'))).val()
    //     commit('setFullBase', response)
    //     const from = currentPage * moviesPerPage - moviesPerPage
    //     const to = currentPage * moviesPerPage
    //     const result = Object.keys(response)
    //     const moviesToRender = ({ ...result }).slice(from, to)
    //     commit('setMovieBase', moviesToRender)
    //   } catch (error) {
    //     console.log(error.message)
    //   }
    // },
    changeCurrentPage ({ commit, dispatch }, page) {
      commit('setCurrentPage', page)
      dispatch('getMovieBase')
    },

    async searchMovies ({ getters, commit }, query) {
      try {
        const { currentPage, moviesPerPage } = getters
        const db = ref(getDatabase())
        const response = (await get(child(db, 'MovieBase'))).val()
        const result = response.filter(key => key.Title.toLowerCase().includes(query.toLowerCase().trim()))
        commit('setFullBase', result)
        const from = currentPage * moviesPerPage - moviesPerPage
        const to = currentPage * moviesPerPage
        const moviesToRender = result.slice(from, to)
        commit('setMovieBase', moviesToRender)
      } catch (e) {
        console.warn(e.message)
      }
    }
  }
}

export default movieStore
