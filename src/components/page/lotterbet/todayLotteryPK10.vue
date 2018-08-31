<template>
  <!-- 今日开奖 -->
  <div>
    <div class="lott-right-top1">
      <button>今日开奖</button>
      <p>
        <router-link tag="a" target="_blank" :to='"/trendChart/1805/"+$route.params.group'>走势图</router-link>
        <i>|</i>
        <!-- <span>玩法说明</span> -->
      </p>
    </div>
    <div class="lott-right-top2">
      <p class="lott-right-top2-title">
        <span class="lott-right-top2-span1 pk10">期号</span>
        <span class="lott-right-top2-span2 pk10">开奖号码</span>
        <span class="lott-right-top2-span3 pk10">开奖时间</span>
      </p>
      <ul>
        <li v-for="(item,index) in getPastOpens" :key="index">
          <span class="lott-right-top2-span1 pk10" v-if="$route.params.group === 'pk10'">{{item.seasonId}}</span>
          <span class="lott-right-top2-span1 pk10" v-else>{{item.seasonId.substring(5)}}</span>
          <span class="lott-right-top2-span2 pk10">
            <i>{{item.n1}}</i>
            <i>{{item.n2}}</i>
            <i>{{item.n3}}</i>
            <i>{{item.n4}}</i>
            <i>{{item.n5}}</i>
            <i>{{item.n6}}</i>
            <i>{{item.n7}}</i>
            <i>{{item.n8}}</i>
            <i>{{item.n9}}</i>
            <i>{{item.n10}}</i>
          </span>
          <span class="lott-right-top2-span3 pk10">{{item.addTime.substring(11)}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  computed: {
    getPastOpens() {
      return this.$store.state.getPastOpens;
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/lottlist.scss";
</style>
