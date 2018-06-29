<template lang="jade">
.sy
  header
    .header-box
      .header-top
        p Hi,欢迎来到宏發娛樂！
        ul.header-top-nologin(v-show='!loginStatus')
          router-link(to='', tag='li')
            a(href='javascript:;') 亲，请登陆
          router-link(to='', tag='li')
            a(href='javascript:;') 用户注册
          router-link(to='', tag='li')
            a(href='javascript:;') 在线客服
        ul.header-top-login(v-show='loginStatus')
          router-link(to='', tag='li')
            img(src='../../assets/img/header/1.jpg', alt='')
            span nathantest
          router-link(to='', tag='li')
            a(href='javascript:;') 我的账户
          router-link(to='', tag='li')
            a(href='javascript:;') 余额：
          router-link(to='', tag='li')
            a(href='javascript:;') 充值
          router-link(to='', tag='li')
            a(href='javascript:;') 提现
          li(@click='logOut')
            a(href='javascript:;') 退出
          router-link(to='', tag='li')
            a(href='javascript:;') 在线客服
  .content-box
    .navs-box
      .navs
        .login
          router-link(to='/home')
            img(src='../../assets/img/home/logo.png', alt='')
        ul
          router-link(:to='nav.path', tag='li', v-for='(nav,index) in navs', :key='index') {{nav.title}}
    .content
      .center
        router-view
  footer-bar
</template>
<script>
import footerBar from "./footer";
import { mapState, mapMutations } from "vuex";
import { setCookie, getCookie, clearCookie } from "../../assets/js/utils";
export default {
  data() {
    return {
      navs: [
        { title: "首页", path: "/home" },
        { title: "彩票大厅", path: "/lott/lottery/index" },
        { title: "活动中心", path: "/activity" },
        { title: "手机购彩", path: "/appdown" },
        { title: "帮助指南", path: "/helpcenter" }
      ],
      loginStatus: false
    };
  },
  mounted() {
    this.loginSt();
  },
  methods: {
    ...mapMutations(["OUT_LOGIN"]),
    logOut() {
      this.OUT_LOGIN();
      this.$router.push({ name: "login", query: { id: "ashore" } });
    },
    loginSt() {
      this.loginStatus = localStorage.getItem("loginStatus");
    }
  },
  components: {
    footerBar
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/sy.scss";
</style>
