import { getDatabase, ref, child, get } from 'firebase/database'

// function setMoviesInState(movieBase) {
//   return movieBase.reduce((acc, movie) => {
//     acc[movie.Title] = movie;
//     return acc;
//   }, {});
// }

const movieStore = {
  namespaced: true,
  state: {
    movieBase: [],
    moviesPerPage: 15,
    currentPage: 1
  },
  getters: {
    slicedBase: state => (from, to) => state.movieBase.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage
  },
  mutations: {
    setMovieBase (state, response) {
      state.movieBase = response
      console.log(response)
    }
  },
  actions: {
    async getMovieBase ({ commit }) {
      const db = ref(getDatabase())
      const response = (await get(child(db, 'MovieBase'))).val()
      commit('setMovieBase', response)
      console.log(response)
    },
    renderMovies ({ getters }) {
      const { slicedBase, currentPage, moviesPerPage } = getters
      const from = currentPage * currentPage - moviesPerPage
      const to = currentPage * moviesPerPage
      console.log(slicedBase)

      const moviesToRender = slicedBase(from, to)
      console.log(moviesToRender)

      // const result = moviesToRender.map((key, value) => key[value])
      // console.log(result);
    }
  }

}

export default movieStore
