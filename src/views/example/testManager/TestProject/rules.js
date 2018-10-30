// 基础信息
export const BasicInfoRules = {

  // 分析项目名称
  redAnalyzeItemName: [
    { required: true, message: '该项为必选项', trigger: 'change' },
  ],

  // 分析方法名称
  redAnalyzeMethodName: [
    { required: true, message: '该项为必选项', trigger: 'change' },
  ],

  // 样品类型
  sampleType: [
    { required: true, message: '该项为必选项', trigger: 'change' },
  ],

  // 测试资质
  cert: [
    { required: true, message: '该项为必选项', trigger: 'change' },
  ],

  // 计量单位
  dimensionId: [
    { required: true, message: '该项为必选项', trigger: 'change' },
  ],
};

export default {
  BasicInfoRules,
};
