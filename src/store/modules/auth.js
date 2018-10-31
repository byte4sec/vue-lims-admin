// 路由与登陆权限控制

import Vue from 'vue';
import { Message } from 'element-ui';
import { asyncRoutesMap, routesMap } from '@/router';

const LOGIN_URL = 'api/login';
const USER_URL = 'api/getUser';
const REFRESH_URL = 'api/refreshToken';

const state = {
  token: window.localStorage.getItem('jwtToken')
    ? window.localStorage.getItem('jwtToken')
    : false,
  name: {},                  // 用户名
  roles: [],                 // 用户角色
  userMenus: [],
  routers: routesMap || [],  // 路由
  addRouters: [],            // 动态路由
  oldTimer: '',
};

const getters = {
  // 侧栏菜单，过滤隐藏页(404、login等)
  sideMenu: state => state.routers.filter((v) => {
    if (v.name === 'index') delete v.children;
    return !v.hidden;
  }),
};

const mutations = {
  SetToken(state, token = false) {
    state.oldTimer = new Date().getTime();
    state.token = token;
    window.localStorage.setItem('jwtToken', token);
  },
  SetName(state, name) {
    state.name = name;
  },
  SetRoles(state, roles) {
    state.roles = roles;
  },
  SetMenu(state, menu) {
    if (menu.length > 0) {
      state.userMenus = menu[0].children;
    } else {
      state.userMenus = [];
    }
  },
  Logout(state) {
    window.localStorage.removeItem('jwtToken');
    state.token = false;
    state.roles = [];
    state.name = {};
  },
  SetRouters(state, routers) {
    state.addRouters = routers;
    state.routers = routesMap.concat(routers);
  },
};

const actions = {
  // 登陆，获取token
  Login({ commit }, params) {
    return new Promise((resolve, reject) => {
      Vue.http.post(LOGIN_URL, params).then((response) => {
        if (response.status === 200) {
          window.localStorage.setItem('canRefresh', params.remember ? 1 : 0);
          commit('SetToken', response.headers.authorization || response.data.token);
        } else {
          this.$message.warning({
            message: response.body.msg,
            duration: 1500,
          });
        }
        resolve();
      }, ({ response }) => {
        if (response.status === 401) {
          Message.error({
            message: '无法登录，请确认您的用户名密码输入',
            duration: 5000,
          });
        } else {
          Vue.hp.resp(response);
        }
        reject();
      });
    });
  },
  // 获取用户信息
  GetInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      Vue.http.get(USER_URL, { params: { jwt: state.token } }).then((response) => {
        const { data } = response;
        // 验证返回的roles是否是一个非空数组
        if (!data.roles || !data.roles.length) {
          reject(new Error('getInfo: roles must be a non-null array !'));
        }
        commit('SetRoles', data.roles);
        commit('SetName', data.name);
        resolve();
      }, ({ response }) => {
        Vue.hp.resp(response);
        this.$router.push({ name: 'Login' });
        reject();
      });
    });
  },
  // 获取用户菜单
  GetMenu({ commit }, params) {
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
  // 根据角色生成可访问路由
  CreateRoutes({ commit, state }) {
    return new Promise((resolve) => {
      const { roles } = state;
      const accessedRouters = asyncRoutesMap.filter((v) => {
        if (roles.indexOf('admin') >= 0) return true;
        if (Vue.hp.hasPermission(roles, v)) {
          if (v.children && v.children.length) {
            v.children = v.children.filter((child) => {
              if (Vue.hp.hasPermission(roles, child)) {
                return child;
              }
              return false;
            });
            return v;
          }
          return v;
        }
        return false;
      });
      commit('SetRouters', accessedRouters);
      resolve(accessedRouters);
    });
  },
  // 刷新 token
  RefreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.http.get(REFRESH_URL).then((response) => {
        const { headers: { Authorization: token } } = response;
        commit('SetToken', token);
        resolve();
      }, ({ response }) => {
        Vue.hp.resp(response);
        reject();
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
