<template>
  <div>
    <loader v-if="loading"></loader>

    <template v-else>
      <movie-list :list="moviesToRender"></movie-list>
      <pagination
        :current-page="currentPage"
        :moviesPerPage="moviesPerPage"
        :total="moviesLength"
        @page-changed="onPageChanged"
      ></pagination>
    </template>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import MovieList from '../components/app/MovieList.vue'
import Pagination from '../components/app/Pagination.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      loading: true,
      moviesPerPage: 15
    }
  },
  async mounted () {
    await this.getMovieBase()
    // await this.getCinema()
    this.loading = false
  },
  methods: {
    ...mapActions('movies', ['changeCurrentPage', 'getMovieBase'], 'opearations', ['getCinema']),
    onPageChanged (page) {
      this.changeCurrentPage(page)
    }
  },
  computed: {
    ...mapGetters('movies', ['moviesToRender', 'moviesLength', 'currentPage'], 'isLoading')
  },
  components: {
    Loader,
    MovieList,
    Pagination
  }
}
</script>

<style scoped>

</style>
