<template>
  <ui-pagination
    v-model="currentPageModel"
    :page-size="moviesPerPage"
    :total="total"
    @update:modelValue="currentPageModel = $event"
    position="center"
  ></ui-pagination>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    moviesPerPage: {
      type: Number,
      default: 1
    }
  },
  computed: {
    currentPageModel: {
      get () {
        return this.currentPage
      },
      set (value) {
        this.$emit('pageChanged', value)
      }
    }
  }
}
</script>
<style scoped>
</style>
