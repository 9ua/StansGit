import {
  RETSET_NAME, //修改用户名
  OUT_LOGIN, //登出
  GET_USERINFO, //获取用户信息
  RECORD_USERINFO, //记录用户信息
} from './mutation-types';
import {
  setCookie,
  getCookie
} from '../assets/js/utils';
export default {
  //登陆成功，记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
  },
  //退出登陆
  [OUT_LOGIN](state) {
    state.userInfo = {};
    state.loginStatus = fasle;
    localStorage.setItem("loginStatus", false);
    console.log("mutations:"+localStorage.getItem("loginStatus"));
    console.log("state:"+state.loginStatus);
  },
}
