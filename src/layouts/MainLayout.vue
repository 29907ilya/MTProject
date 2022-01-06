<template>
  <div class="app-main-layout">
    <navbar />
    <sidebar />

    <main class="app-content">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn"></div>
  </div>
</template>

<script>
import Navbar from '../components/app/Navbar.vue'
import Sidebar from '../components/app/Sidebar.vue'
import { mapActions } from 'vuex'

export default {
  async mounted () {
    await this.getMovieBase
    await this.getCinema
    this.loading = false
  },
  computed: {
    ...mapActions('operations', ['getCinema']),
    ...mapActions('movies', ['getMovieBase'])
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>
