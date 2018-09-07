<template lang='jade'>
.viewBox
  .userRight
    .userTitle 投注明细
    .userMain
      .searchOpt 账户：
        input.userInput.w90(v-model='account',@keyup.enter='goGetTradeList')
        | &nbsp;用户类型：
        ins.selectIcon
          select.userSelect(name='f',v-model='include',@change='goGetTradeList')
            option(value='1') 全部 
            option(value='2')  下级
            option(value='0') 自己
          em 
        | &nbsp;
        router-link(to='',class='submitBtn',@click.native='goGetTradeList') 搜索
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
              td {{item.lotteryName}}
              td 第{{item.seasonId}}期
                p {{item.statusName}}
              td {{item.content|multi}}
                p 玩法{{item.playName}}
              td {{item.amount}}                
              td {{item.openNum}}                
              td {{item.win}}                
              td {{item.createTime}}
              td 
      pageNav(:allCount='allCount',:limit='limit',ref='pageNav', @pageTo='pageTo')
      .userTip.mgt15
        p ※ 温馨提示：投注明细最多只保留7天。
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
      betAmount: 0,
      winAmount: 0,
      activityAndSend: 0,
      juniorRebateAmount: 0,
      rechargeAmount: 0,
      drawingAmount: 0,
      navTime: 0,
      navType: 0,
      betweenType: 1,
      start: 0,
      limit: 15,
      status: 100,
      tradelist: [],
      allCount: 1,
      th: [
        "账号",
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
  },
  methods: {
    //接收pageNav组件分页信号
    pageTo($event) {
      this.start = this.limit * ($event - 1);
      this.getTradeList();
    },
    changeTime(e, time, index) {
      this.start=0;
      this.navTime = index;
      this.betweenType = time;
      this.$refs.pageNav.reset();
      this.getTradeList();
    },
    changeType(e, value, index) {
      this.start=0;
      this.navType = index;
      this.status = value;
      this.$refs.pageNav.reset();
      this.getTradeList();
    },
    goGetTradeList(){
      this.start=0;
      this.$refs.pageNav.reset();
      this.getTradeList();
    },
    getTradeList() {
      this.noContent = true;
      if (this.account === "") {
        this.$axios
          .get(baseUrl + "/api/proxy/getbetOrderList", {
            params: {
              account: this.$store.state.Globalusername,
              include: this.include,
              status: this.status,
              betweenType: this.betweenType,
              start: this.start,
              limit: this.limit
            }
          })
          .then(res => {
            this.tradelist = res.data.data.list;
            this.noContent = false;
            this.allCount = res.data.data.betOrderAllCount;
          })
          .catch(error => {
            console.log(" ERROR");
          });
      } else {
        this.$axios
          .get(baseUrl + "/api/proxy/getbetOrderList", {
            params: {
              account: this.account,
              include: this.include,
              status: this.status,
              betweenType: this.betweenType,
              start: this.start,
              limit: this.limit
            }
          })
          .then(res => {
            if (res.data.code === 1) {
              this.tradelist = res.data.data.list;
              this.allCount = res.data.data.betOrderAllCount;
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
            console.log(" ERROR");
          });
      }
    }
  },
  filters: {
    addY(value) {
      return value + "元";
    },
    keepTwoNum2(value) {
      value = Number(value);
      return value.toFixed(2);
    },
    multi(str) {
      if (str.split(",").length > 10) {
        let arr = str.split(",");
        let ret = "";
        let row = 10;
        let col = Math.ceil(arr.length / row);
        for (let i = 0; i < col; i++) {
          ret +=str
              .split(",")
              .splice(i * row, row)
              .join(",") + "\n";
        }
        return ret;
      }else{
        return str;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/agent/agentMember.scss";
@import "../../../assets/scss/betManage/betRecord.scss";
</style>


