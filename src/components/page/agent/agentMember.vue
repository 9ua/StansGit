<template lang='jade'>
.viewBox
  .userRight
    .userTitle 会员管理
    .userMain.agentMember.mgb10
      .searchOpt 账户：
        input.userInput.w90(v-model='account',@keyup.enter='getUnderUserList')
        | &nbsp;用户类型：
        ins.selectIcon
          select.userSelect(name='f')
            option(value='-1') 全部 
            option(value='1') 代理 
            option(value='0') 玩家
          em 
        | &nbsp;
        router-link(to='',class='submitBtn',@click.native='getUnderUserList') 搜索
      noContent(v-if='noContent')
      table(v-if='!noContent')
          tbody
            tr
              th(v-for='item in th') {{item}}
          tbody
            tr(style="bottom:0px;",v-if="underUserList.length===0")
              td(colspan="100")
                .notContent(style="padding: 100px 0px;") 
                  mu-icon(value='sentiment_dissatisfied',class='icon')
                  | 暂无记录
            tr(v-for='(item,index) in underUserList')
              td {{item.account}}
              td {{item.userTypeName}}
              td {{item.childCount}}
              td {{item.rebateRatio}}                
              td {{item.teamCount}}                
              td {{item.loginTime}}                
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import noContent from "../public/noContent";
// import pageNav from "../public/pageNav";
export default {
  components: {
    noContent,
    // pageNav
  },
  data() {
    return {
      start: 0, //分页标识开始
      limit: 15, //单页显示数目
      account: "",
      noContent: true,
      th: ["账号", "用户类型", "下级人数", "返点率", "团队会员数", "登录时间"],
      underUserList: []
    };
  },
  mounted() {
    this.getUnderUserList();
  },
  methods: {
    //接收pageNav组件分页信号
    pageTo($event) {
      this.start = this.limit * ($event - 1);
    },
    getUnderUserList() {
      this.noContent = true;
      if (this.account === "") {
        this.$axios
          .get(baseUrl + "/api/proxy/getUnderUserList", {
            params: { account: this.$store.state.Globalusername }
          })
          .then(res => {
            this.underUserList = res.data.data;
            this.noContent = false;
          })
          .catch(error => {
            console.log("获取列表Error");
          });
      } else {
        this.$axios
          .get(baseUrl + "/api/proxy/getUnderUserList", {
            params: { account: this.account }
          })
          .then(res => {
            if (res.data.code === 1) {
              this.underUserList = res.data.data;
              this.noContent = false;
            } else {
              this.account = "";
              this.$message.error({
                message: res.data.data.message,
                center: true,
                showClose: true
              });
              this.getUnderUserList();
            }
          })
          .catch(error => {
            console.log("获取列表Error");
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/agent/agentMember.scss";
@import "../../../assets/scss/user/table.scss";
</style>


