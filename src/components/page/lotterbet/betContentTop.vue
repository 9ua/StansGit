<template lang='jade'>
<!-- 头部 -->
.lott-top
  .lott-top-left
    img(:src='"@/assets/img/lott/"+$route.params.id+".png"', alt='')
    span {{lottName}}
  .lott-top-middle.k3
    p
      | 第
      span {{seasonId}}
      | 期 剩余投注时间
    div {{countDown}}
  .lott-top-right.k3(v-if="$route.params.id === 'k3'")
    p
      | 第
      span {{lastSeasonId}}
      | 期 开奖结果
    .showGif(v-show='isshowGif')
      span(v-for='(item,index) in 3')
    .showName(v-show='!isshowGif')
      img(:src='"@/assets/img/lott/k3n"+n1+".jpg"', alt='')
      img(:src='"@/assets/img/lott/k3n"+n2+".jpg"', alt='')
      img(:src='"@/assets/img/lott/k3n"+n3+".jpg"', alt='')
  .lott-top-right.ssc(v-if="$route.params.id === 'ssc'")
    p
      | 第
      span {{lastSeasonId}}
      | 期 开奖结果
    .showName(v-show='!isshowGif')
      span(v-for='(item,index) in nBox', v-if='index < 5') {{item}}
    .showGif(v-show='isshowGif')
      span(v-for='(item,index) in 5')
  .lott-top-right.pk10(v-if="$route.params.id === 'pk10'")
    p
      | 第
      span {{lastSeasonId}}
      | 期 开奖结果
    .showName(v-show='!isshowGif')
      span(v-for='(item,index) in nBox') {{item}}
    .showGif(v-show='isshowGif')
      span(v-for='(item,index) in 10')
  .lott-top-right.ssc(v-if="$route.params.id === 'x11x5'")
    p
      | 第
      span {{lastSeasonId}}
      | 期 开奖结果
    .showName(v-show='!isshowGif')
      span(v-for='(item,index) in nBox', v-if='index < 5') {{item < 10 ? "0"+item : item}}
    .showGif(v-show='isshowGif')
      span(v-for='(item,index) in 5')
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
      nBox: [1, 3, 5, 7, 9, 2, 4, 6, 8, 10]
    };
  },
  beforeDestroy() {
    if (this.timer) {
      for (let i = 0; i <= this.timer; i++) {
        clearInterval(i);
      }
    }
    if (this.timer2) {
      for (let i = 0; i <= this.timer2; i++) {
        clearTimeout(i);
      }
    }
    document.removeEventListener("visibilitychange", this.listen);
  },
  computed: {
    lottName() {
      return this.$store.state.lottName;
    }
  },
  mounted() {
    this.geteServerTime();
  },
  methods: {
    listen() {
      if (document.hidden === false) {
        this.geteServerTime();
      }
    },
    clearTimeInter() {
      if (this.timer) {
        for (let i = 0; i <= this.timer; i++) {
          clearInterval(i);
        }
      }
      if (this.timer2) {
        for (let i = 0; i <= this.timer2; i++) {
          clearTimeout(i);
        }
      }
      document.removeEventListener("visibilitychange", this.listen);
    },
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
            this.$store.commit("SEASONID", this.seasonId);
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
          this.$store.commit("GET_PAST_OPENS", this.getPastOpens);
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
          if (
            this.lastSeasonId &&
            Number(res.data.data[0].seasonId) !== Number(this.lastSeasonId)
          ) {
            this.isshowGif = true;
            if (res.data.data[0].lotteryId === this.$route.params.group) {
              this.reGetPastOp();
            }
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
    endCount() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      if (this.timer2) {
        clearTimeout(this.timer2);
      }
    },
    //倒计时
    initSetTimeout() {
      this.endCount();
      if (this.$route.params.group) {
        this.timer = setInterval(() => {
          this.today = this.today - 1;
          this.setTimeMode(); //時間格式轉換
          if (this.today < 1) {
            this.endCount();
            this.timesUp();
          }
          if (
            this.getPastOpenB &&
            this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
            this.today === 47
          ) {
            this.getPastOp(); //获取过去开奖号码10个
          } else if (
            this.getPastOpenB &&
            this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
            this.today === 46
          ) {
            this.getPastOp(); //获取过去开奖号码10个
          } else if (
            this.getPastOpenB &&
            this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
            this.today === 45
          ) {
            this.getPastOp(); //获取过去开奖号码10个
          }
        }, 1000);
      }
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
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/betContentTop.scss";
</style>
