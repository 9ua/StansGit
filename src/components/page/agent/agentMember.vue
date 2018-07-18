<template lang='jade'>
.viewBox
  .userRight
    .userTitle 会员管理
    .userMain.agentMember.mgb10
      .searchOpt 账户：
        input.userInput.w90
        &nbsp;用户类型：
        ins.selectIcon
          select.userSelect(name='f')
            option(value='-1') 全部 
            option(value='1') 代理 
            option(value='0') 玩家
          em 
        &nbsp;
        router-link(to='',class='submitBtn') 搜索
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
                  暂无记录
            tr(v-for='item in underUserList')
              td {{item.account}}
              td {{item.userTypeName}}
              td {{item.childCount}}
              td {{item.rebateRatio}}                
              td {{item.teamCount}}                
              td {{item.loginTime}}                
      .page
        p 当前页共
          em {{underUserList.length}}
          条记录
        .pageNav
          ul.pagination
            li
              router-link(to="",@click.native="pre",v-if='page>1') 上一页
            //- li(v-for="(item,index) in underUserList")
            li
              router-link(to="",@click.native="next",v-if='underUserList.length>0') 下一页
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import noContent from "../agent/noContent";
export default {
  components: {
    noContent
  },
  data() {
    return {
      noContent: true,
      page: 1,
      th: ["账号", "用户类型", "下级人数", "返点率", "团队会员数", "登录时间"],
      underUserList: []
    };
  },
  mounted() {
    this.getUnderUserList();
  },
  methods: {
    getUnderUserList() {
      this.noContent = true;
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/agent/agentMember.scss";
@import "../../../assets/scss/user/table.scss";
</style>


