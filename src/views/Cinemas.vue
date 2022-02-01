<template>
  <div>
    <div class="page-title">
      <h3>Load cinema and movie</h3>
    </div>
    <section>
      <div class="row">
        <cinemas-page></cinemas-page>
      </div>
    </section>
  </div>
</template>

<script>
import CinemasPage from '../components/app/CinemasPage.vue'

export default {
  components: {
    CinemasPage
  }
}
</script>
