import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './action'
import getter from './getter'

Vue.use(Vuex)
const state = {
  config: {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
  },
  loginStatus: false, //是否登录
  userInfo: null, //用户信息
  imgPath:null,//头像地址
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getter
})
