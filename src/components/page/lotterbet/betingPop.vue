<template>
  <div class="betingbox">
    <div class="betingPop">
      <p class="title">
        <span>详情</span>
        <i class="iconfont icon-cuo transition" @click="showpop"></i>
      </p>
      <div class="layui-layer-content">
        <div class="detailHeaderBox">
          <h3 class="detailHeaderTitle">{{items.lotteryName}}</h3>
          <div class="headerDetail">
            <p>
              <span>期号：</span>
              <span id="delSeasonId">{{items.seasonId}}</span>
            </p>
            <p>
              <span>投注时间：</span>
              <span id="delCreateTime">{{items.createTime}}</span>
            </p>
            <p>
              <span>投注总金额：</span>
              <span id="delAmounts">￥{{items.amount}}</span>
            </p>
            <p>
              <span>方案编号：</span>
              <span id="number">{{items.id}}</span>
            </p>
          </div>
          <div class="detailNumBox">
            <span>投注内容：</span>
            <div class="detailNumTextArea">
              <div id="delContent" style="word-break: break-all;">{{items.content}}</div>
            </div>
          </div>
        </div>
        <div class="detailBody">
          <table class="detailTable">
            <tbody>
              <tr class="listHeader">
                <th width="120">玩法</th>
                <th width="50">注数</th>
                <th width="50">倍数</th>
                <th width="100">投注金额</th>
                <th width="50">模式</th>
                <th width="180">开奖号码</th>
                <th width="50">备注</th>
                <th width="120">奖金</th>
              </tr>
              <tr class="listDetail" id="betRecond">
                <td>
                  <span id="delPlayName">{{items.playName}}</span>
                </td>
                <td>
                  <span id="delBetCount">{{items.betCount}}</span>
                </td>
                <td>
                  <span id="delPrice">{{items.price}}</span>
                </td>
                <td>
                  <span class="fontColorTheme" id="delAmount">￥{{items.amount}}</span>
                </td>
                <td>
                  <span id="delUnit">元</span>
                </td>
                <td>
                  <span id="delOpenNum">{{items.openNum}}</span>
                </td>
                <td>
                  <span id="delBonusType">高奖</span>
                </td>
                <td>
                  <span class="fontColorTheme" id="delWin">{{items.statusName == '已中奖' ? "￥"+items.win : items.statusName}}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="dialogBtn">
          <button class="btn closeBtn" @click="showpop">关闭</button>
          <button class="btn repealOrder" v-if="items.seasonId === $store.state.seasonId" @click="cancel(items.id,items.lotteryId)">撤单</button>
          <button class="btn againBtn" @click="betGos">再次投注</button>
        </div>
      </div>
    </div>
  </div>
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
      console.log(this.items);
    },
    //撤单
    cancel(a,b) {
      let formData = new FormData();
      formData.append("lotteryId", b);
      formData.append("ids", a);
      this.$axios
        .post(baseUrl + "/api/lottery/cancel", formData, this.$store.state.config)
        .then(res => {
          this.$pop.show({title: "温馨提示",content: res.data.data,content1: "",content2: "",number: 1});
          this.$parent.showbetPop();//关闭弹窗
          this.$parent.getbetOrderList(); //我的投注
        })
        .catch(error => {
          console.log(error);
          console.log("撤單ERROR");
        });
    },
    //再次投注
    betGos(){

    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/lottlist.scss";
</style>
