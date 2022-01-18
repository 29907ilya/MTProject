<template>
  <div>
    <div class="page-subtitle">
      <h5>Existing cinemas</h5>
    </div>

    <div class="input-field">
      <div class="input-list" v-for="(cinema, id) in list" :key="id">
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

export default {
  props: {
    list: Object
  }
}
</script>
