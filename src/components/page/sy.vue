<template>
  <div class="sy">
    <header>
      <div class="header-box">
        <div class="header-top">
          <p>Hi,欢迎来到宏發娛樂！</p>
          <ul class="header-top-nologin" v-show="!loginStatus">
            <router-link to="" tag="li">
              <a href="javascript:;">亲，请登陆</a>
            </router-link>
            <router-link to="" tag="li">
              <a href="javascript:;">用户注册</a>
            </router-link>
            <router-link to="" tag="li">
              <a href="javascript:;">在线客服</a>
            </router-link>
          </ul>
          <ul class="header-top-login" v-show="loginStatus">
            <router-link to="" tag="li"><img src="../../assets/img/header/1.jpg" alt="">
              <span>nathantest</span>
            </router-link>
            <router-link to="" tag="li">
              <a href="javascript:;">我的账户</a>
            </router-link>
            <router-link to="" tag="li">
              <a href="javascript:;">余额：</a>
            </router-link>
            <router-link to="" tag="li">
              <a href="javascript:;">充值</a>
            </router-link>
            <router-link to="" tag="li">
              <a href="javascript:;">提现</a>
            </router-link>
            <li @click="logOut">
              <a href="javascript:;">退出</a>
            </li>
            <router-link to="" tag="li">
              <a href="javascript:;">在线客服</a>
            </router-link>
          </ul>
        </div>
      </div>
    </header>
    <div class="content-box">
      <div class="navs-box">
        <div class="navs">
          <div class="login">
            <router-link to="/home"><img src="../../assets/img/home/logo.png" alt=""></router-link>
          </div>
          <ul>
            <router-link :to="nav.path" tag="li" v-for="(nav,index) in navs" :key="index">{{nav.title}}</router-link>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="center">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
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
        { title: "彩票大厅", path: "/lott" },
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
