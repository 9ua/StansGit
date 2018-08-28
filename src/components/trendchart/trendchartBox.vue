<template>
  <div class="trendchartBox">
    <!-- 开奖走势图头部 -->
    <div class="select-section">
      <div class="left">
        <span>彩种：{{lotts.title}}</span>
        <button>{{lottName}}</button>
      </div>
      <div class="right" @click="showFun = !showFun">
        <i class="hideSearchBarIcon" :class="showFun ? 'transform' : ''"></i>{{showFun ? '隐藏功能区' : '显示功能区'}}</div>
    </div>
    <!-- 开奖走势图搜索条 -->
    <div class="chart_control_cont" :class="showFun ? '' : 'transform'">
      <div class="areaContainer">
        <div class="trendSearchCheckBox">
          <label class="checkboxDetail" v-for="(item,indexa) in itema">
            <input type="checkbox" class="checkbox" id="trendSplitLine" v-model="item.trendSplitLine" :checked='item.trendSplitLine' @click="trendSplitLines(item)">
            <span>辅助线</span>
          </label>
          <label class="checkboxDetail" v-for="item in itemb">
            <input type="checkbox" class="checkbox" id="trendOmission" v-model="item.trendOmission" :checked='item.trendOmission' @click="trendOmissions(item)">
            <span>遗漏</span>
          </label>
          <label class="checkboxDetail" v-for="item in itemc">
            <input type="checkbox" class="checkbox" id="trendLine" v-model="item.trendLine" :checked='item.trendLine' @click="trendLines(item)">
            <span>走势</span>
          </label>
        </div>
        <div class="latelyIssueBox-trend">
          <ul>
            <li :class="{'active': index === latelyItem}" v-for="(item,index) in latelyIssue" @click="late(index,item)">{{item.title}}</li>
          </ul>
        </div>
      </div>
    </div>
    <trendcharts ref="ssc" :lotteryList='JSON.stringify(lotteryList)' :numLen='numLen'></trendcharts>
  </div>
</template>
<script>
import { drawTrend, clearCanvas, trendLineCheck } from "./trendchart";
import { baseUrl } from "../../assets/js/env";
import trendcharts from "./tcssc.vue";
export default {
  data() {
    return {
      style: "rgb(185,185,185)",
      lottsTrendTable: true,
      showFun: true,
      lotteryList: "",
      trend: "",
      lotts: "宏發快3",
      lottName: "三星",
      latelyIssue: [
        { title: "近100期", number: 100 },
        { title: "近50期", number: 50 },
        { title: "近30期", number: 30 }
      ],
      latelyItem: 2,
      itema: [{ trendSplitLine: true }],
      itemb: [{ trendOmission: true }],
      itemc: [{ trendLine: true }],
      lens: 30,
      numLen: 6,
      lotteryId: "dfk3"
    };
  },
  mounted() {
    this.lott();
  },
  methods: {
    //辅助线切换
    trendSplitLines(item) {
      item.trendSplitLine = !item.trendSplitLine;
      if (item.trendSplitLine === false) {
        this.$refs.ssc.trendSplitLineTrue();
      } else {
        this.$refs.ssc.trendSplitLineFalse();
      }
    },
    //遗漏切换
    trendOmissions(item) {
      item.trendOmission = !item.trendOmission;
      if (item.trendOmission === false) {
        this.$refs.ssc.trendOmissionTrue();
      } else {
        this.$refs.ssc.trendOmissionFalse();
      }
    },
    //走势切换
    trendLines(item) {
      item.trendLine = !item.trendLine;
      trendLineCheck(item.trendLine);
    },
    //期数切换
    late(index, item) {
      this.latelyItem = index;
      this.lens = item.number;
      clearCanvas();
      this.lott();
    },
    //获取接口数据
    lott() {
      this.$axios
        .get(baseUrl + "/api/lottery/trend", {
          params: { lotteryId: this.$route.params.name, len: this.lens }
        })
        .then(res => {
          this.lotteryList = res.data.data;
          this.trend = this.lotteryList.trend;
          this.numLen = this.trend.numLen;
          this.lotts = this.lotteryList.lott;
          this.lottName = this.lotteryList.trend.name;
          setTimeout(() => {
            drawTrend();
          }, 400);
          console.log(this.lotteryList,this.lotts.title)
        });
    }
  },
  components: {
    trendcharts
  }
};
</script>
<style lang='scss'>
@import "./trendchartBox.scss";
@import "./trendchart.scss";
</style>
