<template lang="jade">
.home
  .homeBox
    GeminiScrollbar.my-scroll-bar(style="height:462px;width:232px;")
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
          a(@click='toActive') 
            img(src='http://chinahuiji.com/res/upload/98488f66967c44a0877728544b620a2f.jpg', alt='')
      .autoTab
        ul
          li(:class="{'active': index === navNum}", v-for='(nav,index) in listnav', :key='index', @click='navTo($event,index,nav)') {{nav.name}}
        .paste-lott
        .paste-lott-text
    .homeSideRight
      .userNameBox(v-show='!this.$store.state.loginStatus')
        button(@click='login') 登录
        button(@click='signin') 注册
      .userNameBox(v-show='this.$store.state.loginStatus')
        p 账号：{{Globalusername}}
      .yestDayIncom
        h3 昨日盈利榜
        .yestDayIncomItem
          ul
            li(v-for='(item,index) in winList',:key='index') 
              .champion 
                img(:src='"@/assets/img/header/"+item.img+".jpg"', alt='') 
                p 
                  span 账户昵称 ：
                    i.nickname {{item.account | mask}}
                  span 昨日盈利 ：
                    i.gain {{item.bonus}} 
                    i 元
              p.index {{index+1}}
      .winMsg
        h3 中奖信息
        .winMsgScroll
          .winMsgItem
</template>
<script>
import { baseUrl } from "../../assets/js/env";
export default {
  data() {
    return {
      navNum: 0,
      Globalusername:this.$store.state.Globalusername,
      lotteryList: null,
      winList: null,
      listnav: [
        { name: "江苏快3", lotteryId: "jsk3" },
        { name: "重庆时时彩", lotteryId: "cqssc" },
        { name: "宏發快3", lotteryId: "dfk3" }
      ]
    };
  },
  mounted() {
    this.getPastOp("jsk3");
    this.lotteryAll();
    this.getLastDayWinList();
  },
  filters: {
    mask(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0)+"***"+value.charAt(value.length-1);
    }
  },
  methods: {
    login() {
      this.$router.push({ path: "/login?id=ashore" });
    },
    signin() {
      this.$router.push({ path: "/login?id=register" });
    },
    toActive() {
      this.$router.push({ path: "/activity" });
    },
    navTo(e, index, navs) {
      this.navNum = index;
      this.getPastOp(navs.lotteryId);
    },
    //获取过去开奖号码1个
    getPastOp(lotteryId) {
      this.$axios
        .get(baseUrl + "/api/lottery/getPastOpen", this.$store.state.config,{
          params: { lotteryId: lotteryId, count: 1}
        })
        .then(res => {
          this.getPastO = res.data.data;
        })
        .catch(error => {
          console.log("获取过去开奖号码No");
        });
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
    },
    // 获取昨日盈利榜单
    getLastDayWinList() {
      this.$axios
        .get(baseUrl + "/api/lottery/getLastDayWinList")
        .then(res => {
          this.winList = res.data.data.slice(0, 3);
        })
        .catch(error => {
          console.log("getLastDayWinList no");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/home.scss";
</style>
