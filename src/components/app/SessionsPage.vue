<template>
  <div class="col xl8">
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

    <div class="col xl4">
      <div>
        <div class="page-subtitle">
          <h5>Remove session</h5>
        </div>

        <div class="input-field">
          <movie-house
            @onChange="showCinema"
            :cinemaList="cinemaList"
          ></movie-house>

          <!-- <button @click="selectedCinema">click</button> -->

          <remove-session
            :list="selectedCinema"
            :cinema-id="cinemaId"
            @removeSession="removeSession"
          ></remove-session>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieHouse from './MovieHouse.vue'
import MovieSelector from './MovieSelector.vue'
import RemoveSession from './RemoveSession.vue'

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
    MovieSelector,
    RemoveSession
  },
  methods: {
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
    },
    async removeSession (id) {
      try {
        await this.$store.dispatch('operations/removeSession', id)
        console.log(id)
        window.M.toast({ html: 'Session removed!' })
      } catch (error) {
        console.log(error)
      }
    }
  },

  computed: {
    selectedCinema (cinemaId) {
    //   const x = JSON.parse(JSON.stringify(Object.entries(this.sessions)))
    //   const y = Object.entries(this.sessions)
    //   const id = this.cinemaId
    //   console.log(x)
    //   console.log(y)

      // const resultX = x.filter((val, key) => val.Object.values(val.cinema) === id)
      // const resultY = y.filter((val) => val.cinema === id)
      // console.log(resultX)
      // console.log(resultY);

      // return resultX

      const sessionArr = JSON.parse(
        JSON.stringify(Object.values(this.sessions))
      )
      console.log(sessionArr)

      const id = this.cinemaId
      const result = sessionArr.filter((val) => val.cinema === id)
      console.log(result)
      return result

    // const sessionId = JSON.parse(JSON.stringify(Object.entries(this.sessions)));
    // console.log(sessionId);
    },

    ...mapGetters('operations', [
      'cinemaList',
      'movieList',
      'sessions',
      'seatsList'
    ])
  }
}
</script>

<style scoped>
</style>
