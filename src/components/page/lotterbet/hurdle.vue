<template lang='jade'>
<!-- 号码篮 -->
div(style='padding:0px 14px;')
  .zhu
    p
      | 您选择了
      i {{$store.state.zhu}}
      |  注
    .butBox
      .numSum
        span.trim 投注金额
        yd-spinner(v-model='$store.state.spinner3', min='0')
      button.add(@click='addNum') 添加号码篮
      button(@click='betGo') 立即投注
  .hurdle
    ul.hurdleTitle
      li 玩法
      li 号码
      li 模式
      li 注数
      li 倍数
      li 金额
      li(@click='exit') 清空
    .addListBox
      ul.addList(ref='addList', v-for='(item,index) in productList', :key='index', v-if='item.addCon !== null')
        li 【{{item.addTitle}}】
        li
          span {{item.addCon}}
        li {{item.addPattern}}
        li {{item.addzhu}}
        li {{item.addMoney}}
        li ￥{{item.addzhu*item.addMoney}}
        li(@click='deleList(item,index)')
          i.el-icon-close
  .affirm
    p
      span 总注数：{{productListAddZhu}}, 
      span 总金额：{{productListAllMoney}}, 
      span 账户余额：{{$store.state.balance}}
    button(@click='affirmBetGo') 确认投注
  firmbet(ref='firmbet', :productlists='productList', :pds='pd', :content='String(this.seasonId)-0')
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import firmbet from "@/components/loading/firmbet.vue";
export default {
  data() {
    return {
      className: this.$store.state.className,
      orderList: null,
      zhu: this.$store.state.zhu,
      productList: [],
      productListAddZhu: 0,
      productListAddMoney: 0,
      productListAllMoney: 0,
      conTemp: "",
      zhuTemp: "",
      betFun: [],
      dxds: ["大", "小", "单", "双"],
      pd: {
        addTitle: "单挑一骰",
        addCon: null,
        addPattern: "元",
        addzhu: null,
        addMoney: null,
        addClassName: null,
        addSeasonId: null,
        addName: "宏發快3"
      }
    };
  },
  computed: {
    seasonId() {
      return this.$store.state.seasonId;
    }
  },
  methods: {
    //我的投注
    getbetOrderList() {
      this.$axios
        .get(
          baseUrl +
            "/api/proxy/getbetOrderList?include=0&status=100&betweenType=3&start=0&limit=4&account=" +
            this.$store.state.Globalusername,
          this.$store.state.config
        )
        .then(res => {
          this.orderList = res.data.data.list;
          this.$store.commit("ORDER_LIST", this.orderList);
        })
        .catch(error => {
          console.log("获取投注记录失败");
        });
    },
    //添加号码栏
    addNum() {
      if (this.$store.state.zhu === 0) {
        this.$pop.show({
          title: "",
          content: "您尚未选定一个完整的投注。",
          content1: "",
          content2: "",
          number: 2
        });
      } else if (this.$store.state.spinner3 === 0) {
        this.$pop.show({
          title: "",
          content: "您有号码未设置金额，请核对后投注。",
          content1: "",
          content2: "",
          number: 2
        });
      } else {
        this.$store.state.pd.addMoney = this.$store.state.spinner3;
        this.productList.unshift(this.$store.state.pd);
        this.$store.state.pd = {};
        this.d = [];
        this.$emit("iscreat");
        this.productListAddZhu = 0;
        this.productListAddMoney = 0;
        this.productListAllMoney = 0;
        for (let i = 0; i < this.productList.length; i++) {
          this.productListAddZhu =
            this.productListAddZhu + this.productList[i].addzhu;
          this.productListAddMoney =
            this.productListAddMoney + this.productList[i].addMoney;
          this.productListAllMoney =
            this.productListAllMoney +
            this.productList[i].addzhu * this.productList[i].addMoney;
        }
      }
    },
    bet(obj) {
      if (this.$route.params.id == "k3") {
        if (
          obj.con.includes("大") ||
          obj.con.includes("小") ||
          obj.con.includes("单") ||
          obj.con.includes("双")
        ) {
          obj.className = "k3_star3_big_odd";
        } else if (this.$store.state.className == "k3_star3_and") {
          obj.className = "k3_star3_and";
        } else {
          obj.className = this.$store.state.className;
        }
      } else {
        obj.className = this.$store.state.className;
      }
      let formData = new FormData();
      formData.append("order[0].content", obj.con);
      formData.append("order[0].betCount", obj.zhu);
      formData.append("order[0].price", this.$store.state.spinner3);
      formData.append("order[0].unit", 1);
      formData.append("order[0].playId", obj.className);
      formData.append("count", obj.zhu);
      formData.append("traceOrders[0].price", this.$store.state.spinner3);
      formData.append("traceOrders[0].seasonId", this.seasonId);
      formData.append("bounsType", 0);
      formData.append("traceWinStop", 0);
      formData.append("isTrace", 0);
      formData.append("lotteryId", this.$route.params.group);
      formData.append("amount", this.$store.state.spinner3 * obj.zhu);
      return this.$axios.post(
        baseUrl + "/api/lottery/bet",
        formData,
        this.$store.state.config
      );
    },
    spli(str) {
      this.betFun.push(this.bet({ con: str, zhu: 1 }));
      let con = this.conTemp.split(",");
      con.splice(con.lastIndexOf(str), 1);
      con = con.join(",");
      this.conTemp = con;
      this.zhuTemp -= 1;
    },
    splik3(arrk3) {
      let n = 0;
      arrk3.map(a => {
        this.dxds.map(b => {
          if (a == b) {
            n++;
            this.$store.state.k3conTemp.push(b);
            arrk3.splice(arrk3.indexOf(b), 1, "");
          }
        });
      });
      arrk3 = arrk3
        .filter(function(n) {
          return n;
        })
        .join(",");
      this.$store.state.k3conTemp
        .filter(function(n) {
          return n;
        })
        .join(",");
      this.$store.state.k3zhuTemp = n;
      this.betFun.push(
        this.bet({
          con: this.$store.state.k3conTemp,
          zhu: this.$store.state.k3zhuTemp
        })
      );
      this.conTemp = arrk3;
      this.zhuTemp -= n;
    },
    //立即投注
    betGo() {
      if (this.$store.state.zhu === 0) {
        this.$pop.show({
          title: "",
          content: "您尚未选定一个完整的投注。",
          content1: "",
          content2: "",
          number: 2
        });
      } else if (this.$store.state.spinner3 === 0) {
        this.$pop.show({
          title: "",
          content: "您有号码未设置金额，请核对后投注。",
          content1: "",
          content2: "",
          number: 2
        });
      } else {
        this.conTemp = this.$store.state.con;
        this.zhuTemp = this.$store.state.zhu;
        if (
          this.$store.state.className !== "k3_star3_and" &&
          this.$store.state.className !== "ssc_dxds"
        ) {
          if (this.$store.state.con.includes("大")) {
            this.spli("大");
          }
          if (this.$store.state.con.includes("小")) {
            this.spli("小");
          }
          if (this.$store.state.con.includes("单")) {
            this.spli("单");
          }
          if (this.$store.state.con.includes("双")) {
            this.spli("双");
          }
        } else if (
          this.$store.state.className === "k3_star3_and" &&
          this.$store.state.className !== "ssc_dxds"
        ) {
          if (
            this.$store.state.con.includes("大") ||
            this.$store.state.con.includes("小") ||
            this.$store.state.con.includes("单") ||
            this.$store.state.con.includes("双")
          ) {
            let arrk3 = this.$store.state.con.split(",");
            this.splik3(arrk3);
          }
        }
        if (
          this.$store.state.con.match(/\d/) ||
          this.$store.state.con.includes("龙") ||
          this.$store.state.con.includes("虎") ||
          this.$store.state.con.includes("和") ||
          this.$store.state.con.includes("大单") ||
          this.$store.state.con.includes("小单") ||
          this.$store.state.con.includes("大双") ||
          this.$store.state.con.includes("小双")
        ) {
          this.betFun.push(this.bet({ con: this.conTemp, zhu: this.zhuTemp }));
        }
        this.$axios.all([...this.betFun]).then(
          this.$axios.spread((...res) => {
            let showFlag = true;
            for (let item of res) {
              if (item.data.message !== "success") {
                showFlag = false;
                break;
              }
            }
            if (showFlag) {
              this.getbetOrderList(); //我的投注
              this.$pop.show({
                title: "温馨提示",
                content: "恭喜您，投注成功！",
                content1: "",
                content2: "",
                number: 1
              });
            }
            this.betFun = [];
            this.$emit("iscreat");
          })
        );
      }
    },
    //清空
    exit() {
      this.productList = [];
      this.pd = {};
      this.productListAddZhu = 0;
      this.productListAllMoney = 0;
    },
    //删除指定行
    deleList(item, index) {
      this.productList.splice(index, 1);
    },
    //确认投注
    affirmBetGo() {
      if (this.productList.length == 0) {
        this.$pop.show({
          title: "温馨提示",
          content: "您未选择号码,号码篮是空的！",
          content1: String(this.seasonId),
          content2: String(Number(this.seasonId) + 1),
          number: 1
        });
      } else {
        this.$refs.firmbet.isshow();
      }
    }
  },
  components: {
    firmbet
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/lottlist.scss";
</style>
