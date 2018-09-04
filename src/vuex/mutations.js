import {
  OUT_LOGIN, //登出
  RECORD_USERINFO, //记录用户信息

  MONEY,//当前投注金额
  ZHU,//注单数
  CON,//投注内容
  BET_SUCCESS,//投注是否成功
  BET_GO_SHOW,//投注确认标识
  BET_NOT,//取消投注
  CURRENT_PLAYER_GROUPS,//当前玩法树
  PLAY_BONUS, //当前玩法树
  CURRENT_PLAYER_BONUS,//当前玩法树
  SGROUPS2,//玩法菜单
  LOTT_NAME,//当前彩种名
  SNUMVIEW,
  SEASONID,//当前奖期
  CLASSNAME,//玩法ID
  ORDER_LIST,//我的投注
  GET_PAST_OPENS,//获取开奖号码
  DMNUM, //胆码数组
  DMARR, //胆码最大可选数量
} from './mutation-types';

export default {
  //当前玩法树......GROUPS
  [CURRENT_PLAYER_GROUPS](state, flag) {
    state.current_player_groups = flag
  },
  //当前玩法树......BONUS
  [CURRENT_PLAYER_BONUS](state, flag) {
    state.current_player_bonus = flag
  },
  //当前奖期
  [SEASONID](state, flag) {
    state.seasonId = flag
  },
  //玩法ID
  [CLASSNAME](state, flag) {
    state.className = flag
  },
  //当前彩种名
  [LOTT_NAME](state, flag){
    state.lottName = flag
  },
  //获取开奖号码
  [GET_PAST_OPENS](state, flag){
    state.getPastOpens = flag
  },


  [ORDER_LIST](state, flag){
    state.orderList = flag
  },
  //登陆成功，记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
  },
  //退出登陆
  [OUT_LOGIN](state) {
    state.userInfo = {};
    state.loginStatus = fasle;
    localStorage.setItem("loginStatus", false);
    // localStorage.clear();
  },
}
