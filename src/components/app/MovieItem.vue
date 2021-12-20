<template>
  <div class="movie-item mb-3">
    <div class="movie-item-poster" :style="posterBg"></div>
  </div>
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

<style scoped>
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 300px;
}
.movie-item:hover {
  box-shadow: 0px 5px 20px rgb(0, 0, 0, 0.7);
  transform: scale(1.02);
}
.movie-item-poster {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
