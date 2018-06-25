<template>
  <div class="footer-box">
    <div class="footer">
      <div class="footer-maxwidth">
        <div class="footer-left">
          <p class="title">技术支持
            <span>Technical support</span>
          </p>
          <div class="footer-left-content">
            <p></p>
            <div>
              <span>宏發云系统</span>
              <span>专业的彩票系统平台</span>
            </div>
          </div>
        </div>
        <div class="footer-middle">
          <p class="title">服务体验
            <span>Service experience</span>
          </p>
          <div class="footer-middle-content">
            <div class="footer-middle-content1">
              <p>昨日充值平均时间</p>
              <el-progress :text-inside="false" :stroke-width="20" :percentage="a" color="#ED635D" :show-text="false"></el-progress>
              <p>
                <b>0'58</b>秒</p>
            </div>
            <div class="footer-middle-content2">
              <p>昨日充值平均时间</p>
              <el-progress :text-inside="false" :stroke-width="20" :percentage="b" color="#409EFF" :show-text="false"></el-progress>
              <p>
                <b>2'02</b>秒</p>
            </div>
          </div>
        </div>
        <div class="footer-right">
          <p class="title">充值方式
            <span>Recharge method</span>
          </p>
          <div class="footer-right-content">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="mainWidth-buttom">
      <ul>
        <li><a href="javascript:;">关于我们</a><span>|</span></li>
        <li><a href="javascript:;">联系我们</a><span>|</span></li>
        <li><a href="javascript:;">商务合作</a><span>|</span></li>
        <li><a href="javascript:;">法律声明</a><span>|</span></li>
        <li><a href="javascript:;">隐私声明</a></li>
      </ul>
      <p>Copyright © 宏發娛樂 Reserved | 18+</p>
    </div>
  </div>
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


