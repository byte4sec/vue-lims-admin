import Vue from 'vue';
import { Message } from 'element-ui';
import CryptoJS from 'crypto-js';

const LOGIN_URL = '../auth/jwt/token';
// j用户存放至sessionStorage中的key名
const SESSION_KEY_USER = 'user';
// const LOGIN_URL = '../login';

const state = {
  user: { roles: [] },
  userMenus: [],
  roles: {},
  token: window.sessionStorage.getItem('jwtToken')
    ? window.sessionStorage.getItem('jwtToken')
    : false,
};

const getters = {
  // hasRoleType(state) {
  //   return (type) => {
  //     if (state.user.current_roles) {
  //       return Boolean(_find(state.user.current_roles, { type }));
  //     }
  //     return false;
  //   };
  // },
};

const actions = {
  Login({ commit }, params) {
    // 这里不直接返回axios.post, 因为后面的链式调用会继续传入reject
    return new Promise((resolve, reject) => {
      const key = CryptoJS.enc.Latin1.parse('sinoyd**..123456');
      const iv = key;
      const uid = CryptoJS.AES.encrypt(params.uid, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      });
      const pid = CryptoJS.AES.encrypt(params.pid, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
      });
      const param = {
        uid: uid.toString(),
        pid: pid.toString(),
      };
      Vue.http.post(LOGIN_URL, {}, { params: param, headers: { Authorization: '' } }).then((response) => {
        if (response.data.success) {
          if (params.remember) {
            window.localStorage.setItem('canRefresh', 1);
          } else {
            window.localStorage.setItem('canRefresh', 0);
          }
          // 登录时清除之前的用户信息 replace时会判断后根据token重新请求用户信息
          commit('SetToken', response.data.data.token);
          commit('SetUser', response.data.data);
          commit('SetUserJson', response.data.data);
          // window.location.href = 'http://192.168.30.49:8099/frame/';
        } else {
          Message.error({
            message: response.data.msg,
            duration: 1500,
            showClose: true,
          });
        }
        // if (params.remember) {
        //   window.localStorage.setItem('canRefresh', 1);
        // } else {
        //   window.localStorage.setItem('canRefresh', 0);
        // }
        // // 登录时清除之前的用户信息 replace时会判断后根据token重新请求用户信息
        // commit('SetUser', response.data);
        resolve();
      }, ({ response }) => {
        // 登录的401需要特别对待，不能进入refresh-token
        if (response.status === 401) {
          Message.error({
            message: '无法登录，请确认您的用户名密码输入',
            duration: 5000,
          });
        } else {
          Vue.sys.resp(response);
        }
        reject();
      });
    });
  },
  GetMenu({ commit }, params) {
    // 这里不直接返回axios.post, 因为后面的链式调用会继续传入reject
    return new Promise((resolve, reject) => {
      Vue.http.get(`../sys/users/${params}/permission/nav-menus/tree`, {
        params: { webAppGuid: 'ed2a6d6827294cd4bde077b0b7fe2687' },
      }).then((response) => {
        if (response.data.success) {
          commit('SetMenu', response.data.data);
        }
        resolve();
      }, ({ response }) => {
        Vue.sys.alarmResponse(response);
        reject();
      });
    });
  },
  GetUser({ commit }) {
    const user = JSON.parse(window.sessionStorage.getItem(SESSION_KEY_USER));
    if (user) {
      commit('SetUser', user);
    }
  },
  GetRoles({ commit }) {
    return Vue.axios.get('xdata/role').then((response) => {
      commit('SetRoles', response.data);
    }, ({ response }) => {
      Vue.sys.resp(response);
    });
  },
};
/* eslint-disable no-shadow, no-param-reassign */
const mutations = {
  SetToken(state, token = false) {
    state.token = token;
    // window.localStorage.setItem('jwtToken', token);
    window.sessionStorage.setItem('jwtToken', token);
  },
  SetMenu(state, menu) {
    if (menu.length > 0) {
      state.userMenus = menu[0].children;
    } else {
      state.userMenus = [];
    }
  },
  SetUserJson(state, user) {
  // 保存用户信息storage 不能直接存储数组、对象
    window.sessionStorage.setItem(SESSION_KEY_USER, JSON.stringify(user));
  },
  SetUser(state, user) {
    state.user = user;
  },
  SetRoles(state, roles) {
    state.roles = roles;
  },
  Logout(state) {
    window.sessionStorage.removeItem('jwtToken');
    window.sessionStorage.removeItem(SESSION_KEY_USER);
    state.token = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
