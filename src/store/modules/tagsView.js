// 多标签页

const state = {
  // 存放所有浏览过的且不重复的路由数据
  routeViews: [],
  visitedViews: [],
  cachedViews: [],
};

const mutations = {
  AddVisitedView: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return;
    state.visitedViews.push(Object.assign({}, view, {
      title: view.meta.title || 'no-name',
    }));
  },
  AddCachedView: (state, view) => {
    if (state.cachedViews.includes(view.name)) return;
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name);
    }
  },

  RemoveVisitedView: (state, view) => {
    const i = state.visitedViews.findIndex(v => v.path === view.path);
    if (`${i}`) {
      state.visitedViews.splice(i, 1);
    }
  },
  RemoveCachedView: (state, view) => {
    const v = state.cachedViews.find(v => v === view.name);
    if (v) {
      state.cachedViews.splice(state.cachedViews.indexOf(v), 1);
    }
  },

  RemoveOtherVisitedViews: (state, view) => {
    const i = state.visitedViews.findIndex(v => v.path === view.path);
    if (`${i}`) {
      state.visitedViews = state.visitedViews.slice(i, i + 1);
    }
  },
  RemoveOtherCachedViews: (state, view) => {
    const v = state.cachedViews.find(v => v === view.name);
    if (v) {
      const i = state.cachedViews.indexOf(v);
      state.cachedViews = state.cachedViews.slice(i, i + 1);
    }
  },
  RemoveAllVisitedViews: (state) => {
    state.visitedViews = [];
  },
  RemoveAllCachedViews: (state) => {
    state.cachedViews = [];
  },

  UpdateVisitedView: (state, view) => {
    state.visitedViews.forEach((v, i) => {
      if (v.path === view.path) {
        Object.defineProperty(state.visitedViews, i, Object.assign(v, view));
      }
    });
  },
};

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view);
    dispatch('addCachedView', view);
  },
  addVisitedView({ commit }, view) {
    commit('AddVisitedView', view);
  },
  addCachedView({ commit }, view) {
    commit('AddCachedView', view);
  },

  removeView({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('removeVisitedView', view);
      dispatch('removeCachedView', view);
      resolve({ visitedViews: [...state.visitedViews], cachedViews: [...state.cachedViews] });
    });
  },
  removeVisitedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('RemoveVisitedView', view);
      resolve([...state.visitedViews]);
    });
  },
  removeCachedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('RemoveCachedView', view);
      resolve([...state.cachedViews]);
    });
  },

  removeOthersViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('removeOthersVisitedViews', view);
      dispatch('removeOthersCachedViews', view);
      resolve({ visitedViews: [...state.visitedViews], cachedViews: [...state.cachedViews] });
    });
  },
  removeOthersVisitedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('RemoveOtherVisitedViews', view);
      resolve([...state.visitedViews]);
    });
  },
  removeOthersCachedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('RemoveOtherCachedViews', view);
      resolve([...state.cachedViews]);
    });
  },

  removeAllViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('removeAllVisitedViews', view);
      dispatch('removeAllCachedViews', view);
      resolve({ visitedViews: [...state.visitedViews], cachedViews: [...state.cachedViews] });
    });
  },
  removeAllVisitedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit('RemoveAllVisitedViews');
      resolve([...state.visitedViews]);
    });
  },
  removeAllCachedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit('RemoveAllCachedViews');
      resolve([...state.cachedViews]);
    });
  },

  updateVisitedView({ commit }, view) {
    commit('UpdateVisitedView', view);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
