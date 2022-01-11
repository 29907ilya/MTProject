<template>
  <div class="col xl8">
    <div class="page-info">
      <div class="page-subtitle">
        <h4>Add cinema</h4>
      </div>

      <h6>Enter cinema name</h6>
      <div class="input-field">
        <input id="text" type="text" v-model="name" />
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
        @click.prevent="addCinema"
      >
        Add Cinema
        <i class="material-icons right">send</i>
      </button>
    </div>

    <div class="col xl4">
      <remove-cinema @removeCinema="removeCinema"></remove-cinema>
    </div>
  </div>

  <div class="col xl8">
    <div>
      <div class="page-subtitle">
        <h4>Add movie</h4>
      </div>

      <h6>Enter movie formalities</h6>
      <div class="input-field">
        <label for="title">Title</label>
        <input id="title" type="text" v-model="title" />
      </div>
      <div class="input-field">
        <label for="year">Year</label>
        <input id="year" type="text" v-model="year" />
      </div>
      <div class="input-field">
        <label for="duration">Duration</label>
        <input id="duration" type="text" v-model="duration" />
      </div>
      <div class="input-field">
        <label for="raiting">Raiting</label>
        <input id="raiting" type="text" v-model="raiting" />
      </div>
      <div class="input-field">
        <label for="discription">Discription</label>
        <input id="discription" type="text" v-model="discription" />
      </div>
      <div class="input-field">
        <label for="poster">Poster</label>
        <input id="poster" type="text" v-model="poster" />
      </div>

      <button
        class="btn waves-effect waves-light"
        type="submit"
        @click="addMovie"
      >
        Add Movie
        <i class="material-icons right">send</i>
      </button>
    </div>

    <div class="col xl4">
      <remove-cinema @removeCinema="removeCinema"></remove-cinema>
    </div>
  </div>
</template>

<script>
import RemoveCinema from './RemoveCinema.vue'

export default {
  data () {
    return {
      name: '',
      id: ''
    }
  },

  methods: {
    async addCinema () {
      const cinemaInfo = {
        name: this.name
      }

      try {
        await this.$store.dispatch('operations/createCinema', cinemaInfo)
        window.M.toast({ html: 'Cinema added!' })
        this.name = ''
        console.log(cinemaInfo)
      } catch (error) {
        console.log(error)
      }
    },

    async removeCinema (id) {
      try {
        await this.$store.dispatch('operations/removeCinema', id)
        window.M.toast({ html: 'Cinema removed!' })
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    RemoveCinema
  }
}
</script>

<style scoped>
</style>
