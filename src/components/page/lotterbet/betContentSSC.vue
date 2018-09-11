<template>
  <!-- 选号模块SSC -->
  <div>
    <div v-if="showhaa"></div>
    <div class="getPlayTree">
      <ul>
        <li :class="{'active': index === navTo}" v-for="(item,index) in playGroups" :key="index" @click="playGroupBut(item,index)">{{item.title}}</li>
      </ul>
    </div>
    <div class="getPlayTreeBox">
      <ul>
        <li v-for="(item,indexs) in playGroups" :key="indexs" v-if="indexs === navTo">
          <div v-for='(group,indexabc) in item.groups' :key='indexabc'>
            <span class="groupTitle">{{group.title}}</span>
            <span class="groupTitleList" :class="{'active': current_player_bonus.id=== player.id}" v-for='(player,indexbcd) in group.players' :key='indexbcd' @click="playersBut(player,indexbcd)">{{player.title}}</span>
          </div>
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
                  <span>
                    <i>{{item.ball}}</i>
                  </span>
                </p>
              </div>
              <div class="changes" v-if="className !== 'ssc_star2_front_group_contains' && className !== 'ssc_star2_last_group_contains' && className !== 'ssc_star3_front_and' && className !== 'ssc_star3_mid_and' && className !== 'ssc_star3_last_and' && className !== 'ssc_star2_last_and' && className !== 'ssc_star2_last_group_and' && className !== 'ssc_star2_front_group_and' && className !== 'ssc_star2_front_and' && className !== 'ssc_star3_last_group_and' && className !== 'ssc_star3_mid_group_and' && className !== 'ssc_star3_front_group_and' && className !== 'ssc_side_lhh' && className !== 'ssc_dxds' && className !== 'ssc_star3_front_group_contains' && className !== 'ssc_star3_mid_group_contains' && className !== 'ssc_star3_last_group_contains'">
                <span v-for="(tools,indexto) in ballTools" :key="indexto" @click="toolsCur(tools,indexto,numViews,indexf)">{{tools.name}}</span>
              </div>
            </div>
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
      className: "ssc_star5", //玩法ID
      lotteryId: "sj1fc", //彩种id
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
      addTitle: "复式",
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
      return this.$store.state.current_player_groups;
    },
    sgroups2() {
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
      this.current_player_bonus = JSON.parse(localStorage.getItem("getPlayTree_playGroups_ssc"))[0].groups[0].players[0];
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
        this.$store.state.zhu++;
        this.$store.state.pd.addTitle = this.addTitle;
        this.$store.state.pd.addCon = this.dd.join(",");
        this.$store.state.con = this.dd.join(",");
        this.$store.state.pd.addPattern = "元";
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.pd.addMoney = this.$store.state.spinner3;
        this.$store.state.pd.addClassName = this.className;
        this.$store.state.pd.addSeasonId = this.$store.state.seasonId;
        this.$store.state.pd.addName = this.$store.state.lottName;
        this.betssc_boxjia(item, index, list, indexf);
      } else {
        this.d.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu--;
        this.$store.state.con = this.dd.join(",");
        this.$store.state.pd.addCon = this.dd.join(",");
        this.betssc_boxjian(item, index, list, indexf);
      }
    },
    //投注 ++++
    betssc_boxjia(num, indexg, list, indexff) {
      //大小单双 +
      if (this.className === "ssc_dxds") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {
            return n;
          });
          this.an = this.dd.join("+");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {
            return n;
          });
          this.bn = this.dd.join("+");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {
            return n;
          });
          this.cn = this.dd.join("+");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = this.dd.join("+");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {
            return n;
          });
          this.en = this.dd.join("+");
        }
        if (this.className === "ssc_dxds") {
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
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if (
        this.className === "ssc_star4_front_group6" ||
        this.className === "ssc_star5_none2" ||
        this.className === "ssc_star4_front_none2" ||
        this.className === "ssc_star3_front_none2" ||
        this.className === "ssc_star3_mid_none2" ||
        this.className === "ssc_star3_last_none2"
      ) {
        let ret = this.groupSplit(this.dd, 2);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.$store.state.zhu = arr.length;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //三码不定位、三星组六 +
      if (
        this.className === "ssc_star5_none3" ||
        this.className === "ssc_star3_mid_group6" ||
        this.className === "ssc_star3_last_group6" ||
        this.className === "ssc_star3_front_group6"
      ) {
        let ret = this.groupSplit(this.dd, 3);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.$store.state.zhu = arr.length;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //复式 +
      if (
        this.className === "ssc_star5" ||
        this.className === "ssc_star4_front" ||
        this.className === "ssc_star3_front" ||
        this.className === "ssc_star3_mid" ||
        this.className === "ssc_star3_last" ||
        this.className === "ssc_star2_front" ||
        this.className === "ssc_star2_last" ||
        this.className === "ssc_star1_dwd"
      ) {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc;
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
          this.dd = this.ke;
          this.en = this.dd.join("");
        }
        if (this.className === "ssc_star4_front") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.pd.addCon = this.$store.state.con + ",-";
          this.$store.state.con = this.$store.state.con + ",-";
        }
        if (this.className === "ssc_star3_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.pd.addCon = this.$store.state.con + ",-" + ",-";
          this.$store.state.con = this.$store.state.con + ",-" + ",-";
        }
        if (this.className === "ssc_star3_mid") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.pd.addCon = "-," + this.$store.state.con + ",-";
          this.$store.state.con = "-," + this.$store.state.con + ",-";
        }
        if (this.className === "ssc_star3_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.pd.addCon = "-,-," + this.$store.state.con;
          this.$store.state.con = "-,-," + this.$store.state.con;
        }
        if (this.className === "ssc_star2_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.pd.addCon =
            this.$store.state.con + ",-" + ",-" + ",-";
          this.$store.state.con = this.$store.state.con + ",-" + ",-" + ",-";
        }
        if (this.className === "ssc_star2_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.pd.addCon = "-,-,-," + this.$store.state.con;
          this.$store.state.con = "-,-,-," + this.$store.state.con;
        }
        if (this.className === "ssc_star1_dwd") {
          if (indexff === 0) {
            this.ka[indexg] = num.ball;
            this.dd = this.ka;
            this.an = this.dd.join("");
          }
          if (indexff === 1) {
            this.kb[indexg] = num.ball;
            this.dd = this.kb;
            this.bn = this.dd.join("");
          }
          if (indexff === 2) {
            this.kc[indexg] = num.ball;
            this.dd = this.kc;
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
            this.dd = this.ke;
            this.en = this.dd.join("");
          }
          if (this.className === "ssc_star1_dwd") {
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
        if (this.className === "ssc_star5") {
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
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //龙虎和 +
      if (this.className === "ssc_side_lhh") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = "[万千]" + this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = "[万百]" + this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc;
          this.cn = "[万十]" + this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {
            return n;
          });
          this.dn = "[万个]" + this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke;
          this.en = "[千百]" + this.dd.join("");
        }
        if (indexff === 5) {
          this.kf[indexg] = num.ball;
          this.dd = this.kf.filter(function(n) {
            return n;
          });
          this.fn = "[千十]" + this.dd.join("");
        }
        if (indexff === 6) {
          this.kg[indexg] = num.ball;
          this.dd = this.kg.filter(function(n) {
            return n;
          });
          this.gn = "[千个]" + this.dd.join("");
        }
        if (indexff === 7) {
          this.kh[indexg] = num.ball;
          this.dd = this.kh.filter(function(n) {
            return n;
          });
          this.hn = "[百十]" + this.dd.join("");
        }
        if (indexff === 8) {
          this.ki[indexg] = num.ball;
          this.dd = this.ki.filter(function(n) {
            return n;
          });
          this.in = "[百个]" + this.dd.join("");
        }
        if (indexff === 9) {
          this.kj[indexg] = num.ball;
          this.dd = this.kj.filter(function(n) {
            return n;
          });
          this.jn = "[十个]" + this.dd.join("");
        }
        if (this.className === "ssc_side_lhh") {
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
        if (this.$store.state.con.indexOf("和") !== -1) {
          this.youhezhi = true;
        } else if (this.$store.state.con.indexOf("和") === -1) {
          this.youhezhi = false;
        }
      }
      //三星包胆 +
      if (
        this.className === "ssc_star3_front_group_contains" ||
        this.className === "ssc_star3_mid_group_contains" ||
        this.className === "ssc_star3_last_group_contains"
      ) {
        for (let i = 0; i < list.nums.length; i++) {
          this.$store.state.zhu = 54;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.pd.addCon = num.ball;
          this.$store.state.con = num.ball;
          list.nums[i].choose = false;
          list.nums[indexg].choose = true;
        }
      }
      //二星包胆 +
      if (
        this.className === "ssc_star2_front_group_contains" ||
        this.className === "ssc_star2_last_group_contains"
      ) {
        for (let i = 0; i < list.nums.length; i++) {
          this.$store.state.zhu = 9;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.pd.addCon = num.ball;
          this.$store.state.con = num.ball;
          list.nums[i].choose = false;
          list.nums[indexg].choose = true;
        }
      }
      //五星--组选5 +
      if (this.className === "ssc_star5_group5") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount5(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选10 +
      if (this.className === "ssc_star5_group10") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount10(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选20 +
      if (this.className === "ssc_star5_group20") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount20(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选30 +
      if (this.className === "ssc_star5_group30") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount30(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选60 +
      if (this.className === "ssc_star5_group60") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount60(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选120 +
      if (this.className === "ssc_star5_group120") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getCount120(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选4 +
      if (this.className === "ssc_star4_front_group4") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount4(this.$store.state.con.split(","));
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选12 +
      if (this.className === "ssc_star4_front_group12") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount12(
          this.$store.state.con.split(",")
        );
      }
      //前四--组选24 +
      if (this.className === "ssc_star4_front_group24") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount24(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前三、中三、后三组选3 +
      if (
        this.className === "ssc_star3_front_group3" ||
        this.className === "ssc_star3_mid_group3" ||
        this.className === "ssc_star3_last_group3"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount3(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星组选 复式 +
      if (
        this.className === "ssc_star2_front_group" ||
        this.className === "ssc_star2_last_group"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzuxuanfushi(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //三星直选和值 +
      if (
        this.className === "ssc_star3_front_and" ||
        this.className === "ssc_star3_mid_and" ||
        this.className === "ssc_star3_last_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sanzhixuanhezhi(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //三星组选和值 +
      if (
        this.className === "ssc_star3_front_group_and" ||
        this.className === "ssc_star3_mid_group_and" ||
        this.className === "ssc_star3_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sanzuxuanhezhi(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //三星跨度 +
      if (
        this.className === "ssc_star3_front_kd" ||
        this.className === "ssc_star3_mid_kd" ||
        this.className === "ssc_star3_last_kd"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sankuadu(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星直选和值 +
      if (
        this.className === "ssc_star2_front_and" ||
        this.className === "ssc_star2_last_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzhixuanhezhi(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星组选和值 +
      if (
        this.className === "ssc_star2_front_group_and" ||
        this.className === "ssc_star2_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzuxuanhezhi(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星跨度 +
      if (
        this.className === "ssc_star2_front_kd" ||
        this.className === "ssc_star2_last_kd"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erkuadu(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
    },
    //投注 ----
    betssc_boxjian(num, indexg, list, indexff) {
      //大小单双 -
      if (this.className === "ssc_dxds") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("+");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("+");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc;
          this.cn = this.dd.join("+");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd;
          this.dn = this.dd.join("+");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke;
          this.en = this.dd.join("+");
        }
        if (this.className === "ssc_dxds") {
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
      }
      //五星、四星、三星、二星二码不定位 、前四组选6 -
      if (
        this.className === "ssc_star4_front_group6" ||
        this.className === "ssc_star5_none2" ||
        this.className === "ssc_star4_front_none2" ||
        this.className === "ssc_star3_front_none2" ||
        this.className === "ssc_star3_mid_none2" ||
        this.className === "ssc_star3_last_none2"
      ) {
        let ret = this.groupSplit(this.dd, 2);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.$store.state.zhu = arr.length;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //三码不定位、前三组六、中三组六、后三组六 -
      if (
        this.className === "ssc_star5_none3" ||
        this.className === "ssc_star3_mid_group6" ||
        this.className === "ssc_star3_last_group6" ||
        this.className === "ssc_star3_front_group6"
      ) {
        let ret = this.groupSplit(this.dd, 3);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.$store.state.zhu = arr.length;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //复式 -
      if (
        this.className === "ssc_star5" ||
        this.className === "ssc_star4_front" ||
        this.className === "ssc_star3_front" ||
        this.className === "ssc_star3_mid" ||
        this.className === "ssc_star3_last" ||
        this.className === "ssc_star2_front" ||
        this.className === "ssc_star2_last" ||
        this.className === "ssc_star1_dwd"
      ) {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc;
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
          this.dd = this.ke;
          this.en = this.dd.join("");
        }
        if (this.className === "ssc_star4_front") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        } else if (this.className === "ssc_star3_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        } else if (this.className === "ssc_star3_mid") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        } else if (this.className === "ssc_star3_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        } else if (this.className === "ssc_star2_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        } else if (this.className === "ssc_star2_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        } else if (this.className === "ssc_star1_dwd") {
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
        } else if (this.className === "ssc_star5") {
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
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //龙虎和 -
      if (this.className === "ssc_side_lhh") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = "[万千]" + this.dd.join("");
          if (this.an == "" || this.an == "-" || this.an == "[万千]") {
            this.an = this.dd.join("");
          }
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = "[万百]" + this.dd.join("");
          if (this.bn == "" || this.bn == "-" || this.bn == "[万百]") {
            this.bn = this.dd.join("");
          }
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc;
          this.cn = "[万十]" + this.dd.join("");
          if (this.cn == "" || this.cn == "-" || this.cn == "[万十]") {
            this.cn = this.dd.join("");
          }
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd;
          this.dn = "[万个]" + this.dd.join("");
          if (this.dn == "" || this.dn == "-" || this.dn == "[万个]") {
            this.dn = this.dd.join("");
          }
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke;
          this.en = "[千百]" + this.dd.join("");
          if (this.en == "" || this.en == "-" || this.en == "[千百]") {
            this.en = this.dd.join("");
          }
        }
        if (indexff === 5) {
          this.kf.splice(indexg, 1, "");
          this.dd = this.kf.filter(function(n) {
            return n;
          });
          this.fn = "[千十]" + this.dd.join("");
          if (this.fn == "" || this.fn == "-" || this.fn == "[千十]") {
            this.fn = this.dd.join("");
          }
        }
        if (indexff === 6) {
          this.kg.splice(indexg, 1, "");
          this.dd = this.kg.filter(function(n) {
            return n;
          });
          this.gn = "[千个]" + this.dd.join("");
          if (this.gn == "" || this.gn == "-" || this.gn == "[千个]") {
            this.gn = this.dd.join("");
          }
        }
        if (indexff === 7) {
          this.kh.splice(indexg, 1, "");
          this.dd = this.kh.filter(function(n) {
            return n;
          });
          this.hn = "[百十]" + this.dd.join("");
          if (this.hn == "" || this.hn == "-" || this.hn == "[百十]") {
            this.hn = this.dd.join("");
          }
        }
        if (indexff === 8) {
          this.ki.splice(indexg, 1, "");
          this.dd = this.ki.filter(function(n) {
            return n;
          });
          this.in = "[百个]" + this.dd.join("");
          if (this.in == "" || this.in == "-" || this.in == "[百个]") {
            this.in = this.dd.join("");
          }
        }
        if (indexff === 9) {
          this.kj.splice(indexg, 1, "");
          this.dd = this.kj.filter(function(n) {
            return n;
          });
          this.jn = "[十个]" + this.dd.join("");
          if (this.jn == "" || this.jn == "-" || this.jn == "[十个]") {
            this.jn = this.dd.join("");
          }
        }
        if (this.className === "ssc_side_lhh") {
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
        if (this.$store.state.con.indexOf("和") !== -1) {
          this.youhezhi = true;
        } else if (this.$store.state.con.indexOf("和") === -1) {
          this.youhezhi = false;
        }
      }
      //三星包胆 -
      if (
        this.className === "ssc_star3_front_group_contains" ||
        this.className === "ssc_star3_mid_group_contains" ||
        this.className === "ssc_star3_last_group_contains"
      ) {
        for (let i = 0; i < list.nums.length; i++) {
          this.$store.state.zhu = 0;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.pd.addCon = "";
          this.$store.state.con = "";
        }
      }
      //二星包胆 -
      if (
        this.className === "ssc_star2_front_group_contains" ||
        this.className === "ssc_star2_last_group_contains"
      ) {
        for (let i = 0; i < list.nums.length; i++) {
          this.$store.state.zhu = 0;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.pd.addCon = "";
          this.$store.state.con = "";
        }
      }
      //五星--组选5 -
      if (this.className === "ssc_star5_group5") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount5(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选10 -
      if (this.className === "ssc_star5_group10") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount10(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选20 -
      if (this.className === "ssc_star5_group20") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount20(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选30 -
      if (this.className === "ssc_star5_group30") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount30(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选60 -
      if (this.className === "ssc_star5_group60") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount60(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选120 -
      if (this.className === "ssc_star5_group120") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getCount120(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选4 -
      if (this.className === "ssc_star4_front_group4") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount4(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选12 -
      if (this.className === "ssc_star4_front_group12") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka;
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb;
          this.bn = this.dd.join("");
        }
        this.$store.state.pd.addCon = this.an + "," + this.bn;
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.zhu = this.getzuCount12(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选24 -
      if (this.className === "ssc_star4_front_group24") {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount24(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前三、中三、后三组选 -
      if (
        this.className === "ssc_star3_front_group3" ||
        this.className === "ssc_star3_mid_group3" ||
        this.className === "ssc_star3_last_group3"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount3(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星组选 复式 -
      if (
        this.className === "ssc_star2_front_group" ||
        this.className === "ssc_star2_last_group"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzuxuanfushi(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //三星直选和值 -
      if (
        this.className === "ssc_star3_front_and" ||
        this.className === "ssc_star3_mid_and" ||
        this.className === "ssc_star3_last_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sanzhixuanhezhi(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //三星组选和值 -
      if (
        this.className === "ssc_star3_front_group_and" ||
        this.className === "ssc_star3_mid_group_and" ||
        this.className === "ssc_star3_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sanzuxuanhezhi(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //三星跨度 -
      if (
        this.className === "ssc_star3_front_kd" ||
        this.className === "ssc_star3_mid_kd" ||
        this.className === "ssc_star3_last_kd"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.sankuadu(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星直选和值 -
      if (
        this.className === "ssc_star2_front_and" ||
        this.className === "ssc_star2_last_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzhixuanhezhi(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星组选和值 -
      if (
        this.className === "ssc_star2_front_group_and" ||
        this.className === "ssc_star2_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erzuxuanhezhi(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星跨度 -
      if (
        this.className === "ssc_star2_front_kd" ||
        this.className === "ssc_star2_last_kd"
      ) {
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu = this.erkuadu(this.dd);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
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
        case "五星":
          this.addTitle = "五星直选复式";
          break;
        case "前四":
          this.addTitle = "前四直选复式";
          break;
        case "后四":
          this.addTitle = "后四直选复式";
          break;
        case "前三":
          this.addTitle = "前三直选复式";
          break;
        case "中三":
          this.addTitle = "中三直选复式";
          break;
        case "后三":
          this.addTitle = "后三直选复式";
          break;
        case "前二":
          this.addTitle = "前二直选复式";
          break;
        case "后二":
          this.addTitle = "后二直选复式";
          break;
        case "定位胆":
          this.addTitle = "定位胆";
          break;
        case "任选":
          this.addTitle = "任选二直选复式";
          break;
        case "龙虎":
          this.addTitle = "龙虎和";
          break;
        case "微信玩法":
          this.addTitle = "大小单双";
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
        for (let k = 0;k < this.current_player_bonus.numView[h].nums.length;k++) {
          this.current_player_bonus.numView[h].nums[k].choose = false;
        }
      }
    },
    //全 ++++
    iszhu1({ ball }, item, indexf) {
      //复式 +
      if (
        this.className === "ssc_star5" ||
        this.className === "ssc_star4_front" ||
        this.className === "ssc_star3_front" ||
        this.className === "ssc_star3_mid" ||
        this.className === "ssc_star3_last" ||
        this.className === "ssc_star2_front" ||
        this.className === "ssc_star2_last" ||
        this.className === "ssc_star1_dwd"
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
        if (this.className === "ssc_star1_dwd") {
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
        }
        if (this.className === "ssc_star4_front") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-," + this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star1_dwd") {
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
        if (this.className === "ssc_star5") {
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
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if (
        this.className === "ssc_star4_front_group6" ||
        this.className === "ssc_star5_none2" ||
        this.className === "ssc_star4_front_none2" ||
        this.className === "ssc_star3_front_none2" ||
        this.className === "ssc_star3_mid_none2" ||
        this.className === "ssc_star3_last_none2"
      ) {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          });
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = arr.length;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (
        this.className === "ssc_star3_front_group3" ||
        this.className === "ssc_star3_mid_group3" ||
        this.className === "ssc_star3_last_group3"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          let lengths = this.dd.length;
          this.$store.state.zhu = this.getzuCount3(lengths);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (
        this.className === "ssc_star5_none3" ||
        this.className === "ssc_star3_mid_group6" ||
        this.className === "ssc_star3_last_group6" ||
        this.className === "ssc_star3_front_group6"
      ) {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          });
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = arr.length;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二，后二跨度 +
      if (
        this.className === "ssc_star2_front_kd" ||
        this.className === "ssc_star2_last_kd"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erkuadu(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (
        this.className === "ssc_star5_group5" ||
        this.className === "ssc_star5_group10"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount5(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (
        this.className === "ssc_star5_group20" ||
        this.className === "ssc_star5_group30"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount20(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount60(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getCount120(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星组选 复式 +
      if (
        this.className === "ssc_star2_front_group" ||
        this.className === "ssc_star2_last_group"
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
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erzuxuanfushi(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if (
        this.className === "ssc_star5_none1" ||
        this.className === "ssc_star4_front_none1" ||
        this.className === "ssc_star4_last_none1" ||
        this.className === "ssc_star3_front_none1" ||
        this.className === "ssc_star3_mid_none1" ||
        this.className === "ssc_star3_last_none1"
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
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.zhu1;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选4,12+
      if (
        this.className === "ssc_star4_front_group4" ||
        this.className === "ssc_star4_front_group12" ||
        this.className === "ssc_star4_front_group24"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        if (this.className === "ssc_star4_front_group4") {
          this.$store.state.zhu = this.getzuCount4(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group12") {
          this.$store.state.zhu = this.getzuCount12(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group24") {
          this.$store.state.zhu = this.getzuCount24(
            this.$store.state.con.split(",")
          );
        }
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24") {
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
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount24(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
    },
    //大 ++++
    iszhu2({ ball }, item, indexf) {
      //复式 +
      if (
        this.className === "ssc_star5" ||
        this.className === "ssc_star4_front" ||
        this.className === "ssc_star3_front" ||
        this.className === "ssc_star3_mid" ||
        this.className === "ssc_star3_last" ||
        this.className === "ssc_star2_front" ||
        this.className === "ssc_star2_last" ||
        this.className === "ssc_star1_dwd"
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
        if (this.className === "ssc_star1_dwd") {
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
        }
        if (this.className === "ssc_star4_front") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-," + this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star1_dwd") {
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
        if (this.className === "ssc_star5") {
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
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if (
        this.className === "ssc_star4_front_group6" ||
        this.className === "ssc_star5_none2" ||
        this.className === "ssc_star4_front_none2" ||
        this.className === "ssc_star3_front_none2" ||
        this.className === "ssc_star3_mid_none2" ||
        this.className === "ssc_star3_last_none2"
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
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = arr.length;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (
        this.className === "ssc_star3_front_group3" ||
        this.className === "ssc_star3_mid_group3" ||
        this.className === "ssc_star3_last_group3"
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
              this.an = this.dd.join(",");
            }
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          let lengths = this.dd.length;
          this.$store.state.zhu = this.getzuCount3(lengths);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (
        this.className === "ssc_star5_none3" ||
        this.className === "ssc_star3_mid_group6" ||
        this.className === "ssc_star3_last_group6" ||
        this.className === "ssc_star3_front_group6"
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
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = arr.length;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二，后二跨度 +
      if (
        this.className === "ssc_star2_front_kd" ||
        this.className === "ssc_star2_last_kd"
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
              this.an = this.dd.join(",");
            }
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erkuadu(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (
        this.className === "ssc_star5_group5" ||
        this.className === "ssc_star5_group10"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount5(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (
        this.className === "ssc_star5_group20" ||
        this.className === "ssc_star5_group30"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount20(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount60(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getCount120(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星组选 复式 +
      if (
        this.className === "ssc_star2_front_group" ||
        this.className === "ssc_star2_last_group"
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
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erzuxuanfushi(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if (
        this.className === "ssc_star5_none1" ||
        this.className === "ssc_star4_front_none1" ||
        this.className === "ssc_star4_last_none1" ||
        this.className === "ssc_star3_front_none1" ||
        this.className === "ssc_star3_mid_none1" ||
        this.className === "ssc_star3_last_none1"
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
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.zhu1;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选4,12+
      if (
        this.className === "ssc_star4_front_group4" ||
        this.className === "ssc_star4_front_group12" ||
        this.className === "ssc_star4_front_group24"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        if (this.className === "ssc_star4_front_group4") {
          this.$store.state.zhu = this.getzuCount4(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group12") {
          this.$store.state.zhu = this.getzuCount12(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group24") {
          this.$store.state.zhu = this.getzuCount24(
            this.$store.state.con.split(",")
          );
        }
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24") {
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
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount24(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
    },
    //小 ++++
    iszhu3({ ball }, item, indexf) {
      //复式 +
      if (
        this.className === "ssc_star5" ||
        this.className === "ssc_star4_front" ||
        this.className === "ssc_star3_front" ||
        this.className === "ssc_star3_mid" ||
        this.className === "ssc_star3_last" ||
        this.className === "ssc_star2_front" ||
        this.className === "ssc_star2_last" ||
        this.className === "ssc_star1_dwd"
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
        if (this.className === "ssc_star1_dwd") {
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
        }
        if (this.className === "ssc_star4_front") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-," + this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star1_dwd") {
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
        if (this.className === "ssc_star5") {
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
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if (
        this.className === "ssc_star4_front_group6" ||
        this.className === "ssc_star5_none2" ||
        this.className === "ssc_star4_front_none2" ||
        this.className === "ssc_star3_front_none2" ||
        this.className === "ssc_star3_mid_none2" ||
        this.className === "ssc_star3_last_none2"
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
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = arr.length;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (
        this.className === "ssc_star3_front_group3" ||
        this.className === "ssc_star3_mid_group3" ||
        this.className === "ssc_star3_last_group3"
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
              this.an = this.dd.join(",");
            }
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          let lengths = this.dd.length;
          this.$store.state.zhu = this.getzuCount3(lengths);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (
        this.className === "ssc_star5_none3" ||
        this.className === "ssc_star3_mid_group6" ||
        this.className === "ssc_star3_last_group6" ||
        this.className === "ssc_star3_front_group6"
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
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = arr.length;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二，后二跨度 +
      if (
        this.className === "ssc_star2_front_kd" ||
        this.className === "ssc_star2_last_kd"
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
              this.an = this.dd.join(",");
            }
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erkuadu(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (
        this.className === "ssc_star5_group5" ||
        this.className === "ssc_star5_group10"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount5(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (
        this.className === "ssc_star5_group20" ||
        this.className === "ssc_star5_group30"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount20(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount60(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getCount120(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星组选 复式 +
      if (
        this.className === "ssc_star2_front_group" ||
        this.className === "ssc_star2_last_group"
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
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erzuxuanfushi(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if (
        this.className === "ssc_star5_none1" ||
        this.className === "ssc_star4_front_none1" ||
        this.className === "ssc_star4_last_none1" ||
        this.className === "ssc_star3_front_none1" ||
        this.className === "ssc_star3_mid_none1" ||
        this.className === "ssc_star3_last_none1"
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
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.zhu1;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选4,12+
      if (
        this.className === "ssc_star4_front_group4" ||
        this.className === "ssc_star4_front_group12" ||
        this.className === "ssc_star4_front_group24"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        if (this.className === "ssc_star4_front_group4") {
          this.$store.state.zhu = this.getzuCount4(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group12") {
          this.$store.state.zhu = this.getzuCount12(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group24") {
          this.$store.state.zhu = this.getzuCount24(
            this.$store.state.con.split(",")
          );
        }
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24") {
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
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount24(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
    },
    //单 ++++
    iszhu4({ ball }, item, indexf) {
      //复式 +
      if (
        this.className === "ssc_star5" ||
        this.className === "ssc_star4_front" ||
        this.className === "ssc_star3_front" ||
        this.className === "ssc_star3_mid" ||
        this.className === "ssc_star3_last" ||
        this.className === "ssc_star2_front" ||
        this.className === "ssc_star2_last" ||
        this.className === "ssc_star1_dwd"
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
        if (this.className === "ssc_star1_dwd") {
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
        }
        if (this.className === "ssc_star4_front") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-," + this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star1_dwd") {
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
        if (this.className === "ssc_star5") {
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
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if (
        this.className === "ssc_star4_front_group6" ||
        this.className === "ssc_star5_none2" ||
        this.className === "ssc_star4_front_none2" ||
        this.className === "ssc_star3_front_none2" ||
        this.className === "ssc_star3_mid_none2" ||
        this.className === "ssc_star3_last_none2"
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
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = arr.length;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (
        this.className === "ssc_star3_front_group3" ||
        this.className === "ssc_star3_mid_group3" ||
        this.className === "ssc_star3_last_group3"
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
              this.an = this.dd.join(",");
            }
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          let lengths = this.dd.length;
          this.$store.state.zhu = this.getzuCount3(lengths);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (
        this.className === "ssc_star5_none3" ||
        this.className === "ssc_star3_mid_group6" ||
        this.className === "ssc_star3_last_group6" ||
        this.className === "ssc_star3_front_group6"
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
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = arr.length;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二，后二跨度 +
      if (
        this.className === "ssc_star2_front_kd" ||
        this.className === "ssc_star2_last_kd"
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
              this.an = this.dd.join(",");
            }
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erkuadu(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (
        this.className === "ssc_star5_group5" ||
        this.className === "ssc_star5_group10"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount5(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (
        this.className === "ssc_star5_group20" ||
        this.className === "ssc_star5_group30"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount20(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount60(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getCount120(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星组选 复式 +
      if (
        this.className === "ssc_star2_front_group" ||
        this.className === "ssc_star2_last_group"
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
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erzuxuanfushi(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if (
        this.className === "ssc_star5_none1" ||
        this.className === "ssc_star4_front_none1" ||
        this.className === "ssc_star4_last_none1" ||
        this.className === "ssc_star3_front_none1" ||
        this.className === "ssc_star3_mid_none1" ||
        this.className === "ssc_star3_last_none1"
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
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.zhu1;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选4,12+
      if (
        this.className === "ssc_star4_front_group4" ||
        this.className === "ssc_star4_front_group12" ||
        this.className === "ssc_star4_front_group24"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        if (this.className === "ssc_star4_front_group4") {
          this.$store.state.zhu = this.getzuCount4(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group12") {
          this.$store.state.zhu = this.getzuCount12(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group24") {
          this.$store.state.zhu = this.getzuCount24(
            this.$store.state.con.split(",")
          );
        }
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24") {
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
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount24(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
    },
    //双 ++++
    iszhu5({ ball }, item, indexf) {
      //复式 +
      if (
        this.className === "ssc_star5" ||
        this.className === "ssc_star4_front" ||
        this.className === "ssc_star3_front" ||
        this.className === "ssc_star3_mid" ||
        this.className === "ssc_star3_last" ||
        this.className === "ssc_star2_front" ||
        this.className === "ssc_star2_last" ||
        this.className === "ssc_star1_dwd"
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
        if (this.className === "ssc_star1_dwd") {
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
        }
        if (this.className === "ssc_star4_front") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-," + this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star1_dwd") {
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
        if (this.className === "ssc_star5") {
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
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if (
        this.className === "ssc_star4_front_group6" ||
        this.className === "ssc_star5_none2" ||
        this.className === "ssc_star4_front_none2" ||
        this.className === "ssc_star3_front_none2" ||
        this.className === "ssc_star3_mid_none2" ||
        this.className === "ssc_star3_last_none2"
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
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = arr.length;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (
        this.className === "ssc_star3_front_group3" ||
        this.className === "ssc_star3_mid_group3" ||
        this.className === "ssc_star3_last_group3"
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
              this.an = this.dd.join(",");
            }
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          let lengths = this.dd.length;
          this.$store.state.zhu = this.getzuCount3(lengths);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (
        this.className === "ssc_star5_none3" ||
        this.className === "ssc_star3_mid_group6" ||
        this.className === "ssc_star3_last_group6" ||
        this.className === "ssc_star3_front_group6"
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
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = arr.length;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二，后二跨度 +
      if (
        this.className === "ssc_star2_front_kd" ||
        this.className === "ssc_star2_last_kd"
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
              this.an = this.dd.join(",");
            }
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erkuadu(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (
        this.className === "ssc_star5_group5" ||
        this.className === "ssc_star5_group10"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount5(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (
        this.className === "ssc_star5_group20" ||
        this.className === "ssc_star5_group30"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount20(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount60(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120") {
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getCount120(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星组选 复式 +
      if (
        this.className === "ssc_star2_front_group" ||
        this.className === "ssc_star2_last_group"
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
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erzuxuanfushi(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if (
        this.className === "ssc_star5_none1" ||
        this.className === "ssc_star4_front_none1" ||
        this.className === "ssc_star4_last_none1" ||
        this.className === "ssc_star3_front_none1" ||
        this.className === "ssc_star3_mid_none1" ||
        this.className === "ssc_star3_last_none1"
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
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.zhu1;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选4,12+
      if (
        this.className === "ssc_star4_front_group4" ||
        this.className === "ssc_star4_front_group12" ||
        this.className === "ssc_star4_front_group24"
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
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        if (this.className === "ssc_star4_front_group4") {
          this.$store.state.zhu = this.getzuCount4(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group12") {
          this.$store.state.zhu = this.getzuCount12(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group24") {
          this.$store.state.zhu = this.getzuCount24(
            this.$store.state.con.split(",")
          );
        }
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24") {
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
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount24(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
    },
    //清 ++++
    iszhu6({ ball }, item, indexf) {
      //复式 +
      if (
        this.className === "ssc_star5" ||
        this.className === "ssc_star4_front" ||
        this.className === "ssc_star3_front" ||
        this.className === "ssc_star3_mid" ||
        this.className === "ssc_star3_last" ||
        this.className === "ssc_star2_front" ||
        this.className === "ssc_star2_last" ||
        this.className === "ssc_star1_dwd"
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
        if (this.className === "ssc_star1_dwd") {
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
        }
        if (this.className === "ssc_star4_front") {
          this.$store.state.pd.addCon =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.con =
            this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            4
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-," + this.$store.state.con + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star3_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            3
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_front") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = this.$store.state.con + ",-" + ",-" + ",-";
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star2_last") {
          this.$store.state.pd.addCon = this.an + "," + this.bn;
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            2
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
          this.$store.state.con = "-,-,-," + this.$store.state.con;
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        if (this.className === "ssc_star1_dwd") {
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
        if (this.className === "ssc_star5") {
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
          this.$store.state.zhu = this.getCount(
            this.$store.state.con.split(","),
            5
          );
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if (
        this.className === "ssc_star4_front_group6" ||
        this.className === "ssc_star5_none2" ||
        this.className === "ssc_star4_front_none2" ||
        this.className === "ssc_star3_front_none2" ||
        this.className === "ssc_star3_mid_none2" ||
        this.className === "ssc_star3_last_none2"
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
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = 0;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (
        this.className === "ssc_star3_front_group3" ||
        this.className === "ssc_star3_mid_group3" ||
        this.className === "ssc_star3_last_group3"
      ) {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = 0;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (
        this.className === "ssc_star5_none3" ||
        this.className === "ssc_star3_mid_group6" ||
        this.className === "ssc_star3_last_group6" ||
        this.className === "ssc_star3_front_group6"
      ) {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = 0;
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前二，后二跨度 +
      if (
        this.className === "ssc_star2_front_kd" ||
        this.className === "ssc_star2_last_kd"
      ) {
        let len = Math.ceil(ball.length / 2);
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          });
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erkuadu(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (
        this.className === "ssc_star5_group5" ||
        this.className === "ssc_star5_group10"
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
        }
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount5(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (
        this.className === "ssc_star5_group20" ||
        this.className === "ssc_star5_group30"
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
        }
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount20(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60") {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join("");
          });
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
        }
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        this.$store.state.zhu = this.getzuCount60(
          this.$store.state.con.split(",")
        );
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120") {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join("");
          });
        }
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getCount120(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //二星组选 复式 +
      if (
        this.className === "ssc_star2_front_group" ||
        this.className === "ssc_star2_last_group"
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
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erzuxuanfushi(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if (
        this.className === "ssc_star5_none1" ||
        this.className === "ssc_star4_front_none1" ||
        this.className === "ssc_star4_last_none1" ||
        this.className === "ssc_star3_front_none1" ||
        this.className === "ssc_star3_mid_none1" ||
        this.className === "ssc_star3_last_none1"
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
          this.$store.state.con = this.an;
          this.$store.state.pd.addCon = this.$store.state.con;
          this.$store.state.zhu = this.erzuxuanfushi(this.dd);
          this.$store.state.pd.addzhu = this.$store.state.zhu;
        }
      }
      //前四--组选4,12+
      if (
        this.className === "ssc_star4_front_group4" ||
        this.className === "ssc_star4_front_group12" ||
        this.className === "ssc_star4_front_group24"
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
        }
        this.$store.state.con = this.an + "," + this.bn;
        this.$store.state.pd.addCon = this.$store.state.con;
        if (this.className === "ssc_star4_front_group4") {
          this.$store.state.zhu = this.getzuCount4(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group12") {
          this.$store.state.zhu = this.getzuCount12(
            this.$store.state.con.split(",")
          );
        }
        if (this.className === "ssc_star4_front_group24") {
          this.$store.state.zhu = this.getzuCount24(
            this.$store.state.con.split(",")
          );
        }
        this.$store.state.pd.addzhu = this.$store.state.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24") {
        if (indexf === 0) {
          ball.filter((list, i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {
              return n;
            });
            this.an = this.dd.join("");
          });
        }
        this.$store.state.con = this.an;
        this.$store.state.pd.addCon = this.$store.state.con;
        let lengths = this.dd.length;
        this.$store.state.zhu = this.getzuCount24(lengths);
        this.$store.state.pd.addzhu = this.$store.state.zhu;
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
    },

    //----------公用函数-----------
    //复式 betContent = [0,0,0,0,0] , count = 5
    getCount(betContent, stars) {
      if (betContent.length != stars) {
        return 0;
      }
      let count = 1;
      for (let i = 0; i < stars; i++) {
        let n = betContent[i];
        n = [...new Set(n)];
        count *= n.length;
      }
      return count;
    },
    //组选共用函数
    getCombin(num, len) {
      if (num < len) {
        return 0;
      }
      let nums = 1;
      let lens = 1;
      for (let i = 0; i < len; i++) {
        nums *= num - i;
        lens *= len - i;
      }
      return nums / lens;
    },
    //組選五
    // bets = ["0,1", "1,2,3"]
    getzuCount5(bets) {
      if (bets.length != 2) {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        count += n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          count--;
        }
      }
      return count;
    },
    // 組選10
    // bets = ["0,1,3", "1,2,3"]
    getzuCount10(bets) {
      if (bets.length != 2) {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        count += n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          count--;
        }
      }
      return count;
    },
    // 組選20
    // bets = ["0,1,3", "1,2,3"]
    getzuCount20(bets) {
      if (bets.length != 2) {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        let nowCount = n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          nowCount--;
        }
        count += this.getCombin(nowCount, 2);
      }
      return count;
    },
    //組選30
    // bets = ["0,1,3", "1,2,3"]
    getzuCount30(bets) {
      if (bets.length != 2) {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n2.length; i++) {
        let nowCount = n1.length;
        if (n1.indexOf(n2[i]) >= 0) {
          nowCount--;
        }
        count += this.getCombin(nowCount, 2);
      }
      return count;
    },
    //組選60
    // bets = ["0,1,3", "1,2,3"]
    getzuCount60(bets) {
      if (bets.length != 2) {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        let nowCount = n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          nowCount--;
        }
        count += this.getCombin(nowCount, 3);
      }
      return count;
    },
    //組選120
    // bets = ["0", "1","3","7","9"]
    getCount120(bets) {
      return this.getCombin(bets, 5);
    },
    //四星-組選4
    // bets = ["0,1,3", "1,2,3"]
    getzuCount4(bets) {
      if (bets.length != 2 || bets[0] === "" || bets[1] === "") {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        count += n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          count--;
        }
      }
      return count;
    },
    //四星-組選12
    // bets = ["0,1,3", "1,2,3"]
    getzuCount12(bets) {
      if (bets.length != 2 || bets[0] === "" || bets[1] === "") {
        return 0;
      }
      let n1 = bets[0];
      let n2 = bets[1];
      if (n1.length < 1) {
        return 0;
      }
      if (n2.length < 2) {
        return 0;
      }
      let count = 0;
      for (let i = 0; i < n1.length; i++) {
        let a = n2.length;
        if (n2.indexOf(n1[i]) >= 0) {
          a--;
        }
        count += this.getCombin(a, 2);
      }
      return count;
    },
    //四星-組選24
    //bets = ["0", "1","9"]
    getzuCount24(bets) {
      return this.getCombin(bets, 4);
    },
    //三星-组三
    //bets = ["0", "1","9"]
    getzuCount3(bets) {
      return this.getCombin(bets, 2) * 2;
    },
    //三星-跨度
    sankuadu(bets) {
      let betCount = [10, 54, 96, 126, 144, 150, 144, 126, 96, 54];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[bets[i]];
      }
      return count;
    },
    //三星-直选和值
    sanzhixuanhezhi(bets) {
      let betCount = [
        1,
        3,
        6,
        10,
        15,
        21,
        28,
        36,
        45,
        55,
        63,
        69,
        73,
        75,
        75,
        73,
        69,
        63,
        55,
        45,
        36,
        28,
        21,
        15,
        10,
        6,
        3,
        1
      ];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[Number(bets[i])];
      }
      return count;
    },
    //三星-组选和值
    sanzuxuanhezhi(bets) {
      let betCount = [
        1,
        2,
        2,
        4,
        5,
        6,
        8,
        10,
        11,
        13,
        14,
        14,
        15,
        15,
        14,
        14,
        13,
        11,
        10,
        8,
        6,
        5,
        4,
        2,
        2,
        1
      ];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[Number(bets[i]) - 1];
      }
      return count;
    },
    // 二星-组选複式
    //bets = ["6","7"]
    erzuxuanfushi(bets) {
      let count = 0;
      let size = bets.length;
      count = this.getCombin(size, 2);
      return count;
    },
    //二星-跨度
    erkuadu(bets) {
      let betCount = [10, 18, 16, 14, 12, 10, 8, 6, 4, 2];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[bets[i]];
      }
      return count;
    },
    //二星-直选和值
    erzhixuanhezhi(bets) {
      let betCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[bets[i]];
      }
      return count;
    },
    //二星-组选和值
    erzuxuanhezhi(bets) {
      let betCount = [1, 1, 2, 2, 3, 3, 4, 4, 5, 4, 4, 3, 3, 2, 2, 1, 1];
      let count = 0;
      for (let i = 0; i < bets.length; i++) {
        count += betCount[Number(bets[i]) - 1];
      }
      return count;
    },
    //排列组合
    groupSplit(arr, size) {
      let maxSize = arr.length,
        groupArr = [];
      if (size >= 1 && size <= maxSize) {
        getArr(arr, 0, []);
      }
      function each(arr, index, fn) {
        for (let i = index; i < maxSize; i++) {
          fn(arr[i], i, arr);
        }
      }
      function getArr(arr, _size, _arr, index) {
        if (_size === size) {
          return;
        }
        let len = _size + 1;
        each(arr, index || 0, function(val, i, arr) {
          _arr.splice(_size, 1, val);
          if (_size === size - 1) {
            groupArr.push(_arr.slice());
          }
          getArr(arr, len, _arr, i + 1);
        });
      }
      return groupArr;
    },
    //清空
    exit() {
      this.productList = [];
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
@import "@/assets/scss/lotterbet/ssc.scss";
</style>
