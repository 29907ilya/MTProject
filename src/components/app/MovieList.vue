<template>
  <div class="main">
    <router-link
      tag="div"
      v-for="movie in list"
      :to="`/` + movie.Id"
      :key="movie.id"
    >
      <div class="movie-item">
        <div class="movie-item-poster">
          <movie-poster :movie="movie"></movie-poster>
        </div>
        <div class="movie-info-wrap">
          <div class="movie-item-info">
            <p class="movie-title">{{ movie.Title }}</p>
            <span class="movie-year"> {{ movie.Year }} </span>
          </div>
          <div class="movie-item-control">
            <a class="waves-effect waves-red btn-flat">Buy tickets</a>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import MoviePoster from './MoviePoster.vue'
export default {
  props: {
    list: Object
  },
  components: { MoviePoster }
}
</script>

<style scoped>
.main {
  max-width: 1150px;
  width: auto;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.movie-item {
  width: 233px;
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 330px;
  margin: 0 12px 25px 12px;
}
.movie-item:hover {
  box-shadow: 0px 5px 20px rgb(0, 0, 0, 0.7);
  transform: scale(1.02);
}
.movie-item-poster {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
}
.movie-info-wrap {
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  opacity: 0;
  transition: all 0.3s ease;
}
.movie-item:hover .movie-info-wrap {
  opacity: 0.9;
  background-color: rgb(0, 0, 0, 0.7);
}
.movie-item-info {
  color: white;
  font-size: 18px;
}
.btn-flat {
  position: relative;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0);
  text-align: center;
  color: white;
  border: solid 1px;
}
.btn-flat:hover {
  background-color: #ef5350;
}
</style>
