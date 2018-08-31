<template>
  <!-- 中奖信息 -->
  <ul class="lott-right-top6-ul">
    <li :class="{anim:animate==true}" v-for="(item,index) in winpool" :key="index">
      <img :src="item.paths" alt="" />
      <div class="rightBox">
        <p>
          <span>{{item.name | mask}} </span>
          <span> &nbsp;在{{item.lotterylist}}</span>
        </p>
        <p>
          <span>喜中：</span>
          <span>￥
            <i>{{item.money | keepTwoNum}}</i>
          </span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
import { winpool } from '../../assets/js/winning.js';
export default {
  data() {
    return {
      winpool: winpool,
      animate: true,
      seTimeout:null,
      seTimeouts:null,
    };
  },
  beforeDestroy(){
    clearTimeout(this.seTimeout);
    clearInterval(this.seTimeouts);
  },
  created() {
    this.seTimeouts = setInterval(this.scroll, 1400);
  },
  methods:{
    scroll() {
      this.animate = !this.animate;
      this.seTimeout = setTimeout(() => {
        this.winpool.push(this.winpool[0]);
        this.winpool.shift();
        this.animate = !this.animate;
      }, 0);
    },
  },
  filters: {
    mask(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0) + "***" + value.charAt(value.length - 1);
    },
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "./winMsg.scss";
</style>
