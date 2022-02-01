<template>
  <div>
    <div class="page-title">
      <h3>Profile</h3>
    </div>
    <section>
      <div class="row">
        <p>
          Nice to see you, <span class="profile">{{ userName.name }}</span>
        </p>
        <p>
          Your e-mail is: <span class="profile">{{ userName.email }}</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    userName () {
      return this.$store.getters.getUser
    }
  }
}
</script>
