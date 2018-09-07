<template>
  <!-- 选号模块k3 -->
  <div>
    <div v-if="showhaa"></div>
    <div v-else class="getPlayTree">
      <ul>
        <li :class="{'active': index === navTo}" v-for="(item,index) in playGroups" :key="index" @click="playGroupBut(item,index)">{{item.title}}</li>
      </ul>
    </div>
    <div class="getPlayTreeBox">
      <ul>
        <li v-for="(item,indexs) in sgroups2" v-if="indexs === navTo">
          <p :class="{'active': indexff === playNum}" v-for="(play,indexff) in item.players" :key="indexff" @click="playersBut(play,indexff)" v-if="lotteryId !== 'dfk3' && play.title !== '三同号'">{{play.title}}</p>
          <p :class="{'active': indexff === playNum}" v-for="(play,indexff) in item.players" :key="indexff" @click="playersBut(play,indexff)" v-if="lotteryId === 'dfk3'">{{play.title}}</p>
        </li>
      </ul>
    </div>
    <div class="conterButBox">
      <div class="conterButTitle">
        <i class="el-icon-info"></i>{{current_player_bonus.remark}}。单注最高奖金
        <i>{{current_player_bonus.displayBonus | keepTwoNum}}</i>倍</div>
      <div class="conterBut" :class="'conterBut'+className">
        <div :class="className+'Box'" v-for='(numViews, indexf) in current_player_bonus.numView' :key='indexf'>
          <p :class="[item.choose ? 'active' : '',className]" v-for="(item,indexha) in numViews.nums" :key="indexha" @click="curBalls(item,indexha,numViews,indexf)" v-if="$route.params.group !== 'dfk3' && item.ball !== '03' && item.ball !== '18'">
            <span v-if="className !== 'k3_star3_and'">{{className === 'k3_star2_same' && indexha === 5 ? item.ball : ''}}</span>
            <span v-else>
              <i>{{item.ball}}</i>
              <i>赔{{numViews.lottRot[indexha]}}</i>
            </span>
          </p>
          <p :class="[item.choose ? 'active' : '',className]" v-for="(item,indexha) in numViews.nums" :key="indexha" @click="curBalls(item,indexha,numViews,indexf)" v-if="$route.params.group === 'dfk3'">
            <span v-if="className !== 'k3_star3_and'">{{className === 'k3_star2_same' && indexha === 5 ? item.ball : ''}}</span>
            <span v-else>
              <i>{{item.ball}}</i>
              <i>赔{{numViews.lottRot[indexha]}}</i>
            </span>
          </p>
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
      navTo: 2,
      playNum: 0,
      className: "k3_star3_and", //玩法ID
      lotteryId: "dfk3", //彩种id
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
      addTitle: "单挑一骰",
      d: [], //选中的号码的下标
      d1: [], //选中的号码的下标
      d2: [], //选中的号码的下标
      d3: [], //选中的号码的下标
      d4: [], //选中的号码的下标
      d5: [], //选中的号码的下标
      d6: [], //选中的号码的下标
      dd: [], //选中的号码的下标
      zhu1: 0,
      zhu2: 0,
      zhu3: 0,
      zhu4: 0,
      zhu5: 0,
      zhu6: 0,
      item: {},
      indexha: 0,
      arrpeilva: [],
      arrpeilvb: [],
      arrpeilvc: [],
      historyNum:0,
    };
  },
  beforeDestroy() {
    this.iscreat();
  },
  computed: {
    playGroups() {
      return JSON.parse(localStorage.getItem("getPlayTree_playGroups_k3"));
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
        localStorage.getItem("getPlayTree_playGroups_k3")
      )[2].groups[0].players[0];
      this.$store.state.className = this.current_player_bonus.id;
      this.className = this.current_player_bonus.id;
      this.player_bonus = JSON.parse(
        localStorage.getItem("getPlayTree_playBonus_" + this.$route.params.id)
      );
      let arr1 = [];
      let arr2 = [];
      let arrpeilv1 = this.player_bonus[3].bonusArray;
      let arrpeilv2 = this.player_bonus[4].bonusArray;
      for (let i in arrpeilv1) {
        this.arrpeilva.push(arrpeilv1[i]);
      }
      for (let i = 0; i < this.arrpeilva.length / 2; i++) {
        arr1.push(this.arrpeilva[i]);
      }
      for (let i = this.arrpeilva.length / 2; i < this.arrpeilva.length; i++) {
        arr2.push(this.arrpeilva[i]);
      }
      for (let i in arrpeilv2) {
        this.arrpeilvb.push(arrpeilv2[i]);
      }
      this.arrpeilvc.push(arr1);
      this.arrpeilvc.push(arr2);
      this.arrpeilvc.push(this.arrpeilvb);
      let numView = this.current_player_bonus.numView;
      for (let i = 0; i < numView.length; i++) {
        numView[i]["lottRot"] = [...this.arrpeilvc[i]];
      }
    },
    //中间选号
    curBalls(item, index, numViews, indexf) {
      this.item = item;
      this.indexha = index;
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
        //和值大小单双++
        if (this.className === "k3_star3_and") {
          if (indexf == 0) {
            this.d1[index] = item.ball;
            this.dd = this.d1.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          }
          if (indexf == 1) {
            this.d2[index] = item.ball;
            this.dd = this.d2.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join(",");
          }
          if (indexf == 2) {
            this.d3[index] = item.ball;
            this.dd = this.d3.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join(",");
          }
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.$store.state.con
            .split(",")
            .filter(function(n) {
              return n;
            })
            .join(",");
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        //二不同++
        if (this.className === "k3_star2_same_not") {
          if (indexf == 0) {
            this.d1[index] = item.ball;
            this.dd = this.d1.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          }
          if (indexf == 1) {
            this.d2[index] = item.ball;
            this.dd = this.d2.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join(",");
          }
          if (indexf == 2) {
            this.d3[index] = item.ball;
            this.dd = this.d3.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join(",");
          }
          if (indexf == 3) {
            this.d4[index] = item.ball;
            this.dd = this.d4.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join(",");
          }
          if (indexf == 4) {
            this.d5[index] = item.ball;
            this.dd = this.d5.filter(function(n) {
              return n;
            });
            this.en = this.dd.join(",");
          }
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
          this.$store.state.con = this.$store.state.con
            .split(",")
            .filter(function(n) {
              return n;
            })
            .join(",");
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        //二同号++
        if (this.className === "k3_star2_same") {
          if (index !== 5) {
            if (indexf == 0) {
              this.d1[index] = item.ball;
              this.dd = this.d1.filter(function(n) {
                return n;
              });
              this.an = this.dd.join(",");
            }
            if (indexf == 1) {
              this.d2[index] = item.ball;
              this.dd = this.d2.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join(",");
            }
            if (indexf == 2) {
              this.d3[index] = item.ball;
              this.dd = this.d3.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join(",");
            }
            if (indexf == 3) {
              this.d4[index] = item.ball;
              this.dd = this.d4.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join(",");
            }
            if (indexf == 4) {
              this.d5[index] = item.ball;
              this.dd = this.d5.filter(function(n) {
                return n;
              });
              this.en = this.dd.join(",");
            }
            if (indexf == 5) {
              this.d6[index] = item.ball;
              this.dd = this.d6.filter(function(n) {
                return n;
              });
              this.fn = this.dd.join(",");
            }
          }
          if (index === 5) {
            if (indexf == 0 && item.choose === true) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.an = this.dd.join(",");
                this.zhu1 = 5;
              }
            }
            if (indexf == 1 && item.choose === true) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.bn = this.dd.join(",");
                this.zhu2 = 5;
              }
            }
            if (indexf == 2 && item.choose === true) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.cn = this.dd.join(",");
                this.zhu3 = 5;
              }
            }
            if (indexf == 3 && item.choose === true) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.dn = this.dd.join(",");
                this.zhu4 = 5;
              }
            }
            if (indexf == 4 && item.choose === true) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.en = this.dd.join(",");
                this.zhu5 = 5;
              }
            }
            if (indexf == 5 && item.choose === true) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.fn = this.dd.join(",");
                this.zhu6 = 5;
              }
            }
            this.$store.state.zhu =
              this.zhu1 +
              this.zhu2 +
              this.zhu3 +
              this.zhu4 +
              this.zhu5 +
              this.zhu6;
            this.$store.state.pd.addzhu = this.$store.state.zhu;
          }
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
            this.fn;
          this.$store.state.con = this.$store.state.con
            .split(",")
            .filter(function(n) {
              return n;
            })
            .join(",");
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        //三不同++
        if (this.className === "k3_star3_same_not") {
          if (indexf == 0) {
            this.d1[index] = item.ball;
            this.dd = this.d1.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          }
          if (indexf == 1) {
            this.d2[index] = item.ball;
            this.dd = this.d2.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join(",");
          }
          if (indexf == 2) {
            this.d3[index] = item.ball;
            this.dd = this.d3.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join(",");
          }
          if (indexf == 3) {
            this.d4[index] = item.ball;
            this.dd = this.d4.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join(",");
          }
          if (indexf == 4) {
            this.d5[index] = item.ball;
            this.dd = this.d5.filter(function(n) {
              return n;
            });
            this.en = this.dd.join(",");
          }
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
          this.$store.state.con = this.$store.state.con
            .split(",")
            .filter(function(n) {
              return n;
            })
            .join(",");
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        //三同号++
        if (this.className === "k3_star3_same") {
          if (indexf == 0) {
            this.d1[index] = item.ball;
            this.dd = this.d1.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          }
          if (indexf == 1) {
            this.d2[index] = item.ball;
            this.dd = this.d2.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join(",");
          }
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.con = this.$store.state.con
            .split(",")
            .filter(function(n) {
              return n;
            })
            .join(",");
          this.$store.state.pd.addCon = this.$store.state.con;
        }
      } else {
        this.d.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {
          return n;
        });
        this.$store.state.zhu--;
        this.$store.state.pd.addzhu = this.$store.state.zhu;
        this.$store.state.pd.addCon = this.dd.join(",");
        //和值大小单双--
        if (this.className === "k3_star3_and") {
          if (indexf == 0) {
            this.d1.splice(index, 1, "");
            this.dd = this.d1.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          }
          if (indexf == 1) {
            this.d2.splice(index, 1, "");
            this.dd = this.d2.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join(",");
          }
          if (indexf == 2) {
            this.d3.splice(index, 1, "");
            this.dd = this.d3.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join(",");
          }
          this.$store.state.con = this.an + "," + this.bn + "," + this.cn;
          this.$store.state.con = this.$store.state.con
            .split(",")
            .filter(function(n) {
              return n;
            })
            .join(",");
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        //二不同--
        if (this.className === "k3_star2_same_not") {
          if (indexf == 0) {
            this.d1.splice(index, 1, "");
            this.dd = this.d1.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          }
          if (indexf == 1) {
            this.d2.splice(index, 1, "");
            this.dd = this.d2.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join(",");
          }
          if (indexf == 2) {
            this.d3.splice(index, 1, "");
            this.dd = this.d3.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join(",");
          }
          if (indexf == 3) {
            this.d4.splice(index, 1, "");
            this.dd = this.d4.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join(",");
          }
          if (indexf == 4) {
            this.d5.splice(index, 1, "");
            this.dd = this.d5.filter(function(n) {
              return n;
            });
            this.en = this.dd.join(",");
          }
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
          this.$store.state.con = this.$store.state.con
            .split(",")
            .filter(function(n) {
              return n;
            })
            .join(",");
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        //二同号--
        if (this.className === "k3_star2_same") {
          if (index !== 5) {
            if (indexf == 0) {
              this.d1.splice(index, 1, "");
              this.dd = this.d1.filter(function(n) {
                return n;
              });
              this.an = this.dd.join(",");
            }
            if (indexf == 1) {
              this.d2.splice(index, 1, "");
              this.dd = this.d2.filter(function(n) {
                return n;
              });
              this.bn = this.dd.join(",");
            }
            if (indexf == 2) {
              this.d3.splice(index, 1, "");
              this.dd = this.d3.filter(function(n) {
                return n;
              });
              this.cn = this.dd.join(",");
            }
            if (indexf == 3) {
              this.d4.splice(index, 1, "");
              this.dd = this.d4.filter(function(n) {
                return n;
              });
              this.dn = this.dd.join(",");
            }
            if (indexf == 4) {
              this.d5.splice(index, 1, "");
              this.dd = this.d5.filter(function(n) {
                return n;
              });
              this.en = this.dd.join(",");
            }
            if (indexf == 5) {
              this.d6.splice(index, 1, "");
              this.dd = this.d6.filter(function(n) {
                return n;
              });
              this.fn = this.dd.join(",");
            }
          }
          if (index === 5) {
            if (indexf == 0 && item.choose === false) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.an = this.dd.join(",");
                this.zhu1 = 0;
              }
            }
            if (indexf == 1 && item.choose === false) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.bn = this.dd.join(",");
                this.zhu2 = 0;
              }
            }
            if (indexf == 2 && item.choose === false) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.cn = this.dd.join(",");
                this.zhu3 = 0;
              }
            }
            if (indexf == 3 && item.choose === false) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.dn = this.dd.join(",");
                this.zhu4 = 0;
              }
            }
            if (indexf == 4 && item.choose === false) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.en = this.dd.join(",");
                this.zhu5 = 0;
              }
            }
            if (indexf == 5 && item.choose === false) {
              for (let i = 0; i < numViews.nums.length; i++) {
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"), 1, "");
                this.dd = this.d.filter(function(n) {
                  return n;
                });
                this.fn = this.dd.join(",");
                this.zhu6 = 0;
              }
            }
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
              this.fn;
            this.$store.state.con = this.$store.state.con
              .split(",")
              .filter(function(n) {
                return n;
              })
              .join(",");
            this.$store.state.pd.addCon = this.$store.state.con;
            this.$store.state.zhu =
              this.zhu1 +
              this.zhu2 +
              this.zhu3 +
              this.zhu4 +
              this.zhu5 +
              this.zhu6;
            this.$store.state.pd.addzhu = this.$store.state.zhu;
          }
        }
        //三不同--
        if (this.className === "k3_star3_same_not") {
          if (indexf == 0) {
            this.d1.splice(index, 1, "");
            this.dd = this.d1.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          }
          if (indexf == 1) {
            this.d2.splice(index, 1, "");
            this.dd = this.d2.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join(",");
          }
          if (indexf == 2) {
            this.d3.splice(index, 1, "");
            this.dd = this.d3.filter(function(n) {
              return n;
            });
            this.cn = this.dd.join(",");
          }
          if (indexf == 3) {
            this.d4.splice(index, 1, "");
            this.dd = this.d4.filter(function(n) {
              return n;
            });
            this.dn = this.dd.join(",");
          }
          if (indexf == 4) {
            this.d5.splice(index, 1, "");
            this.dd = this.d5.filter(function(n) {
              return n;
            });
            this.en = this.dd.join(",");
          }
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
          this.$store.state.con = this.$store.state.con
            .split(",")
            .filter(function(n) {
              return n;
            })
            .join(",");
          this.$store.state.pd.addCon = this.$store.state.con;
        }
        //三同号--
        if (this.className === "k3_star3_same") {
          if (indexf == 0) {
            this.d1.splice(index, 1, "");
            this.dd = this.d1.filter(function(n) {
              return n;
            });
            this.an = this.dd.join(",");
          }
          if (indexf == 1) {
            this.d2.splice(index, 1, "");
            this.dd = this.d2.filter(function(n) {
              return n;
            });
            this.bn = this.dd.join(",");
          }
          this.$store.state.con = this.an + "," + this.bn;
          this.$store.state.con = this.$store.state.con
            .split(",")
            .filter(function(n) {
              return n;
            })
            .join(",");
          this.$store.state.pd.addCon = this.$store.state.con;
        }
      }
    },
    //菜单选择项1
    playGroupBut(item, index) {
      this.$emit("clearTimeInters");//清除定时器
      this.navTo = index;
      this.playNum = 0;
      this.current_player = item;
      this.current_player_bonus = item.groups[0].players[0];
      this.className = this.current_player_bonus.id;
      this.$store.state.className = this.current_player_bonus.id;
      this.iscreat();
      switch (item.title) {
        case "单骰":
          this.addTitle = "单挑一骰";
          break;
        case "二骰":
          this.addTitle = "二不同";
          break;
        case "三骰":
          this.addTitle = "和值";
          break;
      }
    },
    //菜单选择项2
    playersBut(play, indexff) {
      this.playNum = indexff;
      this.current_player_bonus = play;
      this.className = play.id;
      this.$store.state.className = play.id;
      this.$store.commit("CLASSNAME", this.className);
      this.addTitle = play.title;
      this.iscreat();
    },
    //清空
    iscreat() {
      this.$store.state.zhu = 0;
      this.$store.state.k3conTemp = [];
      this.$store.state.k3zhuTemp = 0;
      this.zhu1 = 0;
      this.zhu2 = 0;
      this.zhu3 = 0;
      this.zhu4 = 0;
      this.zhu5 = 0;
      this.zhu6 = 0;
      this.$store.state.pd = {};
      this.d = [];
      this.d1 = [];
      this.d2 = [];
      this.d3 = [];
      this.d4 = [];
      this.d5 = [];
      this.d6 = [];
      this.$store.state.spinner3 = 0;
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
      this.$store.state.con = "";
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
<style lang='scss' scoped>
@import "@/assets/scss/lotterbet/lottlist.scss";
@import "@/assets/scss/lotterbet/k3.scss";
</style>
