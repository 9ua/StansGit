<template lang='jade'>
.rechargeBox
  .leftListArea
    ul.sildeSession(v-for='parent in parents')
      h3 
        yd-icon(:name="parent.icon",class='icon') 
        {{parent.item}}
      li(v-for='(son,index) in parent.son') 
        router-link(:to="son.to") {{son.name}}
  router-view
</template>
<script>
export default {
  data() {
    return {
      parents: [
        {
          item: "账户管理",
          icon: "ucenter",
          son: [
            { name: "个人信息", to: "/user/userinfo" },
            { name: "安全中心", to: "/user/securityCenter" },
            { name: "银行卡管理", to: "/user/manageBankcard" }
          ]
        },
        {
          item: "投注管理",
          icon: "discount",
          son: [
            { name: "投注记录", to: "/user/betRecord" },
            { name: "追号记录", to: "/user/seekOrder" }
          ]
        },
        {
          item: "资金管理",
          icon: "type",
          son: [
            { name: "交易记录", to: "/user/billRecord" },
            { name: "今日盈亏", to: "/user/PLstatement" }
          ]
        },
        {
          item: "代理中心",
          icon: "phone2",
          son: [
            { name: "代理说明", to: "/user/agentIntro" },
            { name: "代理报表", to: "/user/agentReport" },
            { name: "下级报表", to: "/user/lowerReport" },
            { name: "下级开户", to: "/user/manageInvite" },
            { name: "会员管理", to: "/user/agentMember" },
            { name: "投注明细", to: "/user/agentBetRecord" },
            { name: "交易明细", to: "/user/agentBillRecord" }
          ]
        },
        {
          item: "消息管理",
          icon: "warn-outline",
          son: [
            { name: "站内信", to: "/user/letter" },
            { name: "网站公告", to: "/user/notice" }
          ]
        }
      ]
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/user.scss";
</style>
