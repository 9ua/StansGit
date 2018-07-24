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
            <router-link to="/user" tag="li"><img :src='"/static/images/"+this.$store.state.img+".jpg"' alt="" />
              <span>{{this.$store.state.Globalusername}}</span>
            </router-link>
            <router-link to="" tag="li" @mouseover.native='HoverShowAccount=true' @mouseout.native="HoverShowAccount=false">
              <a href="javascript:;">我的账户
                <i class='iconfont hf-down-copy' style='font-size:14px'></i>
              </a>
              <div class="accountList HoverShowContent" v-if='HoverShowAccount'>
                <i></i>
                <div>
                  <a :href='item.path' v-for="(item,index) in acountlists" :key="index">
                    {{item.title}}
                  </a>
                </div>
              </div>
            </router-link>
            <router-link to="" tag="li">
              <a href="javascript:;">余额：{{$store.state.balance}}</a>
            </router-link>
            <router-link to="" tag="li" @mouseover.native='HoverShowContent=true' @mouseout.native="HoverShowContent=false">
              <a href="javascript:;">充值
                <i class='iconfont hf-down-copy' style='font-size:14px'></i>
              </a>
              <div class="accountList HoverShowContent" v-if='HoverShowContent'>
                <i></i>
                <div>
                  <a :href='"/money/"+item.alino' v-for="(item,index) in paywaylist" :key="index">
                    {{item.alias}}
                  </a>
                </div>
              </div>
            </router-link>
            <router-link to="/money/withdraw" tag="li">
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
            <router-link :class='{active:index===active}' :to="nav.path" tag="li" v-for="(nav,index) in navs" :key="index">{{nav.title}}</router-link>
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
      img: 0,
      HoverShowContent:false,
      HoverShowAccount:false,
      acountlists:[
        { title: "投注记录", path: "/betManage/betRecord" },
        { title: "交易记录", path: "/user/billRecord" },
        { title: "个人信息", path: "/user/userinfo" },
        { title: "安全中心", path: "/user/securityCenter" },
        { title: "代理中心", path: "/agent/agentReport" },
      ],
      navs: [
        { title: "首页", path: "/home" },
        { title: "彩票大厅", path: "/lott" },
        { title: "活动中心", path: "/activity" },
        { title: "手机购彩", path: "/appdown" },
        { title: "帮助指南", path: "/helpcenter" }
      ],
      paywaylist: []
    };
  },
  mounted() {
    this.getTopUserData();
    this.getRechargeWayList();
  },
  methods: {
    setClass(v){
      this.active=v;
    },
    ...mapMutations(["OUT_LOGIN"]),
    //获取用户信息
    getTopUserData() {
      if (localStorage.getItem("topUserData")) {
        let topUserData = JSON.parse(localStorage.getItem("topUserData"));
        this.$store.state.img = topUserData.image;
      } else {
        this.$axios
          .get(
            baseUrl + "/api/userCenter/getTopUserData",
            this.$store.state.config
          )
          .then(res => {
            this.$store.state.img = res.data.data.image;
            localStorage.setItem("topUserData", JSON.stringify(res.data.data));
          })
          .catch(error => {
            this.$store.state.img = 0;
          });
      }
    },
    getRechargeWayList() {
      if (localStorage.getItem("paywaylist")) {
        let paywaylist = JSON.parse(localStorage.getItem("paywaylist"));
        this.paywaylist = paywaylist;
      } else {
        this.$axios
          .get(baseUrl + "/api/proxy/getRechargeWayList")
          .then(res => {
            this.paywaylist = res.data.data;
            localStorage.setItem("paywaylist", JSON.stringify(res.data.data));
          })
          .catch(error => {
            console.log("Error");
          });
      }
    },
    logOut() {
      this.$axios
        .get(baseUrl + "/api/user/logout")
        .then(res => {
          if (res.data.data === "已登出") {
            this.$store.state.loginStatus = false;
            localStorage.setItem("loginStatus", false);
            // localStorage.clear();
          }
        })
        .catch(error => {
          console.log("logOutNo");
        });
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
