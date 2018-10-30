/* eslint-disable */

import Vue from 'vue';
import Mock from 'mockjs';
import qs from 'qs';

// 规则字段
const rulesField = {
  'id|10': '@word',
  'movieName|2-5': '@cword',
  'movieType|1-4': 1,
  'movieDate': '@date("yyyy-MM-dd")',
  'durationTime': '@date("HH:mm")',
};

// 查询字段
// const queryField = {
//   movieName: '',
//   movieDate: '',
//   movieType: '',
//   page: 1,
//   rows: 5,
// };


/**
 * 格式化 queryString
 * @param {*} url
 */
const formatQs = (url) => {
  const search = url.split('?')[1];
  if (!search) return {};
  return JSON.parse(`{"${decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
};

let arr = [];
const count = 50;
for (let i = 0; i < count; i++) {
  arr.push(Mock.mock(rulesField));
}

export default {
  // 查询操作
  queryList: (config) => {
    const qf = formatQs(config.url);
    const mockList = arr.filter((item) => {
      if ((qf.movieName && item.movieName.indexOf(qf.movieName) === -1)
      || (qf.movieDate && item.movieDate !== Vue.hp.dateFormat(new Date(qf.movieDate), 'Y-m-d'))
      || (qf.movieType && item.movieType !== (qf.movieType - 0))) {
        return false;
      }
      return true;
    });
    const data = mockList.filter((item, index) => index < qf.rows * qf.page && index >= qf.rows * (qf.page - 1));
    return {
      total: arr.length,
      rows: data,
    };
  },
  // 添加操作
  createItem: (config) => {
    const {
      movieName,
      movieDate,
      movieType,
      durationTime,
    } = qs.parse(config.body);
    arr.unshift(Mock.mock({
      'id|10': '@word',
      movieName,
      movieDate,
      movieType,
      durationTime,
    }));
    return {
      message: '添加成功',
    };
  },
  // 删除操作
  deleteItem: (config) => {
    const ids = Object.values(qs.parse(config.body));
    arr = arr.filter(movie => !ids.includes(movie.id));
    return {
      message: '删除成功',
    };
  },
  // 更新操作
  updateItem: (config) => {
    const {
      id,
      movieName,
      movieDate,
      movieType,
      durationTime,
    } = qs.parse(config.body);
    arr.some((movie) => {
      const m = movie;
      if (m.id === id) {
        m.movieName = movieName;
        m.movieDate = movieDate;
        m.movieType = movieType;
        m.durationTime = durationTime;
        return true;
      }
      return false;
    });
    return {
      message: '编辑成功',
    };
  },
};
