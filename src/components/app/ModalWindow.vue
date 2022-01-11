<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal-window">
    <div class="logo_info">
      <div class="logo-poster" :style="posterBg"></div>
      <div class="movie-info">
        <div>&#128357; {{ movie.Runtime }}</div>
        <div>&#10026; {{ movie.imdbRating }}</div>
      </div>
    </div>

    <div class="options">
      <div class="title">
        <p class="title">{{ movie.Title }}, {{ movie.Year }}</p>
      </div>

      <div class="formalities">
        <div class="place_sessions">

          <movie-house :cinemaList="cinemaName"></movie-house>
          <movie-sessions></movie-sessions>
        </div>
        <div class="seats_buy">
          <seats-plan></seats-plan>
        </div>
      </div>
      <div class="price">
        <div>Price: {{ price }}$</div>
        <div>Total: {{ price }}$</div>
      </div>
    </div>

    <div class="discription">{{ movie.Discription }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MovieHouse from './MovieHouse.vue'
import MovieSessions from './MovieSessions.vue'
import SeatsPlan from './SeatsPlan.vue'

export default {
  emits: ['close'],
  props: {
    movie: Object
  },
  data () {
    return {
      price: 5
    }
  },

  methods: {
    tap () {
      window.M.toast({ html: 'You have bought your tickets!' })
    }
  },
  computed: {
    ...mapGetters('operations', ['cinemaName']),
    posterBg () {
      return {
        'background-image': `url(${this.movie.Poster})`
      }
    }
  },
  components: {
    MovieHouse,
    MovieSessions,
    SeatsPlan
  }
}
</script>

<style>
.modal-window {
  position: fixed;
  top: 100px;
  width: 660px;
  padding: 1rem;
  background: #ff5353;
  z-index: 100;
  left: 56%;
  border-radius: 10px;
  transform: translateX(-50%);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  opacity: 0.99;
  display: flex;
  flex-wrap: wrap;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 10;
  opacity: 0.99;
}

.logo_info {
  width: 195px;
  height: 280px;
}
.logo-poster {
  position: absolute;
  top: 20px;
  bottom: 10px;
  left: 20px;
  right: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 170px;
  height: 230px;
  border-radius: 4px;
  box-shadow: 0 10px 12px rgba(0, 0, 0, 0.65), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.movie-info {
  margin: 252px 20px 20px 10px;
  font-size: 16px;
  font-weight: bold;
  width: 150px;
  display: flex;
  justify-content: space-between;
}
.options {
  width: 400px;
}
.title {
  font-size: 24px;
  margin: 0;
  text-shadow: 1px 1px 1px rgb(80, 80, 80), -1px 1px 1px rgb(224, 71, 71);
}
.formalities {
  display: flex;
  /* border: black 1px solid; */
}
.place_sessions {
  width: 220px;
  /* border: black 1px solid; */
}
.seats_buy {
  width: 220px;
  padding: 0;
}
.discription {
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.1;
}
.price {
  display: flex;
  width: auto;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: bold;
}
</style>
