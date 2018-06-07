// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import 'lib-flexible/flexible.js'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import theme from 'muse-ui/lib/theme';
theme.add('teal', {
  primary: '#2196f3',//主要的
  secondary: '#ff4081',//次要
  success: '#4caf50',//成功
  warning: '#fdd835',//失败
  info: '#2196f3',//警告
  error: '#f44336',//错误
  track: '#bdbdbd',//
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',//
    secondary: 'rgba(0, 0, 0, 0.54)',
    alternate: '#fff',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)' // 提示文字颜色
  },
  divider: 'rgba(0, 0, 0, 0.12)',//分隔线
  background: {
    paper: '#fff',//
    chip: '#e0e0e0',//
    default: '#fafafa'//
  }
}, 'light');

theme.use('teal');
Vue.use(MuseUI);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
