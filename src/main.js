// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import theme from 'muse-ui/lib/theme';
import md5 from 'js-md5';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.px.css';

Vue.use(YDUI);
Vue.use(ElementUI);
Vue.use(MuseUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
// 登陆拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("loginStatus")) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
