<template lang="jade">
.login(onselectstart='return false;')
  .loginFrom
    .loginLog
    .loginGo
      p.loginGoTitle(ref='loginGoTitle') 用户登陆
      ul.loginGoUl(v-show='!tologin')
        li
          mu-icon.iconLeft(value='account_circle')
          div
            input(type='text', v-model='validateForm.username', placeholder='请输入用户名')
        li
          mu-icon.iconLeft(value='lock')
          div
            input(:type="checked ? 'text' : 'password'", v-model='validateForm.password', placeholder='请输入密码码')
            mu-icon.iconRight.ishwo(value='visibility', v-show='!checked', @click='checkeds')
            mu-icon.iconRight.ishide(value='visibility_off', v-show='checked', @click='checkeds')
        li(v-show='errorcode')
          mu-icon.iconLeft(value='account_circle')
          div
            input(type='text', v-model='validateForm.captcha_code', placeholder='请输入验证码')
            img(:src='captchaCodeImg', @click='getCaptchaCode')
      .registerBtn(v-show='!tologin')
        p
          span
          span
            i.toRegister(@click='toRegister') 立即注册
            i
              mu-icon.call(value='call')
              | 联系客服
            i.color 忘记密码？
        mu-button.registerGo(color='error', @click='tosubmit') 立即登陆
      loginr(v-show='tologin')
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

