<template>
  <div class="col xl8">
    <div class="page-info">
      <form @submit.prevent="onSubmit">
        <div class="page-subtitle">
          <h5>Add cinema</h5>
        </div>

        <h6>Enter cinema title</h6>
        <div class="input-field">
          <label for="name">Title</label>
          <input id="name" type="text" v-model="name" @blur="nBlur" />
          <small class="helper-text invalid" v-if="nError">{{ nError }}</small>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
          @click.prevent="addCinema"
        >
          Add Cinema
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>

    <div class="col xl4">
      <remove-cinema
        :list="cinemaList"
        @removeCinema="removeCinema"
      ></remove-cinema>
    </div>
  </div>

  <form @submit.prevent="onSubmit">
    <div class="col xl8">
      <div>
        <div class="page-subtitle">
          <h5>Add movie</h5>
        </div>

        <h6>Enter movie info</h6>
        <div class="input-field">
          <label for="title">Title</label>
          <input id="title" type="text" v-model="title" @blur="tBlur" />
          <small class="helper-text invalid" v-if="tError">{{ tError }}</small>
        </div>
        <div class="input-field">
          <label for="year">Year</label>
          <input id="year" type="text" v-model="year" @blur="yBlur" />
          <small class="helper-text invalid" v-if="yError">{{ yError }}</small>
        </div>
        <div class="input-field">
          <label for="runtime">Runtime</label>
          <input id="runtime" type="text" v-model="runtime" @blur="rtBlur" />
          <small class="helper-text invalid" v-if="rtError">{{
            rtError
          }}</small>
        </div>
        <div class="input-field">
          <label for="raiting">Raiting</label>
          <input id="raiting" type="text" v-model="raiting" @blur="rBlur" />
          <small class="helper-text invalid" v-if="rError">{{ rError }}</small>
        </div>
        <div class="input-field">
          <label for="discription">Discription</label>
          <input
            id="discription"
            type="text"
            v-model="discription"
            @blur="dBlur"
          />
          <small class="helper-text invalid" v-if="dError">{{ dError }}</small>
        </div>
        <div class="input-field">
          <label for="id">ID</label>
          <input id="id" type="text" v-model="id" @blur="iBlur" />
          <small class="helper-text invalid" v-if="iError">{{ iError }}</small>
        </div>

        <h6>Load poster</h6>
        <div class="input-field">
          <!-- <label for="poster">Poster</label> <br /><br /> -->
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
        <br />
        <br />

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
        <remove-movie
          :list="movieList"
          @removeMovie="removeMovie"
        ></remove-movie>
      </div>
    </div>
  </form>
</template>

<script>
import RemoveCinema from './RemoveCinema.vue'
import RemoveMovie from './RemoveMovie.vue'
import { mapGetters } from 'vuex'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'

export default {
  // data() {
  //   return {
  //     name: "",
  //     title: "",
  //     year: "",
  //     runtime: "",
  //     raiting: "",
  //     discription: "",
  //     image: null,
  //     id: "",
  //   };
  // },

  setup () {
    const { handleSubmit } = useForm()
    const MIN_LENGTH = 1

    const {
      value: name,
      errorMessage: nError,
      handleBlur: nBlur
    } = useField(
      'name',
      yup
        .string()
        .trim()
        .required('This is a required field')
        .min(MIN_LENGTH, `Please enter at least ${MIN_LENGTH} sumbol`)
    )
    const {
      value: title,
      errorMessage: tError,
      handleBlur: tBlur
    } = useField(
      'title',
      yup
        .string()
        .trim()
        .required('This is a required field')
        .min(MIN_LENGTH, `Please enter at least ${MIN_LENGTH} sumbol`)
    )
    const {
      value: year,
      errorMessage: yError,
      handleBlur: yBlur
    } = useField(
      'year',
      yup
        .string()
        .trim()
        .required('This is a required field')
        .min(MIN_LENGTH, `Please enter at least ${MIN_LENGTH} sumbol`)
    )
    const {
      value: runtime,
      errorMessage: rtError,
      handleBlur: rtBlur
    } = useField(
      'runtime',
      yup
        .string()
        .trim()
        .required('This is a required field')
        .min(MIN_LENGTH, `Please enter at least ${MIN_LENGTH} sumbol`)
    )
    const {
      value: raiting,
      errorMessage: rError,
      handleBlur: rBlur
    } = useField(
      'raiting',
      yup
        .string()
        .trim()
        .required('This is a required field')
        .min(MIN_LENGTH, `Please enter at least ${MIN_LENGTH} sumbol`)
    )
    const {
      value: discription,
      errorMessage: dError,
      handleBlur: dBlur
    } = useField(
      'discription',
      yup
        .string()
        .trim()
        .required('This is a required field')
        .min(MIN_LENGTH, `Please enter at least ${MIN_LENGTH} sumbol`)
    )
    const {
      value: id,
      errorMessage: iError,
      handleBlur: iBlur
    } = useField(
      'id',
      yup
        .string()
        .trim()
        .required('This is a required field')
        .min(MIN_LENGTH, `Please enter at least ${MIN_LENGTH} sumbol`)
    )

    const onSubmit = handleSubmit()

    return {
      name,
      title,
      year,
      runtime,
      raiting,
      discription,
      id,
      nError,
      tError,
      yError,
      rtError,
      rError,
      dError,
      iError,
      nBlur,
      tBlur,
      yBlur,
      rtBlur,
      rBlur,
      dBlur,
      iBlur,
      onSubmit

      // name: "",
      // title: "",
      // year: "",
      // runtime: "",
      // raiting: "",
      // discription: "",
      // image: null,
      // id: "",
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
        if (!this.name) {
          return
        }
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
        this.title = ''
        this.year = ''
        this.runtime = ''
        this.raiting = ''
        this.discription = ''
        this.image = ''
        this.id = ''
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
