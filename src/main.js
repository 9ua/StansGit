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
import GeminiScrollbar from 'vue-gemini-scrollbar'
import Loading from "./components/loading/index"
Vue.use(Loading);
Vue.use(GeminiScrollbar)
Vue.use(YDUI);
Vue.use(ElementUI);
Vue.use(MuseUI);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
// 登陆拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("loginStatus") === true) {
      next();
    } else if (localStorage.getItem("loginStatus") === false) {
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
  //设置<title>
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    next();
  }
});
//控制页面同时多个请求重复show loading；
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    Vue.prototype.$loader.show();
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    Vue.prototype.$loader.hide();
  }
}
//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.withCredentials = true;
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    // showFullScreenLoading();
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    //当返回信息为未登录或者登录失效的时候重定向为登录页面
    if (response.data.status == "302") {
      router.push({
        path: "/login",
        query: {
          redirect: router.currentRoute.fullPath
        } //从哪个页面跳转
      })
    }
    // tryHideFullScreenLoading();
    return response;
  },
  error => {
    tryHideFullScreenLoading();
    return Promise.reject(error)
  }
)
// 超时时间
axios.defaults.timeout = 5000
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: {
    App
  },
  template: '<App/>'
})
