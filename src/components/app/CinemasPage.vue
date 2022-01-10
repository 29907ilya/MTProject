<template>
  <div class="col s12 m6">
    <div>
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
  </div>

  <div class="col s12 m6">
    <remove-cinema @removeCinema="removeCinema"></remove-cinema>
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
