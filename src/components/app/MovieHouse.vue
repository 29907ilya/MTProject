<template>
  <div class="movieHouse">
    <p>Choose movie house:</p>
    <select name="movieHouse" id="movieHouse" v-model="selected">
      <option v-for="(item) in placeName" :key="item">{{ item }}</option>
    </select>
  </div>

</template>

<script>
export default {
  data () {
    return {
      placeName: [
        'PoleStar',
        'Arteon',
        'TheHarbor'
      ]
    }
  }
}
</script>

<style>
</style>
