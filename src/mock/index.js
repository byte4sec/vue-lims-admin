import Mock from 'mockjs';

// 规则详见 https://github.com/nuysoft/Mock/wiki

// 模拟数据
import auth from './basicData/auth';
import list from './basicData/list';
// 模拟数据 - 可操作
import CRUD from './operData/CRUD';
import person from './operData/person';
import personWorkResume from './operData/personWorkResume';
import dynamicParam from './operData/dynamicParam';

// auth 登录相关
Mock.mock(/login/, 'post', auth.login);
Mock.mock(/getUser/, 'get', auth.getUser);

// 表单 - 动态参数显示
Mock.mock(/getTableData/, 'get', dynamicParam.getTableData);
Mock.mock(/getFormData/, 'get', dynamicParam.getFormData);

// 单步调试
Mock.mock(/getDebugData/, 'get', list.stopDebug);

// 综合案例 - 增删改查
Mock.mock(/queryMovie/, 'get', CRUD.queryList);
Mock.mock(/addMovie/, 'post', CRUD.createItem);
Mock.mock(/deleteMovie/, 'delete', CRUD.deleteItem);
Mock.mock(/updateMovie/, 'put', CRUD.updateItem);

// 综合案例 - 人员管理
Mock.mock(/api\/person/, 'get', person.queryList);
Mock.mock(/api\/person/, 'post', person.createItem);
Mock.mock(/api\/person/, 'put', person.updateItem);
Mock.mock(/api\/person/, 'delete', person.deleteItem);
Mock.mock(/api\/personWorkResume/, 'get', personWorkResume.queryList);
Mock.mock(/api\/personWorkResume/, 'post', personWorkResume.createItem);
Mock.mock(/api\/personWorkResume/, 'put', personWorkResume.updateItem);
Mock.mock(/api\/personWorkResume/, 'delete', personWorkResume.deleteItem);

// 综合案例 - 测试管理
Mock.mock(/test/, 'get', list.TestProject);

// 动态树
Mock.mock(/api\/operateTree/, 'get', list.operateTree);

// 布局 - 拖拽与检索数据
Mock.mock(/api\/dragSearchData/, 'get', list.DragSearchData);

// 响应时间设置
Mock.setup({ timeout: '100-1000' });
