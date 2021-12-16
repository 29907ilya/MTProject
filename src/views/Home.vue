<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="col" v-else>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
      <div class="movie-container">
        <div class="movie-container__poster">Movie_Poster</div>
        <span>Movie_Title</span>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'

export default {
  name: 'home',
  data () {
    return {
      loading: false // <<<<<<<<<<<<<<<<<<<<<<<<================================= ИЗМЕНИТЬ НА TRUE
    }
  },
  components: {
    Loader
  }
}
</script>

<style scoped>

</style>
