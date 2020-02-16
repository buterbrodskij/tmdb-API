<template>
  <div @click.stop="goToInfoPage(item.id)" class="col-3 movie-item__content">
    <el-card :body-style="{ padding: '0px' }">
      <div class="movie-item__content-banner">
        <img :src="baseUrl + item.poster_path" alt="item.title" class="image">
      </div>
      <div class="movie-item__content-text">
        <h4 class="movie-item__content-text__title">{{item.title}}</h4>
        <div class="movie-item__content-text-info">
          <el-tooltip content='Дата выхода'>
          <p class="movie-item__content-text-info__date">{{item.release_date}}</p>
          </el-tooltip>
          <el-tooltip content='рейтинг'>
          <el-progress type="circle" :percentage="item.vote_average * 10"></el-progress>
          </el-tooltip>
        </div>
      </div>
      <div class="movie-item__content-button">
          <el-button @click.stop="openDialog(item)" type="primory" class="button">view more</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
import {Movie} from '../interfaces/movie.interfaces';
import {bus} from '../plugins/bus'
import {ROUTE_NAME} from '../router/index'
@Component({
  components: {},
})
export default class MovieItem extends Vue {
@Prop() item: Movie.IMovieItem;
baseUrl: string = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';



 async openDialog(item) {
    this.$store.commit('dialog/openDialog', {blockName: 'films', dialogName: 'popularFilms'});
    if (this.moreInfo.id !== item.id) {
      await this.$store.dispatch('movie/getMoreInfo', item.id);
    } 
    bus.$emit('more-info:loading');
  }

  get moreInfo(): Movie.IMoreInfo {
    return this.$store.state.movie.moreInfo;
  }

  goToInfoPage(id) {
    this.$store.dispatch('router/openPage', {name: ROUTE_NAME.MOVIE_FULL_PAGE, paramsValue: id})
  }
}
</script>

<style lang="less">
.movie-item__content {
    margin-top: 40px;
  &-banner {
    height: 380px;
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 50%;
      transform: translate(0, -50%);
      width: 100%;
      height: 100%;
    }
  }
  
  &-item {
    margin-bottom: 40px;
  }

  &-text {
    padding: 10px;
    
  }

  &-text__title {
    text-align: center;
    font-size: 16px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-text-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    &__date {
      margin-bottom: 0;
    }
  }

  &-button {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
}
</style>