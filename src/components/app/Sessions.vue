<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Add session</h4>
      </div>

      <form>
        <div class="input-field">
          <movie-house></movie-house>
        </div>

        <div class="input-field">
          <input id="limit" type="time" />
          <label for="limit">Time</label>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Add
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>

  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Remove</h4>
      </div>

      <form>
        <div class="input-field">
          <ul>
            <li>Sessions list with button "Delete"
              <button>delete</button>
            </li>

          </ul>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import MovieHouse from './MovieHouse.vue'

export default {
  setup () {},
  components: {
    MovieHouse
  }
}
</script>

<style scoped>
</style>
