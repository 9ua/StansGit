<template lang='jade'>
.viewBox
  .userRight
    .userTitle 追号记录
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
        table
          tbody
            tr
              th(v-for='item in th') {{item}}
          tbody
            tr(style="bottom:0px;",v-if="tradelist.length===0")
              td(colspan="100")
                .notContent(style="padding: 100px 0px;") 
                  mu-icon(value='sentiment_dissatisfied',class='icon')
                  暂无记录
            tr(v-for='(item,index) in tradelist',v-if='index<start+limit&&index>=start')
              td {{item.lotteryName}}
              td 第{{item.seasonId}}期
                p {{item.statusName}}
              td {{item.content}}
                p 玩法{{item.playName}}
              td {{item.amount}}                
              td {{item.openNum}}                
              td {{item.win}}                
              td {{item.createTime}}
              td 
      pageNav(:list='tradelist',:limit='limit',:reset='reset',@pageTo='pageTo')
      .userTip.mgt15
        p ※温馨提示：追号记录最多只保留7天。
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
      betMoney: 0,
      navTime: 0,
      navType: 0,
      betweenType: 1,
      status: 100,
      reset: false,
      start: 0,
      limit: 15,
      tradelist: [],
      th: [
        "流水号",
        "彩种",
        "起始期号",
        "已追/总期数",
        "已投/总金额",
        "奖金状态",
        "追号时间",
        "操作项"
      ],
      times: [
        { title: "今天", time: 1 },
        { title: "昨天", time: 2 },
        { title: "七天", time: 3 }
      ],
      types: [
        { title: "全部", value: 100 },
        { title: "未开始", value: 1 },
        { title: "已开始", value: 2 },
        { title: "已结束", value: 6 }
      ]
    };
  },
  mounted() {
    // this.getTradeList();
  },
  methods: {
    pageTo($event) {
      this.start = this.limit * ($event - 1);
    },
    changeTime(e, time, index) {
      this.navTime = index;
      this.betweenType = time;
      // this.getTradeList();
    },
    changeType(e, value, index) {
      this.navType = index;
      this.status = value;
      // this.getTradeList();
    },
    getTradeList() {
      this.noContent = true;
      this.reset = true;
      this.start = 0;
      this.$axios
        .get(baseUrl + "/api/proxy/getbetOrderList", {
          params: {
            account: this.$store.state.Globalusername,
            include: 0,
            status: this.status,
            betweenType: this.betweenType
          }
        })
        .then(res => {
          this.tradelist = res.data.data.list;
        })
        .catch(error => {
          console.log("获取彩種ratio ERROR");
        });
    }
  },
  filters: {
    addY(value) {
      return value + "元";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/betManage/betRecord.scss";
</style>


