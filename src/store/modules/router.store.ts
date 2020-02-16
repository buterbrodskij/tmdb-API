import Vue from 'vue';
import {ActionContext} from 'vuex';
import {IAppState} from '@/interfaces/store.interfaces';
import router, {ROUTE_NAME} from '@/router/index'
import {IRouter} from '@/interfaces/router.interfaces'
type RouterActionContext = ActionContext<any, IAppState>;

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    openPage({rootState, state, dispatch, commit}: RouterActionContext, {name, paramsValue, queryValue}: IRouter.IOpenPageParams) {
      switch(name) {
        case ROUTE_NAME.MOVIE_FULL_PAGE: 
        router.push({name, params: {id: `${paramsValue}`}})
        break;
      }
    }
  },
}