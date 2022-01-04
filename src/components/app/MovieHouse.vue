<template>
  <div class="cinemaName">
    <div><span>Choose movie:</span></div>
    <select name="cinema" id="cinema" v-model="selectedCinema">
      <option v-for="(cinema, i) in cinemaList" :key="i">{{ cinema }}</option>
    </select>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    cinemaList: Object
  },
  // async mounted() {
  //   await this.getCinema();
  // },
  methods: {},
  computed: {},
  data () {
    return {
      selectedCinema: []
    }
  }
}
</script>

<style lang="scss" scoped>
.cinemaName {
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 15px;
}
select {
  display: inline;
  // background-color: #f78888;
  font-size: 16px;
  width: 100px;
  height: 100%;
  padding: 0%;
  border: 1px solid #ff5353;
  border-radius: 2px;
}
</style>>
