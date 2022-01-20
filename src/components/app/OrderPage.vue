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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  emits: ['close'],
  props: {
    movie: Object,
    sessionToRender: Object
  },
  data () {
    return {
      info: this.sessionToRender
    }
  },
  watch: {
    showSeats (seats) {
      console.log(seats.checked)
    }
  },
  methods: {
    buyTickets (seat) {
      let boughtSeat = seat.checked
      if (seat.checked) {
        boughtSeat = seat.disabled
      }
      console.log(boughtSeat)
    },

    closeModal () {
      if (confirm('Close window?')) {
        this.$emit('close')
      }
    },

    toggle (seat) {
      if (!seat.disabled) {
        seat.checked = !seat.checked
      }
    }
  },
  computed: {
    ...mapGetters('operations', ['seatsToRender']),
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
        'background-image': `url(${this.movie.Poster})`
      }
    }
  }
}
</script>
<style scoped>
.modal-window {
  position: fixed;
  top: 70px;
  width: 800px;
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
  /* background-image: url('src/assets/seat.png'); */
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
</style>
