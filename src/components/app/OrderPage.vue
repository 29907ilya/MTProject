<template>
  <div class="modal-backdrop" @click="closeModal"></div>
  <div class="modal-window">
    <div class="logo_info">
      <div class="logo-poster" :style="posterBg"></div>
    </div>
    <div class="movie-info">
      <div>&#128357; {{ movieItem.Runtime }}</div>
      <div>&#10026; {{ movieItem.imdbRating }}</div>
    </div>
    <div class="title_discription">
      <div class="title">
        <p class="title">{{ movieItem.Title }}, {{ movieItem.Year }}</p>
      </div>

      <div class="session-glodal">
        <div class="session-info">
          <div>Cinema: {{ sessionToRender.cinema }}</div>
          <hr />
          <div>Date: {{ sessionToRender.date }}</div>
          <hr />
          <div>Time: {{ sessionToRender.time }}</div>
          <hr />
        </div>

        <div class="seats-info">
          Seats plan
          <ol>
            <li
              :class="{ checked: item.checked, disabled: item.disabled }"
              v-for="(item, id) in seatsToRender"
              :key="id"
              @click="toggle(item)"
            >
              {{ id + 1 }}
            </li>
          </ol>
          <hr />
          <div class="price-items">
            <div>Price for one ticket: {{ price }}$</div>
            <div>Total price: {{ cost }}$</div>
            <hr />
          </div>
          <a class="waves-effect waves-red btn-flat" @click="buyTickets"
            >Buy tickets</a
          >
        </div>
      </div>
    </div>
    <a href="#" @click="closeModalButton">
      <div class="close-btn">x</div>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDatabase, ref, update } from 'firebase/database'

export default {
  emits: ['close'],
  props: {
    movieItem: Object,
    sessionToRender: Object
  },

  methods: {
    async buyTickets (seatsToRender, currentSessionId) {
      this.seatsToRender.map(function (key) {
        if (key.checked) {
          key.disabled = true
        }
      })
      const id = this.currentSessionId
      const db = getDatabase()
      await update(ref(db, `Sessions/${id}`), {
        seats: this.seatsToRender
      })
      window.M.toast({ html: 'You have bought tickets!' })
    },

    closeModal () {
      if (confirm('Close window?')) {
        this.$emit('close')
      }
    },
    closeModalButton () {
      this.$emit('close')
    },

    toggle (seat) {
      if (!seat.disabled) {
        seat.checked = !seat.checked
      }
    }
  },
  computed: {
    ...mapGetters('operations', ['seatsToRender', 'currentSessionId']),
    price () {
      let price = ''
      Object.values(this.seatsToRender).map((seat) => (price = seat.price))
      return price
    },
    cost () {
      let cost = 0
      Object.values(this.seatsToRender).map((seat) => {
        if (seat.checked && !seat.disabled) {
          cost += seat.price
        }
      })
      return cost
    },
    posterBg () {
      return {
        'background-image': `url(${this.movieItem.Poster})`
      }
    }
  }
}
</script>
<style scoped>
.modal-window {
  position: fixed;
  top: 70px;
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
.session-glodal {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}
.session-info {
  width: 40%;
  float: right;
  display: block;
  font-size: 20px;
  padding-right: 10px;
}
.seats-info {
  font-size: 20px;
  text-align: center;
  width: 60%;
  float: left;
  padding-left: 30px;
  padding-right: 30px;
}
hr {
  border: 1px solid rgb(71, 65, 65);
  width: 100%;
}
ol {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  padding: 0% !important;
}
li {
  width: 35px;
  height: 35px;
  border: 1px solid black;
  border-radius: 3px;
  margin: 3px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
li.checked {
  background: #009688;
  color: white;
}
li.disabled {
  cursor: default;
  opacity: 0.8;
  background: rgb(94, 94, 94);
}
.price-items {
  font-weight: 700;
  text-align: right;
}
.price-items div {
  padding: 10px;
}
.btn-flat {
  position: relative;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0);
  text-align: center;
  color: white;
  border: solid 1px;
  margin-bottom: 25px;
  margin-top: 20px;
  padding: 5px;
  height: auto;
}
.btn-flat:hover {
  background-color: #b10000;
}
.title {
  font-size: 24px;
  margin: 0;
  text-shadow: 1px 1px 1px rgb(80, 80, 80), -1px 1px 1px rgb(224, 71, 71);
}
.close-btn {
  position: fixed;
  right: 5px;
  left: 871px;
}
</style>
