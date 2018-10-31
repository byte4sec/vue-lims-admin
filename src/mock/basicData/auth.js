export default {
  // token
  login: {
    'token|10': '@word',
  },
  // 用户信息
  getUser: {
    name: '小彩蛋',
    roles: ['admin'],
  },
  // 刷新 token
  refreshToken: {
    rows: {
      'token|12': '@word',
    },
  },
  // 获取侧栏菜单
  getMenus: {
    data: [
      {
        moduleUrl: '',
        label: 'LIMS 实验室管理系统',
        icon: '',
        children: [
          {
            moduleUrl: 'component',
            label: '组件',
            icon: 'fab fa-codepen',
            children: [
              { moduleUrl: 'Editor', label: '富文本编辑器', icon: '' },
              { moduleUrl: 'FileImport', label: '文件导入', icon: '' },
              { moduleUrl: 'FileUpload', label: '文件上传', icon: '' },
              { moduleUrl: 'TreeEdit', label: '可编辑树', icon: '' },
              { moduleUrl: 'DialogExtend', label: '全屏收缩弹框', icon: '' },
            ],
          },
          {
            moduleUrl: 'form',
            label: '表单',
            icon: 'fas fa-newspaper',
            children: [
              { moduleUrl: 'FormElement', label: '基础元素', icon: '' },
              { moduleUrl: 'FormulaInsert', label: '公式拼接', icon: '' },
            ],
          },
          {
            moduleUrl: 'table',
            label: '表格',
            icon: 'fas fa-table',
            children: [
              { moduleUrl: 'MultistageHeader', label: '多级表头', icon: '' },
              { moduleUrl: 'DynamicEdit', label: '动态可编辑单元格', icon: '' },
              { moduleUrl: 'TreeTable', label: '树型表格', icon: '' },
              { moduleUrl: 'DblclickCleanCol', label: '双击清除行', icon: '' },
              { moduleUrl: 'ProjectPmgressbar', label: '项目进度条', icon: '' },
            ],
          },
          {
            moduleUrl: 'grid',
            label: '布局',
            icon: 'fas fa-columns',
            children: [
              { moduleUrl: 'BoundaryDrag', label: '分栏边界拖拽', icon: '' },
              { moduleUrl: 'FormExtend', label: '动态收缩标签卡', icon: '' },
              { moduleUrl: 'DynamicFormItem', label: '动态表单项排版', icon: '' },
              { moduleUrl: 'BlockShrink', label: '分块收缩布局', icon: '' },
              { moduleUrl: 'DynamicTab', label: '动态选项卡传参', icon: '' },
              { moduleUrl: 'DragSearchData', label: '拖拽与检索数据', icon: '' },
              { moduleUrl: 'labelButton', label: '标题按钮', icon: '' },
              { moduleUrl: 'MoreTabs', label: '多标签页', icon: '' },
              { moduleUrl: 'MoreTables', label: '多表格页', icon: '' },
              { moduleUrl: 'SingleStepDebug', label: '单步调试', icon: '' },
              { moduleUrl: 'TabSwitchHint', label: '标签切换保存提示', icon: '' },
            ],
          },
          {
            moduleUrl: 'example',
            label: '综合实例',
            icon: 'fas fa-feather-alt',
            children: [
              { moduleUrl: 'staffManagement', label: '人员管理', icon: '' },
              {
                moduleUrl: 'testManagement',
                label: '测试管理',
                icon: '',
                children: [
                  { moduleUrl: 'TestProject', label: '测试项目管理' },
                  { moduleUrl: 'AnalyzeProject', label: '分析项目管理' },
                  { moduleUrl: 'AnalyzeMethod', label: '分析方法管理' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
