<template>
  <div class="lott">
    <div class="lottBox">
      <div class="lotteBox-top">
        <div class="lotteBox-top-banner">
          <yd-slider autoplay="1800">
            <yd-slider-item v-for="item in 2" :key="item">
              <a href="http://www.ydcss.com">
                <img :src='"http://hf68.com/res/home/images/banner"+item+".png"'>
              </a>
            </yd-slider-item>
          </yd-slider>
        </div>
        <div class="lotteBox-top-right">
          <div style="height: 240px;">
            <p class="title">风云榜</p>
            <div class="nwwest-roll">
              <ul>
                <li :class="{anim:animate==true}" v-for="(item,index) in winpool" :key="index">
                  <img :src='item.paths' alt="">
                  <div class="right-box">
                    <p>
                      <span>{{item.name | capitalize}}</span>
                      <span>在 {{item.lotterylist}}</span>
                    </p>
                    <p>
                      <span>喜中:</span>
                      <span>￥
                        <i>{{item.money | keepTwoNum}}</i>
                      </span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="lotteryLine fix">
        <i></i>
        <em></em>
      </div>
      <div class="lotteList">
        <div class="lotteList-top">
          <ul>
            <li :class="{'active': index === navNum}" v-for="(nav,index) in listnav" :key="index" @click="navTo($event,index,nav)">{{nav.name}}</li>
          </ul>
        </div>
        <div class="lotteList-bott">
          <ul>
            <li v-for="(item,index) in lotteryList" :key="index" @mouseover="selectStyle(item)" @mouseout="outStyle(item)">
              <div class="Nopop"><img :src="&quot;@/assets/img/lott/&quot;+item.groupId+&quot;.png&quot;" alt="" />
                <div>
                  <p>{{item.name}}</p>
                  <span>1分钟1期</span>
                </div>
              </div>
              <div v-show="item.showPop" class="pop">
                <span @click="toLottery(item)">立即投注</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseUrl } from "../../assets/js/env";
export default {
  data() {
    return {
      navNum: 0,
      lottery: "hot",
      showPop: false,
      lotteryList: null,
      lotteryListHot: null,
      lotteryListAll: null,
      lotteryListK3: null,
      lotteryListSsc: null,
      lotteryListPk10: null,
      listnav: [
        { name: "热门", lottery: "hot" },
        { name: "全部", lottery: "all" },
        { name: "快3", lottery: "k3" },
        { name: "时时彩", lottery: "ssc" },
        { name: "快乐彩", lottery: "pk10" }
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
    this.lotteryAll();
  },
  methods: {
    scroll() {
      this.animate = !this.animate;
      setTimeout(() => {
        this.winpool.push(this.winpool[0]);
        this.winpool.shift();
        this.animate = !this.animate;
      }, 0);
    },
    selectStyle(item) {
      this.$nextTick(function() {
        this.$set(item, "showPop", true);
      });
    },
    outStyle(item) {
      this.$set(item, "showPop", false);
    },
    toLottery(item) {
      console.log(item)
      console.log(item.groupId)
      this.$router.push({path:"/lotts/"+item.groupId});
      // this.$router.push({path:item.groupId,query:{id:item.id,name:item.name}});
    },
    navTo(e, index, navs) {
      this.navNum = index;
      this.lottery = navs.lottery;
      switch (this.lottery) {
        case "hot":
          this.lotteryList = this.lotteryListHot;
          break;
        case "all":
          this.lotteryList = this.lotteryListAll;
          break;
        case "k3":
          this.lotteryList = this.lotteryListK3;
          break;
        case "ssc":
          this.lotteryList = this.lotteryListSsc;
          break;
        case "pk10":
          this.lotteryList = this.lotteryListPk10;
          break;
      }
    },
    overShow(e, index) {
      this.showPop = !this.showPop;
    },
    lotteryAll() {
      this.$axios
        .get(baseUrl + "/api/lottery/getLotteryList")
        .then(res => {
          this.lotteryList = res.data.data.hot;
          this.lotteryListHot = res.data.data.hot;
          this.lotteryListAll = res.data.data.all;
          this.lotteryListK3 = res.data.data.k3;
          this.lotteryListSsc = res.data.data.ssc;
          this.lotteryListPk10 = res.data.data.pk10;
        })
        .catch(error => {
          console.log("getLotteryListNo");
        });
    }
  },
  filters: {
    capitalize(value) {
      let start = value.slice(0, 1);
      let end = value.slice(-1);
      return `${start}***${end}`;
    },
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/lott.scss";
</style>
