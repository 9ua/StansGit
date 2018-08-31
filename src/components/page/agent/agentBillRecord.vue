<template lang='jade'>
.viewBox
  .userRight
    .userTitle 交易明细
    .userMain
      .searchOpt 账户：
        input.userInput.w90(v-model='account',@keyup.enter='getTradeList') 
        | &nbsp;用户类型：
        ins.selectIcon
          select.userSelect(name='f',v-model='include',@change='getTradeList')
            option(value='1') 全部 
            option(value='2')  下级
            option(value='0') 自己
          em 
        | &nbsp;
        router-link(to='',class='submitBtn',@click.native='getTradeList') 搜索
      ul.searchFirst
        //- li
        //-   span 彩种：
        //-   ins.selectIcon
        //-     .title 全部彩种
        //-       select.userSelect
        li._time
          span 时间：
          router-link.userSearch.time(to="",:class="{'active': index === navTime}",v-for='(item,index) in times',@click.native='changeTime($event,item.time,index)',:key='index') {{item.title}}
        li._state
          span 类型：
          router-link.userSearch.time(to="",:class="{'active': index === navType}",v-for='(item,index) in types',@click.native='changeType($event,item.value,index)',:key='index') {{item.title}}
      .searchDetail
        noContent(v-if='noContent')
        table(v-if='!noContent')
          tbody
            tr
              th(v-for='item in th') {{item}}
          tbody
            tr(style="bottom:0px;",v-if="tradelist.length===0")
              td(colspan="100")
                .notContent(style="padding: 100px 0px;") 
                  mu-icon(value='sentiment_dissatisfied',class='icon')
                  span 暂无记录
            tr(v-for='(item,index) in tradelist')
              td {{item.account}}
              td {{item.seasonId}}
              td {{item.changeTime}}
              td {{item.lotteryName}}
                p 玩法{{item.playName}}             
              td {{item.changeAmount}}                
              td {{item.balance}}                          
              td {{item.accountChangeTypeName}}
              td 
      pageNav(:allCount='allCount',:limit='limit',ref='pageNav',@pageTo='pageTo')
      .userTip.mgt15
        p ※ 温馨提示：交易明细最多只保留7天。
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import noContent from "../public/noContent";
import pageNav from "../public/pageNav";
export default {
  components: {
    noContent,
    pageNav
  },
  data() {
    return {
      account: "",
      include: 1,
      noContent: true,
      betMoney: 0,
      navTime: 0,
      navType: 0,
      betweenType: 1,
      status: 100,
      start: 0,
      limit: 15,
      tradelist: [],
      allCount:1,
      th: [
        "账号",
        "流水号",
        "时间",
        "摘要",
        "账户变动",
        // "支出金额",
        "可用余额",
        "备注"
      ],
      times: [
        { title: "今天", time: 1 },
        { title: "昨天", time: 2 },
        { title: "七天", time: 3 }
      ],
      types: [
        { title: "账户明细", value: 100 },
        { title: "提现记录", value: 1 },
        { title: "充值记录", value: 2 }
      ]
    };
  },
  mounted() {
    this.getTradeList();
  },
  methods: {
    //接收pageNav组件分页信号
    pageTo($event) {
      this.start = this.limit * ($event - 1);
      this.getTradeList();
    },
    changeTime(e, time, index) {
      this.navTime = index;
      this.betweenType = time;
      this.$refs.pageNav.reset();
      this.getTradeList();
    },
    changeType(e, value, index) {
      this.navType = index;
      this.status = value;
      this.$refs.pageNav.reset();
      this.getTradeList();
    },
    getTradeList() {
      this.noContent = true;
      if (this.account === "") {
        this.$axios
          .get(baseUrl + "/api/proxy/getTradeList", {
            params: {
              account: this.$store.state.Globalusername,
              include: this.include,
              accountChangeType: this.status,
              betweenType: this.betweenType,
              start: this.start,
              limit: this.limit
            }
          })
          .then(res => {
            this.tradelist = res.data.data.list;
            this.allCount=res.data.data.allCount;
            this.noContent = false;
          })
          .catch(error => {
            console.log("获取彩種ratio ERROR");
          });
      } else {
        this.$axios
          .get(baseUrl + "/api/proxy/getTradeList", {
            params: {
              account: this.account,
              include: this.include,
              accountChangeType: this.status,
              betweenType: this.betweenType,
              start: this.start,
              limit: this.limit
            }
          })
          .then(res => {
            if (res.data.code === 1) {
              this.tradelist = res.data.data.list;
              this.allCount=res.data.data.allCount;
              this.noContent = false;
            } else {
              this.account = "";
              this.$message.error({
                message: res.data.data.message,
                center: true,
                showClose: true
              });
              this.getTradeList();
            }
          })
          .catch(error => {
            console.log("获取彩種ratio ERROR");
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/agent/agentMember.scss";
@import "../../../assets/scss/betManage/betRecord.scss";
</style>


