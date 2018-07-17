<template lang='jade'>
.viewBox
  .userRight
    .userTitle 下级报表
    .userMain
      .newTab
        router-link(to="",:class="{'curr': index === navindex}",v-for='(item,index) in nav',@click.native='changeTime($event,item.value,index)',:key='index') {{item.name}}        
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
            tr(v-for='item in tradelist')
              td {{tradelist.lotteryName}}
              td 第{{tradelist.seasonId}}期
                p {{tradelist.statusName}}
              td {{tradelist.content}}
                p 玩法{{tradelist.playName}}
              td {{tradelist.amount}}                
              td {{tradelist.openNum}}                
              td {{tradelist.win}}                
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
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      navindex: 0,
      dateFlag: 0,
      tradelist: [],
      th: [
        "账户",
        "用户类型",
        "投注金额",
        "中奖金额",
        "返点金额",
        "活动礼金",
        "投注人数",
        "盈利"
      ],
      nav: [
        { name: "今天", value: 0 },
        { name: "昨天", value: 1 },
        { name: "本月", value: 2 },
        { name: "上月", value: 3 }
      ]
    };
  },
  mounted() {
    this.getUnderLevelReport();
  },
  methods: {
    changeTime(e, value, index) {
      this.navindex = index;
      this.dateFlag = value;
      this.getUnderLevelReport();
    },
    getUnderLevelReport() {
      this.$axios
        .get(baseUrl + "/api/proxy/getUnderLevelReport", {
          params: {
            account: this.$store.state.Globalusername,
            dateFlag: this.dateFlag
          }
        })
        .then(res => {
          this.tradelist = res.data.data;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/agent/lowerReport.scss";
</style>


