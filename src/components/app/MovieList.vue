<template>
  <div class="col" v-if="this.list.length > 0">
    <div class="movie-container" v-for="(movie, key) in list" :key="key">
      <movie-item :movie="movie"></movie-item>
      <a class="waves-effect waves-red btn-flat">Buy tickets</a>
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
.btn-flat {
  position: relative;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0);
  text-align: center;
}
.btn-flat:hover {
  background-color: #e57373;
}
</style>
