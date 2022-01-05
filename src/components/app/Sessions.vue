<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Add session</h4>
      </div>

      <form>
        <div class="input-field">
          <h6>Choose movie:</h6>
          <movie-selector
            @onChange="showMovie"
            :list="fullBase"
          ></movie-selector>
        </div>
        <div class="input-field">
          <movie-house
            @onChange="showCinema"
            :cinemaList="cinemaName"
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
      </form>
    </div>
  </div>

  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Remove</h4>
      </div>

      <form>
        <div class="input-field">
          <ul>
            <li>
              Sessions list with button "Delete"
              <button>delete</button>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MovieHouse from './MovieHouse.vue'
import MovieSelector from './MovieSelector.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      movie: '',
      date: '',
      time: '',
      cinema: ''
    }
  },
  components: {
    MovieHouse,
    MovieSelector
  },
  methods: {
    showCinema (value) {
      this.cinema = value.selectedOption
    },
    showMovie (value) {
      this.movie = value.selectedOption
    },
    async addSession () {
      const sessionInfo = {
        movie: this.movie,
        date: this.date,
        time: this.time,
        cinema: this.cinema
      }

      try {
        await this.$store.dispatch('createSession', sessionInfo)
        window.M.toast({ html: 'Session created!' })
        console.log(sessionInfo)
      } catch (error) {
        console.log('nothing here')
      }
    }
  },
  computed: {
    ...mapGetters('operations', ['cinemaName']),
    ...mapGetters('movies', ['fullBase'])
    // ...mapActions({createSession: 'operations/createSession'})
  }
}
</script>

<style scoped>
</style>
