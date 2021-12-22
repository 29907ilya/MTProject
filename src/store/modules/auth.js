import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default {
  actions: {
    async login ({ commit, dispatch }, { email, password }) {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        console.log(error.message)
        throw error
      }
    },
    async logout ({ commit }) {
      const auth = getAuth()
      await signOut(auth)
      commit('clearName')
    }
    // checkAuth({ dispatch }) {
    //   const auth = getAuth();
    //   onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       const uid = user.uid;
    //       console.log(uid);
    //     } else {
    //       console.log('no Auth user');
    //     }
    //   });
    // },
  }
}
