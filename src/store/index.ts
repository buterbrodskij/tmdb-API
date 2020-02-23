import Vue from 'vue';
import Vuex from 'vuex';
import movie from './modules/movie.store';
import dialog from './modules/dialog.store';
import router from './modules/router.store';
import tv from './modules/tv.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    movie,
    dialog,
    router,
    tv,
  }
});
