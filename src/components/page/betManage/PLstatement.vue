<template lang='jade'>
.viewBox
  .userRight
    .userTitle 今日盈亏
    .userMain
      #PLhtml
        .plCon.fix
          .balance
            span {{balance}}
            p
              mu-icon(value='monetization_on',class='icon') 
              余额
              router-link(to="ebankPay") 充值
              router-link(to="withdraw") 提现
              router-link(to="billRecord") 交易记录
          .plTotal
            mu-icon(value='line_weight',class='icon')
            .detail
              p 盈亏总额（元）
              em {{winAmount-betAmount+activityAndSend+juniorRebateAmount | keepTwoNum2}}
          .calculate
            mu-icon(value='gradient',class='icon')
            .detail
              p 盈亏计算公式
              ins 中奖-投注+活动+返点
        .plMore
          li 
            em {{betAmount}}
            span 投注金额
          li 
            em {{winAmount}}
            span 中奖金额
          li 
            em {{activityAndSend}}
            span 活动礼金
          li 
            em {{juniorRebateAmount}}
            span 返点金额
          li 
            em {{rechargeAmount}}
            span 充值金额
          li 
            em {{drawingAmount}}
            span 提现金额
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      id: "",
      balance:0,
      betAmount: 0,
      winAmount: 0,
      activityAndSend: 0,
      juniorRebateAmount: 0,
      rechargeAmount: 0,
      drawingAmount: 0
    };
  },
  mounted() {
    this.getGainLost();
    this.getBalance();
  },
  methods: {
    getGainLost() {
      this.$axios
        .get(baseUrl + "/api/proxy/getGainLost")
        .then(res => {
          this.betAmount = res.data.data.betAmount;
          this.winAmount = res.data.data.winAmount;
          this.activityAndSend = res.data.data.activityAndSend;
          this.juniorRebateAmount = res.data.data.juniorRebateAmount;
          this.rechargeAmount = res.data.data.rechargeAmount;
          this.drawingAmount = res.data.data.drawingAmount;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    getBalance() {
      this.$axios
        .get(baseUrl + "/api/userCenter/getBalance")
        .then(res => {
          this.balance = res.data.data.balance;
        })
        .catch(error => {
          console.log("getBalance Error");
        });
    }
  },
  filters: {
    // 保留三个小数,不四舍五入
    keepTwoNum1(value) {
      value = parseInt(value * 10000) / 10000;
      return value;
    },
    // 保留三个小数,四舍五入
    keepTwoNum2(value) {
      value = Number(value);
      return value.toFixed(3);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/betManage/PLstatement.scss";
</style>


