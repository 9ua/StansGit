<template lang='jade'>
.viewBox
  .userRight
    .userTitle 网站公告
    .userMain
      .sendList
        noContent(v-if='noContent')
        .pd30(v-if='!noContent',style="padding:30px;")
          h2.articleTitle {{title}}
          .articlePublishTime {{createTime}}
          .articleContent
            p(v-html='content')
          .author {{author}}
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import noContent from "../public/noContent";
export default {
  components: {
    noContent
  },
  data() {
    return {
      title: "",
      content: "",
      createTime: "",
      author: "",
      noContent: true
    };
  },
  mounted() {
    this.getNoticeInfor();
  },
  methods: {
    pageTo($event) {
      this.start = this.limit * ($event - 1);
    },
    getNoticeInfor() {
      this.noContent = true;
      this.$axios
        .get(baseUrl + "/api/proxy/getNoticeInfor", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(res => {
          this.title = res.data.data.title;
          this.content = res.data.data.content;
          this.createTime = res.data.data.createTime;
          this.author = res.data.data.author;
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
@import "@/assets/scss/user/comm.scss";
.articleTitle {
  font-size: 16px;
  color: #333;
  text-align: center;
}
.articlePublishTime {
  font-size: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}
.articleContent,
.articleContent p,
.articleContent span {
  font-size: 14px !important;
  color: #333;
}
.author{
    float: right;
}
</style>


