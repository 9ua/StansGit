<template lang='jade'>
.viewBox
  .userRight
    .userTitle 修改密码
    .userMain
      el-steps(:active='active', finish-status='success',align-center,class='queue')
        el-step(title='验证原始密码')
        el-step(title='设置新密码')
        el-step(title='完成')
      ul.submitContent.mglr30.mgt15(v-show='active===1')
        li 
          span 原密码：
          input(placeholder='请输入安全密码',class='userInput',v-model="oldPwd",@blur='checkOldPwd',type='password',@keyup.enter="validOldLoginPassword")
          em.verifyWrong(v-show='!pwdOldRight&&!isOldFirst') 
            mu-icon(value="cancel",size="14")
            | {{pwd_old_tip}}
          em.verifyRight(v-show='pwdOldRight') 
            mu-icon(value="check_circle",size="14")
        li
          span
          router-link(to='',class='submitBtn ClickShade',@click.native="validOldLoginPassword") 确定
      ul.submitContent.mglr30.mgt15(v-show='active===2')
        li 
          span 新密码：
          input(placeholder='请输入安全密码',class='userInput',v-model="newPwd",@blur='checkPwd',type='password')
          em.verifyWrong(v-show='!pwdRight&&!isFirst') 
            mu-icon(value="cancel",size="14")
            | {{pwd_tip}}
          em.verifyRight(v-show='pwdRight') 
            mu-icon(value="check_circle",size="14")
        li 
          span 确认密码：
          input(placeholder='请再次输入安全密码',class='userInput',v-model="newPwdAgian",@blur='checkPwdAgain',type='password',@keyup.enter="submit")
          em.verifyWrong(v-show='!pwdRightAgain&&!isFirst') 
            mu-icon(value="cancel",size="14")
            | {{pwd_tip}}
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
      oldPwd: "",
      newPwd: "",
      newPwdAgian: "",
      pwd_tip: "",
      pwd_old_tip: "",
      pwdRight: false,
      pwdOldRight: false,
      pwdRightAgain: false,
      isFirst: true,
      isOldFirst: true
    };
  },
  methods: {
    //验证原始密码
    checkOldPwd() {
      this.isOldFirst = false;
      if (!this.oldPwd) {
        this.pwdOldRight = false;
        this.pwd_old_tip = "密码不能为空";
      } else if (this.oldPwd.length < 6 || this.oldPwd.length > 16) {
        this.pwdOldRight = false;
        this.pwd_old_tip = "密码为6-16位字符";
      } else {
        this.pwdOldRight = true;
      }
    },
    // 验证新密码
    checkPwd() {
      this.isFirst = false;
      if (!this.newPwd) {
        this.pwdRight = false;
        this.pwd_tip = "密码不能为空";
      } else if (this.newPwd.length < 6 || this.newPwd.length > 16) {
        this.pwdRight = false;
        this.pwd_tip = "密码为6-16位字符";
      } else {
        this.pwdRight = true;
      }
    },
    // 验证重复密码
    checkPwdAgain() {
      this.isFirst = false;
      if (!this.newPwdAgian) {
        this.pwdRightAgain = false;
        this.pwd_tip = "密码不能为空";
      } else if (this.newPwdAgian.length < 6 || this.newPwdAgian.length > 16) {
        this.pwdRightAgain = false;
        this.pwd_tip = "密码为6-16位字符";
      } else {
        this.pwdRightAgain = true;
      }
    },
    //请求数据验证原始密码
    validOldLoginPassword() {
      this.checkOldPwd();
      if (this.pwdOldRight) {
        let oldPassword = md5(this.oldPwd);
        let formData = new FormData();
        formData.append("oldPassword", oldPassword);
        this.$axios
          .post(
            baseUrl + "/api/userCenter/validOldLoginPassword",
            formData,
            this.$store.state.config
          )
          .then(res => {
            if (res.data.code === 1) {
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
            console.log("验证No");
          });
      }
    },
    //修改密码
    submit() {
      let pwd1 = md5(this.newPwd);
      let pwd2 = md5(this.newPwdAgian);
      let formData = new FormData();
      formData.append("newPassword", pwd1);
      formData.append("newPassword2", pwd2);
      this.checkPwd();
      this.checkPwdAgain();
      if (pwd1 === pwd2 && this.pwdRight && this.pwdRightAgain) {
        this.$axios
          .post(
            baseUrl + "/api/userCenter/changeLoginPassword",
            formData,
            this.$store.state.config
          )
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: res.data.data.message,
                type: "success",
                center: true,
                showClose: true
              });
              this.active = 3;
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
            console.log("No");
          });
      } else {
        this.$message.error({
          message: "密码格式不对，请重新输入！",
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


