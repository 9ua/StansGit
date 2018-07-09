<template lang='jade'>
.viewBox
  .userRight
    .userTitle 安全中心
    .userMain
      .mg30
        .safeTop.mgb10
          .star
            mu-icon(value='star',:class="{'curr': index <= value5}",v-for='index in 5',:key='index')
          .text
            strong 您的账户安全级别为低，可以通过完善安全信息提高级别。
            p
              上次登录时间： 
              ins {{date}}
              ins {{local}} | 
              不是我登录？
              router-link(to="/user/verifyPwd") 修改密码
        ul.safeList
          li(:class='{noSet:!password}')
            mu-icon(value='vpn_key',class='icon')
            span.text
              strong 登录密码
              p 建议您使用字母和数字的组合、混合大小写、在组合中加入下划线等符号。
            span.btn
              router-link(to="/user/verifyPwd") 修改密码
          li(:class='{noSet:!securityCoe}')
            mu-icon(value='lock',class='icon')
            span.text
              strong 已设置安全密码
              p 安全密码用于提现、绑定银行卡等操作，可保障资金安全。
            span.btn
              router-link(to="/user/verifySafePwd") 修改安全密码
              router-link(to="/user/resetWay") 找回安全密码
          li(:class='{noSet:!mobile}')
            mu-icon(value='screen_lock_portrait',class='icon')
            span.text
              strong 未绑定密保手机:
              p 密保手机可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="/user/setMobile") 绑定密保手机
          li(:class='{noSet:!question}')
            mu-icon(value='security',class='icon')
            span.text
              strong 未设置密保问题:
              p 密保问题可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="/user/setQuestion") 设置密保问题
          li(:class='{noSet:!email}')
            mu-icon(value='email',class='icon')
            span.text
              strong 未绑定密保邮箱:
              p 绑定邮箱可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="/user/setMail") 绑定密保邮箱
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      date: "2018-01-01 10:10:10",
      local: "美国",
      value5: 1,
      password: 1, //密码
      securityCoe: 0, //安全码
      mobile: 0, //密保手机
      question: 0, //密保问题
      email: 0 //密保邮箱
    };
  },
  mounted() {
    this.getSecurityCenterStatus();
  },
  methods: {
    //取安全中心状态
    getSecurityCenterStatus() {
      this.$axios
        .get(baseUrl + "/api/userCenter/getSecurityCenterStatus")
        .then(res => {
          this.password = res.data.data.password;
          this.securityCoe = res.data.data.securityCoe;
          this.mobile = res.data.data.mobile;
          this.question = res.data.data.question;
          this.email = res.data.data.email;
          if (this.securityCoe === 1) {
            this.value5 += 1;
          }
          if (this.mobile === 1) {
            this.value5 += 1;
          }
          if (this.question === 1) {
            this.value5 += 1;
          }
          if (this.email === 1) {
            this.value5 += 1;
          }
        })
        .catch(error => {
          console.log("取安全中心状态No");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/user/securityCenter.scss";
</style>


