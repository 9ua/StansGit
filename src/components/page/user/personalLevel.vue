<template lang='jade'>
.viewBox
  .userRight
    .userTitle 个人信息
    .userMain
      .newTab
        router-link(:to="nav.to", v-for='(nav,index) in listnav',:class="{'active': index === navNum}",:key='index') {{nav.title}}
      .fix
        .selectHeadImg
          img(src="../../../assets/img/header/1.jpg")
          router-link(to='') 修改头像
        ul.evCallInfo
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      navNum: 1,
      sex: 2,
      usreData: "",
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
@import "../../../assets/scss/user/personalLevel.scss";
</style>


