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
    <div class="title_discription">
      <div class="title">
        <p class="title">{{ movie.Title }}, {{ movie.Year }}</p>
      </div>
      <div class="discription">{{ movie.Discription }}</div>
    </div>

    <div class="options">
      <div class="sessions" v-for="item in sortedSession" :key="item">
        <div class="session-item">
          {{ item.cinema }} <br>
          {{ item.date }} <br>
          {{ item.time }} <br>

        </div>
      </div>
      <div class="seats">
        <!-- {{ item.seats }} -->
      </div>
    </div>
    <!-- <div class="options">
      <div class="title">
        <p class="title">{{ movie.Title }}, {{ movie.Year }}</p>
      </div>

      <div class="formalities">
        <div class="place_sessions">

          <movie-house :cinemaList="cinemaList"></movie-house>
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
    </div> -->

    <!-- <div class="discription">{{ movie.Discription }}</div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import MovieHouse from './MovieHouse.vue'
// import MovieSessions from './MovieSessions.vue'
// import SeatsPlan from './SeatsPlan.vue'

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
    ...mapGetters('operations', ['cinemaList', 'sessions']),
    posterBg () {
      return {
        'background-image': `url(${this.movie.Poster})`
      }
    },
    sortedSession () {
      const title = this.movie.Title
      const sessionList = this.sessions
      const result = {}
      for (const i in sessionList) {
        const item = sessionList[i]
        if (item.movie === title) {
          result[i] = item
        }
      }
      return result

      // const sortedSession = []
      // for (let key in sessionList) {
      //   sortedSession.push(Array([key], sessionList[key]) );
      // }
      // console.log(sortedSession);

      // const sessionToRender = sortedSession.filter(value => value.movie == title)
      // console.log(sessionToRender);
    }
  },
  components: {
    // MovieHouse,
    // MovieSessions,
    // SeatsPlan
  }
}
</script>

<style>
.modal-window {
  position: fixed;
  top: 100px;
  width: 900px;
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
  width: 25%px;
  float: left;
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
  margin: 252px 30px 20px 10px;
  font-size: 16px;
  font-weight: bold;
  width: 150px;
  display: flex;
  justify-content: space-between;
}
.title_discription {
  width: 75%;
  float: right;
}

.sessions {
  width: 70%;
  float: left;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
}
.session-item {
  width: 100px;
  border: black 2px solid;
  border-radius: 5px;

}
.session-item button {
color: black;
}

.seats {
  width: 30%;
  float: right;
  padding: 5px;
}

/* .options {
  width: 400px;
} */
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
  font-size: 18px;
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
