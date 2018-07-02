<template>
  <div class="sy">
    <header>
      <div class="header-box">
        <div class="header-top">
          <p>Hi,欢迎来到宏發娛樂！</p>
          <ul class="header-top-nologin" v-show="!$store.state.loginStatus">
            <router-link to="/login" tag="li">
              <a href="javascript:;">亲，请登陆</a>
            </router-link>
            <router-link to="/login?id=register" tag="li">
              <a href="javascript:;">用户注册</a>
            </router-link>
            <router-link to="" tag="li">
              <a href="javascript:;">在线客服</a>
            </router-link>
          </ul>
          <ul class="header-top-login" v-show="$store.state.loginStatus">
            <router-link to="" tag="li"><img src="../../assets/img/header/1.jpg" alt="" />
              <span>{{this.$store.state.Globalusername}}</span>
            </router-link>
            <router-link to="" tag="li">
              <a href="javascript:;">我的账户</a>
            </router-link>
            <router-link to="" tag="li">
              <a href="javascript:;">余额：{{$store.state.balance}}</a>
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
            <router-link to="/home"><img src="../../assets/img/home/logo.png" alt="" /></router-link>
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
import { baseUrl } from "../../assets/js/env";
import footerBar from "./footer";
import { mapState, mapMutations } from "vuex";
import { setCookie, getCookie, clearCookie } from "../../assets/js/utils";
export default {
  data() {
    return {
      img:0,
      navs: [
        { title: "首页", path: "/home" },
        { title: "彩票大厅", path: "/lott" },
        { title: "活动中心", path: "/activity" },
        { title: "手机购彩", path: "/appdown" },
        { title: "帮助指南", path: "/helpcenter" }
      ]
    };
  },
  mounted() {
    this.haa();
    this.getTopUserData();
  },
  methods: {
    ...mapMutations(["OUT_LOGIN"]),
    //获取用户信息
    getTopUserData(){
      this.$axios.get(baseUrl + "/api/userCenter/getTopUserData").then(res => {
        console.log(res,"获取用户信息")
      });
    },
    logOut() {
      this.$axios
        .get(baseUrl + "/api/user/logout")
        .then(res => {
          if (res.data.data === "已登出") {
            this.$store.state.loginStatus = false;
            localStorage.setItem("loginStatus", false);
            localStorage.clear();
          }
        })
        .catch(error => {
          console.log("logOutNo");
        });
    },
    haa() {
      console.log("store:" + this.$store.state.loginStatus);
      console.log("getItem:" + Boolean(localStorage.getItem("loginStatus")));
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
