import { getDatabase, ref, child, get } from 'firebase/database'

export default {
  state: {
    info: {}
  },
  getters: {
    userName: state => state.info

  },
  mutations: {
    setName (state, info) {
      state.info = info
    },
    clearName (state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        console.log(uid)
        const db = ref(getDatabase())
        const info = (await get(child(db, `users/${uid}/info/name`))).val()
        console.log(info)
        commit('setName', info)

        // второй способ
        // return onValue(ref(getDatabase(), `/users/${uid}/info`), (snapshot) => {
        //   const info = (snapshot.val() && snapshot.val()) || 'dear'
        // console.log(info)
        // commit('setName', info)
        // }, {
        //   onlyOnce: false
        // })
      } catch (error) { }
    }
  }
}
