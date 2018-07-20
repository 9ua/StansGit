<template lang='jade'>
.viewBox
  .userRight
    .userTitle 网站公告
    .userMain
      .sendList
        noContent(v-if='noContent')
        table(v-if='!noContent')
          tbody
            tr(style="bottom:0px;",v-if="list.length===0")
              td(colspan="100")
                .notContent(style="padding: 100px 0px;") 
                  mu-icon(value='sentiment_dissatisfied',class='icon')
                  暂无记录
            tr(v-for='(item,index) in list',v-if='index<start+limit&&index>=start')
              td 
                router-link(:to='"NoticeDetail?id="+item.id') {{item.title}}
              td {{item.createTime}}
              td 
        pageNav(:list='list',:limit='limit',:reset='reset',@pageTo='pageTo')
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
      reset: false,
      limit: 20,
      start: 0,
      noContent: true,
      list: [],
      type: 1,
    };
  },
  mounted() {
    this.getUserNoticeList();
  },
  methods: {
    pageTo($event) {
      this.start = this.limit * ($event - 1);
    },
    getUserNoticeList() {
      this.noContent = true;
      this.reset = true;
      this.start = 0;
      this.$axios
        .get(baseUrl + "/api/proxy/getUserNoticeList", {
          params: {
            type: this.type
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
@import "../../../assets/scss/user/table.scss";
table a:hover {
  color: #e4393c !important;
  text-decoration: underline;
}
</style>


