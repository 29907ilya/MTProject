import { createApp } from 'vue'
import App from './App.vue'
import BalmUI from 'balm-ui' // Official Google Material Components
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus.js' // BalmJS Team Material Components
import 'balm-ui/dist/balm-ui.css'
import router from './router'
import store from './store'

import 'materialize-css/dist/js/materialize.min'
import * as firebase from 'firebase/app'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
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

// firebase.initializeApp(firebaseConfig)
const firebaseApp = firebase.initializeApp(firebaseConfig)
const authInstance = getAuth(firebaseApp)
onAuthStateChanged(authInstance, user => console.log(user))

const app = createApp(App)
app.use(store).use(BalmUI).use(BalmUIPlus).use(router).mount('#app')
