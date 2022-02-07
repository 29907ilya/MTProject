<template>
  <div class="main">
    <router-link
      tag="div"
      v-for="movie in list"
      :to="`/movies/` + movie.Id"
      :key="movie.id"
    >
      <div class="movie-item mb-3">
        <div class="movie-item-poster" >poster {{ movie.Title }}</div>
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
// import MoviePage from './MoviePage.vue'

export default {
  props: {
    list: Object
  },
  // data() {
  //   return {
  //     movie: this.movie,
  //   };
  // },
  // computed: {
  //   posterBg() {
  //     return {
  //       "background-image": `url(${this.movieItem.Poster})`,
  //     };
  //   },
  // },
  components: {
    // MoviePage
  }
}
</script>

<style scoped>

.main {
  width: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0px;
}
.movie-item {
  width: 200px;
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 300px;
  margin-bottom: 25px;
}
.movie-item:hover {
  box-shadow: 0px 5px 20px rgb(0, 0, 0, 0.7);
  transform: scale(1.02);
}
.movie-item-poster {
  background-image: url(https://vypechka-online.ru/wp-content/uploads/2019/09/EQgJ4p77Aeo.jpg);
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
