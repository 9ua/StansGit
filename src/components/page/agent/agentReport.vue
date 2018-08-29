<template lang='jade'>
.viewBox
  .userRight
    .userTitle 代理报表
    .userMain
      .newTab
        router-link(to="",:class="{'curr': index === navindex}",v-for='(item,index) in nav',@click.native='changeTime($event,item.value,index)',:key='index') {{item.name}}        
      ul.todayView.mgb10
        input.userInput(placeholder='下级报表查询', v-model="accountName",@keyup.enter='getUserTeam',v-focus="focusState")
        | &nbsp;
        router-link(to="",class='submitBtn ClickShade',@click.native='getUserTeam') 搜索
      noContent(v-if='noContent')
      .code_cont(v-if='!noContent')
        ul.plMore
          li
            em {{userTeam.betAmount|money}}
            span 投注金额
          li
            em {{userTeam.winningAmount|money}}
            span 中奖金额
          li
            em {{userTeam.activityAmount|money}}
            span 活动礼金
          li
            em {{userTeam.teamRebateAmount|money}}
            span 团队返点
          li
            em {{userTeam.profit|money}}
            span 团队盈利
        ul.plMore
          li
            em {{userTeam.betPerCount|addR}}
            span 投注人数
          li
            em {{userTeam.firstChargeCount|addR}}
            span 首冲人数
          li
            em {{userTeam.regCount|addR}}
            span 注册人数
          li
            em {{userTeam.lowerCount|addR}}
            span 下级人数
          li
            em {{userTeam.teamAmount|money}}
            span 团队余额
        ul.plMore
          li
            em {{userTeam.rechargeAmount|money}}
            span 充值金额
          li
            em {{userTeam.withdrawAmount|money}}
            span 提现金额
          li
            em {{userTeam.agentRebateAmount|money}}
            span 代理返点
          li
          li
        .userTip
          p
            | ※ 温馨提示：代理报表最多只保存7天。                    
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import noContent from "../public/noContent";
export default {
  components: {
    noContent
  },
  data() {
    return {
      navindex: 0,
      dateFlag: 0,
      focusState:false,
      noContent: true,
      accountName: "",
      nav: [
        { name: "今天", value: 0 },
        { name: "昨天", value: 1 },
        { name: "本月", value: 2 },
        { name: "上月", value: 3 }
      ],
      userTeam: []
    };
  },
  created() {
    this.getUserTeam();
  },
  methods: {
    changeTime(e, value, index) {
      this.navindex = index;
      this.dateFlag = value;
      this.getUserTeam();
    },
    getUserTeam() {
      this.noContent = true;
      if (this.accountName == "") {
        this.$axios
          .get(baseUrl + "/api/proxy/getUserTeam", {
            params: {
              account: this.$store.state.Globalusername,
              dateFlag: this.dateFlag
            }
          })
          .then(res => {
            this.userTeam = res.data.data;
            this.noContent = false;
          })
          .catch(error => {
            console.log("获取列表Error");
          });
      } else if (this.accountName !== "") {
        this.$axios
          .get(baseUrl + "/api/proxy/getUserTeam", {
            params: { account: this.accountName, dateFlag: this.dateFlag }
          })
          .then(res => {
            if (res.data.code === 1) {
              this.userTeam = res.data.data;
              this.noContent = false;
            } else {
              this.accountName="";
              this.focusState=true;
              this.noContent = false;
              this.$message.error({
                message: res.data.data.message,
                center: true,
                showClose: true
              });
            }
          })
          .catch(error => {
            console.log("获取列表Error");
          });
      }
    }
  },
  filters: {
    money(value) {
      if (value !== undefined) {
        value = Number(value);
        return "￥" + value.toFixed(2);
      }
    },
    addR(value) {
      if (value !== undefined) {
        return value + "人";
      }
    }
  },
   directives: {
    focus: {
      update: function (el, {value}) {
        if (value) {
          el.focus()
        }
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/agent/agentReport.scss";
</style>


