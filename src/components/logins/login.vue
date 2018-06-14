<template>
  <div class="login" onselectstart="return false;">
    <div class="loginFrom">
      <div class="loginLog"></div>
      <div class="loginGo">
        <p class="loginGoTitle" ref="loginGoTitle">用户登陆</p>
        <ul class="loginGoUl" v-show="!tologin">
          <li>
            <mu-icon class="iconLeft" value="account_circle"></mu-icon>
            <div><input type="text" v-model="validateForm.username" placeholder="请输入用户名"></div>
          </li>
          <li>
            <mu-icon class="iconLeft" value="lock"></mu-icon>
            <div>
              <input :type="checked ? 'text' : 'password'" v-model="validateForm.password" placeholder="请输入密码码">
              <mu-icon class="iconRight ishwo" value="visibility" v-show="!checked" @click="checkeds"></mu-icon>
              <mu-icon class="iconRight ishide" value="visibility_off" v-show="checked" @click="checkeds"></mu-icon>
            </div>
          </li>
          <li v-show="errorcode">
            <mu-icon class="iconLeft" value="account_circle"></mu-icon>
            <div><input type="text" v-model="validateForm.captcha_code" placeholder="请输入验证码"><img :src="captchaCodeImg" @click="getCaptchaCode"></div>
          </li>
        </ul>
        <div class="registerBtn" v-show="!tologin">
          <p>
            <span></span>
            <span>
              <i class="toRegister" @click="toRegister">立即注册</i>
              <i>
                <mu-icon class="call" value="call"></mu-icon>联系客服</i>
              <i class="color">忘记密码？</i>
            </span>
          </p>
          <mu-button class="registerGo" color="error" @click="tosubmit">立即登陆</mu-button>
        </div>
        <loginr v-show="tologin"></loginr>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import { mapState, mapMutations } from "vuex";
import { baseUrl } from "../../assets/js/env";
import loginr from "./loginR";
export default {
  data() {
    return {
      checked: false,
      loginReq: true,
      captchaCodeImg: "",
      newDate: null, //时间戳
      errorcode: false, //判断账号密码错误次数
      tologin: false, //判断是登陆还是注册
      validateForm: {
        username: "",
        password: "",
        captcha_code: ""
      }
    };
  },
  watch: {
    //监听路由变化后
    $route(to, from, next) {
      if (to.fullPath === "/login?id=ashore") {
        this.$refs.loginGoTitle.textContent = "用户登陆";
        this.tologin = false;
      } else if (to.fullPath === "/login?id=register") {
        this.$refs.loginGoTitle.textContent = "用户注册";
        this.tologin = !this.tologin;
      }
    }
  },
  methods: {
    //立即注册
    toRegister() {
      this.$router.push({ query: { id: "register" } });
    },
    //获取验证码
    getCaptchaCode() {
      this.newDate = new Date().getTime();
      this.captchaCodeImg = baseUrl + "/code.jpg?_=" + this.newDate;
    },
    ...mapMutations(["RECORD_USERINFO"]),
    //立即登陆
    tosubmit() {
      let pwd = md5(this.validateForm.password);
      let formData = new FormData();
      formData.append("account", this.validateForm.username);
      formData.append("password", pwd);
      formData.append("code", this.validateForm.captcha_code);
      this.$axios
        .post(baseUrl + "/api/user/login", formData, this.$store.state.config)
        .then(res => {
          if (res.data.pup === true) {
            this.$message(res.data.data);
          }
          if (res.data.message === "success") {
            this.$store.state.loginStatus = true;
            localStorage.setItem("loginStatus", this.$store.state.loginStatus);
            this.$router.push({ name: "sy" });
            this.RECORD_USERINFO(this.validateForm);
          }
          if (res.data.data.errCount >= 3) {
            this.errorcode = true;
            this.getCaptchaCode();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //是否记住密码
    checkeds() {
      this.checked = !this.checked;
    }
  },
  components: {
    loginr
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/login.scss";
</style>

