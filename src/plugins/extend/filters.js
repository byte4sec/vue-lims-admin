import Vue from 'vue';

import { formatDate, formatTime } from '../helper';

// 自定义过滤器
const filters = {
  formatDate,
  formatTime,
};

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
