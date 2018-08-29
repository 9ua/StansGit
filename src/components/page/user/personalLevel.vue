<template lang='jade'>
.viewBox
  .userRight
    .userTitle 个人信息
    .userMain
      .newTab
        router-link(:to="nav.to", v-for='(nav,index) in listnav',:class="{'active': index === navNum}",:key='index') {{nav.title}}
      .fix
        .selectHeadImg
          img(:src='"@/assets/img/heads/"+this.$store.state.img+".jpg"')
          p(@click='setHeadImg=true') 修改头像
        ul.evCallInfo
          li
            em 账
            | 号 ：
            span {{this.$store.state.Globalusername}}
          li 
            em 等
            | 级 ：
            span VIP1
          li 
            em 头
            | 衔 ：
            span 农民
          li 
            | 成长值 ：
            span 0
          li(style='color: rgb(153, 153, 153);') 每充值1元加1分
        .levelBar
          el-progress(:text-inside='true', :stroke-width='18', :percentage='0')
          .levelBarInfo
            em VIP1
            p
              span(style='color: rgb(241, 66, 65);') 0
              | /0  距离下一级还要0分
            i VIP2
        h6 等级机制
        table(width='80%')
          tbody
            tr
              th(v-for="item in tbArr.th") {{item}}
            tr
              td(v-for="item in tbArr.vip1") {{item}}
            tr
              td(v-for="item in tbArr.vip2") {{item}}
            tr
              td(v-for="item in tbArr.vip3") {{item}}
            tr
              td(v-for="item in tbArr.vip4") {{item}}
            tr
              td(v-for="item in tbArr.vip5") {{item}}
            tr
              td(v-for="item in tbArr.vip6") {{item}}
            tr
              td(v-for="item in tbArr.vip7") {{item}}
            tr
              td(v-for="item in tbArr.vip8") {{item}}
            tr
              td(v-for="item in tbArr.vip9") {{item}}
  layer(v-if='setHeadImg',@close="close")
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import layer from "./layer";
export default {
  components:{
    layer
  },
  data() {
    return {
      navNum: 1,
      setHeadImg:false,//头像更改标识
      sex: 2,
      usreData: "",
      tbArr: {
        th: ["等级", "头衔", "成长积分", "晋升奖励（元）", "跳级奖励（元）"],
        vip1: ["vip1", "农民", "0", "0", "0"],
        vip2: ["vip2", "地主", "10", "1", "1"],
        vip3: ["vip3", "知县", "200", "5", "6"],
        vip4: ["vip4", "通判", "1000", "10", "16"],
        vip5: ["vip5", "知府", "10000", "58", "74"],
        vip6: ["vip6", "总督", "50000", "318", "392"],
        vip7: ["vip7", "巡抚", "250000", "1688", "2080"],
        vip8: ["vip8", "丞相", "1000000", "6888", "8968"],
        vip9: ["vip9", "帝王", "5000000", "28888", "47856"]
      },
      listnav: [
        { title: "个人资料", to: "userinfo" },
        // { title: "等级头衔", to: "personalLevel" }
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


