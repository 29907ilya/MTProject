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

export default {
  async mounted () {
    if (!Object.keys(this.$store.getters.userName).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    Navbar,
    Sidebar
  }
}
</script>
