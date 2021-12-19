import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

export default {
  actions: {
    async register ({ dispatch }, { email, password, name }) {
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
      return user ? user.uid : '>>> No uid in database <<<'
    }

  }
}
