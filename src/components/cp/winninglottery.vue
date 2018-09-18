<template lang='jade'>
<!-- 游戏中昨日盈利榜 -->
ul.lott-right-top7-ul
  li(v-for='(item,index) in winList', :key='index')
    .champion
      img(:src='"@/assets/img/heads/"+item.img+".jpg"', alt='')
      p
        span
          | 账号昵称 ：
          i.nickname {{item.account | mask}}
        span
          | 昨日盈利 ：
          i.gain {{item.bonus}}
          i 元
    p.index {{index+1}}
</template>
<script>
export default {
  data(){
    return{
      winList: null, //中奖列表
    }
  },
  mounted(){
    this.getLastDayWinList();
  },
  methods:{
    // 获取昨日盈利榜单
    getLastDayWinList() {
      if(localStorage.getItem("getLastDayWinList") !== null){
        this.winList = JSON.parse(localStorage.getItem("getLastDayWinList"));
      }else{
        this.$axios.get(baseUrl + "/api/lottery/getLastDayWinList").then(res => {
          localStorage.setItem("getLastDayWinList",JSON.stringify(res.data.data));
          this.winList = JSON.parse(localStorage.getItem("getLastDayWinList"));
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  },
  filters: {
    mask(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0) + "***" + value.charAt(value.length - 1);
    }
  }
};
</script>

<style lang='scss' scoped>
@import './winninglottery.scss';
</style>
