<template>
<div class="lott">
  <div class="lott-center">
    <div class="lott-top">
      <div class="lott-top-left"><img src="http://hf68.com/res/home/images/lottTypes/cz_sj1fc-theme-black.png" alt=""/><span>北京赛车</span></div>
      <div class="lott-top-middle">
        <p>第<span>201806240751</span>期 剩余投注时间</p>
        <div>00:00:00</div>
      </div>
      <div class="lott-top-right">
        <p>第<span>201806240751</span>期 开奖结果</p>
        <div>
          <img src="../../../assets/img/lott/open_num.gif" alt="">
          <img src="../../../assets/img/lott/open_num.gif" alt="">
          <img src="../../../assets/img/lott/open_num.gif" alt="">
        </div>
        <div v-show="false">
          <img src="../../../assets/img/lott/k3n1.jpg" alt="">
          <img src="../../../assets/img/lott/k3n2.jpg" alt="">
          <img src="../../../assets/img/lott/k3n3.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="lottBox">
      <div class="lott-left">left</div>
      <div class="lott-right">right</div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/lotts/lottlist.scss";
</style>
