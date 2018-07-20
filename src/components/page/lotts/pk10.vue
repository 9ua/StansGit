<template>
  <div class="lott">
    <div class="lott-center">
      <div class="lott-top">
        <div class="lott-top-left"><img src="@/assets/img/lott/pk10.png" alt="" />
          <span>{{lottName}}</span>
        </div>
        <div class="lott-top-middle pk10">
          <p>第
            <span>{{seasonId}}</span>期 剩余投注时间</p>
          <div>{{countDown}}</div>
        </div>
        <div class="lott-top-right pk10">
          <p>第
            <span>{{lastSeasonId}}</span>期 开奖结果</p>
          <div class="showName" v-show="!isshowGif">
            <span v-for="(item,index) in nBox" :key="index">{{item}}</span>
          </div>
          <div class="showGif" v-show="isshowGif">
            <span v-for="(item,index) in 10" :key="index"></span>
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
                  <span class="carTitle">{{numViews.title}}</span>
                  <div class="carBox">
                    <p class="car" :class="[item.choose ? 'active' : '',className]" v-for="(item,indexha) in numViews.nums" :key="indexha" @click="curBalls(item,indexha,numViews,indexf)">
                      <i>{{item.ball}}</i>
                      <b></b>
                    </p>
                  </div>
                </div>
                <tool class="changes" v-if="className !== 'pk10_side_lh' && className !== 'pk10_side_gy_and' && className !== 'pk10_side_ds'" :item="numViews"></tool>
                <!-- <div class="changes" v-if="className !== 'pk10_side_lh' && className !== 'pk10_side_gy_and' && className !== 'pk10_side_ds'">
                  <span :class="{'active':tools.choose}" v-for="(tools,indexto) in ballTools" :key="indexto" @click="toolsCur(tools,numViews)">{{tools.name}}</span>
                </div> -->
              </div>
            </div>
            <div class="zhu">
              <p>您选择了
                <i>{{zhu}}</i> 注</p>
              <div class="butBox">
                <div class="numSum">
                  <span class="trim">投注金额</span>
                  <yd-spinner v-model="spinner3" min="0"></yd-spinner>
                </div>
                <button class="add" @click="addNum">添加号码栏</button>
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
                <ul class="addList" ref="addList" v-for="(item,index) in productList" :key="index">
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
              <button>确认投注</button>
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
              <span class="lott-right-top2-span1 pk10">期号</span>
              <span class="lott-right-top2-span2 pk10">开奖号码</span>
              <span class="lott-right-top2-span3 pk10">开奖时间</span>
            </p>
            <ul>
              <li v-for="(item,index) in getPastOpens" :key="index">
                <span class="lott-right-top2-span1 pk10" v-if="$route.params.lotteryId === 'pk10'">{{item.seasonId}}</span>
                <span class="lott-right-top2-span1 pk10" v-else>{{item.seasonId.substring(5)}}</span>
                <span class="lott-right-top2-span2 pk10">
                  <i>{{item.n1}}</i>
                  <i>{{item.n2}}</i>
                  <i>{{item.n3}}</i>
                  <i>{{item.n4}}</i>
                  <i>{{item.n5}}</i>
                  <i>{{item.n6}}</i>
                  <i>{{item.n7}}</i>
                  <i>{{item.n8}}</i>
                  <i>{{item.n9}}</i>
                  <i>{{item.n10}}</i>
                </span>
                <span class="lott-right-top2-span3 pk10">{{item.addTime.substring(11)}}</span>
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
                <span class="lott-right-top4-span3" :class="{'status': item.win === 0}"  v-if="item.statusName !== '已中奖'">
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
  </div>
</template>
<script>
import tool from "@/components/page/lotts/tool.vue";
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      number:null,
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
      d: [], //选中的号码的下标
      dd: [], //选中的号码的下标
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
      productList: [],
      pd: {
        addTitle: "单挑一骰",
        addCon: null,
        addPattern: "元",
        addzhu: 0,
        addMoney: 0
      },
      addTitle: "单挑一骰",
      d: [], //选中的号码的下标
      dd: [], //选中的号码的下标
      arr: [],
      butClass1: true,
      butClass2: false,
      animate: true,
      orderList: null,
      className: "pk10_side_lh", //玩法ID
      lottName: "北京赛车", //彩种名
      arrLottId: [],
      arrLottName: [],
      lotteryId: "pk10", //彩种id
      lottNameIndex: 0, //默认彩种
      winList: null, //中奖列表
      lotteryList: null,
      getPastOpens: null,
      getPastOpenB: null,
      playGroups: null, //玩法树
      playBonus: "", //玩法树
      bonusArray: [], //和值赔率
      playBonusId: "pk10_side_lh", //点击选中后获取此玩法ID
      current_player: {}, //當前玩法
      current_player_bonus: {}, //當前玩法
      getCurrentSaleTime: null, //获取彩種當前獎期時間
      today: "",
      countDown: "",
      timer: "",
      lastSeasonId: null, //当前期
      seasonId: null, //下一期
      isshowGif: false,
      nBox: [1, 3, 5, 7, 9, 2, 4, 6, 8, 10],
      displayBonus: 0,
      displayBonus1: 0,
      displayBonus2: 0,
      displayBonus3: "",
      splayGroups: [],
      sgroups: [],
      sgroups2: [],
      splayers: [],
      snumView: [],
      arrpeilva: [],
      arrpeilvb: [],
      arrpeilvc: [],
      ballTools: [
        { fncode: "full", name: "全", choose: false },
        { fncode: "big", name: "大", choose: false },
        { fncode: "small", name: "小", choose: false },
        { fncode: "single", name: "单", choose: false },
        { fncode: "double", name: "双", choose: false },
        { fncode: "empty", name: "清", choose: false }
      ],
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
      ]
    };
  },
  created() {
    setInterval(this.scroll, 1400);
  },
  destroyed() {
    clearInterval(this.timer);
    this.iscreat();
  },
  mounted() {
    this.getLastDayWinList();
    this.lotteryAll();
    this.getPlayTree();
    this.geteServerTime();
  },
  methods: {
    // 中间->投注选号
    curBalls(item,index,list,indexf) {
      if (list.chooseOne) {
        list.balls.map(b => {
          b.choose = false;
        });
      }
      item.choose = !item.choose;
      if(item.choose === true){
        this.d[index] = item.ball;
        this.dd = this.d.filter(function(n) {return n;});
        this.zhu++;
        this.pd.addTitle = this.addTitle;
        this.pd.addCon = this.dd.join(",");
        this.con = this.dd.join(",");
        this.pd.addPattern = "元";
        this.pd.addzhu = this.zhu;
        this.pd.addMoney = this.spinner3;
        this.pk10_boxjia(item,index,list,indexf);
      }else{
        this.d.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {return n;});
        this.zhu--;
        this.pd.addCon = this.dd.join(",");
        this.pk10_boxjian(item,index,list,indexf);
      }
      
    },
    // ++++
    pk10_boxjia(num,indexg,list,indexff) {
      //两面盘，龙虎
      if(this.className === "pk10_side_lh"){
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = "[1V10]" + this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = "[2V9]" + this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = "[3V8]" + this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = "[4V7]" + this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {return n;});
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
        this.pd.addCon = this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en;
        this.con = this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en;
      }
      //两面盘，大小
      if (this.className === "pk10_side_ds") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {return n;});
          this.en = this.dd.join("");
        }
        if (indexff === 5) {
          this.kf[indexg] = num.ball;
          this.dd = this.kf.filter(function(n) {return n;});
          this.fn = this.dd.join("");
        }
        if (indexff === 6) {
          this.kg[indexg] = num.ball;
          this.dd = this.kg.filter(function(n) {return n;});
          this.gn = this.dd.join("");
        }
        if (indexff === 7) {
          this.kh[indexg] = num.ball;
          this.dd = this.kh.filter(function(n) {return n;});
          this.hn = this.dd.join("");
        }
        if (indexff === 8) {
          this.ki[indexg] = num.ball;
          this.dd = this.ki.filter(function(n) {return n;});
          this.in = this.dd.join("");
        }
        if (indexff === 9) {
          this.kj[indexg] = num.ball;
          this.dd = this.kj.filter(function(n) {return n;});
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
        this.pd.addCon = this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en +"," +this.fn +"," +this.gn +"," +this.hn +"," +this.in +"," +this.jn;
        this.con = this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en +"," +this.fn +"," +this.gn +"," +this.hn +"," +this.in +"," +this.jn;
      }
      //定位胆，前五
      if (this.className === "pk10_star1_dwd") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {return n;});
          this.en = this.dd.join("");
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
        this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
        this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
      }
      //定位胆，后五
      if (this.className === "pk10_star1_dwd_last") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {return n;});
          this.en = this.dd.join("");
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
        this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
        this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
      }
      //前二，冠亚和
      if (this.className === "pk10_star2_and") {
        this.dd = this.d.filter(function(n) {return n;});
        this.zhu = this.qianergyh(this.dd);
      }
      //前二、前三、前四、前五，复式
      if (this.className === "pk10_star2" || this.className === "pk10_star3" || this.className === "pk10_star4" || this.className === "pk10_star5") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {return n;});
          this.en = this.dd.join("");
        }
        if (this.className === "pk10_star2") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.fushi(this.con.split(","), 2);
        }
        if (this.className === "pk10_star3") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.fushi(this.con.split(","), 3);
        }
        if (this.className === "pk10_star4") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.fushi(this.con.split(","), 4);
        }
        if (this.className === "pk10_star5") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," +this.en;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," +this.en;
          this.zhu = this.fushi(this.con.split(","), 5);
        }
      }
      //猜前二、猜前三、猜前四、猜前五
      if (this.className === "pk10_star2_dj" || this.className === "pk10_star3_dj" || this.className === "pk10_star4_dj" || this.className === "pk10_star5_dj") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {return n;});
          this.en = this.dd.join("");
        }
        if (this.className === "pk10_star2_dj") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.fushi(this.con.split(","), 2);
        }
        if (this.className === "pk10_star3_dj") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.fushi(this.con.split(","), 3);
        }
        if (this.className === "pk10_star4_dj") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.fushi(this.con.split(","), 4);
        }
        if (this.className === "pk10_star5_dj") {
          this.pd.addCon
          this.con =this.an +"," +this.bn +"," +this.cn +"," +this.dn +"," +this.en;
          this.zhu = this.fushi(this.con.split(","), 5);
        }
      }
    },
    // ----
    pk10_boxjian(num,indexg,list,indexff) {
      //两面盘，龙虎
      if (this.className === "pk10_side_lh") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = "[1V10]" + this.dd.join("");
          if (this.an == "" || this.an == "-" || this.an == "[1V10]") {
            this.an = this.dd.join("");
          }
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = "[2V9]" + this.dd.join("");
          if (this.bn == "" || this.bn == "-" || this.bn == "[2V9]") {
            this.bn = this.dd.join("");
          }
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = "[3V8]" + this.dd.join("");
          if (this.cn == "" || this.cn == "-" || this.cn == "[3V8]") {
            this.cn = this.dd.join("");
          }
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = "[4V7]" + this.dd.join("");
          if (this.dn == "" || this.dn == "-" || this.dn == "[4V7]") {
            this.dn = this.dd.join("");
          }
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {return n;});
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
        this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
        this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
      }
      //两面盘，大小
      if (this.className === "pk10_side_ds") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {return n;});
          this.en = this.dd.join("");
        }
        if (indexff === 5) {
          this.kf.splice(indexg, 1, "");
          this.dd = this.kf.filter(function(n) {return n;});
          this.fn = this.dd.join("");
        }
        if (indexff === 6) {
          this.kg.splice(indexg, 1, "");
          this.dd = this.kg.filter(function(n) {return n;});
          this.gn = this.dd.join("");
        }
        if (indexff === 7) {
          this.kh.splice(indexg, 1, "");
          this.dd = this.kh.filter(function(n) {return n;});
          this.hn = this.dd.join("");
        }
        if (indexff === 8) {
          this.ki.splice(indexg, 1, "");
          this.dd = this.ki.filter(function(n) {return n;});
          this.in = this.dd.join("");
        }
        if (indexff === 9) {
          this.kj.splice(indexg, 1, "");
          this.dd = this.kj.filter(function(n) {return n;});
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
        this.pd.addCon  = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en + "," + this.fn + "," + this.gn + "," + this.hn + "," + this.in + "," + this.jn;
        this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en + "," + this.fn + "," + this.gn + "," + this.hn + "," + this.in + "," + this.jn;
      }
      //定位胆，前五
      if (this.className === "pk10_star1_dwd") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {return n;});
          this.en = this.dd.join("");
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
        this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
        this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
      }
      //定位胆，后五
      if (this.className === "pk10_star1_dwd_last") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {return n;});
          this.en = this.dd.join("");
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
        this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
        this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
      }
      //前二，冠亚和
      if (this.className === "pk10_star2_and") {
        this.dd = this.d.filter(function(n) {return n;});
        this.zhu = this.qianergyh(this.dd);
      }
      //前二，复式
      if (
        this.className === "pk10_star2" ||
        this.className === "pk10_star3" ||
        this.className === "pk10_star4" ||
        this.className === "pk10_star5") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {return n;});
          this.en = this.dd.join("");
        }
        if (this.className === "pk10_star2") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.fushi(this.con.split(","), 2);
        }
        if (this.className === "pk10_star3") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.fushi(this.con.split(","), 3);
        }
        if (this.className === "pk10_star4") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.fushi(this.con.split(","), 4);
        }
        if (this.className === "pk10_star5") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.zhu = this.fushi(this.con.split(","), 5);
        }
      }
      //猜前二、猜前三、猜前四、猜前五
      if (
        this.className === "pk10_star2_dj" ||
        this.className === "pk10_star3_dj" ||
        this.className === "pk10_star4_dj" ||
        this.className === "pk10_star5_dj") {
        if (indexff === 0) {
          this.ka.splice(indexg, 1, "");
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = this.dd.join("");
        }
        if (indexff === 1) {
          this.kb.splice(indexg, 1, "");
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = this.dd.join("");
        }
        if (indexff === 2) {
          this.kc.splice(indexg, 1, "");
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = this.dd.join("");
        }
        if (indexff === 3) {
          this.kd.splice(indexg, 1, "");
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke.filter(function(n) {return n;});
          this.en = this.dd.join("");
        }
        if (this.className === "pk10_star2_dj") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.fushi(this.con.split(","), 2);
        }
        if (this.className === "pk10_star3_dj") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.fushi(this.con.split(","), 3);
        }
        if (this.className === "pk10_star4_dj") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.fushi(this.con.split(","), 4);
        }
        if (this.className === "pk10_star5_dj") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.zhu = this.fushi(this.con.split(","), 5);
        }
      }
    },
    //玩法术
    getPlayTree() {
      var now = new Date().getTime();
      if (localStorage.getItem("getPlayTree_playGroups_pk10") !== null) {
        var setupTime = localStorage.getItem("data_getPlayTree_pk10");
        if (
          setupTime === null ||
          now - setupTime > this.$store.state.cacheTime
        ) {
          localStorage.removeItem("getPlayTree_playGroups_pk10");
          localStorage.removeItem("getPlayTree_playBonus_pk10");
          localStorage.removeItem("data_getPlayTree_pk10");
          this.$axios
            .get(
              baseUrl + "/api/lottery/getPlayTree?lotteryId=" + this.lotteryId
            )
            .then(res => {
              localStorage.setItem(
                "getPlayTree_playGroups_pk10",
                JSON.stringify(res.data.data.playGroups)
              );
              localStorage.setItem(
                "getPlayTree_playBonus_pk10",
                JSON.stringify(res.data.data.playBonus)
              );
              localStorage.setItem("data_getPlayTree_pk10", now);
              this.playGroups = JSON.parse(
                localStorage.getItem("getPlayTree_playGroups_pk10")
              );
              this.playBonus = JSON.parse(
                localStorage.getItem("getPlayTree_playBonus_pk10")
              );
              this.setupPlayTree();
            })
            .catch(error => {
              console.log("玩法术,No");
            });
        } else {
          this.playGroups = JSON.parse(
            localStorage.getItem("getPlayTree_playGroups_pk10")
          );
          this.playBonus = JSON.parse(
            localStorage.getItem("getPlayTree_playBonus_pk10")
          );
          this.setupPlayTree();
        }
      } else {
        this.$axios
          .get(baseUrl + "/api/lottery/getPlayTree?lotteryId=" + this.lotteryId)
          .then(res => {
            localStorage.setItem(
              "getPlayTree_playGroups_pk10",
              JSON.stringify(res.data.data.playGroups)
            );
            localStorage.setItem(
              "getPlayTree_playBonus_pk10",
              JSON.stringify(res.data.data.playBonus)
            );
            localStorage.setItem("data_getPlayTree_pk10", now);
            this.playGroups = JSON.parse(
              localStorage.getItem("getPlayTree_playGroups_pk10")
            );
            this.playBonus = JSON.parse(
              localStorage.getItem("getPlayTree_playBonus_pk10")
            );
            this.setupPlayTree();
          })
          .catch(error => {
            console.log("玩法术,No");
          });
      }
    },
    setupPlayTree() {
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
              this.getbetOrderList();
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
      this.arrLottName.indexOf();
      this.lottName = item.name;
      this.lottNameIndex = index;
      this.$router.push("/lotts/pk10/" + item.id);
      this.getPlayTree();
      this.getPastOp();
      this.geteServerTime();
    },
    //清空
    iscreat() {
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
      this.con = [];
      this.zhu = 0;
      this.pd = {};
      this.spinner3 = 0;
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
      if (localStorage.getItem("lotteryAll_pk10") !== null) {
        var setupTime = localStorage.getItem("data_lotteryAll_pk10");
        if (
          setupTime === null ||
          now - setupTime > this.$store.state.cacheTime
        ) {
          localStorage.removeItem("lotteryAll_pk10");
          localStorage.removeItem("data_lotteryAll_pk10");
          this.$axios
            .get(baseUrl + "/api/lottery/getLotteryList")
            .then(res => {
              localStorage.setItem(
                "lotteryAll_pk10",
                JSON.stringify(res.data.data.pk10)
              );
              this.lotteryList = JSON.parse(
                localStorage.getItem("lotteryAll_pk10")
              );
              localStorage.setItem("data_lotteryAll_pk10", now);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.lotteryList = JSON.parse(
            localStorage.getItem("lotteryAll_pk10")
          );
          this.lotteryList.map(k => {
            this.arrLottId.push(k.id);
            this.arrLottName.push(k.name);
          });
          this.lottNameIndex = this.arrLottId.indexOf(this.$route.params.lotteryId);
          if (this.lottNameIndex > 5) {
            this.left = -200;
          }
        }
      } else {
        this.$axios
          .get(baseUrl + "/api/lottery/getLotteryList")
          .then(res => {
            localStorage.setItem(
              "lotteryAll_pk10",
              JSON.stringify(res.data.data.pk10)
            );
            this.lotteryList = JSON.parse(
              localStorage.getItem("lotteryAll_pk10")
            );
            localStorage.setItem("data_lotteryAll_pk10", now);
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
          this.nBox[0] = this.getPastOpens[0].n1;
          this.nBox[1] = this.getPastOpens[0].n2;
          this.nBox[2] = this.getPastOpens[0].n3;
          this.nBox[3] = this.getPastOpens[0].n4;
          this.nBox[4] = this.getPastOpens[0].n5;
          this.nBox[5] = this.getPastOpens[0].n6;
          this.nBox[6] = this.getPastOpens[0].n7;
          this.nBox[7] = this.getPastOpens[0].n8;
          this.nBox[8] = this.getPastOpens[0].n9;
          this.nBox[9] = this.getPastOpens[0].n10;
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
        this.getPastOp();
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
          this.getCurrentSaleTime = res.data.data;
          this.today = res.data.data.restSeconds;
          this.lastSeasonId = this.getCurrentSaleTime.lastSeasonId;
          this.seasonId = this.getCurrentSaleTime.seasonId;
          this.initSetTimeout();
          this.getPastOp();
        });
    },
    //倒计时
    initSetTimeout() {
      this.timer = setInterval(() => {
        this.today = this.today - 1;
        this.setTimeMode();
        if (this.today < 1) {
          clearInterval(this.timer);
          this.timesUp();
        }
        if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 47
        ) {
          this.getPastOp();
        } else if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 46
        ) {
          this.getPastOp();
        } else if (
          this.getPastOpenB[0].seasonId !== this.lastSeasonId &&
          this.today === 45
        ) {
          this.getPastOp();
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
      console.log(this.className);
    },
    //菜单选择项2
    playersBut(play, indexff) {
      this.playNum = indexff;
      this.current_player_bonus = play;
      this.className = play.id;
      this.displayBonus = play.displayBonus;
      if (isNaN(this.displayBonus)) {
        let ar = [];
        ar = this.displayBonus.split("-");
        this.displayBonus1 = Number(ar[0]);
        this.displayBonus2 = Number(ar[1]);
        this.displayBonus3 = this.displayBonus1 + "-" + this.displayBonus2;
      }
      this.iscreat();
      console.log(play.id)
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
      this.pd.addMoney = this.spinner3;
      this.productList.unshift(this.pd);
      this.pd = {};
      this.d = [];
      this.iscreat();
    },
    //删除指定行
    deleList(item, index) {
      this.productList.splice(index, 1);
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
    //清空
    exit() {
      this.productList = [];
    },
  },
  components: {
    tool
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
@import "../../../assets/scss/lotts/pk10.scss";
</style>
