<template>
<div class="viewBox">
  <div class="userRight">
    <div class="userTitle">我要充值</div>
    <div class="userMain">
      <newTab :navNum="6"></newTab>
      <div style="padding-top: 180px;padding-bottom: 180px;text-align:center;" class="maintain"><i class="iconfont hf-setting-fill"></i><span>信用卡支付维护中，请选择其它充值方式</span></div>
    </div>
  </div>
</div>
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