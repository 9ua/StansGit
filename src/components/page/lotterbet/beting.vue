<template>
  <!-- 我的投注 -->
  <div>
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
        <li v-for="(item,index) in orderList" :key="index" v-if="index < 4">
          <span class="lott-right-top4-span1">{{item.seasonId}}</span>
          <span class="lott-right-top4-span2">
            <i>{{item.amount}}.00</i>
          </span>
          <span class="lott-right-top4-span3" :class="{'status': item.win === 0}" v-if="item.statusName !== '已中奖'">
            <i>{{item.statusName}}</i>
          </span>
          <span class="lott-right-top4-span3" v-else>
            <i>{{item.win}}</i>
          </span>
        </li>
        <li class="lott-right-top4-but" @click="$router.push('/betManage/betRecord')">更多>></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  computed:{
    orderList(){
      return this.$store.state.orderList;
    },
  }
}
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/lottlist.scss";
</style>
