<template lang="jade">
.login(onselectstart='return false;')
  .loginFrom
    .loginLog
    .loginGo
      p.loginGoTitle(ref='loginGoTitle') {{title}}
      ul.loginGoUl(v-show='!tologin')
        li
          i.iconfont.icon-user1
          div
            input(type='text', v-model='validateForm.username', v-focus='',onfocus='this.select()', placeholder='请输入用户名')
        li
          i.iconfont.icon-lock
          div
            input(:type="checked ? 'text' : 'password'", v-model='validateForm.password',onfocus='this.select()', placeholder='请输入密码码',@keyup.enter='tosubmit')
            i.iconfont.icon-buxianshimima(v-show='!checked', @click='checkeds')
            i.iconfont.icon-guanbi(v-show='checked', @click='checkeds')
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
              i.iconfont.icon-lianxi
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
      title:'用户登陆',
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
      },
      localStorageArr:[],
    };
  },
  watch: {
    //监听路由变化后
    $route(to, from, next) {
      //判断是否在登陆页面，是就清除缓存
      if(to.fullPath ===  '/login/ashore' || to.fullPath ===  '/login/register'){
        for (let i = 0; i < localStorage.length; i++) {
          this.localStorageArr.push(localStorage.key(i));
        }
        this.localStorageArr.map(key => {
          if (key !== "username") {
            localStorage.removeItem(key);
          }
        });
      }
      if (to.fullPath === "/login/ashore") {
        this.title = "用户登陆";
        this.tologin = false;
      } else if (to.fullPath === "/login/register") {
        this.title = "用户注册";
        this.tologin = true;
      }
    }
  },
  mounted() {
    this.islogin();
  },
  methods: {
    //清除所有缓存
    islogin() {
      if(this.$route.path === '/login/ashore'){
        this.title = "用户登陆";
        this.tologin = false;
      }else if (this.$route.path === "/login/register") {
        this.title = "用户注册";
        this.tologin = !this.tologin;
      }
      if (this.$route.path === '/login/ashore' || this.$route.path === '/login/register') {
        for (let i = 0; i < localStorage.length; i++) {
          this.localStorageArr.push(localStorage.key(i));
        }
        this.localStorageArr.map(key => {
          if (key !== "username") {
            localStorage.removeItem(key);
          }
        });
      }
    },
    //立即注册
    toRegister() {
      this.tologin = !this.tologin;
      this.$router.push({path:'/login/register'});
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
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("account", this.validateForm.username);
      formData.append("password", pwd);
      formData.append("code", this.validateForm.captcha_code);
      this.$axios
        .post(baseUrl + "/api/user/login", formData, config)
        .then(res => {
          if (res.data.pup === true) {
            this.$message(res.data.data);
          }
          if (res.data.message === "success") {
            this.$store.state.JSESSIONICookie = res.data.data.sessionId;
            this.$store.state.userType = res.data.data.userType;
            this.$store.state.Globalusername = res.data.data.account;
            this.$store.state.balance = res.data.data.balance;
            localStorage.setItem(
              "JSESSIONICookie",
              this.$store.state.JSESSIONICookie
            );
            localStorage.setItem("userType", this.$store.state.userType);
            localStorage.setItem("username", this.$store.state.Globalusername);
            localStorage.setItem("balance", this.$store.state.balance);
            this.$store.state.loginStatus = true;
            localStorage.setItem(
              "loginStatus",
              Boolean(this.$store.state.loginStatus)
            );
            localStorage.setItem("username", res.data.data.account);
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
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/login.scss";
</style>

