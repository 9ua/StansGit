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
                  | 暂无记录
            tr(v-for='(item,index) in list',@click='select(item)')
              td 
                a(href='javascript:;') {{item.title}}
                b(v-if='item.isRead == false')
              td {{item.createTime}}
              td 
        pageNav(:allCount='allCount',:limit='limit',@pageTo='pageTo')
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
      limit: 20,
      start: 0,
      noContent: true,
      list: [],
      type: 1,
      allCount: 1,
      notice: ""
    };
  },
  mounted() {
    this.getUserNoticeList();
  },
  methods: {
    //消息点击事件
    select(item) {
      this.$router.push("NoticeDetail?id=" + item.id);
      item.isRead = true;
      //获取获取公告内容
      this.getNoticeInfor(item.id);
      if (item.isRead === true) {
        //添加已读取的消息状态
        this.addReadNotice(item.id);
        //判断是否有未读消息
        this.$parent.getNoReadNoticeStatus();
      }
    },
    //分页
    pageTo($event) {
      this.start = this.limit * ($event - 1);
      this.getUserNoticeList();
    },
    //获取用户公告
    getUserNoticeList() {
      this.noContent = true;
      this.$axios
        .get(baseUrl + "/api/proxy/getUserNoticeList", {
          params: { type: this.type, start: this.start, limit: this.limit }
        })
        .then(res => {
          this.list = res.data.data.list;
          this.allCount = res.data.data.allCount;
          this.noContent = false;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    //添加已读取的消息状态
    addReadNotice(x) {
      this.$axios.get(baseUrl + "/api/proxy/addReadNotice?noticeId=" + x);
    },
    //获取获取公告内容
    getNoticeInfor(x) {
      this.$axios
        .get(baseUrl + "/api/proxy/getNoticeInfor?id=" + x)
        .then(res => {
          this.notice = res.data.data.content;
        })
        .catch(error => {
          console.log("获取CCCCONTENT ERROR");
        });
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/user/table.scss";
table a:hover {
  color: #e4393c !important;
  text-decoration: underline;
}
tr td:nth-child(1) {
  position: relative;
  text-align: left;
  & a {
    margin-left: 16px;
    float: left;
  }
  & b {
    float: right;
    width: 8px;
    height: 8px;
    margin-top: 12px;
    display: inline-block;
    background: #af3a31;
    border-radius: 50%;
  }
}
</style>


