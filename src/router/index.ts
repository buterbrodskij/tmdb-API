import Vue from 'vue';
import VueRouter from 'vue-router';
import indexPage from '@/views/index.vue';
import NotFound from '@/views/notFound.vue'
import MoviePage from '@/views/movie-page.vue'
import TvPage from '@/views/tv-page.vue'
Vue.use(VueRouter);

export enum ROUTE_NAME { 
  MOVIE_FULL_PAGE = 'movie-full-page',
  AUTH = 'auth',
  TV = 'tv-page',
}


const routes: any = [
  {
    path: '/',
    name: 'index',
    component: indexPage,
  },
  { 
    path: '/404', 
    name: '404', 
    component: NotFound, 
  }, 
  { 
    path: '*', 
    redirect: '/404' 
  },
  {
    path: '/movie-full-page/:id',
    name: ROUTE_NAME.MOVIE_FULL_PAGE,
    component: MoviePage,
  },
  {
    path: '/tv-page',
    name: ROUTE_NAME.TV,
    component: TvPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
