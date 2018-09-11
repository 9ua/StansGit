<template>
  <!-- 选号模块PK10 -->
  <div>
    <div v-if="showhaa"></div>
    <div v-else class="getPlayTree">
      <ul>
        <li :class="{'active': index === navTo}" v-for="(item,index) in playGroups" :key="index" @click="playGroupBut(item,index)">{{item.title}}</li>
      </ul>
    </div>
    <div class="getPlayTreeBox">
      <ul>
        <li v-for="(item,indexs) in sgroups2" :key="indexs" v-if="indexs === navTo">
          <p :class="{'active': indexff === playNum}" v-for="(play,indexff) in item.players" :key="indexff" @click="playersBut(play,indexff)">{{play.title}}</p>
        </li>
      </ul>
    </div>
    <div class="conterButBox">
      <div class="conterButTitle">
        <i class="el-icon-info"></i>{{current_player_bonus.remark}}。单注最高奖金
        <i v-show='Number(current_player_bonus.displayBonus)'>{{current_player_bonus.displayBonus | keepTwoNum}}</i>
        <i v-show='isNaN(current_player_bonus.displayBonus)'>{{displayBonus1 | keepTwoNum}}—{{displayBonus2 | keepTwoNum}}</i>倍</div>
      <div class="conterBut" :class="'conterBut'+className">
        <div class="conterButDiv" :class="className+'Box'" v-for='(numViews, indexf) in current_player_bonus.numView' :key='indexf'>
          <div class="both">
            <span class="carTitle" :class="{'active': numViews.title === ''}">{{numViews.title}}</span>
            <div class="carBox">
              <div class="cars">
                <p class="car" :class="[item.choose ? 'active' : '',className]" v-for="(item,indexha) in numViews.nums" :key="indexha" @click="curBalls(item,indexha,numViews,indexf)">
                  <i>{{item.ball}}</i>
                  <b></b>
                </p>
              </div>
              <div class="changes" v-if="className !== 'pk10_side_lh' && className !== 'pk10_side_gy_and' && className !== 'pk10_side_ds'">
                <span v-for="(tools,indexto) in ballTools" :key="indexto" @click="toolsCur(tools,indexto,numViews,indexf)">{{tools.name}}</span>
              </div>
            </div>
            <!-- <tool class="changes" :item="numViews"  v-if="className !== 'pk10_side_lh' && className !== 'pk10_side_gy_and' && className !== 'pk10_side_ds'"></tool> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      showhaa: true,
      navTo: 0,
      playNum: 0,
      className: "pk10_side_lh", //玩法ID
      lotteryId: "ffpk10", //彩种id
      lottNameIndex: 3, //默认彩种
      bonusArray: [], //和值赔率
      current_player: {}, //當前玩法
      current_player_bonus: {}, //當前玩法
      an: "",
      bn: "",
      cn: "",
      dn: "",
      en: "",
      fn: "",
      gn: "",
      hn: "",
      in: "",
      jn: "",
      con: "",
      addTitle: "龙虎",
      d: [], //选中的号码的下标
      ka: [], //选中的号码的下标
      kb: [], //选中的号码的下标
      kc: [], //选中的号码的下标
      kd: [], //选中的号码的下标
      ke: [], //选中的号码的下标
      kf: [], //选中的号码的下标
      kg: [], //选中的号码的下标
      kh: [], //选中的号码的下标
      ki: [], //选中的号码的下标
      kj: [], //选中的号码的下标
      zhu1: 0,
      zhu2: 0,
      zhu3: 0,
      zhu4: 0,
      zhu5: 0,
      zhu6: 0,
      zhu7: 0,
      zhu8: 0,
      zhu9: 0,
      zhu10: 0,
      item: {},
      indexha: 0,
      ballTools: [
        { fncode: "full", name: "全", choose: false },
        { fncode: "big", name: "大", choose: false },
        { fncode: "small", name: "小", choose: false },
        { fncode: "single", name: "单", choose: false },
        { fncode: "double", name: "双", choose: false },
        { fncode: "empty", name: "清", choose: false }
      ],
      displayBonus: 0,
      displayBonus1: 0,
      displayBonus2: 0,
      displayBonus3: ""
    };
  },
  beforeDestroy() {
    this.iscreat();
  },
  computed: {
    playGroups() {
      return JSON.parse(
        localStorage.getItem("getPlayTree_playGroups_" + this.$route.params.id)
      );
      // return this.$store.state.current_player_groups;
    },
    sgroups2() {
      // return JSON.parse(localStorage.getItem("SGROUPS2_"+this.$route.params.id));
      return this.$store.state.sgroups2;
    }
  },
  mounted() {
    this.isShowPlayGroups();
  },
  methods: {
    //判断玩法术是否已经成功
    isShowPlayGroups() {
      this.showhaa = false;
      this.current_player_bonus = JSON.parse(
        localStorage.getItem("getPlayTree_playGroups_pk10")
      )[0].groups[0].players[0];
      this.$store.state.className = this.current_player_bonus.id;
      this.className = this.current_player_bonus.id;
    },
    // 中间->投注选号
    curBalls(item, index, list, indexf) {
      if (list.chooseOne) {
        list.balls.map(b => {
          b.choose = false;
        });
      }
      item.choose = !item.choose;
      if (item.choose === true) {
        this.d[index] = item.ball;
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.con = this.dd.join(",");
        this.$store.state.zhu++;
        this.$store.state.pd.addTitle = this.addTitle;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.pd.addPattern = "元";
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.pd.addMoney = this.$store.state.spinner3;
        this.$store.state.pd.addClassName = this.className;
        this.$store.state.pd.addSeasonId = this.$store.state.seasonId;
        this.$store.state.pd.addName = this.$store.state.lottName;
        this.pk10_boxjia(item, index, list, indexf);
      } else {
        this.d.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu--;
        this.$store.state.pd.addCon = this.dd.join(",");
        this.pk10_boxjian(item, index, list, indexf);
      }
    },
    // ++++
    pk10_boxjia(num, indexg, list, indexff) {
      //两面盘，龙虎
      if (this.className === "pk10_side_lh") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = "[1V10]" + this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = "[2V9]" + this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = "[3V8]" + this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = "[4V7]" + this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = "[5V6]" + this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.pd.addCon =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
      }
      //两面盘，大小
      if (this.className === "pk10_side_ds") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (indexff === 5) {
          this.kf[indexg] = num.ball;
          this.dd = this.kf.filter(function(n) {
            return n;
          });
          this.fn = this.dd.join("");
        }
        if (indexff === 6) {
          this.kg[indexg] = num.ball;
          this.dd = this.kg.filter(function(n) {
            return n;
          });
          this.gn = this.dd.join("");
        }
        if (indexff === 7) {
          this.kh[indexg] = num.ball;
          this.dd = this.kh.filter(function(n) {
            return n;
          });
          this.hn = this.dd.join("");
        }
        if (indexff === 8) {
          this.ki[indexg] = num.ball;
          this.dd = this.ki.filter(function(n) {
            return n;
          });
          this.in = this.dd.join("");
        }
        if (indexff === 9) {
          this.kj[indexg] = num.ball;
          this.dd = this.kj.filter(function(n) {
            return n;
          });
          this.jn = this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        if (this.fn === "") {
          this.fn = "-";
        }
        if (this.gn === "") {
          this.gn = "-";
        }
        if (this.hn === "") {
          this.hn = "-";
        }
        if (this.in === "") {
          this.in = "-";
        }
        if (this.jn === "") {
          this.jn = "-";
        }
        this.$store.state.pd.addCon =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en +
          "," +
          this.fn +
          "," +
          this.gn +
          "," +
          this.hn +
          "," +
          this.in +
          "," +
          this.jn;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en +
          "," +
          this.fn +
          "," +
          this.gn +
          "," +
          this.hn +
          "," +
          this.in +
          "," +
          this.jn;
      }
      //定位胆，前五
      if (this.className === "pk10_star1_dwd") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
          this.zhu1++;
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
          this.zhu2++;
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
          this.zhu3++;
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
          this.zhu4++;
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
          this.zhu5++;
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.zhu =
          this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.pd.addCon = this.$store.state.con;
      }
      //定位胆，后五
      if (this.className === "pk10_star1_dwd_last") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
          this.zhu1++;
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
          this.zhu2++;
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
          this.zhu3++;
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
          this.zhu4++;
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
          this.zhu5++;
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.zhu =
          this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.pd.addCon = this.$store.state.con;
      }
      //前二，冠亚和
      if (this.className === "pk10_star2_and") {
        this.d[indexg] = num.ball;
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.qianergyh(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前二、前三、前四、前五，复式
      if (
        this.className === "pk10_star2" ||
        this.className === "pk10_star3" ||
        this.className === "pk10_star4" ||
        this.className === "pk10_star5"
      ) {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.className === "pk10_star2") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5") {
          this.$store.state.pd.addCon =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //猜前二、猜前三、猜前四、猜前五
      if (
        this.className === "pk10_star2_dj" ||
        this.className === "pk10_star3_dj" ||
        this.className === "pk10_star4_dj" ||
        this.className === "pk10_star5_dj"
      ) {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.className === "pk10_star2_dj") {
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3_dj") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4_dj") {
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5_dj") {
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
    },
    // ----
    pk10_boxjian(num, indexg, list, indexff) {
      //两面盘，龙虎
      if (this.className === "pk10_side_lh") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = "[1V10]" + this.dd.join("");
          if (this.an == "" || this.an == "-" || this.an == "[1V10]") {
            this.an = this.dd.join("");
          }
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = "[2V9]" + this.dd.join("");
          if (this.bn == "" || this.bn == "-" || this.bn == "[2V9]") {
            this.bn = this.dd.join("");
          }
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = "[3V8]" + this.dd.join("");
          if (this.cn == "" || this.cn == "-" || this.cn == "[3V8]") {
            this.cn = this.dd.join("");
          }
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = "[4V7]" + this.dd.join("");
          if (this.dn == "" || this.dn == "-" || this.dn == "[4V7]") {
            this.dn = this.dd.join("");
          }
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = "[5V6]" + this.dd.join("");
          if (this.en == "" || this.en == "-" || this.en == "[5V6]") {
            this.en = this.dd.join("");
          }
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.pd.addCon =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
      }
      //两面盘，大小
      if (this.className === "pk10_side_ds") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (indexff === 5) {
          this.kf.splice(indexg, 1, "");
          this.dd = this.kf.filter(function(n) {
            return n;
          });
          this.fn = this.dd.join("");
        }
        if (indexff === 6) {
          this.kg.splice(indexg, 1, "");
          this.dd = this.kg.filter(function(n) {
            return n;
          });
          this.gn = this.dd.join("");
        }
        if (indexff === 7) {
          this.kh.splice(indexg, 1, "");
          this.dd = this.kh.filter(function(n) {
            return n;
          });
          this.hn = this.dd.join("");
        }
        if (indexff === 8) {
          this.ki.splice(indexg, 1, "");
          this.dd = this.ki.filter(function(n) {
            return n;
          });
          this.in = this.dd.join("");
        }
        if (indexff === 9) {
          this.kj.splice(indexg, 1, "");
          this.dd = this.kj.filter(function(n) {
            return n;
          });
          this.jn = this.dd.join("");
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        if (this.fn === "") {
          this.fn = "-";
        }
        if (this.gn === "") {
          this.gn = "-";
        }
        if (this.hn === "") {
          this.hn = "-";
        }
        if (this.in === "") {
          this.in = "-";
        }
        if (this.jn === "") {
          this.jn = "-";
        }
        this.$store.state.pd.addCon =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en +
          "," +
          this.fn +
          "," +
          this.gn +
          "," +
          this.hn +
          "," +
          this.in +
          "," +
          this.jn;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en +
          "," +
          this.fn +
          "," +
          this.gn +
          "," +
          this.hn +
          "," +
          this.in +
          "," +
          this.jn;
      }
      //定位胆，前五
      if (this.className === "pk10_star1_dwd") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
          this.zhu1--;
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
          this.zhu2--;
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
          this.zhu3--;
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
          this.zhu4--;
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
          this.zhu5--;
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.zhu =
          this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.pd.addCon =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
      }
      //定位胆，后五
      if (this.className === "pk10_star1_dwd_last") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
          this.zhu1--;
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
          this.zhu2--;
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
          this.zhu3--;
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
          this.zhu4--;
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
          this.zhu5--;
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.zhu =
          this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.pd.addCon =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
      }
      //前二，冠亚和
      if (this.className === "pk10_star2_and") {
        this.d.splice(indexg, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.qianergyh(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前二，复式
      if (
        this.className === "pk10_star2" ||
        this.className === "pk10_star3" ||
        this.className === "pk10_star4" ||
        this.className === "pk10_star5"
      ) {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.className === "pk10_star2") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5") {
          this.$store.state.pd.addCon =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //猜前二、猜前三、猜前四、猜前五
      if (
        this.className === "pk10_star2_dj" ||
        this.className === "pk10_star3_dj" ||
        this.className === "pk10_star4_dj" ||
        this.className === "pk10_star5_dj"
      ) {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("");
        }
        if (this.className === "pk10_star2_dj") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3_dj") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4_dj") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5_dj") {
          this.$store.state.pd.addCon =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
    },
    //菜单选择项1
    playGroupBut(item, index) {
      // this.$emit("clearTimeInters");//清除定时器
      this.navTo = index;
      this.playNum = 0;
      this.current_player = item;
      this.current_player_bonus = item.groups[0].players[0];
      this.className = this.current_player_bonus.id;
      this.$store.state.className = this.current_player_bonus.id;
      this.iscreat();
      switch (item.title) {
        case "两面盘":
          this.addTitle = "龙虎";
          break;
        case "定位胆":
          this.addTitle = "前五定位胆";
          break;
        case "前二":
          this.addTitle = "冠亚和";
          break;
        case "前三":
          this.addTitle = "前三复式";
          break;
        case "前四":
          this.addTitle = "前四复式";
          break;
        case "前五":
          this.addTitle = "前五复式";
          break;
      }
    },
    //菜单选择项2
    playersBut(play, indexff) {
      this.playNum = indexff;
      this.current_player_bonus = play;
      this.className = play.id;
      this.$store.state.className = play.id;
      this.addTitle = play.title;
      this.displayBonus = play.displayBonus;
      if (isNaN(this.displayBonus)) {
        let ar = [];
        ar = this.displayBonus.split("-");
        this.displayBonus1 = Number(ar[0]);
        this.displayBonus2 = Number(ar[1]);
        this.displayBonus3 = this.displayBonus1 + "-" + this.displayBonus2;
      }
      this.iscreat();
    },
    //清空
    iscreat() {
      this.$store.state.zhu = 0;
      this.$store.state.pd = {};
      // this.$store.state.spinner3 = 0;
      this.$store.state.con = "";
      this.d = [];
      this.dd = [];
      this.ka = [];
      this.kb = [];
      this.kc = [];
      this.kd = [];
      this.ke = [];
      this.kf = [];
      this.kg = [];
      this.kh = [];
      this.ki = [];
      this.kj = [];
      this.an = "";
      this.bn = "";
      this.cn = "";
      this.dn = "";
      this.en = "";
      this.fn = "";
      this.gn = "";
      this.hn = "";
      this.in = "";
      this.jn = "";
      this.zhu1 = 0;
      this.zhu2 = 0;
      this.zhu3 = 0;
      this.zhu4 = 0;
      this.zhu5 = 0;
      this.zhu6 = 0;
      this.zhu7 = 0;
      this.zhu8 = 0;
      this.zhu9 = 0;
      this.zhu10 = 0;
      for (let h = 0; h < this.current_player_bonus.numView.length; h++) {
        for (
          let k = 0;
          k < this.current_player_bonus.numView[h].nums.length;
          k++
        ) {
          this.current_player_bonus.numView[h].nums[k].choose = false;
        }
      }
      // for (let h = 0; h < this.snumView.length; h++) {
      //   if (null != this.snumView[h]) {
      //     for (let j = 0; j < this.snumView[h].length; j++) {
      //       for (let k = 0; k < this.snumView[h][j].nums.length; k++) {
      //         this.snumView[h][j].nums[k].choose = false;
      //       }
      //     }
      //   }
      // }
    },
    //前二-冠亚和
    qianergyh(bets) {
      let betCount = [2, 2, 4, 4, 6, 6, 8, 8, 10, 8, 8, 6, 6, 4, 4, 2, 2];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        let a = bets[i];
        count += betCount[a - 3];
      }
      return count;
    },
    //公用
    toListByLength(str, len) {
      let line = [];
      if (str !== "-" || str !== "") {
        for (let i = 0; i < str.length; i += len) {
          line.push(str.substring(i, i + len));
        }
      }
      return line;
    },
    getCountall(lines) {
      return this.getCountCached(lines, 0, lines.length, new Set());
    },
    getCountCached(lines, index, allSize, cache) {
      let line = lines[index];
      let size = line.length;
      let count = 0;
      for (let i = 0; i < size; i++) {
        let n = line[i];
        if (!cache.has(n)) {
          if (index + 1 < allSize) {
            cache.add(n);
            count += this.getCountCached(lines, index + 1, allSize, cache);
            cache.delete(n);
          } else {
            count++;
          }
        }
      }
      return count;
    },
    //复式
    fushi(bets, zhu) {
      if (bets.length != zhu) {
        return 0;
      }
      let all = [];
      for (let i = 0; i < bets.length; i++) {
        let n = this.toListByLength(bets[i], 2);
        all.push(n);
      }
      let count = this.getCountall(all);
      return count;
    },
    //全 ++++
    iszhu1({ ball }, item, indexf) {
      //前五定位胆,后五定位胆
      if (
        this.className === "pk10_star1_dwd" ||
        this.className === "pk10_star1_dwd_last"
      ) {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join("");
          });
          this.zhu1 = 10;
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            list.choose = true;
            this.kb[i] = list.ball;
            this.dd = this.kb.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join("");
          });
          this.zhu2 = 10;
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            list.choose = true;
            this.kc[i] = list.ball;
            this.dd = this.kc.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join("");
          });
          this.zhu3 = 10;
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            list.choose = true;
            this.kd[i] = list.ball;
            this.dd = this.kd.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join("");
          });
          this.zhu4 = 10;
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            list.choose = true;
            this.ke[i] = list.ball;
            this.dd = this.ke.filter(function(n) {
              return n;
            });
            this.en = this.dd.join("");
          });
          this.zhu5 = 10;
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.zhu =
          this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.pd.addCon = this.$store.state.con;
      }
      //前二、前三、前四、前五，复式
      if (
        this.className === "pk10_star2" ||
        this.className === "pk10_star3" ||
        this.className === "pk10_star4" ||
        this.className === "pk10_star5"
      ) {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join("");
          });
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            list.choose = true;
            this.kb[i] = list.ball;
            this.dd = this.kb.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join("");
          });
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            list.choose = true;
            this.kc[i] = list.ball;
            this.dd = this.kc.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join("");
          });
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            list.choose = true;
            this.kd[i] = list.ball;
            this.dd = this.kd.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join("");
          });
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            list.choose = true;
            this.ke[i] = list.ball;
            this.dd = this.ke.filter(function(n) {
              return n;
            });
            this.en = this.dd.join("");
          });
        }
        if (this.className === "pk10_star2") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5") {
          this.$store.state.pd.addCon =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二冠亚和
      if (this.className === "pk10_star2_and") {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          });
        }
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.qianergyh(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //猜前二、猜前三、猜前四、猜前五
      if (
        this.className === "pk10_star2_dj" ||
        this.className === "pk10_star3_dj" ||
        this.className === "pk10_star4_dj" ||
        this.className === "pk10_star5_dj"
      ) {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join("");
          });
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            list.choose = true;
            this.kb[i] = list.ball;
            this.dd = this.kb.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join("");
          });
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            list.choose = true;
            this.kc[i] = list.ball;
            this.dd = this.kc.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join("");
          });
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            list.choose = true;
            this.kd[i] = list.ball;
            this.dd = this.kd.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join("");
          });
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            list.choose = true;
            this.ke[i] = list.ball;
            this.dd = this.ke.filter(function(n) {
              return n;
            });
            this.en = this.dd.join("");
          });
        }
        if (this.className === "pk10_star2_dj") {
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3_dj") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4_dj") {
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5_dj") {
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
    },
    //大 ++++
    iszhu2({ ball }, item, indexf) {
      //前五定位胆,后五定位胆
      if (
        this.className === "pk10_star1_dwd" ||
        this.className === "pk10_star1_dwd_last"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
          this.zhu3 = 5;
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
          this.zhu4 = 5;
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
          this.zhu5 = 5;
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.zhu =
          this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.pd.addCon = this.$store.state.con;
      }
      //前二、前三、前四、前五，复式
      if (
        this.className === "pk10_star2" ||
        this.className === "pk10_star3" ||
        this.className === "pk10_star4" ||
        this.className === "pk10_star5"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
        }
        if (this.className === "pk10_star2") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5") {
          this.$store.state.pd.addCon =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二冠亚和
      if (this.className === "pk10_star2_and") {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join(",");
            }
          });
        }
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.qianergyh(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //猜前二、猜前三、猜前四、猜前五
      if (
        this.className === "pk10_star2_dj" ||
        this.className === "pk10_star3_dj" ||
        this.className === "pk10_star4_dj" ||
        this.className === "pk10_star5_dj"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (i >= len) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
        }
        if (this.className === "pk10_star2_dj") {
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3_dj") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4_dj") {
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5_dj") {
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
    },
    //小 ++++
    iszhu3({ ball }, item, indexf) {
      //前五定位胆,后五定位胆
      if (
        this.className === "pk10_star1_dwd" ||
        this.className === "pk10_star1_dwd_last"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
          this.zhu3 = 5;
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
          this.zhu4 = 5;
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
          this.zhu5 = 5;
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.zhu =
          this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.pd.addCon = this.$store.state.con;
      }
      //前二、前三、前四、前五，复式
      if (
        this.className === "pk10_star2" ||
        this.className === "pk10_star3" ||
        this.className === "pk10_star4" ||
        this.className === "pk10_star5"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
          this.zhu3 = 5;
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
          this.zhu4 = 5;
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
          this.zhu5 = 5;
        }
        if (this.className === "pk10_star2") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5") {
          this.$store.state.pd.addCon =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二冠亚和
      if (this.className === "pk10_star2_and") {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join(",");
            }
          });
        }
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.qianergyh(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //猜前二、猜前三、猜前四、猜前五
      if (
        this.className === "pk10_star2_dj" ||
        this.className === "pk10_star3_dj" ||
        this.className === "pk10_star4_dj" ||
        this.className === "pk10_star5_dj"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (i < len) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
        }
        if (this.className === "pk10_star2_dj") {
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3_dj") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4_dj") {
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5_dj") {
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
    },
    //单 ++++
    iszhu4({ ball }, item, indexf) {
      //前五定位胆,后五定位胆
      if (
        this.className === "pk10_star1_dwd" ||
        this.className === "pk10_star1_dwd_last"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
          this.zhu3 = 5;
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
          this.zhu4 = 5;
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
          this.zhu5 = 5;
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.zhu =
          this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.pd.addCon = this.$store.state.con;
      }
      //前二、前三、前四、前五，复式
      if (
        this.className === "pk10_star2" ||
        this.className === "pk10_star3" ||
        this.className === "pk10_star4" ||
        this.className === "pk10_star5"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
          this.zhu3 = 5;
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
          this.zhu4 = 5;
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
          this.zhu5 = 5;
        }
        if (this.className === "pk10_star2") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5") {
          this.$store.state.pd.addCon =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二冠亚和
      if (this.className === "pk10_star2_and") {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join(",");
            }
          });
        }
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.qianergyh(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //猜前二、猜前三、猜前四、猜前五
      if (
        this.className === "pk10_star2_dj" ||
        this.className === "pk10_star3_dj" ||
        this.className === "pk10_star4_dj" ||
        this.className === "pk10_star5_dj"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
        }
        if (this.className === "pk10_star2_dj") {
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3_dj") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4_dj") {
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5_dj") {
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
    },
    //双 ++++
    iszhu5({ ball }, item, indexf) {
      //前五定位胆,后五定位胆
      if (
        this.className === "pk10_star1_dwd" ||
        this.className === "pk10_star1_dwd_last"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
          this.zhu3 = 5;
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
          this.zhu4 = 5;
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
          this.zhu5 = 5;
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.zhu =
          this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.pd.addCon = this.$store.state.con;
      }
      //前二、前三、前四、前五，复式
      if (
        this.className === "pk10_star2" ||
        this.className === "pk10_star3" ||
        this.className === "pk10_star4" ||
        this.className === "pk10_star5"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
          this.zhu3 = 5;
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
          this.zhu4 = 5;
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
          this.zhu5 = 5;
        }
        if (this.className === "pk10_star2") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5") {
          this.$store.state.pd.addCon =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二冠亚和
      if (this.className === "pk10_star2_and") {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join(",");
            }
          });
        }
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.qianergyh(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //猜前二、猜前三、猜前四、猜前五
      if (
        this.className === "pk10_star2_dj" ||
        this.className === "pk10_star3_dj" ||
        this.className === "pk10_star4_dj" ||
        this.className === "pk10_star5_dj"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {
                return n;
              });
              this.an = this.dd.join("");
            }
          });
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join("");
            }
          });
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join("");
            }
          });
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join("");
            }
          });
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {
                return n;
              });
              this.en = this.dd.join("");
            }
          });
        }
        if (this.className === "pk10_star2_dj") {
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3_dj") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4_dj") {
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5_dj") {
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
    },
    //清 ++++
    iszhu6({ ball }, item, indexf) {
      //前五定位胆,后五定位胆
      if (
        this.className === "pk10_star1_dwd" ||
        this.className === "pk10_star1_dwd_last"
      ) {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join("");
          });
          this.zhu1 = 0;
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            list.choose = false;
            this.kb = [];
            this.dd = this.kb.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join("");
          });
          this.zhu2 = 0;
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            list.choose = false;
            this.kc = [];
            this.dd = this.kc.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join("");
          });
          this.zhu3 = 0;
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            list.choose = false;
            this.kd = [];
            this.dd = this.kd.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join("");
          });
          this.zhu4 = 0;
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ke = [];
            this.dd = this.ke.filter(function(n) {
              return n;
            });
            this.en = this.dd.join("");
          });
          this.zhu5 = 0;
        }
        if (this.an === "") {
          this.an = "-";
        }
        if (this.bn === "") {
          this.bn = "-";
        }
        if (this.cn === "") {
          this.cn = "-";
        }
        if (this.dn === "") {
          this.dn = "-";
        }
        if (this.en === "") {
          this.en = "-";
        }
        this.$store.state.zhu =
          this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.con =
          this.an +
          "," +
          this.bn +
          "," +
          this.cn +
          "," +
          this.dn +
          "," +
          this.en;
        this.$store.state.pd.addCon = this.$store.state.con;
      }
      //前二、前三、前四、前五，复式
      if (
        this.className === "pk10_star2" ||
        this.className === "pk10_star3" ||
        this.className === "pk10_star4" ||
        this.className === "pk10_star5"
      ) {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join("");
          });
          this.zhu1 = 0;
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            list.choose = false;
            this.kb = [];
            this.dd = this.kb.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join("");
          });
          this.zhu2 = 0;
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            list.choose = false;
            this.kc = [];
            this.dd = this.kc.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join("");
          });
          this.zhu3 = 0;
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            list.choose = false;
            this.kd = [];
            this.dd = this.kd.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join("");
          });
          this.zhu4 = 0;
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ke = [];
            this.dd = this.ke.filter(function(n) {
              return n;
            });
            this.en = this.dd.join("");
          });
          this.zhu5 = 0;
        }
        if (this.className === "pk10_star2") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5") {
          this.$store.state.pd.addCon =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二冠亚和
      if (this.className === "pk10_star2_and") {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          });
          this.zhu1 = 0;
        }
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.qianergyh(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //猜前二、猜前三、猜前四、猜前五
      if (
        this.className === "pk10_star2_dj" ||
        this.className === "pk10_star3_dj" ||
        this.className === "pk10_star4_dj" ||
        this.className === "pk10_star5_dj"
      ) {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join("");
          });
          this.zhu1 = 0;
        }
        if (indexf === 1) {
          ball.filter((list, i) => {
            list.choose = false;
            this.kb = [];
            this.dd = this.kb.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join("");
          });
          this.zhu2 = 0;
        }
        if (indexf === 2) {
          ball.filter((list, i) => {
            list.choose = false;
            this.kc = [];
            this.dd = this.kc.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join("");
          });
          this.zhu3 = 0;
        }
        if (indexf === 3) {
          ball.filter((list, i) => {
            list.choose = false;
            this.kd = [];
            this.dd = this.kd.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join("");
          });
          this.zhu4 = 0;
        }
        if (indexf === 4) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ke = [];
            this.dd = this.ke.filter(function(n) {
              return n;
            });
            this.en = this.dd.join("");
          });
          this.zhu5 = 0;
        }
        if (this.className === "pk10_star2_dj") {
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star3_dj") {
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star4_dj") {
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
        if (this.className === "pk10_star5_dj") {
          this.$store.state.con =
            this.an +
            "," +
            this.bn +
            "," +
            this.cn +
            "," +
            this.dn +
            "," +
            this.en;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.fushi(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
    },
    aa() {
      this.dd = this.d.filter(function(n) {
        return n;
      });
      this.$store.state.pd.addTitle = this.addTitle;
      this.$store.state.con = this.dd.join(",");
      this.$store.state.pd.addCon = this.$store.state.con;
      this.$store.state.pd.addPattern = "元";
      this.$store.state.pd.addzhu = this.$store.state.zhu;
      this.$store.state.pd.addMoney = this.$store.state.spinner3;
      this.$store.state.pd.addClassName = this.$store.state.className;
      this.$store.state.pd.addSeasonId = this.$store.state.seasonId;
      this.$store.state.pd.addName = this.$store.state.lottName;
    },
    //全大小单双清
    toolsCur(tools, idx, item, indexff) {
      if (Object.is(tools.fncode, "full")) {
        this.full({ ball: item.nums }, item, indexff);
      } else if (Object.is(tools.fncode, "big")) {
        this.big({ ball: item.nums }, item, indexff);
      } else if (Object.is(tools.fncode, "small")) {
        this.small({ ball: item.nums }, item, indexff);
      } else if (Object.is(tools.fncode, "single")) {
        this.single({ ball: item.nums }, item, indexff);
      } else if (Object.is(tools.fncode, "double")) {
        this.double({ ball: item.nums }, item, indexff);
      } else {
        this.empty({ ball: item.nums }, item, indexff);
      }
    },
    //全
    full({ ball }, item, indexf) {
      this.empty({ ball }, item, indexf);
      this.aa();
      this.iszhu1({ ball }, item, indexf);
    },
    //大
    big({ ball }, item, indexf) {
      this.empty({ ball }, item, indexf);
      this.aa();
      this.iszhu2({ ball }, item, indexf);
    },
    //小
    small({ ball }, item, indexf) {
      this.empty({ ball }, item, indexf);
      this.aa();
      this.iszhu3({ ball }, item, indexf);
    },
    //单
    single({ ball }, item, indexf) {
      this.empty({ ball }, item, indexf);
      this.aa();
      this.iszhu4({ ball }, item, indexf);
    },
    //双
    double({ ball }, item, indexf) {
      this.empty({ ball }, item, indexf);
      this.aa();
      this.iszhu5({ ball }, item, indexf);
    },
    //清
    empty({ ball }, item, indexf) {
      this.aa();
      this.iszhu6({ ball }, item, indexf);
    }
  },
  filters: {
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/lotterbet/lottlist.scss";
@import "@/assets/scss/lotterbet/pk10.scss";
</style>
