<template lang='jade'>
.sy
  header
    .header-box
      .header-top
        p Hi,欢迎来到宏發娛樂！
        ul.header-top-nologin(v-show='!$store.state.loginStatus')
          router-link(to='/login/ashore', tag='li')
            a(href='javascript:;') 亲，请登陆
          router-link(to='/login/register', tag='li')
            a(href='javascript:;') 用户注册
          router-link(to='', tag='li')
            a(href='javascript:;') 在线客服
        ul.header-top-login(v-show='$store.state.loginStatus')
          router-link(to='/user', tag='li')
            img(:src='"@/assets/img/heads/"+this.$store.state.img+".jpg"', alt='')
            span {{this.$store.state.Globalusername}}
          router-link(to='/user/notice', tag='li', @mouseover.native='HoverShowLetter=true', @mouseout.native='HoverShowLetter=false')
            span.letter(:class='HoverShowLetter ? "active" : ""') {{count}}
          router-link(to='', tag='li', @mouseover.native='HoverShowAccount=true', @mouseout.native='HoverShowAccount=false')
            a(href='javascript:;')
              | 我的账户
              i.iconfont.icon-down1(style='font-size:14px')
            .accountList.HoverShowContent(v-if='HoverShowAccount')
              i
              div
                router-link(:to='item.path', v-for='(item,index) in acountlists', :key='index')
                  | {{item.title}}
          li
            | 余额：
            span.GetMoney.getMoney(v-if='refresh')
              em {{$store.state.balance}}
              i.icon.iconfont.icon-shuaxin(:class='{totransition:clickFlag}', @click.stop='getBalance')
              i(@click.stop='changReferesh') 隐藏
            span.ShowMoney.showMoney(v-else='', @click.stop='changReferesh')
              | 已隐藏
              i 显示
          router-link(to='', tag='li', @mouseover.native='HoverShowContent=true', @mouseout.native='HoverShowContent=false')
            a(href='javascript:;')
              | 充值
              i.iconfont.icon-down1(style='font-size:14px')
            .accountList.HoverShowContent(v-if='HoverShowContent')
              i
              div
                router-link(:to='"/money/charge?id="+item.id+"&alias="+item.alias', v-for='(item,index) in paywaylist', :key='index')
                  | {{item.alias}}
          router-link(to='/money/withdraw', tag='li')
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
          router-link(:class='{active:index===active}', :to='nav.path', tag='li', v-for='(nav,index) in navs', :key='index') {{nav.title}}
    .content
      .center
        router-view
  footer-bar
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
      active: -1,
      refresh:false,
      clickFlag:false,
      HoverShowContent: false,
      HoverShowAccount: false,
      HoverShowLetter: false,
      acountlists: [
        { title: "投注记录", path: "/betManage/betRecord" },
        { title: "交易记录", path: "/user/billRecord" },
        { title: "个人信息", path: "/user/userinfo" },
        { title: "安全中心", path: "/user/securityCenter" },
        { title: "代理中心", path: "/agent/agentReport" }
      ],
      navs: [
        { title: "首页", path: "/home" },
        { title: "彩票大厅", path: "/lott" },
        { title: "活动中心", path: "/activity" },
        { title: "手机购彩", path: "/appdown" },
        { title: "帮助指南", path: "/helpcenter" }
      ],
      paywaylist: [],
      localStorageArr: [],
      count:0
    };
  },
  mounted() {
    this.getRechargeWayList();
    this.getTopUserData();
    this.getNoReadNoticeStatus();
  },
  methods: {
    changReferesh(){
      this.refresh=!this.refresh;
    },
    getBalance(){
      this.clickFlag=true;
      this.$axios
          .get(baseUrl + "/api/userCenter/getBalance")
          .then(res => {
            this.clickFlag=false;
            this.$store.state.balance=res.data.data.balance;
          })
          .catch(error => {
            this.clickFlag=false;            
            console.log(error)
          });
    },
    setClass(v) {
      this.active = v;
    },
    ...mapMutations(["OUT_LOGIN"]),
    //获取用户信息
    getTopUserData() {
      if (localStorage.getItem("topUserData")) {
        let topUserData = JSON.parse(localStorage.getItem("topUserData"));
        this.$store.state.img = topUserData.image;
      } else {
        this.$axios.get(baseUrl + "/api/userCenter/getTopUserData").then(res => {
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
        if (this.$store.state.loginStatus) {
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
      }
    },
    logOut() {
      for (let i = 0; i < localStorage.length; i++) {
        this.localStorageArr.push(localStorage.key(i));
      }
      this.localStorageArr.map(key => {
        if (key !== "username") {
          localStorage.removeItem(key);
        }
      });
      this.$axios
        .get(baseUrl + "/api/user/logout")
        .then(res => {
          if (res.data.data === "已登出") {
            this.$store.state.loginStatus = false;
            localStorage.setItem("loginStatus", false);
            // localStorage.clear();
            this.$router.push("/login/ashore");
          }
        })
        .catch(error => {
          console.log("logOutNo");
        });
    },
    //判断是否有未读消息
    getNoReadNoticeStatus() {
      this.$axios.get(baseUrl + "/api/proxy/getNoReadNoticeStatus").then(res => {
        //状态
        this.isNotice = res.data.data.flag;
        //条数
        this.count = res.data.data.count;
      })
      .catch(error => {
        console.log("获取彩種ratio ERROR");
      });
    },
  },
  components: {
    footerBar
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/sy.scss";
</style>
