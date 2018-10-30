// 字典表
import Vue from 'vue';

const state = {
  // 偏平结构
  // 层级结构
};

const getters = {

};

const actions = {
  // 偏平结构
  async GET_SELECT_LIST({ state, commit }, params = {}) {
    let val = state[params.codeValue];
    if (!val.length) {
      await Vue.http.get('sys/enumCode', {
        params: { ...params },
      }).then((response) => {
        const obj = {};
        obj.list = response.data;
        obj.params = params;
        val = response.data;
        commit('SET_SELECT_LIST', obj);
      }, ({ response }) => {
        Vue.sys.resp(response);
      });
    }
    return val;
  },
  // 层级结构
};

const mutations = {
  // 设置选择框下拉数据
  SET_SELECT_LIST(state, obj) {
    state[obj.params.textName] = obj.list;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
