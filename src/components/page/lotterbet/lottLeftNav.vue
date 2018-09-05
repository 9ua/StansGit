<template>
  <!-- 我的投注 -->
  <div>
    <div class="lott-left-nav">
      <button @click="lottnavleft">
        <span>
          <i class="el-icon-caret-left"></i>
        </span>
      </button>
      <div class="lott-left-navBox" ref="lottnavbox">
        <ul ref="lottnavUl" :style="{transform: 'translateX(' + left + 'px)'}">
          <li ref="lottnavLi" :class="{'active':index === lottNameIndex}" v-for="(item,index) in lotteryList" :key="index" @click="lottListNav(item,index)">{{item.name}}</li>
        </ul>
      </div>
      <button @click="lottnavright">
        <span>
          <i class="el-icon-caret-right"></i>
        </span>
      </button>
    </div>
  </div>
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      num: 0,
      left: 0,
      sum: 0,
      navTo: 0,
      playNum: 0,
      current_player: {}, //當前玩法
      current_player_bonus: {}, //當前玩法
      className: "k3_star1", //玩法ID
      lotteryList: null,
      arrLottId: [],
      arrLottName: [],
      lottNameIndex: 0
    };
  },
  mounted() {
    this.lotteryAll();
  },
  methods: {
    // 获取彩种
    lotteryAll() {
      if (
        localStorage.getItem("lotteryAll_" + this.$route.params.id) !== null
      ) {
        this.lotteryList = JSON.parse(
          localStorage.getItem("lotteryAll_" + this.$route.params.id)
        );
        this.lotteryList.map(k => {
          this.arrLottId.push(k.id);
          this.arrLottName.push(k.name);
        });
        this.lottNameIndex = this.arrLottId.indexOf(this.$route.params.group);
        this.lottName = this.arrLottName[this.lottNameIndex];
        this.$store.commit("LOTT_NAME", this.lottName);
        if (this.lottNameIndex > 5) {
          this.left = -200;
        }
      } else {
        this.$axios
          .get(baseUrl + "/api/lottery/getLotteryList", {
            params: { type: this.$route.params.id }
          })
          .then(res => {
            localStorage.setItem(
              "lotteryAll_" + this.$route.params.id,
              JSON.stringify(res.data.data)
            );
            this.lotteryList = JSON.parse(
              localStorage.getItem("lotteryAll_" + this.$route.params.id)
            );
            this.lotteryList.map(k => {
              this.arrLottId.push(k.id);
              this.arrLottName.push(k.name);
            });
            this.lottNameIndex = this.arrLottId.indexOf(
              this.$route.params.group
            );
            this.lottName = this.arrLottName[this.lottNameIndex];
            this.$store.commit("LOTT_NAME", this.lottName);
            if (this.lottNameIndex > 5) {
              this.left = -200;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    //导航点击
    lottListNav(item, index) {
      this.lottName = this.arrLottName[this.arrLottName.indexOf(item.name)];
      this.lottNameIndex = index;
      this.$store.state.lottName = this.lottName;
      this.$emit("exit");
      this.$router.push("/bet/" + this.$route.params.id + "/" + item.id);
      this.$parent.getPlayTree(); //玩法术
      this.$emit("geteServerTime"); //获取彩種當前獎期時間
    },
    //导航右边点击
    lottnavright() {
      let box = this.$refs.lottnavbox.offsetWidth;
      let ul = this.$refs.lottnavUl.offsetWidth;
      let li = this.$refs.lottnavLi[0].offsetWidth;
      if (this.num * li + box < ul) {
        this.num++;
        if (ul > box) {
          this.left = -(this.num * li);
        }
      } else if (this.num * li + box > ul) {
        this.num = this.num;
        this.$pop.show({
          title: "温馨提示",
          content: "已经到底啦",
          content1: "",
          content2: "",
          number: 2
        });
      }
    },
    //导航左边点击
    lottnavleft() {
      let box = this.$refs.lottnavbox.offsetWidth;
      let ul = this.$refs.lottnavUl.offsetWidth;
      let li = this.$refs.lottnavLi[0].offsetWidth;
      if (this.left < 0) {
        this.num = parseInt(this.left / 100 * -1);
      }
      if (this.num > 0) {
        this.num--;
        if (ul > box) {
          this.left = -(this.num * li);
        }
      } else {
        this.$pop.show({
          title: "温馨提示",
          content: "已经到顶啦",
          content1: "",
          content2: "",
          number: 2
        });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/lottlist.scss";
</style>
