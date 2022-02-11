<template>
  <div class="col xl8">
    <div class="page-info">
      <div class="page-subtitle">
        <h5>Add cinema</h5>
      </div>

      <h6>Enter cinema title</h6>
      <div class="input-field">
        <label for="title">Title</label>
        <input id="title" type="text" v-model="name" />
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
      <remove-cinema
        :list="cinemaList"
        @removeCinema="removeCinema"
      ></remove-cinema>
    </div>
  </div>

  <div class="col xl8">
    <div>
      <div class="page-subtitle">
        <h5>Add movie</h5>
      </div>

      <h6>Enter movie info</h6>
      <div class="input-field">
        <label for="title">Title</label>
        <input id="title" type="text" v-model="title" />
      </div>
      <div class="input-field">
        <label for="year">Year</label>
        <input id="year" type="text" v-model="year" />
      </div>
      <div class="input-field">
        <label for="runtime">Runtime</label>
        <input id="runtime" type="text" v-model="runtime" />
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
        <label for="poster">Poster</label> <br /><br />
        <a class="waves-effect waves-light btn" @click="onPickFile"
          ><i class="material-icons right">cloud</i>Choose file</a
        >
        <input
          type="file"
          style="display: none"
          ref="fileInput"
          accept="image/*"
          @change="onFilePicked"
        />
      </div>
      <div class="input-field">
        <label for="poster">ID</label>
        <input id="poster" type="text" v-model="id" />
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
      <remove-movie :list="movieList" @removeMovie="removeMovie"></remove-movie>
    </div>
  </div>
</template>

<script>
import RemoveCinema from './RemoveCinema.vue'
import RemoveMovie from './RemoveMovie.vue'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      name: '',
      title: '',
      year: '',
      runtime: '',
      raiting: '',
      discription: '',
      image: null,
      Poster: '',
      id: ''
    }
  },

  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      const filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.Poster = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    async addCinema () {
      const cinemaInfo = {
        name: this.name
      }
      try {
        await this.$store.dispatch('operations/createCinema', cinemaInfo)
        window.M.toast({ html: `Cinema "${cinemaInfo.name}" added!` })
        this.name = ''
        console.log(cinemaInfo)
      } catch (error) {
        console.log(error)
      }
    },

    async removeCinema (id) {
      try {
        await this.$store.dispatch('operations/removeCinema', id)
        console.log(id)
        window.M.toast({ html: 'Cinema removed!' })
      } catch (error) {
        console.log(error)
      }
    },

    async removeMovie (id) {
      try {
        await this.$store.dispatch('operations/removeMovie', id)
        window.M.toast({ html: 'Movie removed!' })
      } catch (error) {
        console.log(error)
      }
    },

    async addMovie () {
      const movieInfo = {
        title: this.title,
        year: this.year,
        runtime: this.runtime,
        raiting: this.raiting,
        discription: this.discription,
        image: this.image,
        id: this.id
      }

      try {
        if (!this.image) {
          return alert('No image choosed')
        }
        await this.$store.dispatch('operations/createMovie', movieInfo)
        window.M.toast({ html: `Movie "${movieInfo.title}" added` })
        // this.title = "";
        // this.year = "";
        // this.runtime = "";
        // this.raiting = "";
        // this.discription = "";
        // this.image = "";
        // this.id = "";
        console.log(movieInfo)
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: {
    RemoveCinema,
    RemoveMovie
  },
  computed: {
    ...mapGetters('operations', ['cinemaList', 'movieList'])
  }
}
</script>

<style scoped>
</style>
