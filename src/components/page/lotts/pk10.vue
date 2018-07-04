<template>
  <div class="lott">
    <div class="lott-center">
      <div class="lott-top">
        <div class="lott-top-left"><img src="http://hf68.com/res/home/images/lottTypes/cz_sj1fc-theme-black.png" alt="" />
          <span>宏發pk10</span>
        </div>
        <div class="lott-top-middle">
          <p>第
            <span>201806240751</span>期 剩余投注时间</p>
          <div>00:00:00</div>
        </div>
        <div class="lott-top-right">
          <p>第
            <span>201806240751</span>期 开奖结果</p>
          <div>
            <img src="../../../assets/img/lott/open_num.gif" alt="">
            <img src="../../../assets/img/lott/open_num.gif" alt="">
            <img src="../../../assets/img/lott/open_num.gif" alt="">
          </div>
          <div v-show="false">
            <img src="../../../assets/img/lott/k3n1.jpg" alt="">
            <img src="../../../assets/img/lott/k3n2.jpg" alt="">
            <img src="../../../assets/img/lott/k3n3.jpg" alt="">
          </div>
        </div>
      </div>
      <div class="lottBox">
        <div class="lott-left">left</div>
        <div class="lott-right">
          <div class="lott-right-top1">
            <button>今日开奖</button>
            <p>
              <span>走势图</span>
              <i>|</i>
              <span>玩法说明</span>
            </p>
          </div>
          <div class="lott-right-top2">
            <p class="lott-right-top2-title">
              <span class="lott-right-top2-span1">期号</span>
              <span class="lott-right-top2-span2">开奖号码</span>
              <span class="lott-right-top2-span3">和值</span>
              <span class="lott-right-top2-span4">形态</span>
            </p>
            <ul>
              <li v-for="item in 10" :key="item.id">
                <span class="lott-right-top2-span1">20180702064</span>
                <span class="lott-right-top2-span2">
                  <i>2,2,2</i>
                </span>
                <span class="lott-right-top2-span3">10</span>
                <span class="lott-right-top2-span4">
                  <i :class="sum < 11 ? 'yellow' : 'blue'">{{sum < 11 ? "小" : "大"}}</i>
                  <i :class="sum % 2 ===0 ? 'yellow' : 'blue'">{{sum % 2 ===0 ? "双" : "单"}}</i>
                </span>
              </li>
            </ul>
          </div>
          <div class="lott-right-top3">
            <button>我的投注</button>
            <p></p>
          </div>
          <div class="lott-right-top4">
            <p class="lott-right-top4-title">
              <span class="lott-right-top4-span1">期号</span>
              <span class="lott-right-top4-span2">投注金额</span>
              <span class="lott-right-top4-span3">奖金</span>
            </p>
            <ul>
              <li v-for="item in 2" :key="item.id">
                <span class="lott-right-top4-span1">20180702064</span>
                <span class="lott-right-top4-span2">
                  <i>10000.00</i>
                </span>
                <span class="lott-right-top4-span3"><i>10000.00</i></span>
              </li>
            </ul>
          </div>
          <div class="lott-right-top5">
            <button :class="butClass1 ? 'active' : ''" @click="butClass1C">中奖信息</button>
            <button :class="butClass2 ? 'active' : ''" @click="butClass2C">昨日盈利榜</button>
          </div>
          <div class="lott-right-top6" v-show="butClass1">
            <p class="lott-right-top6-title">
              <span class="lott-right-top6-span1">中奖信息实时更新</span>
            </p>
            <ul>
              <li :class="{anim:animate==true}" v-for="(item,index) in winpool" :key="index">
                <img :src="item.paths" alt=""/>
                <div class="rightBox">
                  <p><span>{{item.name | mask}} </span><span> &nbsp;在{{item.lotterylist}}</span></p>
                  <p><span>喜中：</span><span>￥<i>{{item.money | keepTwoNum}}</i></span></p>
                </div>
              </li>
            </ul>
          </div>
          <div class="lott-right-top7" v-show="butClass2">
            <p class="lott-right-top6-title">
              <span class="lott-right-top6-span1">昨日累计盈利排行榜</span>
            </p>
            <ul>
              <li v-for="(item,index) in winList" :key="index">
                <div class="champion">
                  <img :src='"@/assets/img/header/"+item.img+".jpg"' alt=""/>
                  <p><span>账号昵称 ：<i class="nickname">{{item.account | mask}}</i></span><span>昨日盈利 ：<i class="gain">{{item.bonus}}</i><i>元</i></span></p>
                </div>
                <p class="index">{{index+1}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      sum: 10,
      butClass1:true,
      butClass2:false,
      animate:true,
      winList: null, //中奖列表
      winpool: [
        {
          name: "william",
          money: 95.08,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/6.jpg")
        },
        {
          name: "daniel",
          money: 1238.654,
          lotterylist: "安徽快3",
          paths: require("@/assets/img/header/3.jpg")
        },
        {
          name: "江若泊",
          money: 853.66,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/1.jpg")
        },
        {
          name: "james",
          money: 452.442,
          lotterylist: "北京赛车",
          paths: require("@/assets/img/header/2.jpg")
        },
        {
          name: "noah",
          money: 45.244,
          lotterylist: "北京赛车",
          paths: require("@/assets/img/header/0.jpg")
        },
        {
          name: "samuel",
          money: 85.17,
          lotterylist: "上海快3",
          paths: require("@/assets/img/header/7.jpg")
        },
        {
          name: "david",
          money: 132.04,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/9.jpg")
        },
        {
          name: "sophia",
          money: 158.25,
          lotterylist: "上海快3",
          paths: require("@/assets/img/header/2.jpg")
        },
        {
          name: "anthony",
          money: 458.23,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/3.jpg")
        },
        {
          name: "elizabeth",
          money: 5499.08,
          lotterylist: "北京快3",
          paths: require("@/assets/img/header/6.jpg")
        },
        {
          name: "christian",
          money: 77.654,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/5.jpg")
        },
        {
          name: "brandon",
          money: 856.07,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/1.jpg")
        },
        {
          name: "zachary",
          money: 1207.654,
          lotterylist: "上海快3",
          paths: require("@/assets/img/header/0.jpg")
        },
        {
          name: "jessica,",
          money: 21.36,
          lotterylist: "北京快3",
          paths: require("@/assets/img/header/2.jpg")
        },
        {
          name: "robert",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/3.jpg")
        },
        {
          name: "Justin",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/8.jpg")
        },
        {
          name: "Hunter",
          money: 1587.24,
          lotterylist: "湖北快3",
          paths: require("@/assets/img/header/5.jpg")
        },
        {
          name: "Victoria",
          money: 13.14,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/4.jpg")
        },
        {
          name: "若烟",
          money: 4524.28,
          lotterylist: "湖北快3",
          paths: require("@/assets/img/header/7.jpg")
        },
        {
          name: "adfas",
          money: 7452.0,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/2.jpg")
        },
        {
          name: "Jasmine",
          money: 8532.66,
          lotterylist: "广西快3",
          paths: require("@/assets/img/header/1.jpg")
        },
        {
          name: "霍去病",
          money: 9535.03,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/8.jpg")
        },
        {
          name: "fdsawqg",
          money: 156877.1,
          lotterylist: "广西快3",
          paths: require("@/assets/img/header/7.jpg")
        },
        {
          name: "gfukhgj",
          money: 1563.2,
          lotterylist: "江苏快3",
          paths: require("@/assets/img/header/6.jpg")
        },
        {
          name: "dfhteuj",
          money: 15687.88,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/9.jpg")
        },
        {
          name: "辛弃疾",
          money: 21.36,
          lotterylist: "江苏快3",
          paths: require("@/assets/img/header/0.jpg")
        },
        {
          name: "ytmioi",
          money: 89.12,
          lotterylist: "甘肃快3",
          paths: require("@/assets/img/header/1.jpg")
        },
        {
          name: "nkkrtuy",
          money: 7552.12,
          lotterylist: "安徽快3",
          paths: require("@/assets/img/header/3.jpg")
        },
        {
          name: "hfdw6mm",
          money: 1356.16,
          lotterylist: "吉林快3",
          paths: require("@/assets/img/header/2.jpg")
        },
        {
          name: "ksfgfdsg",
          money: 1535.0,
          lotterylist: "北京赛车",
          paths: require("@/assets/img/header/6.jpg")
        },
        {
          name: "ewdghtr",
          money: 15687.88,
          lotterylist: "新疆时时彩",
          paths: require("@/assets/img/header/5.jpg")
        },
        {
          name: "rey",
          money: 26.12,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/7.jpg")
        },
        {
          name: "Joey",
          money: 12.04,
          lotterylist: "新疆时时彩",
          paths: require("@/assets/img/header/8.jpg")
        },
        {
          name: "John",
          money: 138.32,
          lotterylist: "河北快3",
          paths: require("@/assets/img/header/9.jpg")
        },
        {
          name: "Nathan",
          money: 853482.66,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/1.jpg")
        },
        {
          name: "Stan",
          money: 85000,
          lotterylist: "重庆时时彩",
          paths: require("@/assets/img/header/0.jpg")
        },
        {
          name: "Jason",
          money: 1238.654,
          lotterylist: "北京快3",
          paths: require("@/assets/img/header/9.jpg")
        },
        {
          name: "Tino",
          money: 85000,
          lotterylist: "宏發快3",
          paths: require("@/assets/img/header/6.jpg")
        },
        {
          name: "Stephen",
          money: 85000,
          lotterylist: "新疆时时彩",
          paths: require("@/assets/img/header/3.jpg")
        },
        {
          name: "Neo",
          money: 6120,
          lotterylist: "广西快3",
          paths: require("@/assets/img/header/8.jpg")
        }
      ],
    };
  },
  created() {
    setInterval(this.scroll, 1400);
  },
  mounted(){
    this.getLastDayWinList();
  },
  methods:{
    butClass1C(){
      this.butClass2 = false;
      this.butClass1 = true;
    },
    butClass2C(){
      this.butClass1 = false;
      this.butClass2 = true;
    },
    // 获取昨日盈利榜单
    getLastDayWinList() {
      this.$axios.get(baseUrl + "/api/lottery/getLastDayWinList").then(res => {
        this.winList = res.data.data;
      })
      .catch(error => {
        console.log("getLastDayWinListNo");
      });
    },
    scroll() {
      this.animate = !this.animate;
      setTimeout(() => {
        this.winpool.push(this.winpool[0]);
        this.winpool.shift();
        this.animate = !this.animate;
      }, 0);
    },
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
@import "../../../assets/scss/lotts/lottlist.scss";
</style>
