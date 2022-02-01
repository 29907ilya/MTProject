<template>
  <div class="movie-item mb-3">
    <div class="movie-item-poster" :style="posterBg"></div>
    <div class="movie-info-wrap">
      <div class="movie-item-info">
        <p class="movie-title">{{ movie.Title }}</p>
        <span class="movie-year"> {{ movie.Year }} </span>
      </div>
      <div class="movie-item-control">
        <a class="waves-effect waves-red btn-flat" @click="modal = true"
          >Buy tickets</a
        >
      </div>
    </div>
  </div>

  <teleport to="body">
    <modal-window
      :movie="movie"
      @close="modal = false"
      v-if="modal"
    ></modal-window>
  </teleport>
</template>

<script>
import { ref } from 'vue'
import ModalWindow from './ModalWindow.vue'

export default {
  setup () {
    const modal = ref(false)
    return { modal }
  },
  props: {
    movie: Object
  },
  computed: {
    posterBg () {
      return {
        'background-image': `url(${this.movie.Poster})`
      }
    }
  },
  components: {
    ModalWindow
  }
}
</script>

<style scoped>
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 300px;
}
.movie-item:hover {
  box-shadow: 0px 5px 20px rgb(0, 0, 0, 0.7);
  transform: scale(1.02);
}
.movie-item-poster {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
}
.movie-info-wrap {
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  opacity: 0;
  transition: all 0.3s ease;
}
.movie-item:hover .movie-info-wrap {
  opacity: 0.9;
  background-color: rgb(0, 0, 0, 0.7);
}
.movie-item-info {
  color: white;
  font-size: 18px;
}
.btn-flat {
  position: relative;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0);
  text-align: center;
  color: white;
  border: solid 1px;
}
.btn-flat:hover {
  background-color: #ef5350;
}
</style>
