import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref, set, child, get } from 'firebase/database'
import createPersistedState from 'vuex-persistedstate'

const authStore = {
  plugins: [createPersistedState()],
  state: {
    user: null,
    login: false
  },
  getters: {
    getUser: state => state.user,
    showLogin: state => console.log(state.login)
  },
  mutations: {
    setLogin (state, payload) {
      state.login = payload
      console.log(state.login)
    },
    setUser (state, user) {
      state.user = user
    },
    clearName (state) {
      state.info = {}
    }
  },
  actions: {
    //   setUser(context, user){
    //     context.commit('setUser', user);
    // },
    async login ({ commit, dispatch }, { email, password }) {
      try {
        // const uid = await dispatch('getUid')
        // const adminUID = 'IBcunnyJHtgv1UQ1kVwSZzFMG9k2'
        // console.log(uid)
        // console.log(adminUID)
        // if (uid === adminUID) {
        //   commit('setAdmin', true)
        //   commit('setAuth', true)
        //   console.log('Admin is here!!!')
        // } else {
        //   commit('setAdmin', false)
        //   commit('setAuth', true)
        //   console.log('User is here!!!')
        // }
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

    async getUid () {
      return new Promise(function (resolve) {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
          const uid = user.uid
          resolve(uid)
        })
      })
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
        console.log(uid)
        const info = (await get(child(db, `users/${uid}/info/name`))).val()
        console.log(info || 'no name')
        commit('setUser', info)
        commit('setLogin', true)
      } catch (error) { }
    }
  }
}
export default authStore
