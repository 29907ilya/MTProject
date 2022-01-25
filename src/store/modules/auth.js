import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

const authStore = {
  state: {
    userProfile: {}
  },
  mutations: {
    setUserProfile (state, val) {
      state.userProfile = val
    }
  },
  actions: {
    async login ({ commit, dispatch }, { email, password }) {
      try {
        commit('setLoading', true)
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        console.log(error.message)
        throw error
      }
    },

    async register ({ commit, dispatch }, { email, password, name }) {
      try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password, name)
        const uid = await dispatch('getUid')
        await set(ref(getDatabase(), `/users/${uid}/info`), { email, password, uid, name })
      } catch (error) {
        console.log(error.message)
        throw error
      }
    },

    getUid () {
      const auth = getAuth()
      const user = auth.currentUser
      console.log(user)
      return user ? user.uid : '>>> No uid in database <<<'
    },

    async logout ({ commit }) {
      const auth = getAuth()
      await signOut(auth)
      commit('setUserProfile', {})
    }
  }
}
export default authStore
