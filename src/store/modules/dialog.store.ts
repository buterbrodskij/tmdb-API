import {IAppState} from '@/interfaces/store.interfaces';
import {ActionContext} from 'vuex';
import {IDialogStoreState} from '@/interfaces/dialog.interfaces';
import Vue from 'vue';

type DialogActionContext = ActionContext<IDialogStoreState, IAppState>;

const defaultState: IDialogStoreState = {
  films: {
    popularFilms: false
  },
  payload: {},
};

export default {
  namespaced: true,

  state: {
    films: {
      popularFilms: false
    },
    payload: {},
  },

  mutations: {
    openDialog(state: IDialogStoreState, {blockName, dialogName, payload}: { blockName: string, dialogName: string, payload?: any }) {
      Vue.set(state[blockName], dialogName, true);
      if (payload) {
        state.payload = payload;
      }
    },

    closeDialog(state: IDialogStoreState, {blockName, dialogName}: { blockName: string, dialogName: string }) {
      Vue.set(state[blockName], dialogName, false);
      state.payload = defaultState.payload;
    },
  },
};