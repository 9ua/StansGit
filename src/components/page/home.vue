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
      winning(:num='3')
      .winMsg
        h3 中奖信息
        .winMsgScroll
          win-msg
          .winMsgItem
</template>
<script>
import { baseUrl } from "../../assets/js/env";
import winning from '@/components/cp/winning.vue';
import winMsg from '@/components/cp/winMsg.vue';
export default {
  data() {
    return {
      navNum: 0,
      toF5money: false, //刷新动画
      Globalusername: this.$store.state.Globalusername,
      lotteryList: null,
      lotteryId: "jsk3", //默认上期开奖结果（江苏快3）
      pastOpenK3: { n1: 1, n2: 2, n3: 3, seasonId: 123456 }, //上期k3开奖结果
      pastOpenSSC: { n1: 1, n2: 2, n3: 3, n4: 4, n5: 5, seasonId: 123456 }, //上期ssc开奖结果
      listnav: [
        { name: "江苏快3", lotteryId: "jsk3" },
        { name: "重庆时时彩", lotteryId: "cqssc" },
        { name: "宏發快3", lotteryId: "dfk3" }
      ],
    };
  },
  mounted() {
    this.getPastOp();
    this.lotteryAll();
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
            localStorage.setItem("lotteryAll_hot",JSON.stringify(res.data.data));
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
          localStorage.setItem("lotteryAll_hot",JSON.stringify(res.data.data));
          this.lotteryList = JSON.parse(localStorage.getItem("lotteryAll_hot"));
          localStorage.setItem("data_lotteryAll_hot",now);
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
  },
  components:{
    winning,winMsg
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
