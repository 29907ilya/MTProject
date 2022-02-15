<template>
  <div class="movie-page">
    <div class="movie-page_container">
      <div class="movie-poster" :style="posterBg"></div>
      <div class="movie-info">
        <div class="movie-title">
          <p class="title">{{ movieItem.Title }}, {{ movieItem.Year }}</p>
        </div>
        <div class="movie-options">
          <div>Runtime &#128357; {{ movieItem.Runtime }}</div>
          <div>imdbRating &#10026; {{ movieItem.imdbRating }}</div>
        </div>
        <div class="movie-discription">{{ movieItem.Discription }}</div>
      </div>
    </div>
  <hr />
    <div class="movie-page_sessions">
      Availible sessions:
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
          :movieItem="movieItem"
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
  data () {
    return {
      id: this.$route.params.id
    }
  },

  emits: ['close'],
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
    posterBg () {
      return {
        'background-image': `url(${this.movieItem.Poster})`
      }
    },
    movieItem () {
      const result = Array.from(this.moviesToRender)
      console.log(result)
      return this.moviesToRender.find((e) => e.Id === this.id)
    },
    ...mapGetters('movies', ['moviesToRender']),
    ...mapGetters('operations', ['cinemaList', 'sessions', 'sessionToRender']),

    sortedSession () {
      const title = this.movieItem.Title
      console.log(title)
      const sessionList = this.sessions
      console.log(sessionList)

      const result = {}
      for (const i in sessionList) {
        const item = sessionList[i]
        if (item.movie === title) {
          result[i] = item
        }
      }
      console.log(result)

      return result
    }
  },
  components: {
    OrderPage
  }
}
</script>

<style scoped>
.movie-page {
  margin: 20px 100px;
}
.movie-page_container {
  margin-bottom: 30px;
  display: flex;
}
.movie-poster {
  /* background-image: url(https://vypechka-online.ru/wp-content/uploads/2019/09/EQgJ4p77Aeo.jpg); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  box-shadow: 0 10px 12px rgba(0, 0, 0, 0.65), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 16%;
  min-width: 170px;
  height: 250px;
}
.movie-info {
  width: 84%;
  padding-left: 20px;
}
.movie-options {
  margin: 10px 0;
  font-weight: bold;
  width: 40%;
  display: flex;
  justify-content: space-between;
}
.movie-discription {
  font-size: 18px;
  line-height: 1.4;
}
p {
  font-size: 26px;
  margin: 0;
  text-shadow: 1px 1px 1px rgb(80, 80, 80), -1px 1px 1px rgb(224, 71, 71);
}
.movie-page_sessions {
  font-size: 16px;
  font-weight: bold;
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
  background: #ff7272;
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

</style>
