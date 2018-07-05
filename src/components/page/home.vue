<template lang="jade">
.home
  .homeBox
    GeminiScrollbar.my-scroll-bar(style="height:462px;width:232px;")
      .lotteList
        ul
          li(:class="{'active': index === navNum}", v-for='(nav,index) in lotteryList', :key='index') 
            router-link(:to='"/lotts/"+nav.groupId') 
              img(:src='"@/assets/img/lott/"+nav.groupId+".png"', alt='') 
              {{nav.name}}
              span 1分钟1期
    .homeSideCenter
      .banner
        .bannerBox
          router-link(to='/activity')
            img(src='http://chinahuiji.com/res/upload/98488f66967c44a0877728544b620a2f.jpg', alt='')
      .autoTab
        ul.tab
          li(:class="{'active': index === navNum}", v-for='(nav,index) in listnav', :key='index', @click='navTo($event,index,nav)') {{nav.name}}
        .autoTabContent
          ul.contentK3(v-if='lotteryId==="jsk3"||lotteryId==="dfk3"')
            li
              img(:src='"@/assets/img/lott/k3n"+pastOpen.n1+".png"' , alt='')
              span +
              img(:src='"@/assets/img/lott/k3n"+pastOpen.n2+".png"' , alt='')
              span +
              img(:src='"@/assets/img/lott/k3n"+pastOpen.n3+".png"' , alt='')
              span =
              b {{pastOpen.n1+pastOpen.n2+pastOpen.n3}}
              button(@click='gotBet') 立即投注
            li 
              span 当前：第
                em {{pastOpen.seasonId}} 期
              span 开奖号码
                em {{pastOpen.n1}},{{pastOpen.n2}},{{pastOpen.n3}}
              span 和值
                em {{pastOpen.n1+pastOpen.n2+pastOpen.n3}}
          ul.contentSSC(v-if='lotteryId==="cqssc"')
            li
              span.number {{pastOpen.n1}}
              span.number {{pastOpen.n2}}
              span.number {{pastOpen.n3}}
              span.number {{pastOpen.n4}}
              span.number {{pastOpen.n5}}
              button(@click='gotBet') 立即投注
            li 
              span 当前：第
                em {{pastOpen.seasonId}} 期
              span 开奖号码
                em {{pastOpen.n1}},{{pastOpen.n2}},{{pastOpen.n3}},{{pastOpen.n4}},{{pastOpen.n5}}
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
          ul
            li(:class="{anim:animate==true}" , v-for="(item,index) in winpool",:key="index")
              img(:src='item.paths', alt='') 
              .rightBox
                p
                  span {{item.name | mask}} 
                  span  &nbsp;在{{item.lotterylist}}
                p
                  span 喜中：
                  span ￥
                    i {{item.money | keepTwoNum}}
          .winMsgItem
</template>
<script>
import { baseUrl } from "../../assets/js/env";
export default {
  data() {
    return {
      navNum: 0,
      Globalusername: this.$store.state.Globalusername,
      lotteryList: null,
      lotteryId: "jsk3", //默认上期开奖结果（江苏快3）
      winList: null, //中奖列表
      pastOpen: { n1: 1, n2: 2, n3: 3, n4: 4,n5:5, seasonId: 123456 }, //上期开奖结果
      listnav: [
        { name: "江苏快3", lotteryId: "jsk3" },
        { name: "重庆时时彩", lotteryId: "cqssc" },
        { name: "宏發快3", lotteryId: "dfk3" }
      ],
      winpool: [
        {
          name: "william",
          money: 95.08,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/6.jpg")
        },
        {
          name: "daniel",
          money: 1238.654,
          lotterylist: "安徽快3",
          paths: require("../../assets/img/header/3.jpg")
        },
        {
          name: "江若泊",
          money: 853.66,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/1.jpg")
        },
        {
          name: "james",
          money: 452.442,
          lotterylist: "北京赛车",
          paths: require("../../assets/img/header/2.jpg")
        },
        {
          name: "noah",
          money: 45.244,
          lotterylist: "北京PK10",
          paths: require("../../assets/img/header/0.jpg")
        },
        {
          name: "samuel",
          money: 85.17,
          lotterylist: "上海快3",
          paths: require("../../assets/img/header/7.jpg")
        },
        {
          name: "david",
          money: 132.04,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/9.jpg")
        },
        {
          name: "sophia",
          money: 158.25,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/2.jpg")
        },
        {
          name: "anthony",
          money: 458.23,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/3.jpg")
        },
        {
          name: "elizabeth",
          money: 5499.08,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/6.jpg")
        },
        {
          name: "christian",
          money: 77.654,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/5.jpg")
        },
        {
          name: "brandon",
          money: 856.07,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/1.jpg")
        },
        {
          name: "zachary",
          money: 1207.654,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/0.jpg")
        },
        {
          name: "jessica,",
          money: 21.36,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/2.jpg")
        },
        {
          name: "robert",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/3.jpg")
        },
        {
          name: "Justin",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/8.jpg")
        },
        {
          name: "Hunter",
          money: 1587.24,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/5.jpg")
        },
        {
          name: "Victoria",
          money: 13.14,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/4.jpg")
        },
        {
          name: "若烟",
          money: 4524.28,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/7.jpg")
        },
        {
          name: "adfas",
          money: 7452.0,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/2.jpg")
        },
        {
          name: "Jasmine",
          money: 8532.66,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/1.jpg")
        },
        {
          name: "霍去病",
          money: 9535.03,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/8.jpg")
        },
        {
          name: "fdsawqg",
          money: 156877.1,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/7.jpg")
        },
        {
          name: "gfukhgj",
          money: 1563.2,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/6.jpg")
        },
        {
          name: "dfhteuj",
          money: 15687.88,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/9.jpg")
        },
        {
          name: "辛弃疾",
          money: 21.36,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/0.jpg")
        },
        {
          name: "ytmioi",
          money: 89.12,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/1.jpg")
        },
        {
          name: "nkkrtuy",
          money: 7552.12,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/3.jpg")
        },
        {
          name: "hfdw6mm",
          money: 1356.16,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/2.jpg")
        },
        {
          name: "ksfgfdsg",
          money: 1535.0,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/6.jpg")
        },
        {
          name: "ewdghtr",
          money: 15687.88,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/5.jpg")
        },
        {
          name: "rey",
          money: 26.12,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/7.jpg")
        },
        {
          name: "rewhtro",
          money: 12.04,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/8.jpg")
        },
        {
          name: "asfei",
          money: 138.32,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/9.jpg")
        },
        {
          name: "Nathan",
          money: 853482.66,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/1.jpg")
        },
        {
          name: "Stan",
          money: 85000,
          lotterylist: "天津时时彩",
          paths: require("../../assets/img/header/0.jpg")
        },
        {
          name: "Jason",
          money: 1238.654,
          lotterylist: "北京快3",
          paths: require("../../assets/img/header/9.jpg")
        },
        {
          name: "Tino",
          money: 85000,
          lotterylist: "宏發快3",
          paths: require("../../assets/img/header/6.jpg")
        },
        {
          name: "Stephen",
          money: 85000,
          lotterylist: "新疆时时彩",
          paths: require("../../assets/img/header/3.jpg")
        },
        {
          name: "Neo",
          money: 6120,
          lotterylist: "广西快3",
          paths: require("../../assets/img/header/8.jpg")
        }
      ],
      animate: true
    };
  },
  created() {
    setInterval(this.scroll, 1400);
  },
  mounted() {
    this.getPastOp();
    this.lotteryAll();
    this.getLastDayWinList();
  },
  filters: {
    mask(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0) + "***" + value.charAt(value.length - 1);
    },
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
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
    scroll() {
      this.animate = !this.animate;
      setTimeout(() => {
        this.winpool.push(this.winpool[0]);
        this.winpool.shift();
        this.animate = !this.animate;
      }, 0);
    },
    navTo(e, index, navs) {
      this.navNum = index;
      this.lotteryId = navs.lotteryId;
      this.getPastOp();
    },
    gotBet() {
      if (this.lotteryId != "cqssc") {
        this.$router.push({ path: "/lotts/k3" });
      } else {
        this.$router.push({ path: "/lotts/ssc" });
      }
    },
    //获取过去开奖号码1个
    getPastOp() {
      this.$axios
        .get(
          baseUrl +
            "/api/lottery/getPastOpen?lotteryId=" +
            this.lotteryId +
            "&count=1",
          this.$store.state.config
        )
        .then(res => {
          this.pastOpen = res.data.data[0];        
          this.lotteryId = this.pastOpen.lotteryId;
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
