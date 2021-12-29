<template>
  <nav class="navbar red accent-2">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <!-- <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a> -->
        <span class="black-text">{{ date }}</span>
      </div>

      <div class="add">
        <!-- <div>
          <input type="text" placeholder="Search">
        </div> -->
        <div>
          <h3>Search</h3>
        </div>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Profile
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Log out
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      date: new Date(),
      interval: null
    }
  },
  computed: {
    userName () {
      return this.$store.getters.userName.name
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      window.M.toast({ html: 'You are logged out!' })
      this.$router.push('/login?message=logout')
    }
  },
  mounted () {
    this.interval = setInterval(
      () =>
        (this.date = new Date().toLocaleDateString('en', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        })),
      0
    )

    window.M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
      coverTrigger: false
    })
  },
  beforeUnmount () {
    clearInterval(this.interval)
    console.log('done')
  }
}
</script>

<style scoped>
</style>
