import 'babel-polyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
import actions from './action'
import * as getters from './getter'

Vue.use(Vuex)
const state = {
  config: {
    headers: { "Content-Type": "application/x-www-form-urlencoded"},
    withCredentials: true
  },
  JSESSIONICookie: '',
  Globalusername: localStorage.getItem('username'), //全局账号
  img:0, //全局头像
  balance:localStorage.getItem('balance'), //全局余额
  userType: localStorage.getItem('userType'), //0会员，1代理
  loginStatus: Boolean(localStorage.getItem("loginStatus")), //是否登录
  userInfo: null, //用户信息
  imgPath: null, //头像地址
  cacheTime:3600000,//缓存1个小时
  k3:'dfk3',
  ssc:'sj1fc',
  pk10:'ffpk10',


  //游戏投注相关
  current_player_groups: {}, //当前玩法树
  current_player_bonus: {}, //当前玩法树
  money: "", //投注金额  
  zhu: 0, //注单数
  con: "", //已选号码
  spinner3:0,//当前投注倍数
  lottName:'',//当前彩种名
  seasonId:'',//当前奖期
  className:'',//玩法ID
  orderList:null,//我的投注
  getPastOpens:null,//获取开奖号码
  pd: {
    addTitle: "单挑一骰",
    addCon: null,
    addPattern: "元",
    addzhu: null,
    addMoney: null,
    addClassName: null,
    addSeasonId: null,
    addName: "宏發快3"
  },
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
