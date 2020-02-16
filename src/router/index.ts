import Vue from 'vue';
import VueRouter from 'vue-router';
import indexPage from '@/views/index.vue';
import NotFound from '@/views/notFound.vue'
import MoviePage from '@/views/movie-page.vue'
Vue.use(VueRouter);

export enum ROUTE_NAME { 
MOVIE_FULL_PAGE = 'movie-full-page'
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
    name: 'movie-full-page',
    component: MoviePage,
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
