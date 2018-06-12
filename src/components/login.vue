<template>
  <div class="login" onselectstart="return false;">
    <div class="loginFrom">
      <div class="loginLog"></div>
      <div class="loginGo">
        <mu-container>
          <mu-form ref="form" :model="validateForm" class="mu-demo-form">
            <mu-form-item prop="username" :rules="usernameRules">
              <mu-text-field labelWidth="100%" icon="account_circle" v-model="validateForm.username" prop="username"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="password" :rules="passwordRules">
              <mu-text-field icon="locked" :type="visibility ? 'text' : 'password'" :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" v-model="validateForm.password" prop="password"></mu-text-field>
            </mu-form-item>
            <mu-form-item prop="captcha_code" :rules="captcha_codeRules" v-show='true'>
              <mu-text-field labelWidth="100%" icon="account_circle" v-model="validateForm.captcha_code" prop="captcha_code"></mu-text-field>
              <img :src="captchaCodeImg" @click='getCaptchaCode'>
            </mu-form-item>
            <mu-form-item prop="isAgree" style="padding-left:18px;">
              <mu-checkbox label="记住密码" v-model="validateForm.isAgree"></mu-checkbox>
              <div class="isAgreeGo">
                <span @click="openSimpleDialog">立即注册</span>
                <b>|</b>
                <span>忘记密码？</span>
              </div>
            </mu-form-item>
            <mu-form-item>
              <mu-button color="primary" labelWidth="100%" @click="submit">提交</mu-button>
            </mu-form-item>
          </mu-form>
        </mu-container>
      </div>
    </div>
    <mu-container>
      <mu-dialog width="460" :open.sync="openSimple">
        <div>ss</div>
        <mu-button slot="actions" color="primary" labelWidth="100%" @click="closeSimpleDialog">提交</mu-button>
      </mu-dialog>
    </mu-container>
  </div>
</template>
<script>
import md5 from "js-md5";
import { mapState, mapMutations } from "vuex";
import { baseUrl } from "../assets/js/env";
export default {
  data() {
    return {
      openSimple: false,
      visibility: false,
      captchaCodeImg: "",
      newDate: null, //时间戳
      errorcode: false, //判断账号密码错误次数
      usernameRules: [
        { validate: val => !!val, message: "用户名不能为空！" },
        { validate: val => val.length >= 6, message: "用户名长度大于6" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "密码不能为空！" },
        {
          validate: val => val.length >= 6 && val.length <= 64,
          message: "密码长度大于6小于20"
        }
      ],
      captcha_codeRules: [
        { validate: val => !!val, message: "验证码不能为空！" }
      ],
      validateForm: {
        username: "",
        password: "",
        captcha_code: "",
        isAgree: false
      }
    };
  },
  methods: {
    openSimpleDialog() {
      this.openSimple = true;
    },
    closeSimpleDialog() {
      this.openSimple = false;
    },
    getCaptchaCode() {
      this.newDate = new Date().getTime();
      this.captchaCodeImg = baseUrl + "/code.jpg?_=" + this.newDate;
      console.log(this.captchaCodeImg);
    },
    ...mapMutations(["RECORD_USERINFO"]),
    tosubmit() {
      let pwd = md5(this.validateForm.password);
      let formData = new FormData();
      formData.append("account", this.validateForm.username);
      formData.append("password", pwd);
      formData.append("code", this.validateForm.captcha_code);
      this.$axios
        .post(baseUrl + "/api/user/login", formData, this.$store.state.config)
        .then(res => {
          if (res.data.message === "success") {
            this.$message("登陆成功！");
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
    submit() {
      this.tosubmit();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/login.scss";
</style>

