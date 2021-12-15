import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default {
  actions: {
    async login ({ commit, dispatch }, { email, password }) {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    async logout ({ commit }) {
      const auth = getAuth()
      await signOut(auth)
      commit('clearName')
    }
  }
}
