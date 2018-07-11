<template>
  <div class="activity">
    <div class="activityBox">
      <ul>
        <li v-for='(actives,index) in activitys' :key='index'>
          <div class="activity-content" @click="activi($event,actives,index)">
            <img :src="'https://mtxflower.com'+actives.icon" alt="">
            <div>
              <h1>{{actives.title}}</h1>
              <p>
                <span>活动时间：{{actives.endTime}}</span>
                <span>{{actives.status === 0 ? '进行中' : '结束'}}</span>
              </p>
              <button>查看详情
                <i :class="activesremarks ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i>
              </button>
            </div>
          </div>
          <div class="activity-content-show" v-if="index == num">
            <p v-html="actives.remark" v-show="activesremarks"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
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
      this.$axios
        .get(baseUrl + "/api/activity/getList", this.$store.state.config)
        .then(res => {
          this.activitys = res.data.data;
        })
        .catch(error => {
          console.log("getListNo");
        });
    },
    activi(e, actives, index) {
      if (this.num === index) {
        this.activesremarks = !this.activesremarks;
      }else{
        this.activesremarks = true;
        this.num = index; 
      }
      // this.num = index;      
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/activity.scss";
</style>
