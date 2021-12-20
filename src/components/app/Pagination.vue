<template>
  <ui-pagination
  v-model="page"
  :total="total"
  position="center"
></ui-pagination>
</template>

<script>
export default {
  data () {
    return {
      page: 1,
      total: 100
    }
  }
}
</script>
