/* eslint-disable */

import Mock from 'mockjs';

const arr = [];
for (let i = 0; i < 50; i++) {
  arr.push(Mock.mock({
    'id|+1': 0,
    'rowGuid|32': '@word',
    'dictCode|10': '@word',
    'dictName|3-7': '@cword',
    'dictValue|1': '@word',
    'parentId|32': '@word',
    'entName': '@city@ctitle(1,4)有限公司',
    'regionName': '@county(true)',
    'date': '@date("yyyy-MM-dd")',
    'name': '@cname',
    'province': '@province',
    'city': '@city',
    'address': '@county(true)',
    'zip': '@string(number, 6, 6)',
    'formData|1-9': [
      {
        'label|1-3': '@cword',
        'value': '@word',
        'type': '@integer(1, 3)',
      },
    ],
  }));
}
const formData = Mock.mock({
  'formData|1-9': {
    '@word': {
      'label': '@cname',
      'value': '@name',
    },
  },
});

export default {
  getTableData() {
    return arr.slice(0, 5);
  },
  getFormData() {
    return formData;
  },
};
