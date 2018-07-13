<template lang='jade'>
.viewBox
  .userRight
    .userTitle 今日盈亏
    .userMain
      #PLhtml
        .plCon.fix
          .balance
            span 0.00
            p
              mu-icon(value='monetization_on',class='icon') 余额
              router-link(to="/ebankPay") 充值
              router-link(to="/withdraw") 提现
              router-link(to="/billRecord") 交易记录
          .plTotal
            mu-icon(value='screen_lock_portrait',class='icon')
            .detail
              p 盈亏总额（元）
              em 0.00
          .calculate
            mu-icon(value='screen_lock_portrait',class='icon')
            .detail
              p 盈亏计算公式
              ins 中奖-投注+活动+返点
        .plMore
          li 
            em 0.00
            span 投注金额
          li 
            em 0.00
            span 中奖金额
          li 
            em 0.00
            span 活动礼金
          li 
            em 0.00
            span 返点金额
          li 
            em 0.00
            span 充值金额
          li 
            em 0.00
            span 提现金额
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/betManage/PLstatement.scss";
</style>


