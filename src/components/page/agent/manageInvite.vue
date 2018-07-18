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
          li 时时彩
          li 
            input(type="number",name="ssc" ,tag="时时彩返点" ,placeholder="" ,min="0.0" ,step="0.1" ,max="8.0" ,class="userInput mgl20")
            &nbsp;
            span （自身返点8.0，可为下级设置返点范围0.0-8.0）
        ul
          li 快三
          li 
            input(type="number",name="K3" ,tag="快3返点" ,placeholder="" ,min="0.0" ,step="0.1" ,max="8.0" ,class="userInput mgl20")
            &nbsp;
            span （自身返点8.0，可为下级设置返点范围0.0-8.0）
        ul
          li 十一选五
          li 
            input(type="number",name="K3" ,tag="快3返点" ,placeholder="" ,min="0.0" ,step="0.1" ,max="8.0" ,class="userInput mgl20")
            &nbsp;
            span （自身返点8.0，可为下级设置返点范围0.0-8.0）
        ul
          li PK10
          li 
            input(type="number",name="K3" ,tag="快3返点" ,placeholder="" ,min="0.0" ,step="0.1" ,max="8.0" ,class="userInput mgl20")
            &nbsp;
            span （自身返点8.0，可为下级设置返点范围0.0-8.0）
      router-link(to='',class='submitBtn',style='margin-left: 200px;') 生成邀请码
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
export default {
  data() {
    return {
      navNum: 0,
      usertype: 0,
      highbet: 0,
      rebateratio: 0,
      betlist: [],
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
    // this.createbetlist();
  },
  methods: {
    changUserType(e, v, i) {
      this.usertype = i;
    },
    createbetlist() {
      this.$http
        .get(this.$store.state.url + "api/agent/getExtQuota")
        .then(res => {
          this.highbet = res.data.data.rebateRatio;
          for (let i = res.data.data.rebateRatio * 10; i >= 0; i = i - 1) {
            this.betlist.push(i / 10);
          }
          return this.betlist;
        })
        .catch(error => {
          console.log(error);
          console.log("获取彩種ratio ERROR");
          this.highbet = 0;
          for (let i = this.highbet * 10; i >= 0; i = i - 1) {
            this.betlist.push(i / 10);
          }
          return this.betlist;
        });
    },
    setrebet(b) {
      this.rebateratio = b.target.value;
    },
    getInviteCode() {
      let _this = this;
      let config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true
      };
      let formData = new FormData();
      formData.append("usertype", Number(this.usertype));
      formData.append("rebateratio", Number(this.rebateratio));
      formData.append("validtime", this.validtime);
      formData.append("extaddress", "123");
      this.$axios
        .post(
          this.$store.state.url + "api/agent/createInviteCode",
          formData,
          config
        )
        .then(res => {
          this.$router.push({ path: "/manageInvite/mIcode" });
        })
        .catch(error => {
          console.log("No");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/agent/manageInvite.scss";
</style>


