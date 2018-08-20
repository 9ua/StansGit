<template>
  <div class="trendchartBox">
    <div class="select-section">
      <div class="left"><span>彩种：{{lotts.title}}</span><button>{{lottName}}</button></div>
      <div class="right"></div>
    </div>
    <div class="chart_control_cont">2</div>
    <trendchartk v-if="this.$route.params.id === '1803'"></trendchartk>
    <trendcharts v-if="this.$route.params.id === '1804'"></trendcharts>
    <trendchartp v-if="this.$route.params.id === '1805'"></trendchartp>
  </div>
</template>
<script>
import { baseUrl } from "../../assets/js/env";
import trendchartk from './tck3.vue'
import trendcharts from './tcssc.vue'
import trendchartp from './tcpk10.vue'
export default {
  data() {
    return {
      lotteryList:null,
      lotts:'宏發快3',
      lottName:'三星'
    };
  },
  mounted(){
    // this.a();
    this.lott();
  },
  methods:{
    a(){
      console.log(this.$route.params.id)
    },
    lott(){
      this.$axios.get(baseUrl +"/api/lottery/trend",{params:{lotteryId:'dfk3',len:30}}).then(res => {
        this.lotteryList = res.data.data;
        this.lotts = this.lotteryList.lott;
        this.lottName = this.lotteryList.trend.name;
        console.log("lotteryList",this.lotteryList);
      })
    }
  },
  components:{
    trendchartk,trendcharts,trendchartp
  }
};
</script>

<style>
</style>
