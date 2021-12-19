// import { getDatabase, ref, onValue } from 'firebase/database'
import { getDatabase, ref, child, get } from 'firebase/database'

export default {
  state: {
    userName: {}
  },
  getters: {
    userName: state => state.userName
  },
  mutations: {
    setName (state, getName) {
      state.userName = getName
    },
    clearName (state) {
      state.userName = {}
    }
  },
  actions: {
    async fetchInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const db = ref(getDatabase())
        const getName = (await get(child(db, `users/${uid}/info/name`))).val()
        // console.log(getName)  <<<<<===== включаю для отладки, выдает name / null
        commit('setName', getName)

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
