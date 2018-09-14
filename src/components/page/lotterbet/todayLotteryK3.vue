<template lang='jade'>
<!-- 今日开奖 -->
div
  .lott-right-top1
    button 今日开奖
    p
      router-link(tag='a', target='_blank', :to='"/trendChart/1803/"+$route.params.group') 走势图
      i |
      // <span>玩法说明</span>
  .lott-right-top2
    p.lott-right-top2-title
      span.lott-right-top2-span1 期号
      span.lott-right-top2-span2.k3 开奖号码
      span.lott-right-top2-span3 和值
      span.lott-right-top2-span4 形态
    ul
      li(v-for='(item,index) in getPastOpens', :key='index')
        span.lott-right-top2-span1 {{item.seasonId}}
        span.lott-right-top2-span2.k3
          i {{item.n1}}
          i {{item.n2}}
          i {{item.n3}}
        span.lott-right-top2-span3 {{item.n1+item.n2+item.n3}}
        span.lott-right-top2-span4
          i(:class="(item.n1+item.n2+item.n3) < 11 ? 'yellow' : 'blue'") {{(item.n1+item.n2+item.n3) < 11 ? "小" : "大"}}
          i(:class="(item.n1+item.n2+item.n3) % 2 ===0 ? 'yellow' : 'blue'") {{(item.n1+item.n2+item.n3) % 2 ===0 ? "双" : "单"}}
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
