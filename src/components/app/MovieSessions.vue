<template>
  <div class="sessions">
    <span>Sessions</span>
    <form action="#">
      <label v-for="(session, i) in sessions" :key="i">
        <input name="group" type="radio" v-model="checkedSession" />
        <span>{{ session }}</span>
      </label>
    </form>

  </div>
</template>

<script>
export default {
  data () {
    return {
      sessions: ['16:00', '18:00', '20:00']

    }
  }
}
</script>

<style scoped>
.sessions {
  font-size: 16px;
}
label {
  display: block;
  width: 100px;
  color: black;
  background-color: #f78888;
  border: 1px solid #ff5353;
  border-radius: 20px;
  /* margin: 2px; */
}
[type="radio"]:checked + span:after {
  border: 2px solid #ef5350;
  background-color: #ef5350;
}

</style>
