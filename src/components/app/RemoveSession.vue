<template>
  <div>
    <div class="input-field">
      <div class="input-list" v-for="(item, id) in list" :key="id">
        <div class="input-title"> {{ item.date }}, {{ item.time }} <br>
        {{ item.cinema }}, {{ item.movie }} <hr></div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
          @click="$emit('removeSession', id)"
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
