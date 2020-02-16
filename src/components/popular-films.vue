<template>
  <div class="popular-films">
    <h1 v-if="!searchText" class="popular-films__title">{{setTitle}}</h1>
    <h1 v-else class="popular-films__title">Search: {{searchText}}</h1>
    <el-container class="popular-films__content">
      <div class="row">
        <MovieItem v-for="(item, index) in filmsList.results" :key="index" :item="item"/> 
      </div>
    </el-container>
    <el-dialog
    :visible="isShow"
    :before-close="onClose"
    width="30%"
    center>
        <div slot="title" class="el-dialog__title">
          <h4>{{moreInfo.title}}</h4>
        </div>
        <div class="dialog-content" v-loading="loading">
          <h6 class="dialog-content__title">overview</h6>
          <p>{{moreInfo.overview}}</p>
          <div class="dialog-content__info">
            <h6 class="dialog-content__geners">genres:</h6>
            <ul class="tags-list">
              <li class="tags-list__item" v-for="item in moreInfo.genres" :key="item.id">
                <el-tag  effect="dark" type="info">{{item.name}}</el-tag>
                </li>
            </ul>
          </div>
          <div class="dialog-content__budget">
            <span>budget: <strong>{{moreInfo.budget}}</strong></span>
            <span>status: <strong>{{moreInfo.status}}</strong></span>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="onClose">close</el-button>
        </span>
  </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Movie} from '../interfaces/movie.interfaces';
import MovieItem from '@/components/movie-item';
import {IFilters} from '../interfaces/filters.interfaces'
import {bus} from '../plugins/bus';
 @Component({
  components: {
    MovieItem,
  },
})
export default class PopularFilms extends Vue {
  loading: boolean = true
  title: string = 'Popular Movies';
  filterType = IFilters.FiltersType;
  searchText: string = '';

  mounted() {
   bus.$on('more-info:loading', () => this.loading = false);
   bus.$on('filters:search', (query) => this.setQuerySearch(query));
  }

  get filmsList(): Movie.IMovieItem[] {
    return this.$store.state.movie.filmsList;
  }

  get setTitle(): string {
    switch(this.$store.state.movie.activeType) {
      case IFilters.FiltersType.POPULAR_FILMS: 
       return  'Popular Movies'
      break;
      case IFilters.FiltersType.TOP_RATE:
       return 'Top Rate'
      break;
      case IFilters.FiltersType.UPCOMING_FILMS:
       return 'Coming soon'
      break;
    }
  }

  get isShow(): boolean {
    return this.$store.state.dialog.films.popularFilms;
  }

  get moreInfo(): Movie.IMoreInfo {
    return this.$store.state.movie.moreInfo;
  }

  setQuerySearch(query) {
    this.searchText = query;
  }

  onClose() {
     this.$store.commit('dialog/closeDialog', {blockName: 'films', dialogName: 'popularFilms'});
     this.loading = true;
  }
}
</script>

<style lang="less">
.popular-films {
  padding: 20px;
  &__title {
    font-size: 32px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .el-progress-circle {
    width: 40px !important;
    height: 40px !important;
  }
  .el-progress__text {
      font-size: 12px !important;
      font-weight: bold;
  }

  .dialog-content {
    .tags-list {
      padding-left: 20px;
      list-style: none;
      display: flex;
      margin: 0 -10px;
      flex-wrap: wrap;
      &__item {
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 10px;
      }
    }

    &__title {
      text-align: center;
      font-size: 18px;
      text-transform: uppercase
    }

    &__info {
      display: flex;
    }

    &__geners {
      display: flex;
      text-transform: uppercase;
      margin-bottom: 0px;
      width: 70px;
    }
    &__budget {
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
    }
  }
}
.row {
  width: 100%;
}
</style>