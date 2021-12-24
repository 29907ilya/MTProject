<template>
  <teleport to="body">
    <modal @close="modal = false" v-if="modal"></modal>
  </teleport>

  <div class="col" v-if="this.list.length > 0">
    <div class="movie-container" v-for="(movie, key) in list" :key="key">
      <movie-item :movie="movie"></movie-item>
    </div>
  </div>

</template>

<script>
import MovieItem from './MovieItem.vue'
import Modal from './Modal.vue'
// import { ref } from "vue";

export default {
  data () {
    return {
      modal: false
    }
  },
  // setup() {
  //   const modal = ref(false);
  //   return { modal };
  // },
  props: {
    list: Array
  },
  components: {
    MovieItem,
    Modal
  }
}
</script>
<style scoped>
</style>
