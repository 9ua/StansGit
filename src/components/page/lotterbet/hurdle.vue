<template>
  <!-- 号码篮 -->
  <div style="padding:0px 14px;">
    <div class="zhu">
      <p>您选择了
        <i>{{$store.state.zhu}}</i> 注</p>
      <div class="butBox">
        <div class="numSum">
          <span class="trim">投注金额</span>
          <yd-spinner v-model="$store.state.spinner3" min="0"></yd-spinner>
        </div>
        <button class="add" @click="addNum">添加号码篮</button>
        <button @click="betGo">立即投注</button>
      </div>
    </div>
    <div class="hurdle">
      <ul class="hurdleTitle">
        <li>玩法</li>
        <li>号码</li>
        <li>模式</li>
        <li>注数</li>
        <li>倍数</li>
        <li>金额</li>
        <li @click="exit">清空</li>
      </ul>
      <div class="addListBox">
        <ul class="addList" ref="addList" v-for="(item,index) in productList" :key="index" v-if="item.addCon !== null">
          <li>【{{item.addTitle}}】</li>
          <li>
            <span>{{item.addCon}}</span>
          </li>
          <li>{{item.addPattern}}</li>
          <li>{{item.addzhu}}</li>
          <li>{{item.addMoney}}</li>
          <li>￥{{item.addzhu*item.addMoney}}</li>
          <li @click="deleList(item,index)">
            <i class="el-icon-close"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="affirm">
      <p>
        <span>总注数：{{productListAddZhu}}, </span>
        <span>总金额：{{productListAllMoney}}, </span>
        <span>账户余额：{{$store.state.balance}}</span>
      </p>
      <button @click="affirmBetGo">确认投注</button>
    </div>
    <firmbet ref="firmbet" :productLists="productList" :pds="pd" :content="String(this.seasonId)-1"></firmbet>
  </div>
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import firmbet from "@/components/loading/firmbet.vue";
export default {
  data() {
    return {
      className:'',
      orderList: null,
      zhu: this.$store.state.zhu,
      productList: [],
      productListAddZhu:0,
      productListAddMoney:0,
      productListAllMoney:0,
      pd: {
        addTitle: "单挑一骰",
        addCon: null,
        addPattern: "元",
        addzhu: null,
        addMoney: null,
        addClassName: null,
        addSeasonId: null,
        addName: "宏發快3"
      },
    };
  },
  computed:{
    seasonId(){
      return this.$store.state.seasonId;
    },
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
          this.$store.commit("ORDER_LIST",this.orderList);
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
          this.productListAddZhu = this.productListAddZhu + this.productList[i].addzhu;
          this.productListAddMoney = this.productListAddMoney + this.productList[i].addMoney;
          this.productListAllMoney = this.productListAllMoney + this.productList[i].addzhu * this.productList[i].addMoney;
        }
      }
    },
    //立即投注
    betGo() {
      if(this.$route.params.id === 'k3'){
        this.className = "k3_star3_and";
      }else if(this.$route.params.id === 'ssc'){
        this.className = "ssc_star5";
      }else if(this.$route.params.id === 'pk10'){
        this.className = "pk10_side_lh";
      }else if(this.$route.params.id === 'x11x5'){
        this.className = "n11x5_x1";
      }
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
        let formData = new FormData();
        formData.append("order[0].content", this.$store.state.con);
        formData.append("order[0].betCount", this.$store.state.zhu);
        formData.append("order[0].price", this.$store.state.spinner3);
        formData.append("order[0].unit", 1);
        formData.append("order[0].playId", this.className);
        formData.append("count", this.$store.state.zhu);
        formData.append("traceOrders[0].price", this.$store.state.spinner3);
        formData.append("traceOrders[0].seasonId", this.seasonId);
        formData.append("bounsType", 0);
        formData.append("traceWinStop", 0);
        formData.append("isTrace", 0);
        formData.append("lotteryId", this.$route.params.group);
        formData.append("amount", this.$store.state.spinner3 * this.$store.state.zhu);
        this.$axios
          .post(
            baseUrl + "/api/lottery/bet",
            formData,
            this.$store.state.config
          )
          .then(res => {
            if (res.data.message === "success") {
              this.getbetOrderList(); //我的投注
              this.$emit("iscreat");
              this.$pop.show({
                title: "温馨提示",
                content: "恭喜您，投注成功！",
                content1: "",
                content2: "",
                number: 1
              });
            } else {
              this.$emit("iscreat");
              this.$pop.show({title: "温馨提示",content: res.data.data,content1: "",content2: "",number: 1});
            }
          })
          .catch(error => {
            console.log("立即投注,No");
          });
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
  components:{
    firmbet
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/lottlist.scss";
</style>
