import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import * as firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBuTs0bxf3e5UHNXOtQyN59MHnnUsNVhok',
  authDomain: 'mtproject-767cf.firebaseapp.com',
  projectId: 'mtproject-767cf',
  storageBucket: 'mtproject-767cf.appspot.com',
  messagingSenderId: '299710874556',
  appId: '1:299710874556:web:32bddd8de3dd86fcf661b9',
  databaseURL: 'https://mtproject-767cf-default-rtdb.europe-west1.firebasedatabase.app/'
}

firebase.initializeApp(firebaseConfig)

const app = createApp(App)
app.use(store).use(router).mount('#app')
