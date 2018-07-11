<template lang='jade'>
.viewBox
  .userRight
    .userTitle 安全中心
    .userMain
      .mg30
        el-steps(:active='active', finish-status='success',align-center,class='queue')
            el-step(title='选择验证方式')
            el-step(title='身份验证')
            el-step(title='修改安全密码')
            el-step(title='完成')
        ul.safeList
          li(:class='{noSet:!mobile}')
            mu-icon(value='screen_lock_portrait',class='icon')
            span.text
              strong 通过密保手机
              p 密保手机可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="",v-show='! mobile') 立即找回
              router-link(to="/user/verifyMobile?F=Mobile&Q=ResetSafePwd",v-show='mobile') 立即找回
          li(:class='{noSet:!question}')
            mu-icon(value='security',class='icon')
            span.text
              strong 通过密保问题
              p 密保问题可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="",v-show='! question') 立即找回
              router-link(to="/user/verifyQuestion?F=Question&Q=ResetSafePwd",v-show='question') 立即找回
          li(:class='{noSet:!email}')
            mu-icon(value='email',class='icon')
            span.text
              strong 通过密保邮箱
              p 绑定邮箱可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="",v-show="! email") 立即找回
              router-link(to="/user/verifyMail?F=Mail&Q=ResetSafePwd",v-show="email") 立即找回
              
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      active: 1,
      mobile: 0, //密保手机
      question: 0, //密保问题
      email: 0 //密保邮箱
    };
  },
  created() {
    this.getSecurityCenterStatus();
  },
  methods: {
    //取安全中心状态
    getSecurityCenterStatus() {
      if (localStorage.getItem("centerStatus")) {
        let centerStatus = JSON.parse(localStorage.getItem("centerStatus"));
        this.mobile = centerStatus.mobile;
        this.question = centerStatus.question;
        this.email = centerStatus.email;
      } else {
        this.$axios
          .get(
            baseUrl + "/api/userCenter/getSecurityCenterStatus",
            this.$store.state.config
          )
          .then(res => {
            this.mobile = res.data.data.mobile;
            this.question = res.data.data.question;
            this.email = res.data.data.email;
            localStorage.setItem("centerStatus", JSON.stringify(res.data.data));
          })
          .catch(error => {
            console.log("取安全中心状态No");
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/user/securityCenter.scss";
@import "@/assets/scss/user/setComm.scss";
</style>


