<template>
  <div class="modal-backdrop" @click="closeModal"></div>
  <div class="modal-window">
    <div class="logo_info">
      <div class="logo-poster" :style="posterBg"></div>
      <div class="movie-info">
        <div>&#128357; {{ movie.Runtime }}</div>
        <div>&#10026; {{ movie.imdbRating }}</div>
        <!-- <div> {{ item.cinema }}</div> -->

      </div>
    </div>

  </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import MovieHouse from './MovieHouse.vue'
// import MovieSessions from './MovieSessions.vue'
// import SeatsPlan from './SeatsPlan.vue'

export default {
  emits: ['close'],
  props: {
    movie: Object
    // item: Array
  },

  methods: {
    closeModal () {
      if (confirm('Close window?')) {
        this.$emit('close')
      }
    }
  },
  computed: {
  //   ...mapGetters("operations", ["cinemaList", "sessions"]),
    posterBg () {
      return {
        'background-image': `url(${this.movie.Poster})`
      }
    }
  //   sortedSession() {
  //     const title = this.movie.Title;
  //     const sessionList = this.sessions;
  //     const result = {};
  //     for (const i in sessionList) {
  //       const item = sessionList[i];
  //       if (item.movie === title) {
  //         result[i] = item;
  //       }
  //     }
  //     return result;
  //   },
  }

}
</script>
