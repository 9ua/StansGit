<template>
  <!-- 开奖号码走势图 -->
  <div class="lotteryTrendArea" id="lotteryTrendArea">
    <table :class="lottsTrendTable ?'lottsTrendTable' : 'lotteryTrendNoBorder'" :style="{color:style}">
      <thead v-if="lotteryListNeed !== ''">
        <tr class="listHeader">
          <th rowspan="2" class="smallFont14" width='110'>期号</th>
          <th rowspan="2" class="smallFont14" width='80'>开奖号码</th>
          <th v-for="(item,index) in lotteryListNeed.trend.titles" :colspan='numLen' width="17" class="smallFont14 trendLine">{{item}}</th>
        </tr>
        <tr class="listHeader">
          <td :colspan='numLen' v-for="(items,index) in lotteryListNeed.trend.titlesAndNums" class="trendBorder-l" :class="'trendBorder-'+$route.params.id" width='170'>
            <i v-for="item in items.nums">{{item}}</i>
          </td>
        </tr>
      </thead>
      <tbody v-if="lotteryListNeed !== ''">
        <tr class="content" v-for="(item,index) in lotteryListNeed.trend.trends">
          <td class="fontColorBlack" width="110">{{item.seasonId}}</td>
          <td class="fontColorBlack trendBorder-l" width="80">{{item.nums}}</td>
          <td :class="num.clazz" v-for="(num,indexx) in item.info" :key="indexx">{{num.num}}</td>
        </tr>
      </tbody>
      <tfoot v-if="lotteryListNeed !== ''">
        <tr class="trendNumTotal" v-for="(item,index) in lotteryListNeed.trend.allTrends">
          <td class="smallFont14">{{item.seasonId}}</td>
          <td class="trendBorder-l">{{item.nums}}</td>
          <td :class="num.clazz" v-for="(num,indexx) in item.info">{{num.num}}</td>
        </tr>
        <tr class="trendNumTotal">
          <td rowspan="2" class="smallFont14">期号</td>
          <td rowspan="2" class="trendBorder-l smallFont14">开奖号码</td>
          <td :colspan='numLen' v-for="(items,index) in lotteryListNeed.trend.titlesAndNums" class="trendBorder-l" :class="'trendBorder-'+$route.params.id" width='17'>
            <i v-for="item in items.nums">{{item}}</i>
          </td>
        </tr>
        <tr class="trendNumTotal">
          <th v-for="(item,indexf) in lotteryListNeed.trend.titles" :colspan='numLen' width="17" class="smallFont14 trendLine">{{item}}</th>
        </tr>
      </tfoot>
    </table>
    <div class="lottsTrendCanvasBox" id="lottsTrendCanvasBox"></div>
  </div>
  <!-- 开奖走势图 end -->
</template>
<script>
export default {
  data() {
    return {
      style: "rgb(185,185,185)",
      lottsTrendTable: true
    };
  },
  props: {
    lotteryList: {
      type: String
    },
    numLen: Number
  },
  computed: {
    lotteryListNeed() {
      if (this.lotteryList !== "") {
        return JSON.parse(this.lotteryList);
      } else {
        return "";
      }
    }
  },
  mounted() {},
  methods: {
    //辅助线切换
    trendSplitLineTrue() {
      this.lottsTrendTable = false;
    },
    trendSplitLineFalse() {
      this.lottsTrendTable = true;
    },
    //遗漏切换
    trendOmissionTrue() {
      this.style = "rgb(255,255,255)";
    },
    trendOmissionFalse() {
      this.style = "rgb(185,185,185)";
    }
  }
};
</script>
