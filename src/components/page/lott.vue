<template>
  <div class="lott">
    <div class="lottBox">
      <div class="lotteBox-top">
        <div class="lotteBox-top-banner">
          <img src="http://hf68.com/res/home/images/banner1.png" alt="">
        </div>
        <div class="lotteBox-top-right">1</div>
      </div>
      <div class="lotteryLine fix"></div>
      <div class="lotteList">
        <div class="lotteList-top">
          <ul>
            <li :class="{'active': index === navNum}" v-for="(nav,index) in listnav" :key="index" @click="navTo($event,index,nav)">{{nav.name}}</li>
          </ul>
        </div>
        <div class="lotteList-bott">
          <ul>
            <li v-for="(item,index) in lotteryList" :key="index" @mouseover="selectStyle(item)" @mouseout="outStyle(item)">
              <div class="Nopop">
                <img :src='"@/assets/img/lott/"+item.groupId+".png"' alt="">
                <div>
                  <p>{{item.name}}</p>
                  <span>1分钟1期</span>
                </div>
              </div>
              <div class="pop" v-show="item.showPop">
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
      ]
    };
  },
  mounted() {
    this.lotteryAll();
  },
  methods: {
    selectStyle(item) {
      this.$nextTick(function() {
        this.$set(item, "showPop", true);
      });
    },
    outStyle(item) {
      this.$set(item, "showPop", false);
    },
    toLottery(item){
      console.log(item.id)
      this.$router.push("/lott/"+item.id+"/index")
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
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/lott.scss";
</style>
