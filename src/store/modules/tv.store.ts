import {IAppState} from '@/interfaces/store.interfaces';
import {AxiosResponse} from 'axios';
import {ActionContext} from 'vuex';
import {ITv} from '@/interfaces/tv.interfaces';
import {tvResources} from '@/resources/tv.resources'
import Vue from 'vue';
import {Movie} from '@/interfaces/movie.interfaces';

type TVActionContext = ActionContext<ITv.ITvStore, IAppState>;

export default {
  namespaced: true,

  state: {
    tvList: [],
  },
  mutations: {
    setParameters(state: any, { name, value }: { name: string, value: any }) {
      Vue.set(state, name, value);
    },
  },
  actions: {
  async getTv({commit, state}: TVActionContext, page: number) {
     try {
       const response: AxiosResponse<Movie.IResponse<ITv.ItvList[]>> = await tvResources.getPopularTv(page);
       commit('setParameters', {name: 'tvList', value: response.data});
     }
     catch(e) {
        console.error(e);
      }
    }
  },
}