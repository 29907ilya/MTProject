<template>
  <div>
    <div class="page-subtitle">
      <h4>Remove cinema</h4>
    </div>

    <div class="input-field">
      <div class="input-list" v-for="(cinema, id) in cinemaName" :key="id">
        {{ cinema.name }}

        <button
          class="btn waves-effect waves-light"
          type="submit"
          @click="$emit('removeCinema', id)"
        >
          Remove
          <i class="material-icons right">send</i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('operations', ['cinemaName'])
  }
}
</script>
