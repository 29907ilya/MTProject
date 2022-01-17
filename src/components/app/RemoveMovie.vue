<template>
  <div>
    <div class="page-subtitle">
      <h5>Existing movies</h5>
    </div>

    <div class="input-field">
      <div class="input-list" v-for="(movie, id) in list" :key="id">
        <div class="input-title"> {{ movie.Title }}</div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
          @click="$emit('removeMovie', id)"
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
