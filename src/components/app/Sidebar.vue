<template>
  <ul class="sidenav app-sidenav open">

    <router-link to="/" v-slot="{ isActive, isExactActive }">
      <li
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
      >
        <a href="#" class="waves-effect waves-red pointer">Movies</a>
      </li>
    </router-link>

    <!-- <router-link to="/profile" v-slot="{ isActive, isExactActive }">
      <li
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
      >
        <a href="#" class="waves-effect waves-red pointer">Profile</a>
      </li>
    </router-link> -->

    <router-link to="/cinemas" v-slot="{ isActive, isExactActive }">
      <li
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
      >
        <a href="#" class="waves-effect waves-red pointer">Load info</a>
      </li>
    </router-link>

    <router-link to="/sessions" v-slot="{ isActive, isExactActive }">
      <li
        :class="[
          isActive && 'router-link-active',
          isExactActive && 'router-link-exact-active',
        ]"
      >
        <a href="#" class="waves-effect waves-red pointer">Sessions</a>
      </li>
    </router-link>

  </ul>
</template>

<script>
export default {}
</script>
