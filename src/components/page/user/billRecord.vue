<template lang='jade'>
.viewBox
  .userRight
    .userTitle 交易记录
    .userMain
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
                  | 暂无记录
            tr(v-for='(item,index) in tradelist',v-if='index<start+limit&&index>=start')
              td {{item.seasonId}}
              td {{item.changeTime}}
              td {{item.lotteryName}}
                p 玩法{{item.playName}}             
              td {{item.changeAmount}}                
              td {{item.balance}}                          
              td {{item.accountChangeTypeName}}
              td 
      pageNav(:list='tradelist',:limit='limit',ref='pageNav',@pageTo='pageTo')
      .userTip.mgt15
        p ※温馨提示：交易记录最多只保留7天。
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
      noContent: true,
      betMoney: 0,
      navTime: 0,
      navType: 0,
      betweenType: 1,
      status: 100,
      limit: 15,
      start: 0,
      tradelist: [],
      th: [
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
    pageTo($event) {
      this.start = this.limit * ($event - 1);
    },
    changeTime(e, time, index) {
      this.navTime = index;
      this.betweenType = time;
      this.getTradeList();
    },
    changeType(e, value, index) {
      this.navType = index;
      this.status = value;
      this.getTradeList();
    },
    getTradeList() {
      this.noContent = true;
      this.$refs.pageNav.reset();
      this.start = 0;
      this.$axios
        .get(baseUrl + "/api/proxy/getTradeList", {
          params: {
            account: this.$store.state.Globalusername,
            include: 0,
            accountChangeType: this.status,
            betweenType: this.betweenType
            // start: this.start,
            // limit: this.limit
          }
        })
        .then(res => {
          this.tradelist = res.data.data.list;
          this.noContent = false;
        })
        .catch(error => {
          console.log("获取彩種ratio ERROR");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/betManage/betRecord.scss";
</style>


