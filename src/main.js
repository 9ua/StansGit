// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import theme from 'muse-ui/lib/theme'
import md5 from 'js-md5'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.px.css'
import GeminiScrollbar from 'vue-gemini-scrollbar'
import Loading from "./components/loading/index"
import popTo from "./components/loading/pop"
import './assets/iconfont/iconfont.css'

Vue.use(popTo);
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
    if (store.state.loginStatus) {
      next();
    } else{

      next({
        path: '/login/ashore',
        query: {
          redirect: to.fullPath
        }
      });
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
  //游戏页面，点击浏览器后退按钮，直接返回上一次进来的页面
  if (to.meta.allowBack) {
    window.addEventListener('popstate', function () {
      // history.go(-store.state.historyNum);
      router.push("/home")
    });
  }
});
//控制页面同时多个请求重复show loading；
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    Vue.prototype.$loader.show();
    Vue.prototype.$pop.show();
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    Vue.prototype.$loader.hide();
    Vue.prototype.$pop.hide();
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
axios.interceptors.response.use(data => { // 响应成功关闭loading
  if (data.data.status === 302) {
    router.push('/login/ashore');
    this.$store.state.loginStatus = false;
  }
  if (data.data.pup === true) {
    if (data.data.data.message && data.data.data.message !== "参数错误") {
      Vue.prototype.$pop.show({error:'',title:'温馨提示',content:data.data.data.message,content1:'',content2:'',number:1});
    } else {
      if (data.data.data !== "参数错误") {
        Vue.prototype.$pop.show({error:'',title:'温馨提示',content:data.data.data,content1:'',content2:'',number:1});
      }
    }
  }
  return data
}, error => {
  return Promise.reject(error)
})
// 超时时间
axios.defaults.timeout = 50000;

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