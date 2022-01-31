<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import MainLayout from './layouts/MainLayout.vue'
import EmptyLayout from './layouts/EmptyLayout.vue'
import { mapActions } from 'vuex'

export default {
  created () {
    return this.logout
  },
  computed: {
    ...mapActions(['logout']),

    layout () {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  components: {
    EmptyLayout,
    MainLayout
  }
}
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
