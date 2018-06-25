<template lang="jade">
.footer-box
  .footer
    .footer-maxwidth
      .footer-left
        p.title
          | 技术支持
          span Technical support
        .footer-left-content
          p
          div
            span 宏發云系统
            span 专业的彩票系统平台
      .footer-middle
        p.title
          | 服务体验
          span Service experience
        .footer-middle-content
          .footer-middle-content1
            p 昨日充值平均时间
            el-progress(:text-inside='false', :stroke-width='20', :percentage='a', color='#ED635D', :show-text='false')
            p
              b 0'58
              | 秒
          .footer-middle-content2
            p 昨日充值平均时间
            el-progress(:text-inside='false', :stroke-width='20', :percentage='b', color='#409EFF', :show-text='false')
            p
              b 2'02
              | 秒
      .footer-right
        p.title
          | 充值方式
          span Recharge method
        .footer-right-content
          span
          span
          span
  .mainWidth-buttom
    ul
      li
        a(href='javascript:;') 关于我们
        span |
      li
        a(href='javascript:;') 联系我们
        span |
      li
        a(href='javascript:;') 商务合作
        span |
      li
        a(href='javascript:;') 法律声明
        span |
      li
        a(href='javascript:;') 隐私声明
    p Copyright © 宏發娛樂 Reserved | 18+
</template>
<script>
export default {
  data() {
    return {
      a: 20,
      b: 80
    };
  }
};
</script>
<style lang="scss">
@import "../../assets/scss/sy.scss";
</style>


