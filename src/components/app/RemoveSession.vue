<template>
  <div>
    <div class="input-field">
      <div class="input-list" v-for="(item, id) in list" :key="id">
        <div class="input-title">{{ item.movie }}</div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
          @click="$emit('removeSession', id)"
        >
          Remove
          <i class="material-icons right">send</i>
        </button>
      </div>

      <button @click="showCinema">click</button>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Object,
    cinemaId: String
  },
  data () {
    return {
      sessions: this.list
    }
  },
  methods: {
  }
}
</script>
