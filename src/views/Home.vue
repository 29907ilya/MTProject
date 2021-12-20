<template>
  <div>
    <loader v-if="loading"></loader>
    <movie-list :list="moviesToRender" v-else></movie-list>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import MovieList from '../components/app/MovieList.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      loading: false,
      moviesPerPage: 15,
      currentPage: 1
    }
  },
  mounted () {
    this.getMovieBase()
  },
  methods: {
    ...mapActions('movies', ['getMovieBase'])
  },
  computed: {
    ...mapGetters('movies', ['moviesToRender'])
  },
  components: {
    Loader,
    MovieList
  }
}
</script>

<style scoped>
</style>
