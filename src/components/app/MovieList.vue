<template>
  <div class="col" v-if="this.list.length > 0">
    <div class="movie-container" v-for="movie in list" :key="movie">
      <movie-item :movie="movie"></movie-item>
    </div>
  </div>
</template>

<script>
import MovieItem from './MovieItem.vue'

export default {
  props: {
    list: Object
  },
  components: {
    MovieItem
  },
  methods: {}
}
</script>
<style scoped>
</style>
