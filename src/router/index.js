import { MessageBox  } from 'element-ui';
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

// 默认布局
import DefaultLayout from '../layouts/Default';
import EmbedLayout from '../layouts/Embed';

// 路由懒加载
const lazy = name => () => import(`../views/${name}`);

Vue.use(Router);

// 根据权限动态加载路由
export const asyncRoutesMap = [
  // 组件
  {
    path: '/component',
    name: 'component',
    redirect: { name: 'FormElement' },
    component: DefaultLayout,
    meta: { role: ['admin'], title: '组件', icon: 'b fa-codepen' },
    children: [
      {
        path: 'Editor',
        name: 'Editor',
        meta: { role: ['admin'], title: '富文本编辑器', icon: 's fa-edit' },
        component: lazy('component/Editor'),
      },
      {
        path: 'FileImport',
        name: 'FileImport',
        meta: { role: ['admin'], title: '文件导入' },
        component: lazy('component/FileImport'),
      },
      {
        path: 'FileUpload',
        name: 'FileUpload',
        meta: { role: ['admin'], title: '文件上传' },
        component: lazy('component/FileUpload'),
      },
      {
        path: 'TreeEdit',
        name: 'TreeEdit',
        meta: { role: ['admin'], title: '可编辑树' },
        component: lazy('component/TreeEdit'),
      },
      {
        path: 'DialogExtend',
        name: 'DialogExtend',
        meta: { role: ['admin'], title: '全屏收缩弹框' },
        component: lazy('component/DialogExtend'),
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    redirect: { name: 'FormulaInsert' },
    component: DefaultLayout,
    meta: { role: ['admin'], title: '表单', icon: 's fa-newspaper' },
    children: [
      {
        path: 'FormElement',
        name: 'FormElement',
        meta: { role: ['admin'], title: '基础元素' },
        component: lazy('form/FormElement'),
      },
      {
        path: 'FormulaInsert',
        name: 'FormulaInsert',
        meta: { role: ['admin'], title: '公式拼接' },
        component: lazy('form/FormulaInsert'),
      },
    ],
  },
  {
    path: '/table',
    name: 'table',
    redirect: { name: 'MultistageHeader' },
    component: DefaultLayout,
    meta: { role: ['admin'], title: '表格', icon: 's fa-table' },
    children: [
      {
        path: 'MultistageHeader',
        name: 'MultistageHeader',
        meta: { role: ['admin'], title: '多级表头' },
        component: lazy('table/MultistageHeader'),
      },
      {
        path: 'DynamicEdit',
        name: 'DynamicEdit',
        meta: { role: ['admin'], title: '动态可编辑单元格' },
        component: lazy('table/DynamicEdit'),
      },
      {
        path: 'TreeTable',
        name: 'TreeTable',
        meta: { role: ['admin'], title: '树型表格' },
        component: lazy('table/TreeTable'),
      },
      {
        path: 'DblclickCleanCol',
        name: 'DblclickCleanCol',
        meta: { role: ['admin'], title: '双击清除行' },
        component: lazy('table/DblclickCleanCol'),
      },
      {
        path: 'ProjectPmgressbar',
        name: 'ProjectPmgressbar',
        meta: { role: ['admin'], title: '项目进度条' },
        component: lazy('table/ProjectPmgressbar'),
      },
    ],
  },
  {
    path: '/grid',
    name: 'grid',
    redirect: { name: 'FormExtend' },
    component: DefaultLayout,
    meta: { role: ['admin'], title: '布局', icon: 's fa-columns' },
    children: [
      {
        path: 'BoundaryDrag',
        name: 'BoundaryDrag',
        meta: { role: ['admin'], title: '分栏边界拖拽' },
        component: lazy('grid/BoundaryDrag'),
      },
      {
        path: 'FormExtend',
        name: 'FormExtend',
        meta: { role: ['admin'], title: '动态收缩标签卡' },
        component: lazy('grid/FormExtend'),
      },
      {
        path: 'DynamicFormItem',
        name: 'DynamicFormItem',
        meta: { role: ['admin'], title: '动态表单项排版' },
        component: lazy('grid/DynamicFormItem'),
      },
      {
        path: 'BlockShrink',
        name: 'BlockShrink',
        meta: { role: ['admin'], title: '分块收缩布局' },
        component: lazy('grid/BlockShrink'),
      },
      {
        path: 'DynamicTab',
        name: 'DynamicTab',
        meta: { role: ['admin'], title: '动态选项卡传参' },
        component: lazy('grid/DynamicTab'),
      },
      {
        path: 'DragSearchData',
        name: 'DragSearchData',
        meta: { role: ['admin'], title: '拖拽与检索数据' },
        component: lazy('grid/DragSearchData'),
      },
      {
        path: 'TitleButton',
        name: 'TitleButton',
        meta: { role: ['admin'], title: '标题按钮' },
        component: lazy('grid/TitleButton'),
      },
      {
        path: 'MoreTabs',
        name: 'MoreTabs',
        meta: { role: ['admin'], title: '多标签页' },
        component: lazy('grid/MoreTabs'),
      },
      {
        path: 'MoreTables',
        name: 'MoreTables',
        meta: { role: ['admin'], title: '多表格页' },
        component: lazy('grid/MoreTables'),
      },
      {
        path: 'SingleStepDebug',
        name: 'SingleStepDebug',
        meta: { role: ['admin'], title: '单步调试' },
        component: lazy('grid/SingleStepDebug'),
      },
      {
        path: 'TabSwitchHint',
        name: 'TabSwitchHint',
        meta: { role: ['admin'], title: '标签切换保存提示' },
        component: lazy('grid/TabSwitchHint'),
      },
    ],
  },
  // 综合实例
  {
    path: '/example',
    name: 'example',
    redirect: { name: 'CRUD' },
    component: DefaultLayout,
    meta: { role: ['admin'], title: '综合实例', icon: 's fa-feather-alt' },
    children: [
      {
        path: 'StaffManagement',
        name: 'StaffManagement',
        meta: { role: ['admin'], title: '人员管理' },
        component: lazy('example/StaffManagement'),
      },
      {
        path: 'testProject',
        name: 'testManagement',
        redirect: '/TestProject',
        meta: { role: ['admin'], title: '测试管理' },
        component: EmbedLayout,
        children: [
          {
            path: 'TestProject',
            name: 'TestProject',
            meta: { role: ['admin'], title: '测试项目管理' },
            component: lazy('example/testManager/TestProject'),
          },
          {
            path: 'AnalyzeProject',
            name: 'AnalyzeProject',
            meta: { role: ['admin'], title: '分析项目管理' },
            component: lazy('example/testManager/AnalyzeProject'),
          },
          {
            path: 'AnalyzeMethod',
            name: 'AnalyzeMethod',
            meta: { role: ['admin'], title: '分析方法管理' },
            component: lazy('example/testManager/AnalyzeMethod'),
          },
        ],
      },
    ],
  },
  { path: '*', redirect: '/404', hidden: true },
];

// 无权限页面
export const routesMap = [
  {
    path: '/',
    name: 'index',
    redirect: '/index',
    meta: { role: false, title: '主页', icon: 's fa-home' },
    component: DefaultLayout,
    children: [
      {
        path: '/index',
        component: lazy('Home'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: { role: false },
    component: lazy('Login'),
    hidden: true,
  },
  {
    path: '/404',
    name: 'NotFound',
    meta: { role: false },
    component: lazy('404'),
    hidden: true,
  },
];

const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.BASE_URL,
  routes: routesMap,
});

// 全局拦截
router.beforeEach((to, form, next) => {
  // 判断是否保存提示页面
  if (store.state.isSaveTags.length) {
    if (store.state.isSaveTags.find(v => v === form.name)) {
      MessageBox.confirm('未保存数据, 离开当前选项卡会丢失未保存数据, 是否离开?', '提示').then(() => {
        store.commit('RemoveIsSaveTags', form.name);
        next();
      }).catch(() => {
        next(false);
      });
      return;
    }
  }
  // 判断是否有token
  if (to.name !== 'login' && !store.state.auth.token) {
    next('login');
    return;
  }
  // 排除无权限页面
  if (to.meta && !to.meta.role) {
    next();
  }
  // 是否已获取用户信息
  if (!store.state.auth.roles.length && store.state.auth.token) {
    // 获取用户信息
    store.dispatch('auth/GetInfo').then(() => {
      // 生成可访问路由
      store.dispatch('auth/CreateRoutes').then(() => {
        // 动态加载可访问路由
        router.addRoutes(store.state.auth.addRouters);
        // hack方法 确保addRoutes已完成
        next({ ...to, replace: true });
      });
    });
  }
  next();
});

export default router;
