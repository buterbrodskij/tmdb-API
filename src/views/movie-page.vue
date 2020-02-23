<template>
  <div class="movie-info" v-loading="!moreInfo">
    <div class="movie-info__header" :style="{'backgroundImage': `url(${baseUrl}${moreInfo.backdrop_path} )`}">
      <div class="movie-info__header-content container ">
        <div class="movie-info__header-content__poster">
          <img :src="baseUrl + moreInfo.poster_path" alt="">
        </div>

        <div class="movie-info__header-content__info">
            <h2 class="movie-info__header-content__info__title">{{moreInfo.title}}</h2>
            <div class="movie-info__header-content__info__raiting">
              <el-progress type="dashboard" color="#6e07e3" stroke-width="16" :percentage="moreInfo.vote_average * 10"></el-progress>
              <ul class="movie-info__header-content__info__raiting-geners">
                <li v-for="(item, index) in moreInfo.genres" :key="index" class="movie-info__header-content__info__raiting-geners__item">
                  <el-tag type="info" color="#6e07e3">{{item.name}}</el-tag>
                </li>
              </ul>
            </div>
            <div class="movie-info__header-content__info__text">
              <h4 class="movie-info__header-content__info__text__title">Overview</h4>
              <p class="movie-info__header-content__info__text__desk">{{moreInfo.overview}}</p>
              <ul class="movie-info__header-content__info__text-countries">
                production_countries: 
                <li v-for="(item, index) in moreInfo.production_countries" :key="index" class="movie-info__header-content__info__text-countries__item">
                  <el-tag type="info" color="#6e07e3">{{item.name}}</el-tag>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="recommendations-films">
        <h2 class="recommendations-films__title">Recommendations Films</h2>
        <el-carousel v-if="recommendationsFilms.length" type="card" height="350px" arrow="always">
          <el-carousel-item v-for="(item, index) in recommendationsFilms" :key="index" :autoplay="false">
            <div class="recommendations-films__item"  @click="recommendationsFilmsInfo(item.id)">
              <div class="recommendations-films__item-text">
                <h3 class="recommendations-films__item-text__title">{{ item.title }}</h3>
                <img :src="baseUrl + item.poster_path" alt="">
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>

        <div class="empty" v-else>empty</div>
      </div>

      <div class="call-back">
        <h2 class="call-back__title">Call Back</h2>
        <el-carousel v-if="callBack.results.length" height="350px" direction="vertical" arrow="always">
          <el-carousel-item v-for="(item, index) in callBack.results" :key="index">
            <div class="call-back-item">
              <h3 class="call-back-item__title">{{ item.author }}</h3>
              <p class="call-back-item__desk">{{item.content}}</p>
              <p class="call-back-item__link"><a :href="item.url">originals link</a></p>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="empty" v-else>empty</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Movie} from '../interfaces/movie.interfaces';
import {ROUTE_NAME} from '../router/index';
import {MovieFullPage} from '../interfaces/movie-page.interfaces';
import {CallBack} from '../interfaces/call-back.interfaces'
 @Component({
  components: {},
})

export default class MoviePage extends Vue  {
baseUrl: string = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';


  mounted() {
    this.onPageLoad();
  }

 async onPageLoad() {
    if (Number(this.$router.currentRoute.params.id) !== this.moreInfo.id) {
      await this.$store.dispatch('movie/getMoreInfo', Number(this.$router.currentRoute.params.id));
      await await this.$store.dispatch('movie/requestForMoviePage', {id: this.moreInfo.id, type: MovieFullPage.MoviePageRequetsType.RECOMMEDATIONS_FILMS});
      await await this.$store.dispatch('movie/requestForMoviePage', {id: this.moreInfo.id, type: MovieFullPage.MoviePageRequetsType.CALL_BACK});
    }
  }

  get recommendationsFilms(): Movie.IMovieItem[] {
    return this.$store.state.movie.recommendationsFilms;
  }
  
  get moreInfo(): Movie.IMoreInfo {
    return this.$store.state.movie.moreInfo;
  }

  get callBack(): Movie.IResponse<CallBack.ICallBackItem[]> {
    return this.$store.state.movie.callBack;
  }

 async recommendationsFilmsInfo(id: string) {
   if (this.$router.currentRoute.params.id !== id)
    this.$router.replace({params: {id: id}});
     this.onPageLoad();
  }
}


</script>

<style lang="less">
.movie-info {
  width: 100%;
  &__header {
    width: 100%;
    height: 600px;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;
      background-image: radial-gradient(circle at 20% 50%, rgba(12.55%, 69.80%, 66.67%, 0.78) 0%, rgba(19.61%, 76.86%, 73.73%, 0.88) 100%);
    }
  }

  &__header-content {
    position: relative;
    z-index: 1;
    padding-top: 40px;
    display: flex;

    &__poster {
      height: 450px;
      flex-basis: 300px;
      width: 300px;
      position: relative;
      overflow: hidden;
      img {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        top: 50%;
        transform: translate(0,-50%)
      }
    }

    &__info {
      flex-basis: calc(~"100% - 350px");
      margin-left: 40px;

      &__title {
        margin-bottom: 20px;
      }

      &__raiting {
        display: flex;
        align-items: center;  
        .el-progress-circle {
          width: 60px !important;
          height: 60px !important;
        }
        .el-progress__text {
          font-size: 12px !important;
          font-weight: bold;
        }
      }

      &__raiting-geners {
        padding-left: 0;
        list-style-type: none;
        display: flex;
        margin-bottom: 0;
        margin-left: 20px;
        &__item {
          margin-left: 10px;
          .el-tag {
            color: #fff !important;
          }
        }
      }
      
      &__text {
        margin-top: 20px;
        &__title {
          font-size: 36px;
        }
        &__desk {
          font-size: 24px;
          height: 200px;
          overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 5px;
        }
        &::-webkit-scrollbar-track {
           background: #ddd;
        }
        &::-webkit-scrollbar-thumb {
           background: #666; 
        }
      }
    }

      &__text-countries {
        padding-left: 0;
        list-style-type: none;
        margin-bottom: 0;
        display: flex;
        font-size: 24px;
        font-weight: 700;
        align-items: center;
        &__item {
          margin-left: 10px;
          .el-tag {
            color: #fff !important;
          }
        }
      }
    }
  }

  .recommendations-films {
    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(95,44,108,1) 65%);
    padding-top: 50px;
    padding: 0 99999px;
    margin: 0 -99999px;

    &__title {
      text-align: center;
      margin-bottom: 40px;
      padding-top: 20px;
      color: #fff;
    }
    
    &__item {
      display: flex;
      justify-content: center;
      text-align: center;
      img {
        margin: 0 auto;
        display: block;
      }
    }

    &__item-text {
      &__title {
        font-size: 14px;
        color:#fff;
      }
    }
  }

  .call-back {
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(44,82,108,1) 65%);
    padding-top: 50px;
    padding: 0 99999px;
    margin: 0 -99999px;

    &__title {
      text-align: center;
      margin-bottom: 40px;
      padding-top: 20px;
      color: #fff;
    }

    &-item {
      color: #fff;

      &__title {
        font-size: 24px;
        text-align: center;
        margin-bottom: 30px;
        }

        &__desk {
          font-size: 14px;
          height: 200px;
          overflow: hidden
        }
      }
    }
  }

.el-carousel__container {
    .el-carousel__mask {
      background-color: transparent;
    }
  }

  body {
    overflow-x: hidden;
  }

  .empty {
    color: #fff;
    text-align: center;
    font-size: 30px;
    margin: 20px 0px;
  }
</style>