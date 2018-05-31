import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './action'
import axios from 'axios';
import {
  setStore,
  getStore,
  removeStore
} from '../config/mutil'

Vue.use(Vuex)

const state = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'multipart/form-data'
  },
  JSESSIONICookie: '',
//   url: 'http://115.144.238.217/',
//   url:'http://chinahuiji.com/',
  // url:'http://glorystudy.com/',
 
  //url: 'http://115.144.238.217/',  
  loginStatus: getStore('loginSta'), //登陆状态
  Globalusername: getStore('username'), //全局账号
  Globalpassword: getStore('password'), //全局密码
  newDate: new Date().getTime(), //获取时间戳
  captchaCodeImg: {}, //验证码地址
  errorcode: 0, //输入错误次数
  balance: null, //余额
  image: getStore('image'), //用户头像
  nickname: getStore('nickname'), //用户昵称
  mobile: getStore('mobile'), //手机
  email: getStore('email'), //邮箱
  sex: getStore('sex'), //性别ID
  birthday: getStore('birthday'), //生日
  userType: getStore('userType'), //member type
  playBonusk3: null,
  playGroupsssc: null,
  // playBonusk3: JSON.parse(getStore('playBonusk3')),
}
//console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    state.url = 'https://'+location.hostname.replace('m.', '')+'/';
} else {
   state.url = 'http://115.144.238.217/';
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
