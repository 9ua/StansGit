<template lang='jade'>
.viewBox
  .userRight
    .userTitle 设置安全密码
    .userMain
      el-steps(:active='active', finish-status='success',align-center,class='queue')
        el-step(title='设置安全密码')
        el-step(title='完成')
      ul.submitContent.mglr30.mgt15(v-show='active===1')
        li 
          span 安全密码：
          input(placeholder='请输入安全密码',class='userInput',v-model="safePwd",@blur='checkPwd',type='password')
          em.verifyWrong(v-show='!pwdRight&&!isFirst') 
            mu-icon(value="cancel",size="14")
            {{pwd_tip}}
          em.verifyRight(v-show='pwdRight') 
            mu-icon(value="check_circle",size="14")
        li 
          span 确认密码：
          input(placeholder='请再次输入安全密码',class='userInput',v-model="safePwdAgian",@blur='checkPwdAgain',type='password')
          em.verifyWrong(v-show='!pwdRightAgain&&!isFirst') 
            mu-icon(value="cancel",size="14")
            {{pwd_tip}}
          em.verifyRight(v-show='pwdRightAgain') 
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
      safePwd: "",
      safePwdAgian: "",
      pwd_tip: "",
      pwdRight: false,
      pwdRightAgain: false,
      isFirst: true
    };
  },
  methods: {
    // 验证安全密码
    checkPwd() {
      this.isFirst = false;
      if (!this.safePwd) {
        this.pwdRight = false;
        this.pwd_tip = "安全密码不能为空";
      } else if (this.safePwd.length < 6 || this.safePwd.length > 16) {
        this.pwdRight = false;
        this.pwd_tip = "安全密码为6-16位字符";
      } else {
        this.pwdRight = true;
      }
    },
    // 重复验证安全密码
    checkPwdAgain() {
      this.isFirst = false;
      if (!this.safePwdAgian) {
        this.pwdRightAgain = false;
        this.pwd_tip = "安全密码不能为空";
      } else if (
        this.safePwdAgian.length < 6 ||
        this.safePwdAgian.length > 16
      ) {
        this.pwdRightAgain = false;
        this.pwd_tip = "安全密码为6-16位字符";
      } else {
        this.pwdRightAgain = true;
      }
    },
    //绑定安全密码
    submit() {
      let pwd1 = md5(this.safePwd);
      let pwd2 = md5(this.safePwdAgian);
      let formData = new FormData();
      formData.append("newPassword", pwd1);
      formData.append("newPassword2", pwd2);
      if (pwd1 === pwd2) {
        this.$axios
          .post(
            baseUrl + "/api/userCenter/setSecurityCode",
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
      } else {
        this.$message.error({
          message: "两次密码不一致，请重新输入！",
          center: true,
          showClose: true
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/user/setComm.scss";
</style>


