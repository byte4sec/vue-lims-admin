import Vue from 'vue';

import ElementUI from 'element-ui';

import '@fortawesome/fontawesome-free/css/all.min.css'; // icon fas

import App from './App.vue';
import router from './router';
import store from './store';

import './styles/style.scss';

// vue 扩展
import './plugins/extend/ie';          // IE 兼容处理
import './plugins/extend/filters';     // 全局过滤器
import './plugins/extend/directives';  // 全局指令

import './mock'; // 模拟数据

import Axios from './plugins/axios';
import Echarts from './plugins/echarts';
import Enum from './plugins/enum';
import Helper from './plugins/helper';

Vue.use(ElementUI, { size: 'mini', zIndex: 2000 });

Vue.use(Axios);
Vue.use(Echarts);
Vue.use(Enum);
Vue.use(Helper);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
