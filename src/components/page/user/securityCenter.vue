<template lang='jade'>
.viewBox
  .userRight
    .userTitle 安全中心
    .userMain
      .mg30
        .safeTop.mgb10
          .star
            mu-icon(value='star',:class="{'curr': index <= starNum}",v-for='index in 5',:key='index')
          .text
            strong 您的账户安全级别为低，可以通过完善安全信息提高级别。
            p
              上次登录时间： 
              ins {{date}}
              ins {{local}} | 
              不是我登录？
              router-link(to="/user/verifyPwd") 修改密码
        ul.safeList
          li(:class='{noSet:!pwdSet}')
            mu-icon(value='vpn_key',class='icon')
            span.text
              strong 登录密码
              p 建议您使用字母和数字的组合、混合大小写、在组合中加入下划线等符号。
            span.btn
              router-link(to="/user/verifyPwd") 修改密码
          li(:class='{noSet:!secretPwdSet}')
            mu-icon(value='lock',class='icon')
            span.text
              strong 已设置安全密码
              p 安全密码用于提现、绑定银行卡等操作，可保障资金安全。
            span.btn
              router-link(to="/user/verifySafePwd") 修改安全密码
              router-link(to="/user/resetWay") 找回安全密码
          li(:class='{noSet:!phoneSet}')
            mu-icon(value='screen_lock_portrait',class='icon')
            span.text
              strong 未绑定密保手机:
              p 密保手机可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="/user/setMobile") 绑定密保手机
          li(:class='{noSet:!secretQuestionSet}')
            mu-icon(value='security',class='icon')
            span.text
              strong 未设置密保问题:
              p 密保问题可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="/user/setQuestion") 设置密保问题
          li(:class='{noSet:!emailSet}')
            mu-icon(value='email',class='icon')
            span.text
              strong 未绑定密保邮箱:
              p 绑定邮箱可以增加账户安全性，快速找回帐号密码。
            span.btn
              router-link(to="/user/setMail") 绑定密保邮箱
</template>
<script>
export default {
    data(){
      return{
        date:"2018-01-01 10:10:10",
        local:"菲律宾",
        pwdSet:true,
        secretPwdSet:true,//安全密码是否设置        
        phoneSet:false,//手机是否设置
        secretQuestionSet:false,//密保问题是否设置
        emailSet:false,//密保问题是否设置
        starNum:2,
        // setArr:[{strong:"登录密码",icon="vpn_key",isSet:true,p:"建议您使用字母和数字的组合、混合大小写、在组合中加入下划线等符号。",to:{t1:"修改密码",to:"/user/verifyPwd"}}],
      }
    },
    mounted(){
    },
    methods:{
    }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/user/securityCenter.scss";
</style>


