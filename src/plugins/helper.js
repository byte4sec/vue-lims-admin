// 助手函数库

import { Message } from 'element-ui';

/* getType 获取数据类型
-------------------------- */
const getType = data => Object.prototype.toString.call(data).slice(8, -1).toLowerCase();


/* resp 分析响应错误
-------------------------- */
const resp = (response) => {
  if (typeof response !== 'object' || response === null) {
    return;
  }
  if (response.status === 422) {
    Message.warning({
      message: response.data.errors ? Object.values(response.data.errors).join('\n') : '',
    });
  } else if (response.status === 403) {
    Message.warning({
      message: '无法执行指定操作，请确认您是否具有足够的权限。',
    });
  } else if (response.status === 404) {
    Message.warning({
      message: '无法获取指定数据，请确认您的操作。',
    });
  } else if (response.status === 429) {
    Message.warning({
      message: '您的操作过于频繁，请稍后再试。',
    });
  } else {
    Message({
      message: (response.data && response.data.message) ? response.data.message : '操作有误或者服务器错误',
      type: response.status >= 500 ? 'error' : 'warning',
    });
  }
};


/* formatDate 日期格式化
 * @use <span>{{ date | formatDate（'Y-m-d'）  }}</span>
-------------------------- */
export const formatDate = (dateObj, fmt = 'Y-m-d H:i', empty = false) => {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const months = [
    '一月', '二月', '三月', '四月', '五月', '六月',
    '七月', '八月', '九月', '十月', '十一月', '十二月',
  ];
  const lz = (n) => {
    const num = n.toString();
    if (num.length === 1) return `0${num}`;
    return num;
  };
  let t = dateObj;
  // typeof dateObj !== 'string'是为了判断万一传过来的是y-m-d h:i:s格式，会直接执行最后一个else if，格式化为日期格式
  if (dateObj === null || Number.isNaN(dateObj) && typeof dateObj !== 'string') {
    if (typeof empty === 'string') return empty;
    t = new Date();
  } else if (typeof dateObj === 'number') {
    t = new Date(dateObj * 1000);
  } else if (typeof dateObj === 'string') {
    t = new Date(dateObj.replace(/-/g, '/'));
  }
  if (!(t instanceof Date)) {
    throw new Error('被处理的只能是Date对象');
  }
  if (Number.isNaN(t.getTime())) {
    throw new Error('非法日期对象');
  }
  const date = t.getDate();
  const year = t.getFullYear();
  const hours = t.getHours();
  const day = t.getDay();
  const dayName = days[day];
  const min = t.getMinutes();
  const sec = t.getSeconds();
  const month = t.getMonth();
  const am = hours < 12 ? 'am' : 'pm';
  const ms = t.getTime() % 1000;
  let hours12 = hours % 12;
  hours12 = hours12 || 12;
  const fd = new Date(t.getFullYear(), 0, 1);
  const dayOfYear = Math.round((t - fd) / 8.64e7);
  const weekNum = Math.ceil((((t - fd) / 8.64e7) + fd.getDay() - 1) / 7);
  const a = {
    d: lz(date),
    D: dayName.substr(0, 3),
    l: dayName,
    w: day,
    j: date,
    z: dayOfYear,
    W: weekNum,
    M: months[month].substr(0, 3),
    F: months[month],
    Y: year,
    a: am,
    A: am.toUpperCase(),
    y: year.toString().substr(2, 2),
    c: t.toISOString(),
    m: lz(month + 1),
    U: Math.round(t / 1000),
    g: hours12,
    G: lz(hours12),
    h: hours,
    H: lz(hours),
    i: lz(min),
    s: lz(sec),
    e: ms,
  };
  const v = [];
  Object.keys(a).forEach((k) => {
    v.push(`(\\\\)?${k}`);
  });
  return fmt.replace(new RegExp(v.join('|'), 'g'), (k) => {
    if (a[k]) return a[k];
    return k.replace('\\', '');
  });
};


/* formatTime 与当前时间的间隔
-------------------------- */
export const formatTime = (time) => {
  let result = '';
  const now = new Date().getTime();
  const oldTime = new Date(time).getTime();
  const difference = now - oldTime;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;
  const y = difference / year;
  const m = difference / month;
  const w = difference / (7 * day);
  const d = difference / day;
  const h = difference / hour;
  const min = difference / minute;

  if (y >= 1) {
    result = `${Math.floor(y)} 年前`;
  } else if (m >= 1) {
    result = `${Math.floor(m)} 个月前`;
  } else if (w >= 1) {
    result = `${Math.floor(w)} 周前`;
  } else if (d >= 1) {
    result = `${Math.floor(d)} 天前`;
  } else if (h >= 1) {
    result = `${Math.floor(h)} 小时前`;
  } else if (min >= 1) {
    result = `${Math.floor(min)} 分钟前`;
  } else {
    result = '刚刚';
  }
  return result;
};

export default {
  install(Vue) {
    // eslint-disable-next-line
    Vue.hp = Vue.prototype.$hp = {
      resp,
      getType,
      formatDate,
      formatTime,
    };
  },
};
