<template lang='jade'>
<!-- 中奖信息、昨日盈利榜 -->
div
  .lott-right-top5
    button(:class="butClass1 ? 'active' : ''", @click='butClass1C') 中奖信息
    button(:class="butClass2 ? 'active' : ''", @click='butClass2C') 昨日盈利榜
  .lott-right-top6(v-show='butClass1')
    p.lott-right-top6-title
      span.lott-right-top6-span1 中奖信息实时更新
    win-msg
  .lott-right-top7(v-show='butClass2')
    p.lott-right-top6-title
      span.lott-right-top6-span1 昨日累计盈利排行榜
    winninglottery
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import winMsg from "@/components/cp/winMsg.vue";
import winninglottery from "@/components/cp/winninglottery.vue";
export default {
  data() {
    return {
      butClass1: true,
      butClass2: false
    };
  },
  methods: {
    //中奖信息
    butClass1C() {
      this.butClass2 = false;
      this.butClass1 = true;
    },
    //昨日盈利
    butClass2C() {
      this.butClass1 = false;
      this.butClass2 = true;
    }
  },
  components: {
    winMsg,
    winninglottery
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/lottlist.scss";
</style>
