<template lang='jade'>
.viewBox
  .userRight
    .userTitle 下级报表
    .userMain
      .newTab
        router-link(to="",:class="{'curr': index === navindex}",v-for='(item,index) in nav',@click.native='changeTime($event,item.value,index)',:key='index') {{item.name}}        
      .searchDetail
        noContent(v-if='noContent')
        table(v-if='!noContent')
          tbody
            tr
              th(v-for='item in th') {{item}}
          tbody
            tr(style="bottom:0px;",v-if="list.length===0")
              td(colspan="100")
                .notContent(style="padding: 100px 0px;") 
                  mu-icon(value='sentiment_dissatisfied',class='icon')
                  | 暂无记录
            tr(v-for='item in list',v-if='index<start+limit&&index>=start')
              td {{item.account}}
              td {{item.userTypeName}}
              td {{item.teamChildCount}}
              td {{item.childCount}}                             
              td {{item.count}}
              td 
      pageNav(:list='list',:limit='limit',ref='pageNav',,@pageTo='pageTo')
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
      start: 0,
      limit: 15,
      navindex: 0,
      dateFlag: 0,
      noContent: true,
      list: [],
      th: ["账户", "用户类型", "下级人数", "直属下级", "盈利"],
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
    //接收pageNav组件分页信号
    pageTo($event) {
      this.start = this.limit * ($event - 1);
    },
    changeTime(e, value, index) {
      this.navindex = index;
      this.dateFlag = value;
      this.getUnderLevelReport();
    },
    getUnderLevelReport() {
      this.noContent = true;
      this.$refs.pageNav.reset();
      this.start = 0;
      this.$axios
        .get(baseUrl + "/api/proxy/getUnderLevelReport", {
          params: {
            account: this.$store.state.Globalusername,
            dateFlag: this.dateFlag
          }
        })
        .then(res => {
          this.list = res.data.data;
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
@import "../../../assets/scss/agent/lowerReport.scss";
</style>


