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
              ins {{lastLoginTime}}
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
              strong {{securityCoe === 0 ? '未设置安全密码' : '已设置安全密码'}}
              p 安全密码用于提现、绑定银行卡等操作，可保障资金安全。
            span.btn
              router-link(to="/user/setSafePwd",v-show='! securityCoe') 设置安全密码
              router-link(to="/user/verifySafePwd",v-show='securityCoe') 修改安全密码
              router-link(to="/user/resetWay",v-show='securityCoe') 找回安全密码
          li(:class='{noSet:!mobile}')
            mu-icon(value='screen_lock_portrait',class='icon')
            span.text
              strong {{mobile === 0 ? '未绑定密保手机:' : '已绑定密保手机:'}}
              p 密保手机可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="/user/setMobile",v-show='! mobile') 绑定密保手机
              router-link(to="/user/verifyMobile",v-show='mobile') 修改密保手机
          li(:class='{noSet:!question}')
            mu-icon(value='security',class='icon')
            span.text
              strong {{question === 0 ? '未设置密保问题' : '已设置密保问题'}}
              p 密保问题可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="/user/setQuestion",v-show='! question') 设置密保问题
              router-link(to="/user/verifyQuestion",v-show='question') 修改密保问题
          li(:class='{noSet:!email}')
            mu-icon(value='email',class='icon')
            span.text
              strong {{email === 0 ? '未绑定密保邮箱' : '已绑定密保邮箱'}}
              p 绑定邮箱可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="/user/setMail",v-show="! email") 绑定密保邮箱
              router-link(to="/user/verifyMail",v-show="email") 修改密保邮箱
              
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      lastLoginTime: "",
      local: "美国",
      value5: 1,
      password: 1, //密码
      securityCoe: 0, //安全码
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
      this.$loader.show();
      this.$axios
        .get(
          baseUrl + "/api/userCenter/getSecurityCenterStatus",
          this.$store.state.config
        )
        .then(res => {
          this.password = res.data.data.password;
          this.securityCoe = res.data.data.securityCoe;
          this.mobile = res.data.data.mobile;
          this.question = res.data.data.question;
          this.email = res.data.data.email;
          this.lastLoginTime = res.data.data.lastLoginTime;
          // localStorage.setItem("centerStatus", JSON.stringify(res.data.data));
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
          this.$loader.hide();
        })
        .catch(error => {
          this.$loader.hide();
          console.log("取安全中心状态No");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/user/securityCenter.scss";
</style>


