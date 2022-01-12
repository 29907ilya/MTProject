<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h5>Add session</h5>
      </div>

      <div class="input-field">
        <h6>Choose movie:</h6>
        <movie-selector
          @onChange="showMovie"
          :list="movieList"
        ></movie-selector>
      </div>

      <div class="input-field">
        <movie-house
          @onChange="showCinema"
          :cinemaList="cinemaList"
        ></movie-house>
      </div>

      <h6>Choose date and time:</h6>
      <div class="input-field">
        <input id="limit" type="date" v-model="date" />
        <input id="limit" type="time" v-model="time" />
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
        @click.prevent="addSession"
      >
        Add
        <i class="material-icons right">send</i>
      </button>
    </div>
  </div>

  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h5>Remove session</h5>
      </div>

      <div class="input-field">
        <movie-house
          @onChange="showCinema"
          :cinemaList="cinemaList"
        ></movie-house>

        <button @click="selectedCinema">click</button>

        <!-- <remove-movie
          :list="selectedCinema"
          @removeMovie="removeMovie"
        ></remove-movie> -->
      </div>
    </div>
  </div>
</template>

<script>
import MovieHouse from './MovieHouse.vue'
import MovieSelector from './MovieSelector.vue'
// import RemoveMovie from './RemoveMovie.vue'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      movie: '',
      date: '',
      time: '',
      cinemaId: ''
    }
  },
  components: {
    MovieHouse,
    MovieSelector
    // RemoveMovie
  },
  methods: {
    // selectedCinema () {
    //   const arr = []
    //   const id = this.cinemaId
    //   const sessions = this.sessions
    //   for (const [i, key] in sessions) {
    //     if (sessions[key] == id) {
    //       arr.push(sessions[key])
    //     }
    //   }
    //   console.log(arr)
    // },
    showCinema (value) {
      this.cinemaId = value.selectedOption
      console.log(this.cinemaId)
    },
    showMovie (value) {
      this.movie = value.selectedOption
    },

    async addSession () {
      const sessionInfo = {
        movie: this.movie,
        date: this.date,
        time: this.time,
        cinema: this.cinemaId,
        seats: this.seatsList
      }

      try {
        await this.$store.dispatch('operations/createSession', sessionInfo)
        window.M.toast({ html: 'Session created!' })
        console.log(sessionInfo)
      } catch (error) {
        console.log(error)
      }
    }
  },

  computed: {

    ...mapGetters('operations', [
      'cinemaList',
      'movieList',
      'sessions',
      'seatsList'
    ])
    // ...mapGetters('movies', ['fullBase'])
  }
}
</script>

<style scoped>
</style>
