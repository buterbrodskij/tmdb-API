import Vue from 'vue';
import {ActionContext} from 'vuex';
import {AxiosResponse, AxiosError} from 'axios';
import {Movie} from '@/interfaces/movie.interfaces';
import {IAppState} from '@/interfaces/store.interfaces';
import {movieResources} from '@/resources/movie.resources';
import {IFilters} from '@/interfaces/filters.interfaces';
import {MovieFullPage} from '@/interfaces/movie-page.interfaces'
import {CallBack} from '@/interfaces/call-back.interfaces'

 type MovieActionContext = ActionContext<Movie.IMovieState, IAppState>;

export default {
  namespaced: true,
  state: {
    filmsList: [], 
    moreInfo: [],
    activeType: IFilters.FiltersType.POPULAR_FILMS,
    recommendationsFilms: [],
    callBack: [],

  },

  mutations: {
    setParameters(state: any, { name, value }: { name: string, value: any }) {
      Vue.set(state, name, value);
    },
  },

  actions: {
   async getFilms({dispatch, state, rootState, commit}: MovieActionContext, page: number) {
     let response: AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>> | undefined;
    try {
      switch (state.activeType) {
        case IFilters.FiltersType.POPULAR_FILMS:
        response = await movieResources.getPopularFilms(page);
        break;
        case IFilters.FiltersType.TOP_RATE:
        response = await movieResources.getTopFilms(page);
        break;
        case IFilters.FiltersType.UPCOMING_FILMS:
        response = await movieResources.getUpcomingFilms(page);
        break;
      }
      commit('setParameters', {name: 'filmsList', value: response.data});
    }
    catch(error) {
      console.error(error)
      }
    },

    async requestForMoviePage({dispatch, state, rootState, commit}: MovieActionContext, {id, type}: {id: number, type: MovieFullPage.MoviePageRequetsType}) {
      let response: AxiosResponse<Movie.IResponse<CallBack.ICallBackItem[]>> |  AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>>;
      try {
        switch(type) {
          case MovieFullPage.MoviePageRequetsType.RECOMMEDATIONS_FILMS:
           response = await movieResources.getRecommendationsFilms(id);
           commit('setParameters', {name: 'recommendationsFilms', value: response.data.results})
          break;
          case MovieFullPage.MoviePageRequetsType.CALL_BACK:
           response = await movieResources.getCallBack(id);
           commit('setParameters', {name: 'callBack', value: response.data})
          break;
        }
      }
      catch(error) {
        console.error(error)
      }
    },

    async getMoreInfo({dispatch, state, rootState, commit}: MovieActionContext, id: number) {
      try {
        const response = await movieResources.getMoreInfo(id);
        commit('setParameters', {name: 'moreInfo', value: response.data});
      }
      catch(error) {
        console.error(error)
      }
    },

    async getFilmsOnSearch({dispatch, state, rootState, commit}: MovieActionContext, {query, page}: {query: string, page: number}) {
      try {
        const response = await movieResources.getFilmsOnSearch(query, page);
        commit('setParameters', {name: 'filmsList', value: response.data});
      }
      catch(error) {
        console.error(error)
      }
    }
  },
}
