<template>
  <div class="modal-backdrop" @click="closeModal"></div>
  <div class="modal-window">
    <div class="logo_info">
      <div class="logo-poster" :style="posterBg"></div>
    </div>
    <div class="movie-info">
      <div>&#128357; {{ movie.Runtime }}</div>
      <div>&#10026; {{ movie.imdbRating }}</div>
    </div>
    <div class="title_discription">
      <div class="title">
        <p class="title">{{ movie.Title }}, {{ movie.Year }}</p>
      </div>
      <div class="discription">{{ movie.Discription }}</div>
    </div>

    <div class="options">
      <div
        class="sessions"
        v-for="(item, key) in sortedSession"
        :key="key"
        @click="showKey(key)"
      >
        <a href="#" @click="order = true">
          <div class="session-item">
            <p>{{ item.cinema }}<br /></p>
            <span>{{ item.time }}<br /></span>
            {{ item.date }}<br />
          </div>
        </a>
      </div>
      <teleport to="body">
        <order-page
          :movie="movie"
          :sessionToRender="sessionToRender"
          @close="order = false"
          v-if="order"
        ></order-page>
      </teleport>
    </div>

    <a href="#" @click="closeModal">
      <div class="close-btn">x</div>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ref } from 'vue'
import OrderPage from './OrderPage.vue'

export default {
  emits: ['close'],
  props: {
    movie: Object
  },
  setup () {
    const order = ref(false)
    return { order }
  },

  methods: {
    closeModal () {
      if (confirm('Close window?')) {
        this.$emit('close')
      }
    },
    async showKey (key) {
      const sessionID = {
        sessionID: key
      }
      try {
        await this.$store.dispatch('operations/sessionToRender', sessionID)
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  computed: {
    ...mapGetters('operations', ['cinemaList', 'sessions', 'sessionToRender']),
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
    }
  },
  components: {
    OrderPage
  }
}
</script>

<style>
.modal-window {
  position: fixed;
  top: 70px;
  width: 800px;
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
.options {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.sessions {
  width: 150px;
  padding: 5px;
  cursor: pointer;
  text-shadow: 1px 1px 1px rgb(49, 49, 180);
}
.session-item {
  margin: 2px;
  background: #ff5353;
  border: rgb(59, 59, 59) 2px solid;
  border-radius: 5px;
  display: block;
  text-align: center;
  color: black;
  box-shadow: 0 4px 8px rgba(0, 75, 161, 0.25), 0 5px 5px rgba(0, 4, 253, 0.22);
}
.session-item:hover {
  transform: scale(1.05);
  transition: all 0.3s ease;
  background: #fd4444;
}
.session-item span {
  font-weight: 500;
  font-size: 17px;
}
.session-item p {
  font-weight: 500;
  font-size: 19px;
  margin: 3px;
}
.seats {
  width: 30%;
  float: right;
  padding: 5px;
}
.title {
  font-size: 24px;
  margin: 0;
  text-shadow: 1px 1px 1px rgb(80, 80, 80), -1px 1px 1px rgb(224, 71, 71);
}
.discription {
  margin-top: 10px;
  font-size: 18px;
  line-height: 1.1;
}
</style>
