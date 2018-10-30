/* eslint-disable */

import Vue from 'vue';
import Mock from 'mockjs';
import qs from 'qs';

// 模拟数据量
const count = 100;

// 查询字段
const queryField = {
  cName: 'string',
  userNO: 'string',
  domainId: 'string',
};

// 规则字段
const rulesField = {
  'personId': '@increment(1)',                  // Guid
  'cName': '@cname',                            // 性名
  'userNO': '@word(1, 2)',                      // 用户编号
  'domainId': '@cword(4, 7)',                   // 办公室
  'quarters': '@cword(2, 5)',                   // 职务
  'eName': '@name',                             // 英文名
  'birthDay': '@date("yyyy-MM-dd")',            // 出生日期
  'email': '@email',                            // 个人邮箱
  'sex': '@pick(["男", "女"])',                 // 性别
  'idCard': '@id',                              // 身份证号
  'nation': '@cword(2)',                        // 国籍
  'orderNum': '@integer(1, 9)',                 // 排序值
  'degree': '@ctitle(4, 5)',                    // 学历
  'highestDegree': '@ctitle(4, 5)',             // 最高学历
  'school': '@ctitle(5, 7)',                    // 毕业院校
  'specialty': '@ctitle(5, 7)',                 // 专业
  'mobile': '@string("number", 11)',            // 手机
  'homeTel': '@string("number", 8)',            // 固定电话
  'birthPlace': '@county(true)',                // 出生地
  'homeAddress': '@county(true)',               // 地址
  'technicalTitle': '@ctitle',                  // 技术职称
  'technicalTitleDate': '@date("yyyy-MM-dd")',  // 职称获得时间
  'technologyNO': '@ctitle',                    // 技术资格
  'certificateNO': '@word',                     // 作业准入证书
  'certificateDate': '@date("yyyy-MM-dd")',     // 获得作业准入证书日期
  'yearsInThePosition': '@integer(1, 9)',       // 在岗时间
  'joinCompanyTime': '@date("yyyy-MM-dd")',     // 入职日期
  'workStartTime': '@date("yyyy-MM-dd")',       // 开始工作时间
  'leaveCompanyTime': '@date("yyyy-MM-dd")',    // 离职日期
  'domainIdArr': '@range(2, 24, 2)',            // 关键岗位
  'tecCompetence': '@cparagraph(1)',            // 技术能力
  'remark': '@cparagraph',                      // 备注
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
