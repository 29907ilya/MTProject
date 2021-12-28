<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal-window">
    <div class="logo_info">
      <div class="logo-poster" :style="posterBg"></div>
      <span>{{ movie.Runtime }}</span>
      <span>{{ movie.imdbRating }}</span>
    </div>
    <div class="options">
      <div class="title">
        <span> {{ movie.Title }}, {{ movie.Year }} </span>
      </div>
      <div class="formalities">
        <div class="place_sessions">
          <movie-house></movie-house>
          <div class="sessions">Sessions</div>
        </div>
        <div class="seats_buy">
          <div class="seats">Seats</div>
          <button @click="tap">BUY</button>
        </div>
      </div>
    </div>

    <div class="discription">{{ movie.Plot }}</div>
  </div>
</template>

<script>
import MovieHouse from './MovieHouse.vue'
export default {
  emits: ['close'],
  props: {
    movie: Object,
    idx: String
  },
  methods: {
    tap () {
      window.M.toast({ html: 'You have bought your tickets!' })
    }
  },
  computed: {
    posterBg () {
      return {
        'background-image': `url(${this.movie.Poster})`
      }
    }
  },
  components: {
    MovieHouse
  }
}
</script>

<style>

.modal-window {
  position: fixed;
  top: 120px;
  width: 600px;
  padding: 1rem;
  background: rgb(179, 92, 92);
  z-index: 100;
  left: 56%;
  border-radius: 10px;
  transform: translateX(-50%);
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
  opacity: 0.99;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(58, 57, 57, 0.35);
  z-index: 10;
  opacity: 0.1;
}
.modal-window {
  display: flex;
  flex-wrap: wrap;
}
.logo_info {
  width: 200px;
  height: 270px;
}
.logo-poster {
  position: absolute;
  top: 20px;
  bottom: 10px;
  left: 20px;
  right: 10px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 180px;
  height: 250px;
}
.title {
  font-size: 24px;
}
</style>
