<template lang='jade'>
.lott
  .lottBox
    .lotteBox-top
      .lotteBox-top-banner
        yd-slider(autoplay='1800')
          yd-slider-item(v-for='item in 2', :key='item')
            a(href='http://www.ydcss.com')
              img(:src='"@/assets/img/home/banner"+item+".png"')
      .lotteBox-top-right
        div(style='height: 240px;')
          p.title 风云榜
          .nwwest-roll
            ul
              li(:class='{anim:animate==true}', v-for='(item,index) in winpool', :key='index')
                img(:src='item.paths', alt='')
                .right-box
                  p
                    span {{item.name | capitalize}}
                    span 在 {{item.lotterylist}}
                  p
                    span 喜中:
                    span
                      | ￥
                      i {{item.money | keepTwoNum}}
    .lotteryLine.fix
      i
      em
    .lotteList
      .lotteList-top
        ul
          li(:class="{'active': index === navNum}", v-for='(nav,index) in listnav', :key='index', @click='navTo($event,index,nav)') {{nav.name}}
      .lotteList-bott
        ul
          li(v-for='(item,index) in lotteryList', :key='index', @mouseover='selectStyle(item)', @mouseout='outStyle(item)')
            .Nopop
              img(:src='"@/assets/img/lott/"+item.groupId+".png"', alt='')
              div
                p {{item.name}}
                span {{item.time}}
            .pop(v-show='item.showPop')
              span(@click='toLottery(item)') 立即投注
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
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select));
            for (let i = 0; i < this.lotteryList.length; i++) {
              this.lotteryList[i]["time"] = time[this.lotteryList[i].id];
            }
          }else
          this.lotteryAll();
          break;
        case "all":
          this.select = 'all';
          if(JSON.parse(localStorage.getItem("getLotteryList_"+this.select))){
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select));
            for (let i = 0; i < this.lotteryList.length; i++) {
              this.lotteryList[i]["time"] = time[this.lotteryList[i].id];
            }
          }else
          this.lotteryAll();
          break;
        case "k3":
          this.select = 'k3';
          if(JSON.parse(localStorage.getItem("getLotteryList_"+this.select))){
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select));
            for (let i = 0; i < this.lotteryList.length; i++) {
              this.lotteryList[i]["time"] = time[this.lotteryList[i].id];
            }
          }else
          this.lotteryAll();
          break;
        case "ssc":
          this.select = 'ssc';
          if(JSON.parse(localStorage.getItem("getLotteryList_"+this.select))){
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select));
            for (let i = 0; i < this.lotteryList.length; i++) {
              this.lotteryList[i]["time"] = time[this.lotteryList[i].id];
            }
          }else
          this.lotteryAll();
          break;
        case "pk10":
          this.select = 'pk10';
          if(JSON.parse(localStorage.getItem("getLotteryList_"+this.select))){
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select));
            for (let i = 0; i < this.lotteryList.length; i++) {
              this.lotteryList[i]["time"] = time[this.lotteryList[i].id];
            }
          }else
          this.lotteryAll();
          break;
        case "x11x5":
          this.select = 'x11x5';
          if(JSON.parse(localStorage.getItem("getLotteryList_"+this.select))){
            this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select));
            for (let i = 0; i < this.lotteryList.length; i++) {
              this.lotteryList[i]["time"] = time[this.lotteryList[i].id];
            }
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
        for (let i = 0; i < this.lotteryList.length; i++) {
          this.lotteryList[i]["time"] = time[this.lotteryList[i].id];
        }
      }else{
        this.$axios.get(baseUrl + "/api/lottery/getLotteryList",{params:{type:this.select}}).then(res => {
          this.lotteryList = res.data.data;
          localStorage.setItem( "getLotteryList_"+this.select, JSON.stringify(res.data.data));
          this.lotteryList = JSON.parse(localStorage.getItem("getLotteryList_"+this.select));
          for (let i = 0; i < this.lotteryList.length; i++) {
            this.lotteryList[i]["time"] = time[this.lotteryList[i].id];
          }
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