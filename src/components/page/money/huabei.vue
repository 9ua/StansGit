<template lang="jade">
.viewBox
  .userRight
    .userTitle 我要充值
    .userMain
      newTab(:navNum='5')
      .maintain(style='padding-top: 180px;padding-bottom: 180px;text-align:center;')
        i(class='iconfont hf-setting-fill')
        span 花呗支付维护中，请选择其它充值方式
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import newTab from "../public/newTab";
export default {
  components: {
    newTab
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/user/comm.scss";
</style>