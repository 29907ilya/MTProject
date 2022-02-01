<template>
  <div>
    <div class="page-title">
      <h3>Sessions</h3>
    </div>
    <section>
      <div class="row">
        <sessions-page></sessions-page>
      </div>
    </section>
  </div>
</template>

<script>
import SessionsPage from '../components/app/SessionsPage.vue'
export default {
  components: {
    SessionsPage
  }
}
</script>
