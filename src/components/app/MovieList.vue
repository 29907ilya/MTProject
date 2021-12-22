<template>
  <div class="col" v-if="this.list.length > 0">
    <div class="movie-container" v-for="(movie, key) in list" :key="key">
      <movie-item :movie="movie"></movie-item>
    </div>
  </div>
</template>
<script>
import MovieItem from './MovieItem.vue'

export default {
  props: {
    list: Array
  },
  components: {
    MovieItem
  }
}
</script>
<style scoped>

</style>
