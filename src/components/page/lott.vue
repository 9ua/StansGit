<template>
  <div class="lott">
    <div class="lottBox">
      <div class="lotteBox-top">
        <div class="lotteBox-top-banner">
          <yd-slider autoplay="1800">
            <yd-slider-item v-for="item in 2" :key="item">
              <a href="http://www.ydcss.com">
                <img :src='"@/assets/img/home/banner"+item+".png"'>
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
import { winpool } from '../../assets/js/winning.js';
export default {
  data() {
    return {
      navNum: 0,
      lottery: "hot",
      showPop: false,
      lotterys: null,
      select:'hot',
      lotteryList: null,
      lotteryListHot: null,
      lotteryListAll: null,
      lotteryListK3: null,
      lotteryListSsc: null,
      lotteryListPk10: null,
      listnav: [
        {
          name: "热门",
          lottery: "hot"
        },
        {
          name: "全部",
          lottery: "all"
        },
        {
          name: "快3",
          lottery: "k3"
        },
        {
          name: "时时彩",
          lottery: "ssc"
        },
        {
          name: "快乐彩",
          lottery: "pk10"
        },
        {
          name: "11选5",
          lottery: "x11x5"
        }
      ],
      winpool:winpool,
      animate: true,
      seTimeouts:null,
      seTimeout:null,
    };
  },
  beforeDestroy(){
    clearTimeout(this.seTimeout);
    clearInterval(this.seTimeouts);
  },
  created() {
    this.seTimeouts = setInterval(this.scroll, 1400);
  },
  mounted() {
    this.lotteryAll();
  },
  methods: {
    scroll() {
      this.animate = !this.animate;
      this.seTimeout = setTimeout(() => {
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
      this.$router.push("/bet/" + item.groupId + "/" + item.id);
    },
    navTo(e, index, navs) {
      this.navNum = index;
      this.lottery = navs.lottery;
      switch (this.lottery) {
        case "hot":
          this.select = 'hot';
          if(JSON.parse(localStorage.getItem("getLotteryList_"+this.select))){
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select))
          }else
          this.lotteryAll();
          break;
        case "all":
          this.select = 'all';
          if(JSON.parse(localStorage.getItem("getLotteryList_"+this.select))){
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select))
          }else
          this.lotteryAll();
          break;
        case "k3":
          this.select = 'k3';
          if(JSON.parse(localStorage.getItem("getLotteryList_"+this.select))){
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select))
          }else
          this.lotteryAll();
          break;
        case "ssc":
          this.select = 'ssc';
          if(JSON.parse(localStorage.getItem("getLotteryList_"+this.select))){
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select))
          }else
          this.lotteryAll();
          break;
        case "pk10":
          this.select = 'pk10';
          if(JSON.parse(localStorage.getItem("getLotteryList_"+this.select))){
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select))
          }else
          this.lotteryAll();
          break;
        case "x11x5":
          this.select = 'x11x5';
          if(JSON.parse(localStorage.getItem("getLotteryList_"+this.select))){
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select))
          }else
          this.lotteryAll();
          break;  
      }
    },
    overShow(e, index) {
      this.showPop = !this.showPop;
    },
    lotteryAll() {
      if(localStorage.getItem("getLotteryList_"+this.select) !== null){
        this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select));
      }else{
        this.$axios.get(baseUrl + "/api/lottery/getLotteryList",{params:{type:this.select}}).then(res => {
          this.lotteryList = res.data.data;
          localStorage.setItem( "getLotteryList_"+this.select, JSON.stringify(res.data.data));
          this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select));
        })
        .catch(error => {
          console.log(error);
        });
      }
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