<template>
  <teleport to="body">
    <modal-window
      @close="modal = false"
      v-if="modal"
    ></modal-window>
  </teleport>

  <div class="col" v-if="this.list.length > 0">
    <div class="movie-container" v-for="(movie, key) in list" :key="key">
      <movie-item :movie="movie" @click="modal=true"></movie-item>
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
  }
}
</script>
<style scoped>
</style>
