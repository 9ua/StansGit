<template>
  <div class="loginRightBox">
    <ul class="loginRightUl">
      <li>
        <mu-icon class="iconLeft" value="info"></mu-icon>
        <div><input type="text" v-model="userinfo.inviteCode" placeholder="请输入邀请码"></div>
      </li>
      <li>
        <mu-icon class="iconLeft" value="account_circle"></mu-icon>
        <div><input type="text" v-model="userinfo.username" placeholder="请输入用户名"></div>
      </li>
      <li>
        <mu-icon class="iconLeft" value="account_circle"></mu-icon>
        <div><input type="text" v-model="userinfo.captcha_code" placeholder="请输入验证码"><img :src="captchaCodeImg" @click="getCaptchaCode"></div>
      </li>
    </ul>
    <div class="registerBtn">
      <p>
        <span>默认密码：
          <i>aa123456</i>
        </span>
        <span>已有账号？
          <i class="color" @click="toLogin">立即登陆</i>
        </span>
      </p>
      <mu-button class="registerGo" color="error" @click="registerGo">确认注册</mu-button>
    </div>
  </div>
</template>
<script>
import md5 from "js-md5";
import { mapState, mapMutations } from "vuex";
import { baseUrl } from "../../assets/js/env";
export default {
  data() {
    return {
      captchaCodeImg: "",
      newDate: null, //时间戳
      userinfo: {
        inviteCode: "",
        username: "",
        password: "aa123456",
        captcha_code: ""
      }
    };
  },
  created() {
    this.getCaptchaCode();
  },
  methods: {
    ...mapMutations(["RECORD_USERINFO"]),
    getCaptchaCode() {
      this.newDate = new Date().getTime();
      this.captchaCodeImg = baseUrl + "/code.jpg?_=" + this.newDate;
    },
    toLogin() {
      this.$router.push({ name: "login", query: { id: "ashore" } });
    },
    registerGo() {
      let formData = new FormData();
      formData.append("inviteCode", this.userinfo.inviteCode);
      formData.append("account", this.userinfo.username);
      formData.append("password", this.userinfo.password);
      formData.append("code", this.userinfo.captcha_code);
      this.$axios
        .post(
          baseUrl + "/api/user/register",
          formData,
          this.$store.state.config
        )
        .then(res => {
          if (
            res.data.data === "验证码错误！" ||
            res.data.data !== "注册成功!"
          ) {
            this.getCaptchaCode();
          }
          if (res.data.data === "注册成功!") {
            this.$alert(res.data.data);
            setTimeout(() => {
              let pwd1 = md5(this.userinfo.password);
              let formData1 = new FormData();
              formData1.append("account", this.userinfo.username);
              formData1.append("password", pwd1);
              formData1.append("code", "");
              this.$axios
                .post(
                  baseUrl + "/api/user/login",
                  formData1,
                  this.$store.state.config
                )
                .then(res => {
                  if (res.data.pup === true) {
                    this.$message(res.data.data);
                  }
                  if (res.data.message === "success") {
                    this.$store.state.loginStatus = true;
                    localStorage.setItem(
                      "loginStatus",
                      this.$store.state.loginStatus
                    );
                    this.$router.push({ name: "sy" });
                    this.RECORD_USERINFO(this.userinfo);
                  }
                });
            }, 600);
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/login.scss";
.el-message-box__content {
  background: red;
}
</style>


