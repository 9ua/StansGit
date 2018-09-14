<template lang='jade'>
.betingbox
  .betingPop
    p.title
      span 详情
      i.iconfont.icon-cuo.transition(@click='showpop')
    .layui-layer-content
      .detailHeaderBox
        h3.detailHeaderTitle {{items.lotteryName}}
        .headerDetail
          p
            span 期号：
            span#delSeasonId {{items.seasonId}}
          p
            span 投注时间：
            span#delCreateTime {{items.createTime}}
          p
            span 投注总金额：
            span#delAmounts ￥{{items.amount}}
          p
            span 方案编号：
            span#number {{items.id}}
        .detailNumBox
          span 投注内容：
          .detailNumTextArea
            #delContent(style='word-break: break-all;') {{items.content}}
      .detailBody
        table.detailTable
          tbody
            tr.listHeader
              th(width='120') 玩法
              th(width='50') 注数
              th(width='50') 倍数
              th(width='100') 投注金额
              th(width='50') 模式
              th(width='180') 开奖号码
              th(width='50') 备注
              th(width='120') 奖金
            tr#betRecond.listDetail
              td
                span#delPlayName {{items.playName}}
              td
                span#delBetCount {{items.betCount}}
              td
                span#delPrice {{items.price}}
              td
                span#delAmount.fontColorTheme ￥{{items.amount}}
              td
                span#delUnit 元
              td
                span#delOpenNum {{items.openNum}}
              td
                span#delBonusType 高奖
              td
                span#delWin.fontColorTheme {{items.statusName == '已中奖' ? "￥"+items.win : items.statusName}}
      .dialogBtn
        button.btn.closeBtn(@click='showpop') 关闭
        button.btn.repealOrder(v-if='items.seasonId === $store.state.seasonId', @click='cancel(items.id,items.lotteryId)') 撤单
        button.btn.againBtn(@click='betGos(items)') 再次投注
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {};
  },
  props: {
    items: Object
  },
  mounted() {},
  methods: {
    //关闭弹窗
    showpop() {
      this.$parent.showbetPop();
    },
    //撤单
    cancel(a, b) {
      let formData = new FormData();
      formData.append("lotteryId", b);
      formData.append("ids", a);
      this.$axios
        .post(
          baseUrl + "/api/lottery/cancel",
          formData,
          this.$store.state.config
        )
        .then(res => {
          this.$pop.show({
            title: "温馨提示",
            content: res.data.data,
            content1: "",
            content2: "",
            number: 1
          });
          this.$parent.showbetPop(); //关闭弹窗
          this.$parent.getbetOrderList(); //我的投注
        })
        .catch(error => {
          console.log(error);
          console.log("撤單ERROR");
        });
    },
    //再次投注
    betGos(k) {
      let formData = new FormData();
      formData.append("order[0].content", k.content);
      formData.append("order[0].betCount", k.betCount);
      formData.append("order[0].price", k.price);
      formData.append("order[0].unit", 1);
      formData.append("order[0].playId", k.playerId);
      formData.append("count", k.betCount);
      formData.append("traceOrders[0].price", k.amount);
      formData.append("traceOrders[0].seasonId", this.$store.state.seasonId);
      formData.append("bounsType", 0);
      formData.append("traceWinStop", 0);
      formData.append("isTrace", 0);
      formData.append("lotteryId", k.lotteryId);
      formData.append("amount", k.betCount * k.price);
      this.$axios
        .post(baseUrl + "/api/lottery/bet", formData, this.$store.state.config)
        .then(res => {
          if (res.data.message === "success") {
            this.$parent.showbetPop(); //关闭弹窗
            this.$parent.getbetOrderList(); //我的投注
            this.$pop.show({
              title: "温馨提示",
              content: "恭喜您，投注成功！",
              content1: "",
              content2: "",
              number: 1
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$pop.show({
            title: "温馨提示",
            content: "投注失败,请检查您的网络！",
            content1: "",
            content2: "",
            number: 1
          });
        });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/lottlist.scss";
</style>
