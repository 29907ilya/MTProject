import { getDatabase, ref, onValue } from 'firebase/database'

export default {
  state: {
    info: {}
  },
  getters: {
    info: state => state.info
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
        return onValue(ref(getDatabase(), `/users/${uid}/info`), (snapshot) => {
          const info = (snapshot.val() && snapshot.val()) || 'Anonymous'
          console.log(info)
          commit('setName', info)
        }, {
          onlyOnce: true
        })
      } catch (error) { }
    }
  }
}
