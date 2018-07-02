<template>
  <div class="activity">
    <div class="activityBox">
      <ul>
        <li v-for='(actives,index) in activitys' :key='index'>
          {{actives}}
          <!-- <img :src="'https://mtxflower.com/'+actives.icon" alt="" style="width:800px;height:100px;"> -->
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
      activitys: ""
   };
  },
  mounted(){
    this.activity();
  },
  methods: {
    activity() {
      this.$axios.get(baseUrl + "/api/activity/getList", this.$store.state.config)
        .then(res => {
          this.activitys = res.data.data;
        })
        .catch(error => {
          console.log("getListNo");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/activity.scss";
</style>
