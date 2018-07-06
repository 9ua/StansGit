<template lang='jade'>
.viewBox
  .userRight
    .userTitle 个人信息
    .userMain
      .newTab
        router-link(:to="nav.to", v-for='(nav,index) in listnav',:class="{'active': index === navNum}",:key='index') {{nav.title}}
      .fix
        .selectHeadImg
          img(:src='"../../../assets/img/header/"+this.$store.state.img+".jpg"')
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
            input.usreinput(placeholder='昵称为1-5位汉字，设置后不能修改')
          li
            span 手机:
            input.usreinput(disabled='disabled')
            router-link(to='setMobile',v-show='! isBindMobile') 绑定
          li
            span 邮箱:
            input.usreinput(disabled='disabled')
            router-link(to='setMobile',v-show='! isBindEmail') 绑定
          li
            span 性别:
            b.radio_box(v-for='(item,index) in listsex',:class="{'checked': index === sex}",:key='index' @click='sexRadio($event,item,index)') 
              i 
              {{item.sex}}
          li
            span 生日:
            el-date-picker(v-model="value1",type='date', placeholder='选择日期')
          li
            span
            button.submitBtn 保存
  layer(v-if='setHeadImg',@close="close",toggle="true")
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import  layer  from "./layer";
export default {
  components:{
    layer
  },
  data() {
    return {
      navNum: 0,
      setHeadImg:false,//头像更改标识
      value1: "2018-6-8",
      isBindMobile: false,
      isBindEmail: false,
      sex: 2,
      usreData: "",
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
  mounted() {
    this.getUserData();
  },
  methods: {
    close(){
      this.setHeadImg=false;
    },
    sexRadio(e, item, index) {
      this.sex = index;
    },
    getUserData() {
      this.$axios
        .get(baseUrl + "/api/userCenter/getUserData", this.$store.state.config)
        .then(res => {
          this.usreData = res.data.data;
        })
        .catch(error => {
          console.log("getUserData no");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/user/userinfo.scss";
</style>


