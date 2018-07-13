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
        table
          tbody
            tr
              th(v-for='item in th') {{item}}
          tbody
            tr(style="bottom:0px;",v-if="tradelist.length===0")
              td(colspan="100")
                .notContent(style="padding: 100px 0px;") 暂无记录
            tr(v-for='item in tradelist')
              td {{tradelist.lotteryName}}
              td 第{{tradelist.seasonId}}期
                p {{tradelist.statusName}}
              td {{tradelist.content}}
                p 玩法{{tradelist.playName}}
              td {{tradelist.amount}}                
              td {{tradelist.openNum}}                          
              td {{tradelist.createTime}}
              td 
      .page
        p 共
          em {{tradelist.length}}
          条记录
        .pageNav
          ul.pagination
            li
              router-link(to="",@click.native="pre") 上一页
            //- li(v-for="(item,index) in tradelist")
            li
              router-link(to="",@click.native="next") 下一页
      .userTip.mgt15
        p ※温馨提示：投注记录最多只保留7天。
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      betMoney: 0,
      navTime: 0,
      navType: 0,
      betweenType: 1,
      status: 100,
      tradelist: [],
      th: [
        "流水号",
        "时间",        
        "摘要",
        "收入金额",
        "支出金额",
        "可用余额",
        "备注",
      ],
      times: [
        { title: "今天", time: 1 },
        { title: "昨天", time: 2 },
        { title: "七天", time: 3 }
      ],
      types: [
        { title: "账户明细", value: 100 },
        { title: "充值记录", value: 1 },
        { title: "提现记录", value: 2 },
      ]
    };
  },
  mounted() {
    this.getTradeList();
  },
  methods: {
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


