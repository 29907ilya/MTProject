// import { getDatabase, ref, child, get } from 'firebase/database'

const infoStore = {
  // state: {
  //   info: {}
  // },
  // getters: {
  //   userName: state => state.info
  // },
  // mutations: {
  //   setName (state, info) {
  //     state.info = info
  //   },
  //   clearName (state) {
  //     state.info = {}
  //   }
  // },
  // actions: {
  //   async fetchInfo ({ dispatch, commit }) {
  //     try {
  //       const uid = await dispatch('getUid')
  //       console.log(uid)
  //       const db = ref(getDatabase())
  //       const info = (await get(child(db, `users/${uid}/info/name`))).val()
  //       console.log(info || 'no name')
  //       commit('setName', info)
  //     } catch (error) { }
  //   }
  // }
}
export default infoStore
