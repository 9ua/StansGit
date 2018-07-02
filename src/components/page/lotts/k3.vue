<template>
  <div class="lott">
    <div class="lott-center">
      <div class="lott-top">
        <div class="lott-top-left"><img src="http://hf68.com/res/home/images/lottTypes/cz_sj1fc-theme-black.png" alt="" />
          <span>宏发k3</span>
        </div>
        <div class="lott-top-middle">
          <p>第
            <span>201806240751</span>期 剩余投注时间</p>
          <div>00:00:00</div>
        </div>
        <div class="lott-top-right">
          <p>第
            <span>201806240751</span>期 开奖结果</p>
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
        <div class="lott-right">
          <div class="lott-right-top1">
            <button>今日开奖</button>
            <p>
              <span>走势图</span>
              <i>|</i>
              <span>玩法说明</span>
            </p>
          </div>
          <div class="lott-right-top2">
            <p class="lott-right-top2-title">
              <span class="lott-right-top2-span1">期号</span>
              <span class="lott-right-top2-span2">开奖号码</span>
              <span class="lott-right-top2-span3">和值</span>
              <span class="lott-right-top2-span4">形态</span>
            </p>
            <ul>
              <li v-for="item in 10" :key="item.id">
                <span class="lott-right-top2-span1">20180702064</span>
                <span class="lott-right-top2-span2"><i>2,2,2</i></span>
                <span class="lott-right-top2-span3">10</span>
                <span class="lott-right-top2-span4"><i :class="sum < 11 ? 'yellow' : 'blue'">{{sum < 11 ? "小" : "大"}}</i><i :class="sum%2 ===0 ? 'yellow' : 'blue'">{{sun %2 ===0 ? "双" : "单"}}</i></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sum:10
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/lotts/lottlist.scss";
</style>
