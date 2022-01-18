<template>
  <div class="cinemaName">
    <div>Choose cinema:</div>
    <select
      name="cinema"
      id="cinema"
      v-model="selectedOption"
      @change="onChange"
    >
      <option v-for="(cinema, id) in cinemaList" :key="id">
        {{ cinema.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    cinemaList: Object
  },
  data () {
    return {
      selectedOption: ''
    }
  },

  methods: {
    onChange () {
      this.$emit('onChange', { selectedOption: this.selectedOption })
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
  font-size: 16px;
  width: 100px;
  height: 100%;
  padding: 0%;
  border: 1px solid #ff5353;
  background-color: #ff5353;
  border-radius: 2px;
}
</style>>
