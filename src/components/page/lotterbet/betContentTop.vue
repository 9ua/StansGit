<template>
<!-- 头部 -->
  <div class="lott-top">
    <div class="lott-top-left">
      <img :src='"@/assets/img/lott/"+$route.params.id+".png"' alt="" />
      <span>{{lottName}}</span>
    </div>
    <div class="lott-top-middle k3">
      <p>第
        <span>{{seasonId}}</span>期 剩余投注时间</p>
      <div>{{countDown}}</div>
    </div>
    <div class="lott-top-right k3" v-if="$route.params.id === 'k3'">
      <p>第
        <span>{{lastSeasonId}}</span>期 开奖结果</p>
      <div class="showGif" v-show="isshowGif">
        <span v-for="(item,index) in 3"></span>
      </div>
      <div class="showName" v-show="!isshowGif">
        <img :src='"@/assets/img/lott/k3n"+n1+".jpg"' alt="">
        <img :src='"@/assets/img/lott/k3n"+n2+".jpg"' alt="">
        <img :src='"@/assets/img/lott/k3n"+n3+".jpg"' alt=""> </div>
    </div>
    <div class="lott-top-right ssc" v-if="$route.params.id === 'ssc'">
      <p>第
        <span>{{lastSeasonId}}</span>期 开奖结果</p>
      <div class="showName" v-show="!isshowGif">
        <span v-for="(item,index) in nBox" v-if="index < 5">{{item}}</span>
      </div>
      <div class="showGif" v-show="isshowGif">
        <span v-for="(item,index) in 5"></span>
      </div>
    </div>
    <div class="lott-top-right pk10" v-if="$route.params.id === 'pk10'">
      <p>第
        <span>{{lastSeasonId}}</span>期 开奖结果</p>
      <div class="showName" v-show="!isshowGif">
        <span v-for="(item,index) in nBox">{{item}}</span>
      </div>
      <div class="showGif" v-show="isshowGif">
        <span v-for="(item,index) in 10"></span>
      </div>
    </div>
    <div class="lott-top-right ssc" v-if="$route.params.id === 'x11x5'">
      <p>第
        <span>{{lastSeasonId}}</span>期 开奖结果</p>
      <div class="showName" v-show="!isshowGif">
        <span v-for="(item,index) in nBox" v-if="index < 5">{{item &lt; 10 ? "0"+item : item}}</span>
      </div>
      <div class="showGif" v-show="isshowGif">
        <span v-for="(item,index) in 5"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      isshowGif: false,
      today: "",
      countDown: "",
      timer: "",
      timer2: "",
      lastSeasonId: null, //当前期
      seasonId: null, //下一期
      n1: 2,
      n2: 4,
      n3: 6,
      getCurrentSaleTime: null, //获取彩種當前獎期時間
      lotteryList: null,
      getPastOpens: null,
      getPastOpenB: null,
      nBox: [1, 3, 5, 7, 9, 2, 4, 6, 8, 10],
    };
  },
  beforeDestroy(){
    clearInterval(this.timer);
    clearTimeout(this.timer2);
  },
  computed:{
    lottName(){
      return this.$store.state.lottName;
    },
  },
  mounted() {
    this.geteServerTime();
  },
  methods: {
    //获取彩種當前獎期時間
    geteServerTime() {
      clearInterval(this.timer);
      this.$axios
        .get(baseUrl + "/api/lottery/getCurrentSaleTime", {
          params: { lotteryId: this.$route.params.group }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.getCurrentSaleTime = res.data.data;
            this.today = res.data.data.restSeconds;
            this.lastSeasonId = this.getCurrentSaleTime.lastSeasonId;
            this.seasonId = this.getCurrentSaleTime.seasonId;
            this.$store.commit("SEASONID",this.seasonId);
            this.initSetTimeout(); //倒计时
            this.getPastOp(); //获取过去开奖号码10个
          }
        });
    },
    //获取过去开奖号码10个
    getPastOp() {
      this.$axios
        .get(baseUrl + "/api/lottery/getPastOpen", {
          params: { lotteryId: this.$route.params.group, count: 10 }
        })
        .then(res => {
          this.getPastOpens = res.data.data;
          this.getPastOpenB = res.data.data;
          this.$store.commit("GET_PAST_OPENS",this.getPastOpens);
          this.n1 = this.getPastOpens[0].n1;
          this.n2 = this.getPastOpens[0].n2;
          this.n3 = this.getPastOpens[0].n3;
          this.nBox[0] = this.getPastOpens[0].n1;
          this.nBox[1] = this.getPastOpens[0].n2;
          this.nBox[2] = this.getPastOpens[0].n3;
          this.nBox[3] = this.getPastOpens[0].n4;
          this.nBox[4] = this.getPastOpens[0].n5;
          this.nBox[5] = this.getPastOpens[0].n6;
          this.nBox[6] = this.getPastOpens[0].n7;
          this.nBox[7] = this.getPastOpens[0].n8;
          this.nBox[8] = this.getPastOpens[0].n9;
          this.nBox[9] = this.getPastOpens[0].n10;
          if (Number(res.data.data[0].seasonId) !== Number(this.lastSeasonId)) {
            this.isshowGif = true;
            this.reGetPastOp();
          } else {
            clearTimeout(this.timer2);
            this.isshowGif = false;
            this.$emit("emitGet"); //我的投注
          }
        })
        .catch(error => {
          console.log("获取过去开奖号码No");
        });
    },
    reGetPastOp() {
      clearTimeout(this.timer2);
      this.timer2 = setTimeout(() => {
        this.getPastOp(); //获取过去开奖号码10个
      }, 12000);
    },
    //倒计时
    initSetTimeout() {
      this.timer = setInterval(() => {
        this.today = this.today - 1;
        this.setTimeMode(); //時間格式轉換
        if (this.today < 1) {
          clearInterval(this.timer);
          this.timesUp();
        }
        if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 47
        ) {
          this.getPastOp(); //获取过去开奖号码10个
        } else if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 46
        ) {
          this.getPastOp(); //获取过去开奖号码10个
        } else if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 45
        ) {
          this.getPastOp(); //获取过去开奖号码10个
        }
      }, 1000);
    },
    //時間格式轉換
    setTimeMode() {
      var hours = Math.floor((this.today % (1 * 60 * 60 * 24)) / (1 * 60 * 60));
      var minutes = Math.floor((this.today % (1 * 60 * 60)) / (1 * 60));
      var seconds = Math.floor((this.today % (1 * 60)) / 1);
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.countDown = hours + ":" + minutes + ":" + seconds;
    },
    //時間到彈窗
    timesUp() {
      this.isshowGif = true;
      this.geteServerTime();
      this.$pop.show({
        title: "温馨提示",
        content: "已经到底啦",
        content1: String(this.seasonId),
        content2: String(Number(this.seasonId) + 1),
        number: 3
      });
    },
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/betContentTop.scss";
</style>
