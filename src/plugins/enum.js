// 枚举常量 Enum Constant

const movieType = {
  1: '科幻',
  2: '恐怖',
  3: '动作',
  4: '纪实',
};

// 样品类型
const sampleType = {
  1: '水和废水',
  2: '噪声、振动',
  4: '空气和废气',
  8: '土壤、底质',
};

// 计量单位
const dimensionUnit = {
  1: 'μs/cm',
  2: 'mmol/L',
  3: 'm/s',
  4: 'μg/kg',
  5: 'μg/L',
  6: 'KPa',
  7: '个/mL',
  8: '稀释倍数',
  9: '个/L',
  10: '℃',
  11: 'dB(A)',
  12: 'mg/L',
  13: '万吨',
  14: '无量纲',
};

// 分析项目
const analysisItem = {
  1: '铵离子',
  2: 'Lmin',
  3: '五日生化需氧量',
  4: '噪声源噪声',
  5: '叶绿素a',
  6: '镁离子',
  7: '夜间Leq',
  8: '藻密度',
};

const analysisMethod = {
  '3.3.7.3': '钼酸铵分光光度法 《水和废水监测分析方法》（第四版） 国家环境保护总局 3.3.7.3',
  'GB/T10071': '《城市区域环境振动测量方法》',
  'HJ/T67': '《大气固定污染源氟化物的测定离子选择电极法》',
  'HJ/T64.1': '《大气固定污染源镉的测定火焰原子吸收分光光度法》',
  'HJ/T63.1': '《大气固定污染源锡的测定石墨炉原子吸收分光光度法》',
  'GB/T13580.4': '《大气降水PH值的测定电极法》',
};

// 资格
const cert = {
  0: '非认可认证',
  1: '认可',
  2: '认证',
  3: '认证认可',
};

// 曲线参数类型
const curveType = {
  1: '普通',
  2: '紫外',
  3: '荧光',
  4: '石墨炉',
};

// 控件类型
const componentType = {
  1: '文本控件',
  2: '数字控件',
  3: '日期控件',
  4: '下拉框控件',
  5: '单选组控件',
  6: '多选组控件',
  7: '日期时间控件',
  8: '文本区域控件',
  9: '时间控件',
};

// 进度条状态
const planStatus = {
  sure: 'progress-success',
  unsure: 'progress-warning',
  boom: 'progress-danger',
};

export default {
  install(Vue) {
    // eslint-disable-next-line
    Vue.enum = Vue.prototype.$enum = {
      movieType,
      sampleType,
      dimensionUnit,
      analysisItem,
      analysisMethod,
      cert,
      curveType,
      componentType,
      planStatus,
    };
  },
};
