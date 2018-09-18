<template lang='jade'>
<!-- 我的投注 -->
div
  .lott-right-top3
    button 我的投注
    p
  .lott-right-top4
    p.lott-right-top4-title
      span.lott-right-top4-span1 期号
      span.lott-right-top4-span2 投注金额
      span.lott-right-top4-span3 奖金
    ul
      li(v-for='(item,index) in orderList', :key='index', v-if='index < 4', @click='showbetPop(item)')
        span.lott-right-top4-span1 {{item.seasonId}}
        span.lott-right-top4-span2
          i {{item.amount}}.00
        span.lott-right-top4-span3(:class="{'status': item.win === 0}", v-if="item.statusName !== '已中奖'")
          i {{item.statusName}}
        span.lott-right-top4-span3(v-else='')
          i {{item.win}}
      li.lott-right-top4-but(@click="$router.push('/betManage/betRecord')") 更多>>
  beting-pop(:items='item', v-if='showBetingPop')
</template>
<script>
import betingPop from "./betingPop.vue";
export default {
  data() {
    return {
      showBetingPop: false,
      item: null
    };
  },
  methods: {
    showbetPop(item) {
      this.showBetingPop = !this.showBetingPop;
      this.item = item;
    },
    getbetOrderList() {
      this.$emit("emitget"); //我的投注
    }
  },
  computed: {
    orderList() {
      return this.$store.state.orderList;
    }
  },
  components: {
    betingPop
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/lottlist.scss";
</style>
