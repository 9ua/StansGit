<template lang='jade'>
.viewBox
  .userRight
    .userTitle 投注记录
    .userMain
      ul.todayView.mgb10
        li 今日概况
        li 
          投注金额：
          span {{betAmount| keepTwoNum2|addY}}
        li 
          中奖金额：
          span {{winAmount| keepTwoNum2|addY}}
        li 
          盈利：
          span {{winAmount-betAmount+activityAndSend+juniorRebateAmount | keepTwoNum2|addY}}
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
                  暂无记录
            tr(v-for='item in tradelist')
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
      .page
        p 当前页共
          em {{tradelist.length}}
          条记录
        .pageNav
          ul.pagination
            li
              router-link(to="",@click.native="pre",v-if='page>1') 上一页
            //- li(v-for="(item,index) in tradelist")
            li
              router-link(to="",@click.native="next",v-if='tradelist.length>0') 下一页
      .userTip.mgt15
        p ※温馨提示：投注记录最多只保留7天。
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
      betAmount: 0,
      winAmount: 0,
      activityAndSend: 0,
      juniorRebateAmount: 0,
      rechargeAmount: 0,
      drawingAmount: 0,
      navTime: 0,
      navType: 0,
      betweenType: 1,
      page: 1,
      start: 0,
      limit: 5,
      status: 100,
      tradelist: [],
      th: [
        "彩种",
        "期号",
        "投注内容",
        "投注金额",
        "开奖号码",
        "派送奖金",
        "投注时间"
        // "操作项"
      ],
      times: [
        { title: "今天", time: 1 },
        { title: "昨天", time: 2 },
        { title: "七天", time: 3 }
      ],
      types: [
        { title: "全部", value: 100 },
        { title: "已中奖", value: 1 },
        { title: "未中奖", value: 2 },
        { title: "等待开奖", value: 6 }
      ]
    };
  },
  mounted() {
    this.getTradeList();
    this.getGainLost();
  },
  methods: {
    //上一页
    pre() {
      if (this.page > 1) {
        this.start = this.start - this.limit;
        this.page--;
        this.getTradeList();
      }
    },
    //下一页
    next() {
      if (this.tradelist.length > 0) {
        this.start = this.start + this.limit;
        this.page++;
        this.getTradeList();
      } else {
        // this.next=false;
      }
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
    getGainLost() {
      this.$axios
        .get(baseUrl + "/api/proxy/getGainLost")
        .then(res => {
          this.betAmount = res.data.data.betAmount;
          this.winAmount = res.data.data.winAmount;
          this.activityAndSend = res.data.data.activityAndSend;
          this.juniorRebateAmount = res.data.data.juniorRebateAmount;
          this.rechargeAmount = res.data.data.rechargeAmount;
          this.drawingAmount = res.data.data.drawingAmount;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    getTradeList() {
      this.noContent=true;
      this.$axios
        .get(baseUrl + "/api/proxy/getbetOrderList", {
          params: {
            account: this.$store.state.Globalusername,
            include: 0,
            status: this.status,
            betweenType: this.betweenType,
            start: this.start,
            limit: this.limit
          }
        })
        .then(res => {
          this.tradelist = res.data.data.list;
          this.noContent=false;
        })
        .catch(error => {
          console.log("获取彩種ratio ERROR");
        });
    }
  },
  filters: {
    addY(value) {
      return value + "元";
    },
    keepTwoNum2(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/betManage/betRecord.scss";
</style>


