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
    // state.current_player_groups = flag
    if (flag === "clear") { //清空选择状态以及不可选择状态
      state.dmArr = [];
      state.dmNum = "";
      if (state.current_player_groups.numView) {
        state.current_player_groups.numView.forEach((item1, index1) => {
          if (item1.nums) {
            item1.nums.forEach((item2, index2) => {
              if (item2.choose === true) {
                state.current_player_groups.numView[index1].nums[
                  index2
                ].choose = false;
              }
              if (item2.noVisible === true) {
                state.current_player_groups.numView[index1].nums[
                  index2
                ].noVisible = false;
              }
            });
          }
        });
      }
    } else if (flag.target === "chooseFalse") { //选中胆码取消拖码选中
      state.current_player_groups.numView[1].nums[
        flag.index
      ].choose = false;
    } else if (flag.target === "clearVisiable") { //清除拖码不可选择控制
      state.current_player_groups.numView[0].nums.forEach((item, index) => {
        if (item.choose === false) {
          state.current_player_groups.numView[1].nums[index].noVisible = false;
        }
      })
    } else if (flag.target === "noVisiable") { //控制拖码是否可选
      let target = flag.flag.split("noVtrue")[1]; //拖码不可选择
      if (target) {
        [...new Set(target)].forEach((item) => {
          state.current_player_groups.numView[item].nums[
            flag.index
          ].noVisible = true;
        })
      }
    } else if (flag.target === "fixDm") { //修正胆码排列
      if (state.dmArr.length > 0) {
        if (state.dmArr.length > state.dmNum) {
          state.dmArr.splice(-2, 1);
        }
        //先清空胆码
        state.current_player_groups.numView[0].nums.forEach(( index) => {
          state.current_player_groups.numView[0].nums[index].choose = false;
        })
        //然后重绘制胆码排列
        state.dmArr.forEach((item) => {
          let index = item[0] == "0" ? item[1] - 1 : item - 1;
          state.current_player_groups.numView[0].nums[index].choose = true;
        })
      }
    } else {
      state.current_player_groups = flag
    }
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
  //玩法菜单
  [SGROUPS2](state, flag){
    state.sgroups2 = flag
  },
  [SNUMVIEW](state, flag){
    state.snumView = flag
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
