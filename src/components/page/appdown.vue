<template>
  <div class="appdown">
    <div class="appdown-center">
      <p>m.{{isherf}}</p>
      <div id="android"></div>
      <div id="ios"></div>
      <div class="appDownloadTitle">
        <span>Android</span>
        <span>IOS</span>
      </div>
    </div>

  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      isherf: null
    };
  },
  mounted() {
    this.qrcode();
  },
  methods: {
    qrcode() {
      this.isherf = document.location.host.replace("www.", "");
      let qrcode1 = new QRCode("android", {
        width: 106,
        height: 106, // 高度
        text: "https://" + this.isherf + "/app/android.apk" // 二维码内容
      });
      let qrcode2 = new QRCode("ios", {
        width: 106,
        height: 106, // 高度
        text: "https://www.pgyer.com/mjn2" // 二维码内容
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/appdown.scss";
</style>
