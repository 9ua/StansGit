<template lang='jade'>
.activity
  .activityBox
    ul
      li(v-for='(actives,index) in activitys', :key='index')
        .activity-content(@click='activi($event,actives,index)')
          img(:src="'https://mtxflower.com'+actives.icon", alt='')
          div
            h1 {{actives.title}}
            p
              span 活动时间：{{actives.endTime}}
              span {{actives.status === 0 ? '进行中' : '结束'}}
            button
              | 查看详情
              i(:class="activesremarks ? 'el-icon-caret-bottom' : 'el-icon-caret-top'")
        .activity-content-show(v-if='index == num')
          p(v-html='actives.remark', v-show='activesremarks')
</template>
<script>
import { baseUrl } from "../../assets/js/env";
export default {
  data() {
    return {
      activitys: "",
      activesremarks: false,
      num: 0
    };
  },
  mounted() {
    this.activity();
  },
  methods: {
    activity() {
      var now = new Date().getTime();
      if(localStorage.getItem("activity") !== null){
        var setupTime = localStorage.getItem("data_activity");
        if(setupTime === null || now - setupTime > this.$store.state.cacheTime){
          localStorage.removeItem("activity");
          localStorage.removeItem("data_activity");
          this.$axios.get(baseUrl + "/api/activity/getList").then(res => {
            localStorage.setItem("activity",JSON.stringify(res.data.data));
            this.activitys = JSON.parse(localStorage.getItem("activity"));
            localStorage.setItem("data_activity",now);
          })
          .catch(error => {
            console.log(error);
          });
        }else{
          this.activitys = JSON.parse(localStorage.getItem("activity"));
        }
      }else{
        this.$axios.get(baseUrl + "/api/activity/getList").then(res => {
          localStorage.setItem("activity",JSON.stringify(res.data.data));
          this.activitys = JSON.parse(localStorage.getItem("activity"));
          localStorage.setItem("data_activity",now);
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    activi(e, actives, index) {
      if (this.num === index) {
        this.activesremarks = !this.activesremarks;
      }else{
        this.activesremarks = true;
        this.num = index; 
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/activity.scss";
</style>
