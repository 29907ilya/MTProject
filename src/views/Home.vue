<template>
  <div>
    <loader v-if="loading"></loader>
    <movie-list v-else></movie-list>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import MovieList from '../components/app/MovieList.vue'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      loading: false // <<<<<<<<<<<<<<<<<<<<<<<<================================= ИЗМЕНИТЬ НА TRUE
    }
  },
  mounted () {
    this.getMovieBase()
    this.renderMovies()
  },
  methods: {
    ...mapActions('movies', ['getMovieBase', 'renderMovies'])
  },
  components: {
    Loader,
    MovieList
  }
}
</script>

<style scoped>
</style>
