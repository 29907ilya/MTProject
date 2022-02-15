<template>
  <div class="movie-item-poster" :style="posterBg"></div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  computed: {
    posterBg () {
      return {
        'background-image': `url(${this.movie.Poster})`
      }
    }
  }
}
</script>

<style>
</style>
