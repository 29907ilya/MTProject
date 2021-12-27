<template>
  <teleport to="body">
    <div v-for="movie in list" :key="movie">
      <modal-window
        :movie="movie"
        @close="modal = false"
        v-if="modal"
      ></modal-window>
    </div>
  </teleport>

  <div class="col" v-if="this.list.length > 0">
    <div class="movie-container" v-for="movie in list" :key="movie">
      <movie-item :movie="movie" @click="modal = true"> </movie-item>
    </div>
  </div>
</template>

<script>
import MovieItem from './MovieItem.vue'
import { ref } from 'vue'
import ModalWindow from './ModalWindow.vue'

export default {
  setup () {
    const modal = ref(false)
    return { modal }
  },
  props: {
    list: Array
  },
  components: {
    MovieItem,
    ModalWindow
  },
  methods: {}
}
</script>
<style scoped>
</style>
