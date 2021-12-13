<template>
  <div class="app-main-layout deep-purple lighten-5">
    <navbar />
    <sidebar/>

    <main class="app-content">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <!-- <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div> -->
  </div>
</template>

<script>
import Navbar from '../components/app/Navbar.vue'
import Sidebar from '../components/app/Sidebar.vue'

export default {
  data () {
    return {

    }
  },
  components: {
    Navbar, Sidebar
  }
}
</script>
