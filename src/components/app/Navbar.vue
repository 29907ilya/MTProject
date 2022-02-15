<template>
  <nav class="navbar red accent-2">
    <div class="nav-wrapper">
      <a href="#"
        ><div @click="$router.push('/movies')" class="home">&#8962;</div></a
      >
      <div class="navbar-left">
        <span class="black-text">{{ date }}</span>
      </div>

      <div class="search_field">
        <input type="text" placeholder="Click for search" v-model="input" />
      </div>

      <div class="sort_field">
        <select name="" id="" v-model="selectedOption" @change="onChange">
          <option v-for="item in getUnicYears" :key="item.id">
            {{ item }}
          </option>
        </select>
        <div >
          <a href="#" @click="clearSorting" v-if="selectedOption">
          <div class="close-btn_sort" >x</div>
        </a>
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
            Good day
            {{ userName || '"name"' }}!
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
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      date: new Date(),
      interval: null,
      searchValue: '',
      selectedOption: ''
    }
  },
  computed: {
    ...mapGetters('movies', ['fullBase']),
    getUnicYears () {
      const fullBase = this.fullBase
      const result = Object.values(fullBase)
      const unicYears = result.reduce((a, b) => a.add(b.Year), new Set())
      return unicYears
    },
    userName () {
      return this.$store.getters.getUser.name
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
    },
    async onChange () {
      console.log(this.selectedOption)
      await this.$store.dispatch('movies/sortByYear', this.selectedOption)
    },
    clearSorting () {
      this.selectedOption = ''
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
  }
}
</script>

<style scoped>
</style>
