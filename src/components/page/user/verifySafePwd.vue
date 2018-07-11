<template lang='jade'>
.viewBox
  .userRight
    .userTitle 修改安全密码
    .userMain
      el-steps(:active='active', finish-status='success',align-center,class='queue')
        el-step(title='验证安全密码')
        el-step(title='设置安全密码')
        el-step(title='完成')
      ul.submitContent.mglr30.mgt15(v-show='active===1')
        li 
          span 原安全密码：
          input(placeholder='请输入安全密码',class='userInput',v-model="oldPwd",@blur='checkOldPwd',type='password',@keyup.enter="validOldLoginPassword")
          em.verifyWrong(v-show='!pwdOldRight&&!isOldFirst') 
            mu-icon(value="cancel",size="14")
            {{pwd_old_tip}}
          em.verifyRight(v-show='pwdOldRight') 
            mu-icon(value="check_circle",size="14")
        li
          span
          router-link(to='',class='submitBtn ClickShade',@click.native="validOldLoginPassword") 确定
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import md5 from "js-md5";
export default {
  data() {
    return {
      active: 1,
      oldPwd: "",
      pwd_old_tip: "",
      pwdOldRight: false,
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
    //请求数据验证原始密码
    validOldLoginPassword() {
      this.checkOldPwd();
      if (this.pwdOldRight) {
        let oldPassword = md5(this.oldPwd);
        let formData = new FormData();
        formData.append("oldPassword", oldPassword);
        this.$axios
          .post(
            baseUrl + "/api/userCenter/validSecurityCode",
            formData,
          )
          .then(res => {
            if (res.data.code === 1) {
              this.$router.push("/user/setSafePwd")
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
    
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/user/setComm.scss";
</style>


