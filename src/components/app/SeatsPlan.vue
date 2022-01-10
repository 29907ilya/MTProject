<template>
  <div class="seats-plan-block"><span class="seats">Choose seats:</span></div>
  <div>
    <ol>
      <li
        :class="{ checked: place.checked, disabled: place.disabled }"
        v-for="(place, index) in places"
        :key="place"
        @click="toggle(place)"
      >
        {{ index+1 }}
      </li>
    </ol>
  </div>
  <div class="movie-item-control">
    <a class="waves-effect waves-red btn-flat">Buy tickets</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      places: [
        { checked: false, disabled: false, price: 5 },
        { checked: false, disabled: false, price: 130 },
        { checked: false, disabled: true, price: 120 },
        { checked: false, disabled: false, price: 120 },
        { checked: false, disabled: true, price: 150 },
        { checked: false, disabled: true, price: 120 },
        { checked: false, disabled: false, price: 220 },
        { checked: false, disabled: false, price: 720 },
        { checked: false, disabled: false, price: 120 },
        { checked: false, disabled: true, price: 130 },
        { checked: false, disabled: true, price: 120 },
        { checked: false, disabled: false, price: 120 },
        { checked: false, disabled: true, price: 150 },
        { checked: false, disabled: true, price: 120 },
        { checked: false, disabled: false, price: 220 },
        { checked: false, disabled: false, price: 720 },
        { checked: false, disabled: true, price: 150 },
        { checked: false, disabled: true, price: 120 },
        { checked: false, disabled: false, price: 220 },
        { checked: false, disabled: false, price: 720 }
      ]
    }
  },
  computed: {
    cost () {
      let cost = 0
      this.places.map((place) => {
        if (place.checked && !place.disabled) {
          cost += place.price
        }
      })
      return cost
    }
  },
  methods: {
    toggle: function (place) {
      if (!place.disabled) {
        place.checked = !place.checked
      }
    }
  }
}
</script>

<style scoped>
.seats-plan-block {
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 15px;
}
ol {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  padding: 0% !important;
}
li {
  width: 20px;
  height: 20px;
  border: 1px solid black;
  margin: 3px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
li.checked {
  background: rgb(143, 0, 199);
  color: white;
}
li.disabled {
  cursor: default;
  opacity: 0.8;
  background: rgb(94, 94, 94);
}
.btn-flat {
  position: relative;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0);
  text-align: center;
  color: white;
  border: solid 1px;
  background-color: #b33431;
}
.btn-flat:hover {
  background-color: #e63c39;
}
</style>
