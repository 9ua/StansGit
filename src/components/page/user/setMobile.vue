<template lang='jade'>
.viewBox
  .userRight
    .userTitle 绑定密保手机
    .userMain
      el-steps(:active='active', finish-status='success',align-center,class='queue')
        el-step(title='绑定新手机')
        el-step(title='完成')
      ul.submitContent.mglr30.mgt15(v-show='active===1')
        li 
          span 手机号：
          input(placeholder='请输入您要绑定的手机号码',class='userInput',v-model="mobile",@blur='checkMobile',type='number')
          em.verifyWrong(v-show='!mobileRight&&!isMobileFirst') 
            mu-icon(value="cancel",size="14")
            | {{mobile_tip}}
          em.verifyRight(v-show='mobileRight') 
            mu-icon(value="check_circle",size="14")
        li(style="position: relative;") 
          span 验证码：
          input(placeholder='输入验证码',class='userInput',v-model="validCode",@blur='checkCode',type='number')
          em.verifyWrong(v-show='!codeRight&&!isCodeFirst')
            mu-icon(value="cancel",size="14")
            | {{code_tip}}
          span.btn.SendCode
            router-link(to='',class='ClickShade',@click.native='flag && sendMobilCode()') {{text}}
          em.verifyRight(v-show='codeRight') 
            mu-icon(value="check_circle",size="14")
        li 
          span 安全密码：
          input(placeholder='请输入您的安全密码',class='userInput',v-model="securityCode",@blur='checkPwd',type='password',@keyup.enter="submit")
          em.verifyWrong(v-show='!pwdRight&&!isPwdFirst') 
            mu-icon(value="cancel",size="14")
            | {{pwd_tip}}
          em.verifyRight(v-show='pwdRight') 
            mu-icon(value="check_circle",size="14")
        li
          span
          router-link(to='',class='submitBtn ClickShade',@click.native="submit") 确定
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import md5 from "js-md5";
export default {
  data() {
    return {
      active: 1,
      flag: true, //发送验证码激活失效标识
      timer: "",
      second: 60,
      isMobileFirst: true, //首次点击输入手机号
      isCodeFirst: true, //首次点击输入验证码
      isPwdFirst: true, //首次点击输入安全密码
      mobile: "", //手机号
      mobile_tip: "", //手机号提示
      mobileRight: false,
      text: "发送验证码",
      validCode: "", //验证码
      code_tip: "", //验证码提示
      codeRight: false,
      securityCode: "", //安全码
      pwd_tip: "", //验证码提示
      pwdRight: false
    };
  },
  methods: {
    //验证手机
    checkMobile() {
      const mobile_yz = /^[1][3,4,5,7,8][0-9]{9}$/;
      let yzmobile = mobile_yz.test(this.mobile);
      this.isMobileFirst = false;
      if (!this.mobile) {
        this.mobileRight = false;
        this.mobile_tip = "手机号码不能为空！";
      } else if (yzmobile) {
        this.mobileRight = true;
      } else {
        this.mobileRight = false;
        this.mobile_tip = "手机号码格式不正确！";
      }
    },
    // 验证验证码
    checkCode() {
      this.isCodeFirst = false;
      if (this.validCode.length != 6) {
        this.codeRight = false;
        this.code_tip = "验证码格式错误";
      } else if (!this.validCode) {
        this.codeRight = false;
        this.code_tip = "验证码不能为空";
      } else {
        this.codeRight = true;
      }
    },
    // 验证安全密码
    checkPwd() {
      this.isPwdFirst = false;
      if (!this.securityCode) {
        this.pwdRight = false;
        this.pwd_tip = "安全密码不能为空";
      } else if (this.securityCode.length < 6) {
        this.pwdRight = false;
        this.pwd_tip = "安全密码格式错误";
      } else {
        this.pwdRight = true;
      }
    },
    //取验证码
    sendMobilCode() {
      if (this.mobileRight) {
        this.flag = false;
        let params = new URLSearchParams();
        params.append("mobil", Number(this.mobile));
        this.$axios
          .post(
            baseUrl + "/api/userCenter/sendMobilCode",
            params,
            this.$store.state.config
          )
          .then(res => {
            if (res.data.code === 1) {
              this.showTimer();
            } else {
              this.flag = true;
              this.$message.error({
                message: res.data.data.message,
                center: true,
                showClose: true
              });
            }
          })
          .catch(error => {
            console.log("取验证码No");
          });
      } else {
        this.$message.error({
          message: "手机号格式错误！",
          center: true,
          showClose: true
        });
      }
    },
    //绑定手机号码
    submit() {
      let securityCode = md5(this.securityCode);
      let formData = new FormData();
      formData.append("mobil", Number(this.mobile));
      formData.append("validCode", this.validCode);
      formData.append("securityCode", securityCode);
      if (this.mobileRight && this.codeRight && this.pwdRight) {
        this.$axios
          .post(
            baseUrl + "/api/userCenter/saveBindPhone",
            formData,
            this.$store.state.config
          )
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "绑定成功！",
                type: "success",
                center: true,
                showClose: true
              });
              this.active = 2;
              setTimeout(() => {
                this.$router.push("/user/securityCenter");
              }, 2000);
              localStorage.removeItem("centerStatus");
            } else {
              this.$message.error({
                message: res.data.data.message,
                center: true,
                showClose: true
              });
            }
          })
          .catch(error => {
            console.log("绑定手机号No");
          });
      } else {
        this.$message.error({
          message: "请填写正确内容",
          center: true,
          showClose: true
        });
      }
    },
    showTimer() {
      this.timer = setInterval(() => {
        this.second = this.second - 1;
        this.text = "重新获取(" + this.second + ")";
        if (this.second < 1) {
          clearInterval(this.timer);
          this.second = 60;
          this.text = "发送验证码";
          this.flag = true;
        }
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/user/setComm.scss";
</style>


