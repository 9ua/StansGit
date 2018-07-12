<template lang='jade'>
.viewBox
  .userRight
    .userTitle 修改密保邮箱
    .userMain
      el-steps(:active='active', finish-status='success',align-center,class='queue')
        el-step(title='验证邮箱')
        el-step(title='绑定密保邮箱')
        el-step(title='完成')
      ul.submitContent.mglr30.mgt15(v-show='active===1')
        li 
          span 已绑定邮箱：
          input(class='userInput',disabled="disabled",v-model='email')
        li(style="position: relative;") 
          span 输入安全密码：
          input(placeholder='输入安全密码',class='userInput',v-model="validCode",@blur='checkCode',type='password',@keyup.enter="validSecurityCode")
          em.verifyWrong(v-show='!codeRight&&!isCodeFirst')
            mu-icon(value="cancel",size="14")
            {{code_tip}}
          em.verifyRight(v-show='codeRight') 
            mu-icon(value="check_circle",size="14")
        li
          span
          router-link(to='',class='submitBtn ClickShade',@click.native="validSecurityCode") 确定
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import md5 from "js-md5";
export default {
  data() {
    return {
      active: 1,
      flag: true,
      email: "",
      second: 60,
      validCode: "", //安全码
      code_tip: "", //验证码提示
      codeRight: false,
      isCodeFirst: true, //首次点击输入验证码
      text: "获取验证码"
    };
  },
  created() {
    this.getBindEmail();
  },
  methods: {
    // 验证验证码格式
    checkCode() {
      this.isCodeFirst = false;
      if (!this.validCode) {
        this.codeRight = false;
        this.code_tip = "安全密码不能为空";
      } else if (this.validCode.length < 6) {
        this.codeRight = false;
        this.code_tip = "安全密码格式错误";
      } else {
        this.codeRight = true;
      }
    },
    // //取验证码
    // sendMobilCode() {
    //   this.flag = false;
    //   let params = new URLSearchParams();
    //   params.append("email", this.email);
    //   this.$axios
    //     .post(
    //       baseUrl + "/api/userCenter/sendEmailCode",
    //       params,
    //       this.$store.state.config
    //     )
    //     .then(res => {
    //       if (res.data.code === 1) {
    //         this.showTimer();
    //       } else {
    //         this.flag = true;
    //         this.$message.error({
    //           message: res.data.data.message,
    //           center: true,
    //           showClose: true
    //         });
    //       }
    //     })
    //     .catch(error => {
    //       console.log("取验证码No");
    //     });
    // },
    //服务端验证安全码
    validSecurityCode() {
      let validCode = md5(this.validCode);
      let formData = new FormData();
      formData.append("oldPassword", validCode);
      this.$axios
        .post(baseUrl + "/api/userCenter/validSecurityCode", formData)
        .then(res => {
          if (res.data.code === 1) {
            this.$router.push("/user/setMail");
          } else {
            this.$message.error({
              message: res.data.data.message,
              center: true,
              showClose: true
            });
          }
        })
        .catch(error => {
          console.log("No");
        });
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
    },
    //获取已经绑定的邮箱号码
    getBindEmail() {
      this.$axios
        .get(baseUrl + "/api/userCenter/getBindEmail")
        .then(res => {
          this.email = res.data.data.email;
        })
        .catch(error => {
          console.log("获取已经绑定的邮箱No");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/user/setComm.scss";
.submitContent li input[disabled] {
  background: #f8f8f8;
  color: #aaa;
}
</style>


