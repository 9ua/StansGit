<template lang='jade'>
.viewBox
  .userRight
    .userTitle 下级开户
    .userMain.openAgent
      .newTab
        router-link(:to="nav.to", v-for='(nav,index) in listnav',:class="{'curr': index === navNum}",:key='index') {{nav.title}}
      ul.searchFirst
        li 
          span 开户类型：
          router-link.userSearch(to="",:class="{'active': index === usertype}",v-for='(item,index) in usertypes',:key='index',@click.native='changUserType($event,item,index)') {{item.title}}
          br
          返点设置：请先为下级设置返点。
      .bonusTable
        ul
          li 返点：
          li 
            input(type="number",v-model='rebateratio',tag="时时彩返点" ,placeholder="" ,class="userInput mgl20",@keyup.enter='getInviteCode')
            span （自身返点{{highbet}}，可为下级设置返点范围0.0-{{highbet}}）
        ul
          li 有效期限：
          li 
            input(type="number",v-model='validtime',placeholder="" ,min="0.0" ,class="userInput mgl20",@keyup.enter='getInviteCode')
            span （天数）
        ul
          li 推广渠道：
          li 
            input(type="text",v-model='extaddress' ,placeholder=""  ,class="userInput mgl20",@keyup.enter='getInviteCode')
            span （推广渠道）
      router-link(to='',class='submitBtn',style='margin-left: 184px;',@click.native='getInviteCode') 生成邀请码
      .userTip.mg30
        p
          ※ 温馨提示：
          br
          span 1、不同的返点赔率不同，返点越高赔率越高。
          br
          span 2、代理可获得的佣金等于代理自身返点与下级返点的差值，如代理自身返点6，下级返点4，代理可获得下级投注金额的2%，即下级下注100元，代理可获得2元。
          br
          span 3、下级返点值设得越低，下级的赔率就越低，建议给下级设置的返点不要过低。    
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      navNum: 0,
      usertype: 0,
      highbet: 0,
      rebateratio: 0,
      validtime: 0,
      extaddress: "",
      listnav: [
        { title: "下级开户", to: "manageInvite" },
        { title: "邀请码管理", to: "manageIcode" }
      ],
      usertypes: [{ title: "会员", value: 0 }, { title: "代理", value: 1 }]
    };
  },
  mounted() {
    this.createbetlist();
  },
  methods: {
    changUserType(e, v, i) {
      this.usertype = i;
    },
    createbetlist() {
      this.$loader.show();
      this.$axios
        .get(baseUrl + "/api/agent/getExtQuota")
        .then(res => {
          this.highbet = res.data.data.rebateRatio;
          this.$loader.hide();
        })
        .catch(error => {
          this.$loader.hide();
          this.$message.error({
            message: "请检查您的网络！",
            center: true,
            showClose: true
          });
        });
    },
    getInviteCode() {
      console.log(isNaN(Number(this.rebateratio)));   
      if(this.rebateratio>this.highbet){
        this.$message.error({
          message:"返点高于自身"+this.highbet,
          center:true,
          showClose:true,
        })
        return;
      }
      if(isNaN(Number(this.rebateratio))){
        this.$message.error({
          message:"返点必须是数值！",
          center:true,
          showClose:true,
        })
        return;
      }
      this.$loader.show();
      let formData = new FormData();
      formData.append("usertype", Number(this.usertype));
      formData.append("rebateratio", Number(this.rebateratio));
      formData.append("validtime", this.validtime);
      formData.append("extaddress", "123");
      this.$axios
        .post(baseUrl + "/api/agent/createInviteCode", formData)
        .then(res => {
          this.$loader.hide();
          this.$router.push({ path: "manageIcode" });
        })
        .catch(error => {
          this.$loader.hide();
          console.log("No");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/agent/manageInvite.scss";
</style>


