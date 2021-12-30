<template>
  <nav class="navbar red accent-2">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <!-- <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons black-text">dehaze</i>
        </a> -->
        <span class="black-text">{{ date }}</span>
      </div>

      <div class="search_field">
        <div>
          <input type="text" placeholder="Search" v-model="input">
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
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      date: new Date(),
      interval: null,
      searchValue: ''
    }
  },
  computed: {
    userName () {
      // try {
      return this.$store.getters.userName.name
      // } catch (e) {
      //   console.log(e.message)
      // }
    },
    input: {
      get () {
        return this.searchValue
      },
      set (val) {
        if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.searchValue = val
        }, 700)
      }
    }
  },
  watch: {
    searchValue: 'onSearchValueChanged'
  },
  methods: {
    ...mapActions('movies', ['searchMovies', 'getMovieBase']),
    async logout () {
      await this.$store.dispatch('logout')
      window.M.toast({ html: 'You are logged out!' })
      this.$router.push('/login?message=logout')
    },
    onSearchValueChanged (value) {
      console.log(value)
      if (value) {
        this.searchMovies(value)
      } else this.getMovieBase()
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
          minute: 'numeric'
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
