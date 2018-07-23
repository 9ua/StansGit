<template lang="jade">
.home
  .homeBox
    GeminiScrollbar.my-scroll-bar(style="height:462px;width:232px;")
      .lotteList
        ul
          li(:class="{'active': index === navNum}", v-for='(nav,index) in lotteryList', :key='index', @click="lotteryTo(nav,index)") 
            img(:class="nav.toF5money ? 'totransition' : ''", :src='"@/assets/img/lott/"+nav.groupId+".png"',@mouseover="selectStyle(nav)", @mouseout="outStyle(nav)" alt='') 
            {{nav.name}}
            span 1分钟1期
    .homeSideCenter
      .banner
        .bannerBox
          router-link(to='/activity')
            img(src='../../../static/images/lott/sy1.jpg', alt='')
      .autoTab
        ul.tab
          li(:class="{'active': index === navNum}", v-for='(nav,index) in listnav', :key='index', @click='navTo($event,index,nav)') {{nav.name}}
        .autoTabContent
          ul.contentK3(v-if='lotteryId==="jsk3"||lotteryId==="dfk3"')
            li
              img(:src='"@/assets/img/lott/k3n"+pastOpenK3.n1+".png"' , alt='')
              span +
              img(:src='"@/assets/img/lott/k3n"+pastOpenK3.n2+".png"' , alt='')
              span +
              img(:src='"@/assets/img/lott/k3n"+pastOpenK3.n3+".png"' , alt='')
              span =
              b {{pastOpenK3.n1+pastOpenK3.n2+pastOpenK3.n3}}
              button(@click='gotBet') 立即投注
            li 
              span 当前：第
                em {{pastOpenK3.seasonId}} 期
              span 开奖号码
                em {{pastOpenK3.n1}},{{pastOpenK3.n2}},{{pastOpenK3.n3}}
              span 和值
                em {{pastOpenK3.n1+pastOpenK3.n2+pastOpenK3.n3}}
          ul.contentSSC(v-if='lotteryId==="cqssc"')
            li
              span.number {{pastOpenSSC.n1}}
              span.number {{pastOpenSSC.n2}}
              span.number {{pastOpenSSC.n3}}
              span.number {{pastOpenSSC.n4}}
              span.number {{pastOpenSSC.n5}}
              button(@click='gotBet') 立即投注
            li 
              span 当前：第
                em {{pastOpenSSC.seasonId}} 期
              span 开奖号码
                em {{pastOpenSSC.n1}},{{pastOpenSSC.n2}},{{pastOpenSSC.n3}},{{pastOpenSSC.n4}},{{pastOpenSSC.n5}}
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
            li(v-for='(item,index) in winList',:key='index' v-if='index < 3') 
              .champion 
                img(:src='"/static/images/"+item.img+".jpg"', alt='') 
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
      toF5money: false, //刷新动画
      Globalusername: this.$store.state.Globalusername,
      lotteryList: null,
      lotteryId: "jsk3", //默认上期开奖结果（江苏快3）
      winList: null, //中奖列表
      pastOpenK3: { n1: 1, n2: 2, n3: 3, seasonId: 123456 }, //上期k3开奖结果
      pastOpenSSC: { n1: 1, n2: 2, n3: 3, n4: 4, n5: 5, seasonId: 123456 }, //上期ssc开奖结果
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
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "daniel",
          money: 1238.654,
          lotterylist: "安徽快3",
          paths: require("../../../static/images/3.jpg")
        },
        {
          name: "江若泊",
          money: 853.66,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "james",
          money: 452.442,
          lotterylist: "北京赛车",
          paths: require("../../../static/images/2.jpg")
        },
        {
          name: "noah",
          money: 45.244,
          lotterylist: "北京赛车",
          paths: require("../../../static/images/0.jpg")
        },
        {
          name: "samuel",
          money: 85.17,
          lotterylist: "上海快3",
          paths: require("../../../static/images/7.jpg")
        },
        {
          name: "david",
          money: 132.04,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "sophia",
          money: 158.25,
          lotterylist: "上海快3",
          paths: require("../../../static/images/2.jpg")
        },
        {
          name: "anthony",
          money: 458.23,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/3.jpg")
        },
        {
          name: "elizabeth",
          money: 5499.08,
          lotterylist: "北京快3",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "christian",
          money: 77.654,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/5.jpg")
        },
        {
          name: "brandon",
          money: 856.07,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "zachary",
          money: 1207.654,
          lotterylist: "上海快3",
          paths: require("../../../static/images/0.jpg")
        },
        {
          name: "jessica,",
          money: 21.36,
          lotterylist: "北京快3",
          paths: require("../../../static/images/2.jpg")
        },
        {
          name: "robert",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/3.jpg")
        },
        {
          name: "Justin",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/8.jpg")
        },
        {
          name: "Hunter",
          money: 1587.24,
          lotterylist: "湖北快3",
          paths: require("../../../static/images/5.jpg")
        },
        {
          name: "Victoria",
          money: 13.14,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/4.jpg")
        },
        {
          name: "若烟",
          money: 4524.28,
          lotterylist: "湖北快3",
          paths: require("../../../static/images/7.jpg")
        },
        {
          name: "adfas",
          money: 7452.0,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/2.jpg")
        },
        {
          name: "Jasmine",
          money: 8532.66,
          lotterylist: "广西快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "霍去病",
          money: 9535.03,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/8.jpg")
        },
        {
          name: "fdsawqg",
          money: 156877.1,
          lotterylist: "广西快3",
          paths: require("../../../static/images/7.jpg")
        },
        {
          name: "gfukhgj",
          money: 1563.2,
          lotterylist: "江苏快3",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "dfhteuj",
          money: 15687.88,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "辛弃疾",
          money: 21.36,
          lotterylist: "江苏快3",
          paths: require("../../../static/images/0.jpg")
        },
        {
          name: "ytmioi",
          money: 89.12,
          lotterylist: "甘肃快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "nkkrtuy",
          money: 7552.12,
          lotterylist: "安徽快3",
          paths: require("../../../static/images/3.jpg")
        },
        {
          name: "hfdw6mm",
          money: 1356.16,
          lotterylist: "吉林快3",
          paths: require("../../../static/images/2.jpg")
        },
        {
          name: "ksfgfdsg",
          money: 1535.0,
          lotterylist: "北京赛车",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "ewdghtr",
          money: 15687.88,
          lotterylist: "新疆时时彩",
          paths: require("../../../static/images/5.jpg")
        },
        {
          name: "rey",
          money: 26.12,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/7.jpg")
        },
        {
          name: "Joey",
          money: 12.04,
          lotterylist: "新疆时时彩",
          paths: require("../../../static/images/8.jpg")
        },
        {
          name: "John",
          money: 138.32,
          lotterylist: "河北快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "Nathan",
          money: 853482.66,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/1.jpg")
        },
        {
          name: "Stan",
          money: 85000,
          lotterylist: "重庆时时彩",
          paths: require("../../../static/images/0.jpg")
        },
        {
          name: "Jason",
          money: 1238.654,
          lotterylist: "北京快3",
          paths: require("../../../static/images/9.jpg")
        },
        {
          name: "Tino",
          money: 85000,
          lotterylist: "宏發快3",
          paths: require("../../../static/images/6.jpg")
        },
        {
          name: "Stephen",
          money: 85000,
          lotterylist: "新疆时时彩",
          paths: require("../../../static/images/3.jpg")
        },
        {
          name: "Neo",
          money: 6120,
          lotterylist: "广西快3",
          paths: require("../../../static/images/8.jpg")
        }
      ],
      animate: true,
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
  methods: {
    lotteryTo(item,index){
      this.$router.push('/lotts/'+item.groupId+'/'+item.id);
    },
    selectStyle(item) {
      this.$nextTick(() => {
        this.$set(item, "toF5money", true);
      });
    },
    outStyle(item) {
      this.$set(item, "toF5money", false);
    },
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
        this.$router.push("/lotts/k3/"+this.lotteryId);
      } else {
        this.$router.push("/lotts/ssc/"+this.lotteryId);
      }
    },
    //过期判断
    isExperid() {
      let item = localStorage.getItem(this.lotteryId);
      if (item) {
        item = JSON.parse(item);
        let lastTime = item.lastTime;
        let now = Date.parse(new Date()) / 1000;
        let restSeconds = item.restSeconds;
        if (now - lastTime >= restSeconds) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    //获取过去开奖号码1个
    getPastOp() {
      if (this.isExperid()) {
        this.$axios
          .get(
            baseUrl +
              "/api/lottery/getPastOpen?lotteryId=" +
              this.lotteryId +
              "&count=1"
          )
          .then(res => {
            let storage = res.data.data[0];
            storage.lastTime = Date.parse(new Date()) / 1000;
            localStorage.setItem(this.lotteryId, JSON.stringify(storage));
            if (this.lotteryId != "cqssc") {
              this.pastOpenK3 = res.data.data[0];
              this.lotteryId = this.pastOpenK3.lotteryId;
            } else {
              this.pastOpenSSC = res.data.data[0];
              this.lotteryId = this.pastOpenSSC.lotteryId;
            }
          })
          .catch(error => {
            console.log("获取过去开奖号码No");
          });
      } else {
        let item = JSON.parse(localStorage.getItem(this.lotteryId));
        if (this.lotteryId != "cqssc") {
          this.pastOpenK3 = item;
        } else {
          this.pastOpenSSC = item;
        }
      }
    },
    // 获取彩种
    lotteryAll() {
      var now = new Date().getTime();
      if(localStorage.getItem("lotteryAll_hot") !== null){
        var setupTime = localStorage.getItem("data_lotteryAll_hot");
        if(setupTime === null || now - setupTime > this.$store.state.cacheTime){
          localStorage.removeItem("lotteryAll_hot");
          localStorage.removeItem("data_lotteryAll_hot");
          this.$axios.get(baseUrl + "/api/lottery/getLotteryList").then(res => {
            localStorage.setItem("lotteryAll_hot",JSON.stringify(res.data.data.hot));
            this.lotteryList = JSON.parse(localStorage.getItem("lotteryAll_hot"));
            localStorage.setItem("data_lotteryAll_hot",now);
          })
          .catch(error => {
            console.log(error);
          });
        }else{
          this.lotteryList = JSON.parse(localStorage.getItem("lotteryAll_hot"));
        }
      }else{
        this.$axios.get(baseUrl + "/api/lottery/getLotteryList").then(res => {
          localStorage.setItem("lotteryAll_hot",JSON.stringify(res.data.data.hot));
          this.lotteryList = JSON.parse(localStorage.getItem("lotteryAll_hot"));
          localStorage.setItem("data_lotteryAll_hot",now);
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    // 获取昨日盈利榜单
    getLastDayWinList() {
      var now = new Date().getTime();
      if(localStorage.getItem("getLastDayWinList") !== null){
        var setupTime = localStorage.getItem("data_getLastDayWinList");
        if(setupTime === null || now - setupTime > this.$store.state.cacheTime){
          localStorage.removeItem("getLastDayWinList");
          localStorage.removeItem("data_getLastDayWinList");
          this.$axios.get(baseUrl + "/api/lottery/getLastDayWinList").then(res => {
            localStorage.setItem("getLastDayWinList",JSON.stringify(res.data.data));
            this.winList = JSON.parse(localStorage.getItem("getLastDayWinList"));
            localStorage.setItem("data_getLastDayWinList",now);
          })
          .catch(error => {
            console.log(error);
          });
        }else{
          this.winList = JSON.parse(localStorage.getItem("getLastDayWinList"));
        }
      }else{
        this.$axios.get(baseUrl + "/api/lottery/getLastDayWinList").then(res => {
          localStorage.setItem("getLastDayWinList",JSON.stringify(res.data.data));
          this.winList = JSON.parse(localStorage.getItem("getLastDayWinList"));
          localStorage.setItem("data_getLastDayWinList",now);
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
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
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/home.scss";
</style>
