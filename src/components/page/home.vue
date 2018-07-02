<template lang="jade">
.home
  .homeBox
    .homeSideLeft
      .lotteList
        ul
          li(:class="{'active': index === navNum}", v-for='(nav,index) in lotteryList', :key='index') 
            a(:href='"#"') 
              img(:src='"@/assets/img/lott/"+nav.groupId+".png"', alt='') 
              {{nav.name}}
              span 1分钟1期
    .homeSideCenter
      .banner
        .bannerBox
          a(:href='"#"') 
            img(src='http://chinahuiji.com/res/upload/98488f66967c44a0877728544b620a2f.jpg', alt='')
      .autoTab
        ul
          li(:class="{'active': index === navNum}", v-for='(nav,index) in listnav', :key='index', @click='navTo($event,index,nav)') {{nav.name}}
        .paste-lott
        .paste-lott-text
    .homeSideRight
      .userNameBox
        button(v-show='loginStatus' @click='login') 登录
        button(v-show='loginStatus' @click='signin') 注册
      .yestDayIncom
        .top-text
        .yestDayIncomItem
      .winMsg
        .top-text
        .winMsgScroll
          .winMsgItem
</template>
<script>
import { baseUrl } from "../../assets/js/env";
export default {
  data() {
    return {
      navNum: 0,
      loginStatus:this.$store.state.loginStatus,
      lotteryList: null,
      listnav: [
        { name: "江苏快3", lotteryId: "jsk3" },
        { name: "重庆时时彩", lotteryId: "cqssc" },
        { name: "宏發快3", lotteryId: "dfk3" }
      ]
    };
  },
  mounted() {
    console.log(this.$store.state.loginStatus);
    this.getPastOp("jsk3");
    this.lotteryAll();
  },
  methods: {
    login() {
      this.$router.push({path:'/login?id=ashore'});
    },
    signin() {
      this.$router.push({path:'/login?id=register'});
    },
    navTo(e, index, navs) {
      this.navNum = index;
      this.getPastOp(navs.lotteryId);
    },
    //获取过去开奖号码1个
    getPastOp(lotteryId) {
      this.$axios
        .get(baseUrl + "/api/lottery/getPastOpen", {
          params: { lotteryId: lotteryId, count: 1,_:new Date().getTime()}
        })
        .then(res => {
          this.getPastO = res.data.data;
          console.log(res.data.data);
          if (
            res.data.data[0].seasonId !== this.seasonId3 &&
            res.data.data[0].seasonId - this.seasonId3 <= 2
          ) {
            this.reGetPastOp();
          }
        })
        .catch(error => {
          console.log("获取过去开奖号码No");
        });
    },
    reGetPastOp() {
      clearTimeout(this.timer2);
      this.timer2 = setTimeout(() => {
        this.getPastOp();
      }, 10000);
    },
    // 获取彩种
    lotteryAll() {
      this.$axios
        .get(baseUrl + "/api/lottery/getLotteryList")
        .then(res => {
          this.lotteryList = res.data.data.hot;
        })
        .catch(error => {
          console.log("getLotteryListNo");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/home.scss";
</style>
