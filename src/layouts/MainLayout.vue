<template>
  <div class="app-main-layout">
    <navbar />
    <sidebar />
    <div class="main-app">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '../components/app/Navbar.vue'
import Sidebar from '../components/app/Sidebar.vue'
import { mapActions } from 'vuex'

export default {
  async mounted () {
    await this.fetchInfo
    await this.getCinema
    await this.getMovie
    await this.getSessions
  },
  computed: {
    ...mapActions(['fetchInfo']),
    ...mapActions('operations', ['getCinema', 'getMovie', 'getSessions'])
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style scoped>
</style>
