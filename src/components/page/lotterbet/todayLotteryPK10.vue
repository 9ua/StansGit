<template lang='jade'>
<!-- 今日开奖 -->
div
  .lott-right-top1
    button 今日开奖
    p
      router-link(tag='a', target='_blank', :to='"/trendChart/1805/"+$route.params.group') 走势图
      i |
      // <span>玩法说明</span>
  .lott-right-top2
    p.lott-right-top2-title
      span.lott-right-top2-span1.pk10 期号
      span.lott-right-top2-span2.pk10 开奖号码
      span.lott-right-top2-span3.pk10 开奖时间
    ul
      li(v-for='(item,index) in getPastOpens', :key='index')
        span.lott-right-top2-span1.pk10(v-if="$route.params.group === 'pk10'") {{item.seasonId}}
        span.lott-right-top2-span1.pk10(v-else='') {{item.seasonId.substring(5)}}
        span.lott-right-top2-span2.pk10
          i {{item.n1}}
          i {{item.n2}}
          i {{item.n3}}
          i {{item.n4}}
          i {{item.n5}}
          i {{item.n6}}
          i {{item.n7}}
          i {{item.n8}}
          i {{item.n9}}
          i {{item.n10}}
        span.lott-right-top2-span3.pk10 {{item.addTime.substring(11)}}
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
