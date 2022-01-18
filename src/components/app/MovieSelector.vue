<template>
  <select name="movie" id="movie" v-model="selectedOption" @change="onChange">
    <option v-for="(movie, id) in list" :key="id">
      {{ movie.Title }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    list: Object
  },

  data () {
    return {
      selectedOption: ''
    }
  },
  methods: {
    onChange () {
      this.$emit('onChange', {
        selectedOption: this.selectedOption
      })
    }
  }
}
</script>

<style scoped>
select {
  display: inline;
  background-color: #ff5353;
  font-size: 16px;
  width: 100px;
  height: 100%;
  padding: 0%;
  border: 1px solid #ff5353;
  border-radius: 2px;
}
</style>
