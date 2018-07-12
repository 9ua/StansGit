import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './action'
import getter from './getter'

Vue.use(Vuex)
const state = {
  config: {
    headers: { "Content-Type": "application/x-www-form-urlencoded"},
    withCredentials: true
  },
  JSESSIONICookie: '',
  Globalusername: localStorage.getItem('username'), //全局账号
  img:localStorage.getItem('img'), //全局头像
  balance:localStorage.getItem('balance'), //全局余额
  userType: localStorage.getItem('userType'), //0会员，1代理
  loginStatus: Boolean(localStorage.getItem("loginStatus")), //是否登录
  userInfo: null, //用户信息
  imgPath: null, //头像地址
  cacheTime:3600000,//缓存1个小时
  k3:'dfk3',
  ssc:'sj1fc',
  pk10:'ffpk10',
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getter
})
