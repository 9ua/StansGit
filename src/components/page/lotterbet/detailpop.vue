<template>
  <div class="detailpop">
    <h3><span>中奖信息</span><i class="iconfont icon-cuo" @click="isshowdetailpop"></i></h3>
    <div class="popbox">
      <p class="contentpop">恭喜您在<b>{{lotteryname}}</b>，第<span>{{numbers}}</span>期，中奖<span>30000.56元</span></p>
      <p class="timepop">{{times}}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      times:'',
      lotteryname:'宏发快3',
      numbers:'201809201440'
    };
  },
  mounted(){
    this.newtimes();
  },
  methods: {
    //当前时间
    newtimes(){
      let date = new Date();
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes();
      this.times = Y+M+D+" "+h+m;
    },
    //弹窗关/开
    isshowdetailpop(){}
  },
};
</script>
<style scoped lang="scss">
.detailpop {
  position: fixed;
  right: 20px;
  bottom: 20px;
  border: 1px solid #ddd;
  width: 300px;
  height: 148px;
  background-color: #fff;
  & h3{
    height: 30px;
    line-height: 30px;
    background-color: #DDD2D2;
    padding: 0 10px;
    & i{
      float: right;
    }
  }
}
.popbox{
  padding:0 16px;
  text-align: center;
  & .contentpop{
    line-height: 32px;
    margin-top: 12px;
  }
  & .timepop{
    float: right;
    line-height: 32px;
  }
}
</style>
