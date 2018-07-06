<template lang='jade'>
.viewBox
  .userRight
    .userTitle 绑定密保手机
    .userMain
      el-steps(:active='active', finish-status='success',align-center,class='queue')
        el-step(title='绑定新手机')
        el-step(title='完成')
      ul.submitContent.mglr30.mgt15
        li 
          span 手机号：
          input(placeholder='请输入您要绑定的手机号码',class='userInput',v-model="mobile")
          em.verifyWrong 
            mu-icon(value="cancel",size="14")
            手机号不能为空
        li(style="position: relative;") 
          span 验证码：
          input(placeholder='输入验证码',class='userInput',v-model="validCode")
          em.verifyWrong 
            mu-icon(value="cancel",size="14")
            验证码不能为空
          span.btn.SendCode
            router-link(to='',class='ClickShade') 发送验证码
        li 
          span 安全密码：
          input(placeholder='请输入您的安全密码',class='userInput',v-model="securityCode")
          em.verifyWrong 
            mu-icon(value="cancel",size="14")
            安全密码不能为空
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      start: false,
      mobile: null, //手机号
      validCode: "", //验证码
      securityCode: "" //安全码
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/user/comm.scss";
.queue {
  padding: 35px 45px;
}
.userInput {
  border-radius: 2px;
  height: 30px;
  line-height: 20px;
  padding: 5px;
  border: 1px solid #cecece;
  width: 233px;
  color: #666;
  margin: 10px 0;
}
.verifyWrong {
  font-style: inherit;
  margin-left: 8px;
  line-height: 35px;
  font-size: 14px;
  color: red;
}
.submitContent {
  & li {
    color: #000;
    line-height: 36px;
    margin-bottom: 4px;
    > span {
      color: #666;
      display: inline-block;
      width: 144px;
      text-align: right;
      padding-right: 15px;
      font-size: 12px;
      margin-top: 8px;
      & input {
        vertical-align: middle;
        font-size: 12px;
      }
    }
  }
  & .btn {
    width: 85px;
    background: #eee;
    vertical-align: middle;
    padding: 0;
    cursor: pointer;
    position: absolute;
    left: 292px;
    top: 12px;
    margin: 0;
    height: 28px;
    line-height: 30px;
    text-align: center;
    & a {
      height: 28px;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      width: 100%;
      vertical-align: super;
    }
  }
}
</style>


