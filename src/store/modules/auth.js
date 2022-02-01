import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set, child, get } from 'firebase/database'
import createPersistedState from 'vuex-persistedstate'

const authStore = {
  plugins: [createPersistedState()],
  state: {
    user: [],
    isAdminAuth: false
  },
  getters: {
    getUser: state => state.user,
    isAdminAuth: state => state.isAdminAuth
  },
  mutations: {
    setAdmin (state, payload) {
      state.isAdminAuth = payload
    },
    setUser (state, user) {
      state.user = user
    },
    clearName (state) {
      state.isAdminAuth = false
    }
  },
  actions: {
    async login ({ commit, dispatch }, { email, password }) {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
        const db = ref(getDatabase())
        const uid = await dispatch('getUid')
        const isAdminAuth = (await get(child(db, `users/${uid}/info/role`))).val()
        if (isAdminAuth) {
          commit('setAdmin', true)
        }
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

    async getUid () {
      const auth = getAuth()
      const user = auth.currentUser
      return user ? user.uid : 'no user here'
    },

    async logout ({ commit }) {
      const auth = getAuth()
      await signOut(auth)
      commit('clearName')
    },

    async fetchInfo ({ dispatch, commit }) {
      try {
        const db = ref(getDatabase())
        const uid = await dispatch('getUid')
        const info = (await get(child(db, `users/${uid}/info`))).val()
        commit('setUser', info)
      } catch (error) { }
    }
  }
}
export default authStore
