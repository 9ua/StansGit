<template lang='jade'>
.bet
  bet-content-top(@emitget='emitGet', ref='betContentTop')
  .lottBox
    .lott-left
      lott-left-nav(@exit='exit')
      bet-content-k(@cleartimeinters='clearTimeInters', ref='betContentK', v-if="$route.params.id === 'k3'")
      bet-content-s(@cleartimeinters='clearTimeInters', ref='betContentS', v-if="$route.params.id === 'ssc'")
      bet-content-p(@cleartimeinters='clearTimeInters', ref='betContentP', v-if="$route.params.id === 'pk10'")
      bet-content-x(@cleartimeinters='clearTimeInters', ref='betContentX', v-if="$route.params.id === 'x11x5'")
      hurdle(ref='hurdles', @iscreat='iscreat')
    .lott-right
      today-lottery-k(@emitget='emitGet', v-if='$route.params.id === "k3"')
      today-lottery-s(@emitget='emitGet', v-if="$route.params.id === 'ssc'")
      today-lottery-p(@emitget='emitGet', v-if="$route.params.id === 'pk10'")
      today-lottery-x(@emitget='emitGet', v-if="$route.params.id === 'x11x5'")
      beting(@emitget='emitGet')
      winning
  detailpop    
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import lottLeftNav from "./lottLeftNav.vue"; //彩种选择导航
import todayLotteryK from "./todayLotteryK3.vue"; //今日开奖
import todayLotteryS from "./todayLotterySSC.vue"; //今日开奖
import todayLotteryP from "./todayLotteryPK10.vue"; //今日开奖
import todayLotteryX from "./todayLotteryX11X5.vue"; //今日开奖
import beting from "./beting.vue"; //我的投注
import winning from "./winning.vue"; //中奖信息、昨日盈利榜
import betContentTop from "./betContentTop.vue"; //头部
import betContentK from "./betContentK3.vue"; //选号模块
import betContentS from "./betContentSSC.vue"; //选号模块
import betContentP from "./betContentPK10.vue"; //选号模块
import betContentX from "./betContentX11X5.vue"; //选号模块
import hurdle from "./hurdle.vue"; //号码
import detailpop from './detailpop.vue';//中奖通知
export default {
  data() {
    return {
      playGroups: {}, //玩法树
      playBonus: {}, //玩法树
      lotteryId: "gsk3", //彩种id
      arrpeilva: [],
      arrpeilvb: [],
      arrpeilvc: [],
      splayGroups: [],
      sgroups: [],
      sgroups2: [],
      splayers: [],
      snumView: [],
      current_player: null,
      player_bonus: [],
    };
  },
  mounted() {
    this.getPlayTree();
  },
  beforeDestroy() {
    this.iscreat();
  },
  methods: {
    //清除定时器
    clearTimeInters() {
      this.$refs.betContentTop.clearTimeInter();
    },
    //清空号码篮
    exit() {
      this.$refs.hurdles.exit();
    },
    //我的投注，投注记录
    emitGet() {
      this.$refs.hurdles.getbetOrderList();
    },
    //清空方法
    iscreat() {
      if (this.$route.params.id === "k3") {
        this.$refs.betContentK.iscreat();
      }
      if (this.$route.params.id === "ssc") {
        this.$refs.betContentS.iscreat();
      }
      if (this.$route.params.id === "pk10") {
        this.$refs.betContentP.iscreat();
      }
      if (this.$route.params.id === "x11x5") {
        this.$refs.betContentX.iscreat();
      }
    },
    //获取系统时间
    geteServerTime() {
      this.$refs.betContentTop.geteServerTime();
    },
    //玩法术
    getPlayTree() {
      if(localStorage.getItem("getPlayTree_playGroups_" + this.$route.params.group) !== null){
        if(this.$route.params.id === 'k3'){
          this.playGroups = JSON.parse(localStorage.getItem("getPlayTree_playGroups_" + this.$route.params.group));
          this.player_bonus = JSON.parse(localStorage.getItem("getPlayTree_playBonus_" + this.$route.params.group));
          this.setupPlayTree(this.playGroups);
        }else{
          this.playGroups = JSON.parse(localStorage.getItem("getPlayTree_playGroups_" + this.$route.params.group));
        }
      }else{
        this.$axios.get(baseUrl + "/api/lottery/getPlayTree?lotteryId="+this.$route.params.group).then(res =>{
          if(this.$route.params.id === 'k3'){
            localStorage.setItem("getPlayTree_playGroups_"+ this.$route.params.group,JSON.stringify(res.data.data.playGroups));
            localStorage.setItem("getPlayTree_playBonus_"+ this.$route.params.group,JSON.stringify(res.data.data.playBonus));
            this.playGroups = JSON.parse(localStorage.getItem("getPlayTree_playGroups_" + this.$route.params.group));
            this.player_bonus = JSON.parse(localStorage.getItem("getPlayTree_playBonus_" + this.$route.params.group));
            this.$store.commit("CURRENT_PLAYER_BONUS", this.playBonus);
            this.setupPlayTree(this.playGroups);
          }else{
            localStorage.setItem("getPlayTree_playGroups_"+ this.$route.params.group,JSON.stringify(res.data.data.playGroups));
            this.$store.commit("CURRENT_PLAYER_GROUPS", this.playGroups);
          }
        }).catch(error =>{
          console.log(error);
        });
      }
    },
    setupPlayTree(playGroups) {
      let arr1 = [];
      let arr2 = [];
      let arrpeilv1 = this.player_bonus[3].bonusArray;
      let arrpeilv2 = this.player_bonus[4].bonusArray;
      for (let i in arrpeilv1) {
        this.arrpeilva.push(arrpeilv1[i]);
      }
      for (let i = 0; i < this.arrpeilva.length / 2; i++) {
        arr1.push(this.arrpeilva[i]);
      }
      for (
        let i = this.arrpeilva.length / 2;
        i < this.arrpeilva.length;
        i++
      ) {
        arr2.push(this.arrpeilva[i]);
      }
      for (let i in arrpeilv2) {
        this.arrpeilvb.push(arrpeilv2[i]);
      }
      this.arrpeilvc.push(arr1);
      this.arrpeilvc.push(arr2);
      this.arrpeilvc.push(this.arrpeilvb);
      for (let i = 0; i < this.playGroups.length; i++) {
        for (let j = 0; j < this.playGroups[i].groups.length; j++) {
          for (let k = 0;k < this.playGroups[i].groups[j].players.length;k++) {
            for (let l = 0;l <this.playGroups[i].groups[j].players[0].numView.length;l++) {
              for (let m = 0;m <this.playGroups[i].groups[j].players[0].numView[l].nums.length;m++) {
                if (i === 2) {
                  this.playGroups[2].groups[j].players[0].numView[l].nums[m]["lottRot"] = this.arrpeilvc[l][m];
                }
              }
            }
          }
        }
      }
      localStorage.setItem("getPlayTree_playGroups_"+ this.$route.params.group,JSON.stringify(this.playGroups));
      for (let i = 0; i < playGroups.length; i++) {
        this.splayGroups.push(playGroups[i]);
      }
      for (let j = 0; j < this.splayGroups.length; j++) {
        this.sgroups.push(this.splayGroups[j].groups);
      }
      for (let k = 0; k < this.sgroups.length; k++) {
        for (let j = 0; j < this.sgroups[k].length; j++) {
          this.sgroups2.push(this.sgroups[k][j]);
        }
      }
      this.$store.commit("SGROUPS2", this.sgroups2);
    }
  },
  components: {
    lottLeftNav,
    todayLotteryK,
    todayLotteryS,
    todayLotteryP,
    todayLotteryX,
    beting,
    winning,
    betContentTop,
    betContentK,
    betContentS,
    betContentP,
    betContentX,
    hurdle,
    detailpop
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/bet.scss";
@import "@/assets/scss/lotterbet/lottlist.scss";
</style>
