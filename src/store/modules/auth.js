import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

const authStore = {
  actions: {
    async login ({ commit, dispatch }, { email, password }) {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
        const uid = await dispatch('getUid')
        const adminUID = 'IBcunnyJHtgv1UQ1kVwSZzFMG9k2'
        console.log(uid)
        console.log(adminUID)
        console.log(uid === adminUID)

        if (uid === adminUID) {
          commit('setAdmin', true)
          commit('setAuth', true)
          console.log('Admin is here!!!')
        } else {
          commit('setAdmin', false)
          commit('setAuth', true)
          console.log('User is here!!!')
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

    getUid () {
      const auth = getAuth()
      const user = auth.currentUser
      // console.log(user)
      return user ? user.uid : '>>> No uid in database <<<'
    },

    async logout ({ commit }) {
      const auth = getAuth()
      await signOut(auth)
    }
  }
}
export default authStore
