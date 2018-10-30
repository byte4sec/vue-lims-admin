import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import tagsView from './modules/tagsView';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    tagsView,
  },
  state: {
    isCollapseSide: false,
    isSaveTags: [],
  },
  getters: {

  },
  mutations: {
    // 添加保存检测页
    AddIsSaveTags(state, tags) {
      if (state.isSaveTags.indexOf(tags) === -1) {
        state.isSaveTags.push(tags);
      }
    },
    // 移除页面保存检测
    RemoveIsSaveTags(state, tags) {
      const index = state.isSaveTags.findIndex(v => v === tags);
      if (typeof index === 'number') {
        state.isSaveTags.splice(index, 1);
      }
    },
    SetIsCollapseSide(state, status) {
      state.isCollapseSide = status;
    },
  },
  actions: {

  },
});
