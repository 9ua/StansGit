<template lang='jade'>
.viewBox
  .userRight
    .userTitle 站内信
    .userMain
      .sendList
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
                  暂无记录
            tr(v-for='(item,index) in list',v-if='index<start+limit&&index>=start')
              td {{item.title}}
              td 管理员
              td {{item.createTime}}
              td 
        pageNav(:list='list',:limit='limit',:reset='reset',@pageTo='pageTo')
        .msgControl
          input(type='checkbox')
          span 全选
          input(type='button',value='标为已读')
          input(type='button',value='删除')
        .userTip
          p ※ 温馨提示：系统将自动清空5天前的用户消息记录。
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
      type: 2,
      th: ["主题", "发件人", "时间"]
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
@import "../../../assets/scss/user/letter.scss";
</style>


