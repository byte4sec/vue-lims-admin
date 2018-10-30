/* eslint-disable */

import Vue from 'vue';
import Mock from 'mockjs';
import qs from 'qs';

// 模拟数据量
const count = 100;

// 查询字段
const queryField = {
};

// 规则字段
const rulesField = {
  'personId': '@increment(1)',
  'beginDate': '@date("yyyy-MM-dd")',
  'endDate': '@date("yyyy-MM-dd")',
  'content|10-50': '@cword',
  'detail|10-50': '@cword',
  'technology|1-4': 1,
};

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
for (let i = 0; i < count; i++) {
  arr.push(Mock.mock(rulesField));
}

export default {
  // 查询操作
  queryList: (config) => {
    const qf = formatQs(config.url);
    qf.page = Number((qf.page || 1), 10);
    qf.rows = Number((qf.rows || 15), 10);
    const qfArr = Object.keys(queryField);
    const mockList = arr.filter((item) => {
      const checkArr = new Array(qfArr.length);
      qfArr.forEach((val, key) => {
        const keyType = queryField[val];
        const qfKey = qf[val];
        if (!qfKey) {
          checkArr[key] = true;
        } else if (keyType === 'string') {
          checkArr[key] = item[val].indexOf(qfKey) >= 0;
        } else if (keyType === 'date') {
          checkArr[key] = item[val] !== Vue.hp.dateFormat(new Date(qfKey), 'Y-m-d');
        } else if (keyType === 'number') {
          checkArr[key] = item[val] !== (qfKey - 0);
        }
      });
      return checkArr.every(v => v);
    });
    const start = qf.rows * (qf.page - 1);
    const end = start + qf.rows;
    const data = mockList.slice(start, end);
    return {
      total: mockList.length,
      rows: data,
    };
  },
  // 添加操作
  createItem: (config) => {
    const formItem = qs.parse(config.body);
    const rulesItem = Object.assign({}, rulesField, formItem);
    arr.unshift(Mock.mock(rulesItem));
    return { message: '添加成功' };
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
    const formItem = qs.parse(config.body);
    const id = Object.keys(queryField)[0];
    arr.some((item) => {
      let m = item;
      if (m[id] === formItem[id]) {
        m = formItem;
        return true;
      }
      return false;
    });
    return {
      message: '编辑成功',
    };
  },
};
