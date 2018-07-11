<template lang='jade'>
.viewBox
  .userRight
    .userTitle 个人信息
    .userMain
      .newTab
        router-link(:to="nav.to", v-for='(nav,index) in listnav',:class="{'active': index === navNum}",:key='index') {{nav.title}}
      .fix
        .selectHeadImg
          img(:src='"/static/images/"+this.$store.state.img+".jpg"')
          p(@click='setHeadImg=true') 修改头像
        ul.personalInfo
          li
            span 账号:
            ins {{this.$store.state.Globalusername}}
          li
            span 等级:
            ins 测试组
          li
            span 头衔:
            ins 测试组
          li
            span 昵称:
            input.usreinput(placeholder='昵称为1-5位汉字，设置后不能修改',v-model='nickName',:input="nickName",@keyup.enter="setUserData")
          li
            span 手机:
            input(class='usreinput',disabled='disabled',v-model='mobile')
            router-link(to='setMobile',v-show='! isBindMobile') 绑定
            router-link(to='verifyMobile',v-show='isBindMobile') 修改
          li
            span 邮箱:
            input.usreinput(disabled='disabled',v-model='email')
            router-link(to='setMail',v-show='! isBindEmail') 绑定
            router-link(to='verifyMail',v-show='isBindEmail') 修改
          li
            span 性别:
            b.radio_box(v-for='(item,index) in listsex',:class="{'checked': index === sex}",:key='index' @click='sexRadio($event,item,index)') 
              i 
              {{item.sex}}
          li
            span 生日:
            el-date-picker(v-model="birthday",type="date" ,value-format="yyyy/MM/dd" ,@change="(value) => toBirthday(value)", format="yyyy/MM/dd" ,:editable="false", placeholder="选择日期")
          li
            span
            button.submitBtn(@click='setUserData') 保存
  layer(v-if='setHeadImg',@close="close",toggle="true")
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import layer from "./layer";
export default {
  components: {
    layer
  },
  data() {
    return {
      navNum: 0,
      setHeadImg: false, //头像更改标识
      isBindMobile: false,
      isBindEmail: false,
      sex: 2,
      birthday: "",
      mobile: "",
      email: "",
      nickName: "",
      listsex: [
        { sex: "男", flag: 1 },
        { sex: "女", flag: 2 },
        { sex: "保密", flag: 0 }
      ],
      listnav: [
        { title: "个人资料", to: "userinfo" },
        { title: "等级头衔", to: "personalLevel" }
      ]
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    close() {
      this.setHeadImg = false;
    },
    sexRadio(e, item, index) {
      this.sex = index;
    },
    //生日选择
    toBirthday(value) {
      this.birthday = value;
    },
    // 获取用户信息
    getUserData() {
      this.$axios
        .get(baseUrl + "/api/userCenter/getUserData", this.$store.state.config)
        .then(res => {
          this.nickName = res.data.data.nickName;
          this.birthday = res.data.data.birthday;
          this.sex = res.data.data.sex;
          if (res.data.data.email) {
            this.isBindEmail = true;
            this.email = res.data.data.email;
          }
          if (res.data.data.mobile) {
            this.isBindMobile = true;
            this.mobile = res.data.data.mobile;
          }
        })
        .catch(error => {
          console.log("getUserData no");
        });
    },
    //设置用户信息
    setUserData() {
      let params = new URLSearchParams();
      params.append("image", this.$store.state.img);
      params.append("nickName", this.nickName);
      params.append("birthday", this.birthday);
      params.append("sex", this.sex);
      this.$axios
        .post(
          baseUrl + "/api/userCenter/saveUserData",
          params,
          this.$store.state.config
        )
        .then(res => {
          this.$message({
            message: "保存成功！",
            type: "success",
            center: true,
            showClose: true,
          });
        })
        .catch(error => {
          this.$message.error({
            message: "用户信息保存失败！",center: true,showClose: true,});
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/user/userinfo.scss";
</style>


