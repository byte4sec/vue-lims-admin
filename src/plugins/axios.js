import axios from 'axios';
import qs from 'qs';
import router from 'vue-router';
import nprogress from 'nprogress';
import store from '../store';

const Axios = axios.create({
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

const { CancelToken } = axios;
const requestMap = new Map();

// Token 刷新过期判断, 默认间隔30分钟
const isRetryRequestExpired = (minutes = 30) => {
  const oldDate = store.state.auth.oldTimer;
  if (typeof oldDate !== 'number') return;
  const newDate = new Date().getTime();
  const stamp = Number.parseInt(((newDate - oldDate) % (1000 * 60 * 60)) / (1000 * 60), 10);
  if (stamp >= minutes) {
    store.dispatch('auth/RefreshToken');
  }
};

// 请求前置拦截器
Axios.interceptors.request.use(
  (config) => {
    // 显示进度条
    nprogress.configure({ showSpinner: false });  // 禁用进度环
    nprogress.start();
    // 检测是否刷新 token
    isRetryRequestExpired();
    // 设置凭证
    if (store.state.auth.token) {
      config.headers.Authorization = `Bearer ${store.state.auth.token}`;
    }
    // 防止重复请求
    const keyString = qs.stringify(Object.assign({}, { url: config.url, method: config.method }, config.data));
    if (requestMap.get(keyString)) {
      config.cancelToken = new CancelToken((cancel) => {
        cancel('Please slow down a little');
      });
    }
    requestMap.set(keyString, true);
    Object.assign(config, { ckeyString: keyString });

    return config;
  },
  error => Promise.reject(error)
);

// 响应前置拦截器
Axios.interceptors.response.use(
  (response) => {
    // 完成进度条
    nprogress.done();
    // 重置requestMap
    const { config } = response;
    requestMap.set(config.ckeyString, false);
    return response;
  },
  (error) => {
    requestMap.set(error.config.ckeyString, false);
    // token 失效后清除用户信息并跳转到登录页
    if (error.response && error.response.data.code === 401) {
      store.commit('auth/Logout');
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default {
  install(Vue) {
    // eslint-disable-next-line
    Vue.http = Vue.prototype.$http = Axios;
  },
};
