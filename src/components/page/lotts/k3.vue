<template>
  <div class="lott">
    <div class="lott-center">
      <div class="lott-top">
        <div class="lott-top-left"><img src="@/assets/img/lott/k3.png" alt="" />
          <span>{{lottName}}</span>
        </div>
        <div class="lott-top-middle k3">
          <p>第
            <span>{{seasonId}}</span>期 剩余投注时间</p>
          <div>{{countDown}}</div>
        </div>
        <div class="lott-top-right k3">
          <p>第
            <span>{{lastSeasonId}}</span>期 开奖结果</p>
          <div class="showGif" v-show="isshowGif">
            <span v-for="(item,index) in 3" :key="index"></span>
          </div>
          <div class="showName" v-show="!isshowGif">
            <img :src='"@/assets/img/lott/k3n"+n1+".jpg"' alt="">
            <img :src='"@/assets/img/lott/k3n"+n2+".jpg"' alt="">
            <img :src='"@/assets/img/lott/k3n"+n3+".jpg"' alt="">
          </div>
        </div>
      </div>
      <div class="lottBox">
        <div class="lott-left">
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
          <div class="getPlayTree">
            <ul>
              <li :class="{'active': index === navTo}" v-for="(item,index) in playGroups" :key="index" @click="playGroupBut(item,index)">{{item.title}}</li>
            </ul>
          </div>
          <div class="getPlayTreeBox">
            <ul>
              <li v-for="(item,indexs) in sgroups2" :key="indexs" v-show="indexs === navTo">
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
                <p :class="[item.choose ? 'active' : '',className]" v-for="(item,indexha) in numViews.nums" :key="indexha" @click="curBalls(item,indexha,numViews,indexf)" v-if="lotteryId !== 'dfk3' && item.ball !== '03' && item.ball !== '18'">
                  <span v-if="className !== 'k3_star3_and'">{{className === 'k3_star2_same' && indexha === 5 ? item.ball : ''}}</span>
                  <span v-else>
                    <i>{{item.ball}}</i>
                    <i>赔160.00</i>
                  </span>
                </p>
                <p :class="[item.choose ? 'active' : '',className]" v-for="(item,indexha) in numViews.nums" :key="indexha" @click="curBalls(item,indexha,numViews,indexf)" v-if="lotteryId === 'dfk3'">
                  <span v-if="className !== 'k3_star3_and'">{{className === 'k3_star2_same' && indexha === 5 ? item.ball : ''}}</span>
                  <span v-else>
                    <i>{{item.ball}}</i>
                    <i>赔60.00</i>
                  </span>
                </p>
                <!-- <star :class="className+'All'" v-if="className === 'k3_star2_same'" :con="con" :zhu="zhu" :item="item" :indexha="indexha" :numViews="numViews" :indexf="indexf"></star> -->
                <!-- <div :class="className+'All'" v-if="className === 'k3_star2_same'" @click="curBallsAll(numViews,indexf)">
                  <span></span>
                </div> -->
              </div>
            </div>
            <div class="zhu">
              <p>您选择了<i>{{zhu}}</i> 注</p>
              <div class="butBox">
                <div class="numSum">
                  <span class="trim">投注金额</span>
                  <yd-spinner v-model="spinner3" min="0"></yd-spinner>
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
                  <li><span>{{item.addCon}}</span></li>
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
                <span>总注数：{{zhu}}, </span>
                <span>总金额：{{zhu*spinner3}}, </span>
                <span>余额：{{$store.state.balance}}</span>
              </p>
              <button @click="affirmBetGo">确认投注</button>
            </div>
          </div>
        </div>
        <div class="lott-right">
          <div class="lott-right-top1">
            <button>今日开奖</button>
            <p>
              <span>走势图</span>
              <i>|</i>
              <span>玩法说明</span>
            </p>
          </div>
          <div class="lott-right-top2">
            <p class="lott-right-top2-title">
              <span class="lott-right-top2-span1">期号</span>
              <span class="lott-right-top2-span2 k3">开奖号码</span>
              <span class="lott-right-top2-span3">和值</span>
              <span class="lott-right-top2-span4">形态</span>
            </p>
            <ul>
              <li v-for="(item,index) in getPastOpens" :key="index">
                <span class="lott-right-top2-span1">{{item.seasonId}}</span>
                <span class="lott-right-top2-span2 k3">
                  <i>{{item.n1}}</i>
                  <i>{{item.n2}}</i>
                  <i>{{item.n3}}</i>
                </span>
                <span class="lott-right-top2-span3">{{item.n1+item.n2+item.n3}}</span>
                <span class="lott-right-top2-span4">
                  <i :class="(item.n1+item.n2+item.n3) < 11 ? 'yellow' : 'blue'">{{(item.n1+item.n2+item.n3)
                    < 11 ? "小" : "大"}}</i>
                      <i :class="(item.n1+item.n2+item.n3) % 2 ===0 ? 'yellow' : 'blue'">{{(item.n1+item.n2+item.n3) % 2 ===0 ? "双" : "单"}}</i>
                </span>
              </li>
            </ul>
          </div>
          <div class="lott-right-top3">
            <button>我的投注</button>
            <p></p>
          </div>
          <div class="lott-right-top4">
            <p class="lott-right-top4-title">
              <span class="lott-right-top4-span1">期号</span>
              <span class="lott-right-top4-span2">投注金额</span>
              <span class="lott-right-top4-span3">奖金</span>
            </p>
            <ul>
              <li v-for="(item,index) in orderList" :key="index" v-if="index < 4">
                <span class="lott-right-top4-span1">{{item.seasonId}}</span>
                <span class="lott-right-top4-span2">
                  <i>{{item.amount}}.00</i>
                </span>
                <span class="lott-right-top4-span3" :class="{'status': item.win === 0}" v-if="item.statusName !== '已中奖'">
                  <i>{{item.statusName}}</i>
                </span>
                <span class="lott-right-top4-span3" v-else>
                  <i>{{item.win}}</i>
                </span>
              </li>
              <li class="lott-right-top4-but">更多>></li>
            </ul>
          </div>
          <div class="lott-right-top5">
            <button :class="butClass1 ? 'active' : ''" @click="butClass1C">中奖信息</button>
            <button :class="butClass2 ? 'active' : ''" @click="butClass2C">昨日盈利榜</button>
          </div>
          <div class="lott-right-top6" v-show="butClass1">
            <p class="lott-right-top6-title">
              <span class="lott-right-top6-span1">中奖信息实时更新</span>
            </p>
            <ul>
              <li :class="{anim:animate==true}" v-for="(item,index) in winpool" :key="index">
                <img :src="item.paths" alt="" />
                <div class="rightBox">
                  <p>
                    <span>{{item.name | mask}} </span>
                    <span> &nbsp;在{{item.lotterylist}}</span>
                  </p>
                  <p>
                    <span>喜中：</span>
                    <span>￥
                      <i>{{item.money | keepTwoNum}}</i>
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="lott-right-top7" v-show="butClass2">
            <p class="lott-right-top6-title">
              <span class="lott-right-top6-span1">昨日累计盈利排行榜</span>
            </p>
            <ul>
              <li v-for="(item,index) in winList" :key="index">
                <div class="champion">
                  <img :src='"../../../../static/images/"+item.img+".jpg"' alt="" />
                  <p>
                    <span>账号昵称 ：
                      <i class="nickname">{{item.account | mask}}</i>
                    </span>
                    <span>昨日盈利 ：
                      <i class="gain">{{item.bonus}}</i>
                      <i>元</i>
                    </span>
                  </p>
                </div>
                <p class="index">{{index+1}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <firmbet ref="firmbet" :productList="productList" :content="String(this.seasonId)-1"></firmbet>
  </div>
</template>
<script>
import firmbet from '@/components/loading/firmbet.vue';
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      isfirmbet:false,
      number:null,
      isshowPop:false,
      num: 0,
      left: 0,
      sum: 0,
      navTo: 0,
      playNum: 0,
      zhu: 0,
      spinner3: 0,
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
      productList: [],
      pd: {
        addTitle: "单挑一骰",
        addCon: null,
        addPattern: "元",
        addzhu: null,
        addMoney: null,
        addClassName:null,
        addSeasonId:null
      },
      addTitle: "单挑一骰",
      d: [], //选中的号码的下标
      d1: [], //选中的号码的下标
      d2: [], //选中的号码的下标
      d3: [], //选中的号码的下标
      d4: [], //选中的号码的下标
      d5: [], //选中的号码的下标
      d6: [], //选中的号码的下标
      dd: [], //选中的号码的下标
      zhu1:0,
      zhu2:0,
      zhu3:0,
      zhu4:0,
      zhu5:0,
      zhu6:0,
      butClass1: true,
      butClass2: false,
      animate: true,
      orderList: null,
      className: "k3_star1", //玩法ID
      lottName: "宏發快3", //彩种名
      arrLottId: [],
      arrLottName: [],
      lotteryId: "dfk3", //彩种id
      lottNameIndex: 0, //默认彩种
      winList: null, //中奖列表
      lotteryList: null,
      getPastOpens: null,
      getPastOpenB: null,
      playGroups: null, //玩法树
      playBonus: "", //玩法树
      bonusArray: [], //和值赔率
      playBonusId: "ssc_star5", //点击选中后获取此玩法ID
      current_player: {}, //當前玩法
      current_player_bonus: {}, //當前玩法
      getCurrentSaleTime: null, //获取彩種當前獎期時間
      today: "",
      countDown: "",
      timer: "",
      lastSeasonId: null, //当前期
      seasonId: null, //下一期
      isshowGif: false,
      n1: 2,
      n2: 4,
      n3: 6,
      splayGroups: [],
      sgroups: [],
      sgroups2: [],
      splayers: [],
      snumView: [],
      arrpeilva: [],
      arrpeilvb: [],
      arrpeilvc: [],
      winpool: [
        {
          name: "william",
          money: 95.08,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/6.jpg")
        },
        {
          name: "daniel",
          money: 1238.654,
          lotterylist: "安徽快3",
          paths: require("../../../../static/images/3.jpg")
        },
        {
          name: "江若泊",
          money: 853.66,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/1.jpg")
        },
        {
          name: "james",
          money: 452.442,
          lotterylist: "北京赛车",
          paths: require("../../../../static/images/2.jpg")
        },
        {
          name: "noah",
          money: 45.244,
          lotterylist: "北京赛车",
          paths: require("../../../../static/images/0.jpg")
        },
        {
          name: "samuel",
          money: 85.17,
          lotterylist: "上海快3",
          paths: require("../../../../static/images/7.jpg")
        },
        {
          name: "david",
          money: 132.04,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/9.jpg")
        },
        {
          name: "sophia",
          money: 158.25,
          lotterylist: "上海快3",
          paths: require("../../../../static/images/2.jpg")
        },
        {
          name: "anthony",
          money: 458.23,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/3.jpg")
        },
        {
          name: "elizabeth",
          money: 5499.08,
          lotterylist: "北京快3",
          paths: require("../../../../static/images/6.jpg")
        },
        {
          name: "christian",
          money: 77.654,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/5.jpg")
        },
        {
          name: "brandon",
          money: 856.07,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/1.jpg")
        },
        {
          name: "zachary",
          money: 1207.654,
          lotterylist: "上海快3",
          paths: require("../../../../static/images/0.jpg")
        },
        {
          name: "jessica,",
          money: 21.36,
          lotterylist: "北京快3",
          paths: require("../../../../static/images/2.jpg")
        },
        {
          name: "robert",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/3.jpg")
        },
        {
          name: "Justin",
          money: 31.55,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/8.jpg")
        },
        {
          name: "Hunter",
          money: 1587.24,
          lotterylist: "湖北快3",
          paths: require("../../../../static/images/5.jpg")
        },
        {
          name: "Victoria",
          money: 13.14,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/4.jpg")
        },
        {
          name: "若烟",
          money: 4524.28,
          lotterylist: "湖北快3",
          paths: require("../../../../static/images/7.jpg")
        },
        {
          name: "adfas",
          money: 7452.0,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/2.jpg")
        },
        {
          name: "Jasmine",
          money: 8532.66,
          lotterylist: "广西快3",
          paths: require("../../../../static/images/1.jpg")
        },
        {
          name: "霍去病",
          money: 9535.03,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/8.jpg")
        },
        {
          name: "fdsawqg",
          money: 156877.1,
          lotterylist: "广西快3",
          paths: require("../../../../static/images/7.jpg")
        },
        {
          name: "gfukhgj",
          money: 1563.2,
          lotterylist: "江苏快3",
          paths: require("../../../../static/images/6.jpg")
        },
        {
          name: "dfhteuj",
          money: 15687.88,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/9.jpg")
        },
        {
          name: "辛弃疾",
          money: 21.36,
          lotterylist: "江苏快3",
          paths: require("../../../../static/images/0.jpg")
        },
        {
          name: "ytmioi",
          money: 89.12,
          lotterylist: "甘肃快3",
          paths: require("../../../../static/images/1.jpg")
        },
        {
          name: "nkkrtuy",
          money: 7552.12,
          lotterylist: "安徽快3",
          paths: require("../../../../static/images/3.jpg")
        },
        {
          name: "hfdw6mm",
          money: 1356.16,
          lotterylist: "吉林快3",
          paths: require("../../../../static/images/2.jpg")
        },
        {
          name: "ksfgfdsg",
          money: 1535.0,
          lotterylist: "北京赛车",
          paths: require("../../../../static/images/6.jpg")
        },
        {
          name: "ewdghtr",
          money: 15687.88,
          lotterylist: "新疆时时彩",
          paths: require("../../../../static/images/5.jpg")
        },
        {
          name: "rey",
          money: 26.12,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/7.jpg")
        },
        {
          name: "Joey",
          money: 12.04,
          lotterylist: "新疆时时彩",
          paths: require("../../../../static/images/8.jpg")
        },
        {
          name: "John",
          money: 138.32,
          lotterylist: "河北快3",
          paths: require("../../../../static/images/9.jpg")
        },
        {
          name: "Nathan",
          money: 853482.66,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/1.jpg")
        },
        {
          name: "Stan",
          money: 85000,
          lotterylist: "重庆时时彩",
          paths: require("../../../../static/images/0.jpg")
        },
        {
          name: "Jason",
          money: 1238.654,
          lotterylist: "北京快3",
          paths: require("../../../../static/images/9.jpg")
        },
        {
          name: "Tino",
          money: 85000,
          lotterylist: "宏發快3",
          paths: require("../../../../static/images/6.jpg")
        },
        {
          name: "Stephen",
          money: 85000,
          lotterylist: "新疆时时彩",
          paths: require("../../../../static/images/3.jpg")
        },
        {
          name: "Neo",
          money: 6120,
          lotterylist: "广西快3",
          paths: require("../../../../static/images/8.jpg")
        }
      ],
      item: {},
      indexha: 0
    };
  },
  created() {
    setInterval(this.scroll, 1400);
  },
  destroyed() {
    clearInterval(this.timer);
    clearTimeout(this.timer2);
    this.iscreat();
  },
  mounted() {
    this.getLastDayWinList();
    this.lotteryAll();
    this.getPlayTree();
    this.geteServerTime();
  },
  methods: {
    //中间->投注选号
    curBalls(item, index, numViews, indexf) {
      this.item = item;
      this.indexha = index;
      item.choose = !item.choose;
      if (item.choose === true) {
        this.d[index] = item.ball;
        this.dd = this.d.filter(function(n) {return n;});
        this.zhu++;
        this.pd.addTitle = this.addTitle;
        this.pd.addCon = this.dd.join(",");
        this.con = this.dd.join(",");
        this.pd.addPattern = "元";
        this.pd.addzhu = this.zhu;
        this.pd.addMoney = this.spinner3;
        this.pd.addClassName = this.className;
        this.pd.addSeasonId = this.seasonId;
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
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.con = this.con.split(",").filter(function(n) {return n;}).join(",");
          this.pd.addCon = this.con;
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
          this.con =this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en;
          this.con = this.con.split(",").filter(function(n) {return n;}).join(",");
          this.pd.addCon = this.con;
        }
        //二同号++
        if (this.className === "k3_star2_same") {
          if(index !== 5){
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
          if(index === 5){
            if (indexf == 0 && item.choose === true) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.an = this.dd.join(",");
                this.zhu1 = 5;
              }
            }
            if (indexf == 1 && item.choose === true) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.bn = this.dd.join(",");
                this.zhu2 = 5;
              }
            }
            if (indexf == 2 && item.choose === true) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.cn = this.dd.join(",");
                this.zhu3 = 5;
              }
            }
            if (indexf == 3 && item.choose === true) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.dn = this.dd.join(",");
                this.zhu4 = 5;
              }
            }
            if (indexf == 4 && item.choose === true) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.en = this.dd.join(",");
                this.zhu5 = 5;
              }
            }
            if (indexf == 5 && item.choose === true) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = true;
                this.d[i] = numViews.nums[i].ball;
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.fn = this.dd.join(",");
                this.zhu6 = 5;
              }
            }
          }
          this.con =this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en +"," +this.fn;
          this.con = this.con.split(",").filter(function(n) {return n;}).join(",");
          this.zhu = this.zhu1+this.zhu2+this.zhu3+this.zhu4+this.zhu5+this.zhu6;
          this.pd.addzhu = this.zhu;
          this.pd.addCon = this.con;
          console.log("indexf:",this.con)
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
          this.con =this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en;
          this.con = this.con.split(",").filter(function(n) {return n;}).join(",");
          this.pd.addCon = this.con;
        }
        //三同号++
        if (this.className === "k3_star3_same"){
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
          this.con =this.an +"," +this.bn;
          this.con = this.con.split(",").filter(function(n) {return n;}).join(",");
          this.pd.addCon = this.con;
        }
      } else {
        this.d.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {return n;});
        this.zhu--;
        this.pd.addCon = this.dd.join(",");
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
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.con = this.con.split(",").filter(function(n) {return n;}).join(",");
          this.pd.addCon = this.con;
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
          this.con =this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en;
          this.con = this.con.split(",").filter(function(n) {return n;}).join(",");
          this.pd.addCon = this.con;
        }
        //二同号--
        if (this.className === "k3_star2_same") {
          if(index !== 5){
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
          if(index === 5){
            if (indexf == 0 && item.choose === false) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.an = this.dd.join(",");
                this.zhu1 = 0;
              }
            }
            if (indexf == 1 && item.choose === false) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.bn = this.dd.join(",");
                this.zhu2 = 0;
              }
            }
            if (indexf == 2 && item.choose === false) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.cn = this.dd.join(",");
                this.zhu3 = 0;
              }
            }
            if (indexf == 3 && item.choose === false) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.dn = this.dd.join(",");
                this.zhu4 = 0;
              }
            }
            if (indexf == 4 && item.choose === false) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.en = this.dd.join(",");
                this.zhu5 = 0;
              }
            }
            if (indexf == 5 && item.choose === false) {
              for(let i = 0; i< numViews.nums.length; i++){
                numViews.nums[i].choose = false;
                this.d.splice(i, 1, "");
                this.d.splice(this.d.indexOf("全选"),1,"");
                this.dd = this.d.filter(function(n) {return n;});
                this.fn = this.dd.join(",");
                this.zhu6 = 0;
              }
            }
          }
          this.con =this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en +"," +this.fn;
          this.con = this.con.split(",").filter(function(n) {return n;}).join(",");
          this.zhu = this.zhu1+this.zhu2+this.zhu3+this.zhu4+this.zhu5+this.zhu6;
          this.pd.addzhu = this.zhu;
          this.pd.addCon = this.con;
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
          this.con =this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en;
          this.con = this.con.split(",").filter(function(n) {return n;}).join(",");
          this.pd.addCon = this.con;
        }
        //三同号--
        if (this.className === "k3_star3_same"){
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
          this.con =this.an +"," +this.bn;
          this.con = this.con.split(",").filter(function(n) {return n;}).join(",");
          this.pd.addCon = this.con;
        }
      }
    },
    //玩法术
    getPlayTree() {
      var now = new Date().getTime();
      if (localStorage.getItem("getPlayTree_playGroups_k3") !== null) {
        var setupTime = localStorage.getItem("data_getPlayTree_k3");
        if (
          setupTime === null ||
          now - setupTime > this.$store.state.cacheTime
        ) {
          localStorage.removeItem("getPlayTree_playGroups_k3");
          localStorage.removeItem("getPlayTree_playBonus_k3");
          localStorage.removeItem("data_getPlayTree_k3");
          this.$axios
            .get(
              baseUrl + "/api/lottery/getPlayTree?lotteryId=" + this.lotteryId
            )
            .then(res => {
              localStorage.setItem(
                "getPlayTree_playGroups_k3",
                JSON.stringify(res.data.data.playGroups)
              );
              localStorage.setItem(
                "getPlayTree_playBonus_k3",
                JSON.stringify(res.data.data.playBonus)
              );
              localStorage.setItem("data_getPlayTree_k3", now);
              this.playGroups = JSON.parse(
                localStorage.getItem("getPlayTree_playGroups_k3")
              );
              this.playBonus = JSON.parse(
                localStorage.getItem("getPlayTree_playBonus_k3")
              );
              this.setupPlayTree();
            })
            .catch(error => {
              console.log("玩法术,No");
            });
        } else {
          this.playGroups = JSON.parse(
            localStorage.getItem("getPlayTree_playGroups_k3")
          );
          this.playBonus = JSON.parse(
            localStorage.getItem("getPlayTree_playBonus_k3")
          );
          this.setupPlayTree();
        }
      } else {
        this.$axios
          .get(baseUrl + "/api/lottery/getPlayTree?lotteryId=" + this.lotteryId)
          .then(res => {
            localStorage.setItem(
              "getPlayTree_playGroups_k3",
              JSON.stringify(res.data.data.playGroups)
            );
            localStorage.setItem(
              "getPlayTree_playBonus_k3",
              JSON.stringify(res.data.data.playBonus)
            );
            localStorage.setItem("data_getPlayTree_k3", now);
            this.playGroups = JSON.parse(
              localStorage.getItem("getPlayTree_playGroups_k3")
            );
            this.playBonus = JSON.parse(
              localStorage.getItem("getPlayTree_playBonus_k3")
            );
            this.setupPlayTree();
          })
          .catch(error => {
            console.log("玩法术,No");
          });
      }
    },
    setupPlayTree() {
      let arr1 = [];
      let arr2 = [];
      let arrpeilv1 = JSON.parse(JSON.stringify(this.playBonus[3].bonusArray));
      let arrpeilv2 = JSON.parse(JSON.stringify(this.playBonus[4].bonusArray));
      if (this.lotteryId === "dfk3") {
        for (let i in arrpeilv1) {
          this.arrpeilva.push(arrpeilv1[i]);
        }
        this.arrpeilva.shift();
        this.arrpeilva.pop();
        for (let i = 0; i < this.arrpeilva.length / 2; i++) {
          arr1.push(this.arrpeilva[i]);
        }
        for (
          let i = this.arrpeilva.length / 2;
          i < this.arrpeilva.length;
          i++
        ) {
          arr2.push(this.arrpeilva[i]);
        }
        for (let i in arrpeilv2) {
          this.arrpeilvb.push(arrpeilv2[i]);
        }
        this.arrpeilvc.push(arr1);
        this.arrpeilvc.push(arr2);
        this.arrpeilvc.push(this.arrpeilvb);
      } else if (this.lotteryId !== "dfk3") {
        this.arrpeilva = [];
        this.arrpeilvb = [];
        for (let i in arrpeilv1) {
          this.arrpeilva.push(arrpeilv1[i]);
        }
        for (let i = 0; i < this.arrpeilva.length / 2; i++) {
          arr1.push(this.arrpeilva[i]);
        }
        for (
          let i = this.arrpeilva.length / 2;
          i < this.arrpeilva.length;
          i++
        ) {
          arr2.push(this.arrpeilva[i]);
        }
        for (let i in arrpeilv2) {
          this.arrpeilvb.push(arrpeilv2[i]);
        }
      }
      this.current_player = this.playGroups[0].groups[0].players[0];
      this.current_player_bonus = this.current_player;
      for (let i = 0; i < this.playGroups.length; i++) {
        this.splayGroups.push(this.playGroups[i]);
      }
      for (let j = 0; j < this.splayGroups.length; j++) {
        this.sgroups.push(this.splayGroups[j].groups);
      }
      for (let k = 0; k < this.sgroups.length; k++) {
        for (let j = 0; j < this.sgroups[k].length; j++) {
          this.sgroups2.push(this.sgroups[k][j]);
        }
      }
      for (let i = 0; i < this.sgroups2.length; i++) {
        this.splayers.push(this.sgroups2[i].players);
      }
      for (let h = 0; h < this.splayers.length; h++) {
        for (let i = 0; i < this.splayers[h].length; i++) {
          this.snumView.push(this.splayers[h][i].numView);
        }
      }
      this.displayBonus = this.splayers[0][0].displayBonus;
    },
    //确认投注
    affirmBetGo(){
      if(this.productList.length == 0){
        this.$pop.show({title:'温馨提示',content:'您未选择号码,号码篮是空的！',content1:String(this.seasonId),content2:String(Number(this.seasonId)+1),number:1});
      }else{
        this.$refs.firmbet.isshow();
        // this.$refs.firmbet.betGo();
      }
    },
    //立即投注
    betGo() {
      if(this.zhu === 0){
        this.$pop.show({title:'',content:'您尚未选定一个完整的投注。',content1:'',content2:'',number:2});
      }else if(this.spinner3 === 0){
        this.$pop.show({title:'',content:'您有号码未设置金额，请核对后投注。',content1:'',content2:'',number:2});
      }else{
        let formData = new FormData();
        formData.append("order[0].content", this.con);
        formData.append("order[0].betCount", this.zhu);
        formData.append("order[0].price", this.spinner3);
        formData.append("order[0].unit", 1);
        formData.append("order[0].playId", this.className);
        formData.append("count", this.zhu);
        formData.append("traceOrders[0].price", this.spinner3);
        formData.append("traceOrders[0].seasonId", this.seasonId);
        formData.append("bounsType", 0);
        formData.append("traceWinStop", 0);
        formData.append("isTrace", 0);
        formData.append("lotteryId", this.$route.params.lotteryId);
        formData.append("amount", this.spinner3 * this.zhu);
        this.$axios
          .post(baseUrl + "/api/lottery/bet", formData, this.$store.state.config)
          .then(res => {
            if (res.data.message === "success") {
              this.getbetOrderList();//我的投注
              this.iscreat();
              this.$pop.show({title:'温馨提示',content:'恭喜您，投注成功！',content1:'',content2:'',number:1});
            } else {
              this.iscreat();
              console.warn(res.data.data);
            }
          })
          .catch(error => {
            console.log("立即投注,No");
          });
      }
    },
    //导航点击
    lottListNav(item, index) {
      this.$refs.popTo.closeSimpleDialog();
      this.productList = [];
      this.arrLottName.indexOf();
      this.lottName = item.name;
      this.lottNameIndex = index;
      this.$router.push("/lotts/k3/" + item.id);
      this.getPlayTree();//玩法术
      this.getPastOp();//获取过去开奖号码10个
      this.geteServerTime();//获取彩種當前獎期時間
    },
    //清空
    iscreat() {
      this.zhu = 0;
      this.zhu1 = 0;
      this.zhu2 = 0;
      this.zhu3 = 0;
      this.zhu4 = 0;
      this.zhu5 = 0;
      this.zhu6 = 0;
      this.pd = {};
      this.d = [];
      this.d1 = [];
      this.d2 = [];
      this.d3 = [];
      this.d4 = [];
      this.d5 = [];
      this.d6 = [];
      this.spinner3 = 0;
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
      this.con = "";
      for (let h = 0; h < this.snumView.length; h++) {
        if (null != this.snumView[h]) {
          for (let j = 0; j < this.snumView[h].length; j++) {
            for (let k = 0; k < this.snumView[h][j].nums.length; k++) {
              this.snumView[h][j].nums[k].choose = false;
            }
          }
        }
      }
    },
    // 获取彩种
    lotteryAll() {
      var now = new Date().getTime();
      if (localStorage.getItem("lotteryAll_k3") !== null) {
        var setupTime = localStorage.getItem("data_lotteryAll_k3");
        if (
          setupTime === null ||
          now - setupTime > this.$store.state.cacheTime
        ) {
          localStorage.removeItem("lotteryAll_k3");
          localStorage.removeItem("data_lotteryAll_k3");
          this.$axios
            .get(baseUrl + "/api/lottery/getLotteryList")
            .then(res => {
              localStorage.setItem(
                "lotteryAll_k3",
                JSON.stringify(res.data.data.k3)
              );
              this.lotteryList = JSON.parse(
                localStorage.getItem("lotteryAll_k3")
              );
              localStorage.setItem("data_lotteryAll_k3", now);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.lotteryList = JSON.parse(localStorage.getItem("lotteryAll_k3"));
          this.lotteryList.map(k => {
            this.arrLottId.push(k.id);
            this.arrLottName.push(k.name);
          });
          this.lottNameIndex = this.arrLottId.indexOf(
            this.$route.params.lotteryId
          );
          if (this.lottNameIndex > 5) {
            this.left = -200;
          }
        }
      } else {
        this.$axios
          .get(baseUrl + "/api/lottery/getLotteryList")
          .then(res => {
            localStorage.setItem(
              "lotteryAll_k3",
              JSON.stringify(res.data.data.k3)
            );
            this.lotteryList = JSON.parse(
              localStorage.getItem("lotteryAll_k3")
            );
            localStorage.setItem("data_lotteryAll_k3", now);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    //获取过去开奖号码10个
    getPastOp() {
      this.$axios
        .get(baseUrl + "/api/lottery/getPastOpen", {
          params: { lotteryId: this.$route.params.lotteryId, count: 10 }
        })
        .then(res => {
          this.getPastOpens = res.data.data;
          this.getPastOpenB = res.data.data;
          this.n1 = this.getPastOpens[0].n1;
          this.n2 = this.getPastOpens[0].n2;
          this.n3 = this.getPastOpens[0].n3;
          if (Number(res.data.data[0].seasonId) !== Number(this.lastSeasonId)) {
            this.isshowGif = true;
            this.reGetPastOp();
          } else {
            clearTimeout(this.timer2);
            this.isshowGif = false;
            this.getbetOrderList();
          }
        })
        .catch(error => {
          console.log("获取过去开奖号码No");
        });
    },
    reGetPastOp() {
      clearTimeout(this.timer2);
      this.timer2 = setTimeout(() => {
        this.getPastOp();//获取过去开奖号码10个
      }, 12000);
    },
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
        })
        .catch(error => {
          console.log("获取投注记录失败");
        });
    },
    //获取彩種當前獎期時間
    geteServerTime() {
      clearInterval(this.timer);
      this.$axios
        .get(baseUrl + "/api/lottery/getCurrentSaleTime", {
          params: { lotteryId: this.$route.params.lotteryId }
        })
        .then(res => {
          if (res.data.code === 1) {
            this.getCurrentSaleTime = res.data.data;
            this.today = res.data.data.restSeconds;
            this.lastSeasonId = this.getCurrentSaleTime.lastSeasonId;
            this.seasonId = this.getCurrentSaleTime.seasonId;
            this.initSetTimeout();//倒计时
            this.getPastOp();//获取过去开奖号码10个
          }
        });
    },
    //倒计时
    initSetTimeout() {
      this.timer = setInterval(() => {
        this.today = this.today - 1;
        this.setTimeMode();//時間格式轉換
        if (this.today < 1) {
          clearInterval(this.timer);
          this.timesUp();
        }
        if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 47
        ) {
          this.getPastOp();//获取过去开奖号码10个
        } else if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 46
        ) {
          this.getPastOp();//获取过去开奖号码10个
        } else if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 45
        ) {
          this.getPastOp();//获取过去开奖号码10个
        }
      }, 1000);
    },
    //時間格式轉換
    setTimeMode() {
      var hours = Math.floor((this.today % (1 * 60 * 60 * 24)) / (1 * 60 * 60));
      var minutes = Math.floor((this.today % (1 * 60 * 60)) / (1 * 60));
      var seconds = Math.floor((this.today % (1 * 60)) / 1);
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.countDown = hours + ":" + minutes + ":" + seconds;
    },
    //時間到彈窗
    timesUp() {
      this.isshowGif = true;
      this.geteServerTime();
      this.$pop.show({title:'温馨提示',content:'已经到底啦',content1:String(this.seasonId),content2:String(Number(this.seasonId)+1),number:3});
    },
    //中奖信息
    butClass1C() {
      this.butClass2 = false;
      this.butClass1 = true;
    },
    //昨日盈利
    butClass2C() {
      this.butClass1 = false;
      this.butClass2 = true;
    },
    // 获取昨日盈利榜单
    getLastDayWinList() {
      var now = new Date().getTime();
      if (localStorage.getItem("getLastDayWinList") !== null) {
        var setupTime = localStorage.getItem("data_getLastDayWinList");
        if (
          setupTime === null ||
          now - setupTime > this.$store.state.cacheTime
        ) {
          localStorage.removeItem("getLastDayWinList");
          localStorage.removeItem("data_getLastDayWinList");
          this.$axios
            .get(baseUrl + "/api/lottery/getLastDayWinList")
            .then(res => {
              localStorage.setItem(
                "getLastDayWinList",
                JSON.stringify(res.data.data)
              );
              this.winList = JSON.parse(
                localStorage.getItem("getLastDayWinList")
              );
              localStorage.setItem("data_getLastDayWinList", now);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.winList = JSON.parse(localStorage.getItem("getLastDayWinList"));
        }
      } else {
        this.$axios
          .get(baseUrl + "/api/lottery/getLastDayWinList")
          .then(res => {
            localStorage.setItem(
              "getLastDayWinList",
              JSON.stringify(res.data.data)
            );
            this.winList = JSON.parse(
              localStorage.getItem("getLastDayWinList")
            );
            localStorage.setItem("data_getLastDayWinList", now);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    //滚动动画
    scroll() {
      this.animate = !this.animate;
      setTimeout(() => {
        this.winpool.push(this.winpool[0]);
        this.winpool.shift();
        this.animate = !this.animate;
      }, 0);
    },
    //菜单选择项1
    playGroupBut(item, index) {
      this.navTo = index;
      this.playNum = 0;
      this.current_player = item;
      this.current_player_bonus = item.groups[0].players[0];
      this.className = this.current_player_bonus.id;
      this.iscreat();
      console.log(index, this.className);
    },
    //菜单选择项2
    playersBut(play, indexff) {
      this.playNum = indexff;
      this.current_player_bonus = play;
      this.className = play.id;
      this.addTitle = play.title;
      this.iscreat();
      console.log(play.id);
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
        this.$pop.show({title:'温馨提示',content:'已经到底啦',content1:'',content2:'',number:2});
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
      }else{
        this.$pop.show({title:'温馨提示',content:'已经到顶啦',content1:'',content2:'',number:2});
      }
    },
    //添加号码栏
    addNum() {
      if(this.zhu === 0){
        this.$pop.show({title:'',content:'您尚未选定一个完整的投注。',content1:'',content2:'',number:2});
      }else if(this.spinner3 === 0){
        this.$pop.show({title:'',content:'您有号码未设置金额，请核对后投注。',content1:'',content2:'',number:2});
      }else{
        this.pd.addMoney = this.spinner3;
        this.productList.unshift(this.pd);
        this.pd = {};
        this.d = [];
        this.iscreat();
      }
      
    },
    //删除指定行
    deleList(item, index) {
      this.productList.splice(index, 1);
    },
    //清空
    exit() {
      this.productList = [];
    },
  },
  components:{
    firmbet
  },
  filters: {
    mask(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0) + "***" + value.charAt(value.length - 1);
    },
    keepTwoNum(value) {
      value = Number(value);
      return value.toFixed(2);
    },
    keepThreeNum(value) {
      value = parseInt(value * 1000) / 1000;
      return value;
    }
  },
  //focus
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/lotts/lottlist.scss";
@import "../../../assets/scss/lotts/k3.scss";
</style>
