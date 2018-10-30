export const basicInfoRules = {
  cName: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  userNO: [
    { required: true, message: '请输入编号', trigger: 'blur' },
  ],
  domainId: [
    { required: true, message: '请选择办公室', trigger: 'change' },
  ],
  quarters: [
    { required: true, message: '请选择职务', trigger: 'change' },
  ],
};

export default {
  basicInfoRules,
};
