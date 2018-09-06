<template>
  <div class="bet">
    <bet-content-top @emitGet="emitGet" ref="betContentTop"></bet-content-top>
    <div class="lottBox">
      <div class="lott-left">
        <lott-left-nav @geteServerTime='geteServerTime' @exit='exit'></lott-left-nav>
        <bet-content-k @clearTimeInters='clearTimeInters' ref="betContentK" v-if="$route.params.id === 'k3'"></bet-content-k>
        <bet-content-s @clearTimeInters='clearTimeInters' ref="betContentS" v-if="$route.params.id === 'ssc'"></bet-content-s>
        <bet-content-p @clearTimeInters='clearTimeInters' ref="betContentP" v-if="$route.params.id === 'pk10'"></bet-content-p>
        <bet-content-x @clearTimeInters='clearTimeInters' ref="betContentX" v-if="$route.params.id === 'x11x5'"></bet-content-x>
        <hurdle ref="hurdles" @iscreat='iscreat'></hurdle>
      </div>
      <div class="lott-right">
        <today-lottery-k @emitGet="emitGet" v-if='$route.params.id === "k3"'></today-lottery-k>
        <today-lottery-s @emitGet="emitGet" v-if="$route.params.id === 'ssc'"></today-lottery-s>
        <today-lottery-p @emitGet="emitGet" v-if="$route.params.id === 'pk10'"></today-lottery-p>
        <today-lottery-x @emitGet="emitGet" v-if="$route.params.id === 'x11x5'"></today-lottery-x>
        <beting></beting>
        <winning></winning>
      </div>
    </div>
  </div>
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
      current_player: null
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
    clearTimeInters(){
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
      // if (localStorage.getItem("getPlayTree_playGroups_"+this.$route.params.id) !== null) {
      if (this.$route.params.id === "k3") {
        this.playGroups = JSON.parse(
          localStorage.getItem(
            "getPlayTree_playGroups_" + this.$route.params.id
          )
        );
        this.playBonus = JSON.parse(
          localStorage.getItem("getPlayTree_playBonus_" + this.$route.params.id)
        );
        this.$store.commit("CURRENT_PLAYER_GROUPS", this.playGroups);
        this.$store.commit("CURRENT_PLAYER_BONUS", this.playBonus);
      } else {
        this.playGroups = JSON.parse(
          localStorage.getItem(
            "getPlayTree_playGroups_" + this.$route.params.id
          )
        );
        this.$store.commit("CURRENT_PLAYER_GROUPS", this.playGroups);
      }
      this.setupPlayTree(this.playGroups);
      // }
      // else {
      //   this.$axios.get(baseUrl +"/api/lottery/getPlayTree?lotteryId=" +this.$route.params.group).then(res => {
      //     if(this.$route.params.id === 'k3'){
      //       localStorage.setItem("getPlayTree_playGroups_"+this.$route.params.id,JSON.stringify(res.data.data.playGroups));
      //       localStorage.setItem("getPlayTree_playBonus_"+this.$route.params.id,JSON.stringify(res.data.data.playBonus));
      //       this.playGroups = JSON.parse(localStorage.getItem("getPlayTree_playGroups_"+this.$route.params.id));
      //       this.playBonus = JSON.parse(localStorage.getItem("getPlayTree_playBonus_"+this.$route.params.id));
      //       this.$store.commit("CURRENT_PLAYER_GROUPS",this.playGroups);
      //       this.$store.commit("CURRENT_PLAYER_BONUS",this.playBonus);
      //     }else{
      //       localStorage.setItem("getPlayTree_playGroups_"+this.$route.params.id,JSON.stringify(res.data.data.playGroups));
      //       this.playGroups = JSON.parse(localStorage.getItem("getPlayTree_playGroups_"+this.$route.params.id));
      //       this.$store.commit("CURRENT_PLAYER_GROUPS",this.playGroups);
      //     }
      //     this.setupPlayTree(this.playGroups);
      //   })
      //   .catch(error => {
      //     console.log("玩法术,No");
      //   });
      // }
    },
    setupPlayTree(playGroups) {
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
    hurdle
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/bet.scss";
@import "@/assets/scss/lotterbet/lottlist.scss";
</style>
