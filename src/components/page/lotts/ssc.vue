<template>
  <div class="lott">
    <div class="lott-center">
      <div class="lott-top">
        <div class="lott-top-left"><img src="@/assets/img/lott/ssc.png" alt="" />
          <span>{{lottName}}</span>
        </div>
        <div class="lott-top-middle ssc">
          <p>第<span>{{seasonId}}</span>期 剩余投注时间</p>
          <div>{{countDown}}</div>
        </div>
        <div class="lott-top-right ssc">
          <p>第
            <span>{{lastSeasonId}}</span>期 开奖结果</p>
          <div class="showName"  v-show="!isshowGif">
            <span v-for="(item,index) in nBox" :key="index">{{item}}</span>
          </div>
          <div class="showGif" v-show="isshowGif">
            <span v-for="(item,index) in 5" :key="index"></span>
          </div>
        </div>
      </div>
      <div class="lottBox">
        <div class="lott-left">
          <div class="lott-left-nav">
            <button @click="lottnavleft"><span><i class="el-icon-caret-left"></i></span></button>
            <div class="lott-left-navBox" ref="lottnavbox">
              <ul ref="lottnavUl" :style="{transform: 'translateX(' + left + 'px)'}">
                <li ref="lottnavLi" :class="{'active':index === lottNameIndex}" v-for="(item,index) in lotteryList" :key="index" @click="lottListNav(item,index)">{{item.name}}</li>
              </ul>
            </div>
            <button @click="lottnavright"><span><i class="el-icon-caret-right"></i></span></button>
          </div>
          <div class="getPlayTree">
            <ul>
              <li :class="{'active': index === navTo}" v-for="(item,index) in playGroups" :key="index" @click="playGroupBut(item,index)">{{item.title}}</li>
            </ul>
          </div>
          <div class="getPlayTreeBox">
            <ul>
              <li v-for="(item,indexs) in playGroups" :key="indexs" v-show="indexs === navTo">
                <div v-for='(group,indexabc) in item.groups' :key='indexabc'>
                  <span class="groupTitle">{{group.title}}</span>
                  <span class="groupTitleList"  :class="{'active': indexbcd === playNum}" v-for='(player,indexbcd) in group.players' :key='indexbcd' @click="playersBut(player,indexbcd)">{{player.title}}</span>
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
                  <span class="carTitle">{{numViews.title}}</span>
                  <div class="carBox">
                    <div class="cars">
                      <p class="car" :class="[item.choose ? 'active' : '',className]" v-for="(item,indexha) in numViews.nums" :key="indexha" @click="curBalls(item,indexha,numViews,indexf)">
                        <span><i>{{item.ball}}</i></span>
                      </p>
                    </div>
                    <div class="changes" 
                    v-if="className !== 'ssc_star2_front_group_contains' && className !== 'ssc_star2_last_group_contains' && className !== 'ssc_star3_front_and' && className !== 'ssc_star3_mid_and' && className !== 'ssc_star3_last_and' && className !== 'ssc_star2_last_and' && className !== 'ssc_star2_last_group_and' && className !== 'ssc_star2_front_group_and' && className !== 'ssc_star2_front_and' && className !== 'ssc_star3_last_group_and' && className !== 'ssc_star3_mid_group_and' && className !== 'ssc_star3_front_group_and' && className !== 'ssc_side_lhh' && className !== 'ssc_dxds' && className !== 'ssc_star3_front_group_contains' && className !== 'ssc_star3_mid_group_contains' && className !== 'ssc_star3_last_group_contains'">
                      <span v-for="(tools,indexto) in ballTools" :key="indexto" @click="toolsCur(tools,indexto,numViews,indexf)">{{tools.name}}</span>
                    </div>
                  </div>
                </div>
                <!-- <tool class="changes" v-if="className !== 'ssc_side_lhh' && className !== 'ssc_dxds'" :item="numViews"></tool> -->
              </div>
            </div>
            <div class="zhu">
              <p>您选择了 <i>{{zhu}}</i> 注</p>
              <div class="butBox">
                <div class="numSum">
                  <span class="trim">投注金额</span><yd-spinner v-model="spinner3" min="0"></yd-spinner>
                </div>
                <button class="add" @click="addNum">添加号码栏</button><button @click="betGo">立即投注</button>
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
              <p><span>总注数：{{zhu}}, </span><span>总金额：{{zhu*spinner3}}, </span><span>余额：{{$store.state.balance}}</span></p>
              <button @click="affirmBetGo">确认投注</button>
            </div>
          </div>
        </div>
        <div class="lott-right">
          <div class="lott-right-top1">
            <button>今日开奖</button>
            <p>
              <router-link tag="a" target="_blank" to="/trendChart/1804">走势图</router-link>
              <i>|</i>
              <span>玩法说明</span>
            </p>
          </div>
          <div class="lott-right-top2">
            <p class="lott-right-top2-title">
              <span class="lott-right-top2-span1">期号</span>
              <span class="lott-right-top2-span2 ssc">开奖号码</span>
              <span class="lott-right-top2-span3 ssc">开奖时间</span>
            </p>
            <ul>
              <li v-for="(item,index) in getPastOpens" :key="index">
                <span class="lott-right-top2-span1">{{item.seasonId}}</span>
                <span class="lott-right-top2-span2 ssc">
                  <i>{{item.n1}}</i><i>{{item.n2}}</i><i>{{item.n3}}</i><i>{{item.n4}}</i><i>{{item.n5}}</i>
                </span>
                <span class="lott-right-top2-span3 ssc">{{item.addTime.substring(11)}}</span>
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
                <span class="lott-right-top4-span3" :class="{'status': item.win === 0}" v-if="item.statusName !== '已中奖'"><i>{{item.statusName}}</i></span>
                <span class="lott-right-top4-span3" v-else><i>{{item.win}}</i></span>
              </li>
              <li class="lott-right-top4-but" @click="$router.push('/betManage/betRecord')">更多>></li>
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
                <img :src="item.paths" alt=""/>
                <div class="rightBox">
                  <p><span>{{item.name | mask}} </span><span> &nbsp;在{{item.lotterylist}}</span></p>
                  <p><span>喜中：</span><span>￥<i>{{item.money | keepTwoNum}}</i></span></p>
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
                  <img :src='"../../../../static/images/"+item.img+".jpg"' alt=""/>
                  <p><span>账号昵称 ：<i class="nickname">{{item.account | mask}}</i></span><span>昨日盈利 ：<i class="gain">{{item.bonus}}</i><i>元</i></span></p>
                </div>
                <p class="index">{{index+1}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <firmbet ref="firmbet" :productLists="productList" :pds="pd" :content="String(this.seasonId)-1"></firmbet>
  </div>
</template>
<script>
import firmbet from '@/components/loading/firmbet.vue';
import tool from "@/components/page/lotts/tool.vue"
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      number:null,
      num:0,
      left:0,
      sum: 0,
      navTo:0,
      playNum:0,
      zhu:0,
      spinner3: 0,
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
      zhu1:0,
      zhu2:0,
      zhu3:0,
      zhu4:0,
      zhu5:0,
      zhu6:0,
      zhu7:0,
      zhu8:0,
      zhu9:0,
      zhu10:0,
      productList: [],
      pd: {
        addTitle: "复式",
        addCon: null,
        addPattern: "元",
        addzhu: null,
        addMoney: null,
        addClassName:null,
        addSeasonId:null,
        addName:"宏发时时彩",
      },
      addTitle: '复式',
      d: [], //选中的号码的下标
      dd: [], //选中的号码的下标
      butClass1:true,
      butClass2:false,
      animate:true,
      orderList:null,
      className:'ssc_star5',//玩法ID
      lottName:'宏发时时彩',//彩种名
      arrLottId: [],
      arrLottName: [],
      lotteryId:'sj1fc',//彩种id
      lottNameIndex:0,//默认彩种
      winList: null, //中奖列表
      lotteryList:null,
      getPastOpens:null,
      getPastOpenB:null,
      playGroups:null,//玩法树
      playBonus: "", //玩法树
      bonusArray:[],//和值赔率
      playBonusId: "ssc_star5", //点击选中后获取此玩法ID
      current_player: {}, //當前玩法
      current_player_bonus: {}, //當前玩法
      getCurrentSaleTime:null,//获取彩種當前獎期時間
      today: "",
      countDown: "",
      timer: "",
      lastSeasonId:null,//当前期
      seasonId:null,//下一期
      isshowGif:false,
      nBox:[1,3,5,7,9],
      displayBonus: 0,
      displayBonus1: 0,
      displayBonus2: 0,
      displayBonus3: "",
      splayGroups: [],
      sgroups: [], 
      sgroups2: [], 
      splayers: [], 
      snumView: [], 
      arrpeilva:[],
      arrpeilvb:[],
      arrpeilvc:[],
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
      ],
    };
  },
  created() {
    setInterval(this.scroll, 1400);
  },
  mounted(){
    this.getLastDayWinList();
    this.lotteryAll();
    this.getPlayTree();
    this.geteServerTime();
  },
  destroyed() {
    clearInterval(this.timer);
    clearTimeout(this.timer2);
    this.iscreat();
  },
  methods:{
    sendClass(){
      this.$emit("setClass(1)");
    },
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
        this.pd.addClassName = this.className;
        this.pd.addSeasonId = this.seasonId;
        this.pd.addName = this.lottName;
        this.betssc_boxjia(item,index,list,indexf);
      }else{
        this.d.splice(index, 1, "");
        this.dd = this.d.filter(function(n) {return n;});
        this.zhu--;
        this.con = this.dd.join(",");
        this.pd.addCon = this.dd.join(",");
        this.betssc_boxjian(item,index,list,indexf);
      }
    },
    //投注 ++++
    betssc_boxjia(num,indexg,list,indexff) {
      //大小单双 +
      if (this.className === "ssc_dxds") {
        if (indexff === 0) {
          this.ka[indexg] = num.ball;
          this.dd = this.ka.filter(function(n) {return n;});
          this.an = this.dd.join("+");
        }
        if (indexff === 1) {
          this.kb[indexg] = num.ball;
          this.dd = this.kb.filter(function(n) {return n;});
          this.bn = this.dd.join("+");
        }
        if (indexff === 2) {
          this.kc[indexg] = num.ball;
          this.dd = this.kc.filter(function(n) {return n;});
          this.cn = this.dd.join("+");
        }
        if (indexff === 3) {
          this.kd[indexg] = num.ball;
          this.dd = this.kd.filter(function(n) {return n;});
          this.dn = this.dd.join("+");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke.filter(function(n) {return n;});
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
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if (
        this.className === "ssc_star4_front_group6" ||
        this.className === "ssc_star5_none2" ||
        this.className === "ssc_star4_front_none2" ||
        this.className === "ssc_star3_front_none2" ||
        this.className === "ssc_star3_mid_none2" ||
        this.className === "ssc_star3_last_none2") {
        let ret = this.groupSplit(this.dd, 2);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.zhu = arr.length;
        this.pd.addzhu = this.zhu;
      }
      //三码不定位、三星组六 +
      if (
        this.className === "ssc_star5_none3" ||
        this.className === "ssc_star3_mid_group6" ||
        this.className === "ssc_star3_last_group6" ||
        this.className === "ssc_star3_front_group6") {
        let ret = this.groupSplit(this.dd, 3);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.zhu = arr.length;
        this.pd.addzhu = this.zhu;
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
        this.className === "ssc_star1_dwd" ) {
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
          this.dd = this.kd.filter(function(n) { return n; });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke;
          this.en = this.dd.join("");
        }
        if (this.className === "ssc_star4_front") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.getCount(this.con.split(","), 4);
          this.pd.addzhu = this.zhu;
          this.pd.addCon = this.con + ",-";
          this.con = this.con + ",-";
        }
        if (this.className === "ssc_star3_front") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.pd.addCon = this.con + ",-" + ",-";
          this.con = this.con + ",-" + ",-";
        }
        if (this.className === "ssc_star3_mid") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.pd.addCon = "-," + this.con + ",-";
          this.con = "-," + this.con + ",-";
        }
        if (this.className === "ssc_star3_last") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.pd.addCon = "-,-," + this.con;
          this.con = "-,-," + this.con;
        }
        if (this.className === "ssc_star2_front") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.pd.addCon = this.con + ",-" + ",-" + ",-";
          this.con = this.con + ",-" + ",-" + ",-";
        }
        if (this.className === "ssc_star2_last") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.pd.addCon = "-,-,-," + this.con;
          this.con = "-,-,-," + this.con;
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
            this.dd = this.kd.filter(function(n) { return n; });
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
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
        }
        if (this.className === "ssc_star5") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.zhu = this.getCount(this.con.split(","), 5);
          this.pd.addzhu = this.zhu;
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
          this.dd = this.kd.filter(function(n) { return n; });
          this.dn = "[万个]" + this.dd.join("");
        }
        if (indexff === 4) {
          this.ke[indexg] = num.ball;
          this.dd = this.ke;
          this.en = "[千百]" + this.dd.join("");
        }
        if (indexff === 5) {
          this.kf[indexg] = num.ball;
          this.dd = this.kf.filter(function(n) { return n; });
          this.fn = "[千十]" + this.dd.join("");
        }
        if (indexff === 6) {
          this.kg[indexg] = num.ball;
          this.dd = this.kg.filter(function(n) { return n; });
          this.gn = "[千个]" + this.dd.join("");
        }
        if (indexff === 7) {
          this.kh[indexg] = num.ball;
          this.dd = this.kh.filter(function(n) { return n; });
          this.hn = "[百十]" + this.dd.join("");
        }
        if (indexff === 8) {
          this.ki[indexg] = num.ball;
          this.dd = this.ki.filter(function(n) { return n; });
          this.in = "[百个]" + this.dd.join("");
        }
        if (indexff === 9) {
          this.kj[indexg] = num.ball;
          this.dd = this.kj.filter(function(n) { return n; });
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
        this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en + "," + this.fn + "," + this.gn + "," + this.hn + "," + this.in + "," + this.jn;
        this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en + "," + this.fn + "," + this.gn + "," + this.hn + "," + this.in + "," + this.jn;
        if (this.con.indexOf("和") !== -1) {
          this.youhezhi = true;
        } else if (this.con.indexOf("和") === -1) {
          this.youhezhi = false;
        }
      }
      //三星包胆 +
      if (
        this.className === "ssc_star3_front_group_contains" ||
        this.className === "ssc_star3_mid_group_contains" ||
        this.className === "ssc_star3_last_group_contains") {
        for (let i = 0; i < list.nums.length; i++) {
          this.zhu = 54;
          this.pd.addzhu = this.zhu;
          this.pd.addCon = num.ball;
          this.con = num.ball;
          list.nums[i].choose = false;
          list.nums[indexg].choose = true;
        }
      }
      //二星包胆 +
      if (this.className === "ssc_star2_front_group_contains" || this.className === "ssc_star2_last_group_contains") {
        for (let i = 0; i < list.nums.length; i++) {
          this.zhu = 9;
          this.pd.addzhu = this.zhu;
          this.pd.addCon = num.ball;
          this.con = num.ball;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount5(this.con.split(","));
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount10(this.con.split(","));
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount20(this.con.split(","));
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount30(this.con.split(","));
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount60(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选120 +
      if (this.className === "ssc_star5_group120") {
        this.dd = this.d.filter(function(n) { return n; });
        let lengths = this.dd.length;
        this.zhu = this.getCount120(lengths);
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount4(this.con.split(","));
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount12(this.con.split(","));
      }
      //前四--组选24 +
      if (this.className === "ssc_star4_front_group24") {
        this.dd = this.d.filter(function(n) { return n; });
        let lengths = this.dd.length;
        this.zhu = this.getzuCount24(lengths);
        this.pd.addzhu = this.zhu;
      }
      //前三、中三、后三组选3 +
      if (
        this.className === "ssc_star3_front_group3" ||
        this.className === "ssc_star3_mid_group3" ||
        this.className === "ssc_star3_last_group3") {
        this.dd = this.d.filter(function(n) { return n; });
        let lengths = this.dd.length;
        this.zhu = this.getzuCount3(lengths);
        this.pd.addzhu = this.zhu;
      }
      //二星组选 复式 +
      if (
        this.className === "ssc_star2_front_group" ||
        this.className === "ssc_star2_last_group") {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.erzuxuanfushi(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //三星直选和值 +
      if (
        this.className === "ssc_star3_front_and" ||
        this.className === "ssc_star3_mid_and" ||
        this.className === "ssc_star3_last_and") {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.sanzhixuanhezhi(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //三星组选和值 +
      if (
        this.className === "ssc_star3_front_group_and" ||
        this.className === "ssc_star3_mid_group_and" ||
        this.className === "ssc_star3_last_group_and") {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.sanzuxuanhezhi(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //三星跨度 +
      if (
        this.className === "ssc_star3_front_kd" ||
        this.className === "ssc_star3_mid_kd" ||
        this.className === "ssc_star3_last_kd") {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.sankuadu(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //二星直选和值 +
      if (this.className === "ssc_star2_front_and" || this.className === "ssc_star2_last_and") {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.erzhixuanhezhi(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //二星组选和值 +
      if (this.className === "ssc_star2_front_group_and" || this.className === "ssc_star2_last_group_and") {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.erzuxuanhezhi(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //二星跨度 +
      if (this.className === "ssc_star2_front_kd" || this.className === "ssc_star2_last_kd") {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.erkuadu(this.dd);
        this.pd.addzhu = this.zhu;
      }
    },
    //投注 ----
    betssc_boxjian(num,indexg,list,indexff) {
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
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6 -
      if (
        this.className === "ssc_star4_front_group6" ||
        this.className === "ssc_star5_none2" ||
        this.className === "ssc_star4_front_none2" ||
        this.className === "ssc_star3_front_none2" ||
        this.className === "ssc_star3_mid_none2" ||
        this.className === "ssc_star3_last_none2") {
        let ret = this.groupSplit(this.dd, 2);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.zhu = arr.length;
        this.pd.addzhu = this.zhu;
      }
      //三码不定位、前三组六、中三组六、后三组六 -
      if (
        this.className === "ssc_star5_none3" ||
        this.className === "ssc_star3_mid_group6" ||
        this.className === "ssc_star3_last_group6" ||
        this.className === "ssc_star3_front_group6" ) {
        let ret = this.groupSplit(this.dd, 3);
        let arr = [];
        let abc = "";
        for (var k = 0; k < ret.length; k++) {
          var cc = ret[k].join("");
          arr.push(cc);
        }
        abc = arr.join(",");
        this.zhu = arr.length;
        this.pd.addzhu = this.zhu;
      }
      //复式 -
      if (this.className === "ssc_star5" || this.className === "ssc_star4_front" || this.className === "ssc_star3_front" || this.className === "ssc_star3_mid" || this.className === "ssc_star3_last" || this.className === "ssc_star2_front" || this.className === "ssc_star2_last" || this.className === "ssc_star1_dwd" ) {
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
          this.dd = this.kd.filter(function(n) { return n; });
          this.dn = this.dd.join("");
        }
        if (indexff === 4) {
          this.ke.splice(indexg, 1, "");
          this.dd = this.ke;
          this.en = this.dd.join("");
        }
        if (this.className === "ssc_star4_front") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.getCount(this.con.split(","), 4);
          this.pd.addzhu = this.zhu;
        } else if (this.className === "ssc_star3_front") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
        } else if (this.className === "ssc_star3_mid") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
        } else if (this.className === "ssc_star3_last") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
        } else if (this.className === "ssc_star2_front") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
        } else if (this.className === "ssc_star2_last") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
        } else if (this.className === "ssc_star1_dwd") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
        } else if (this.className === "ssc_star5") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.zhu = this.getCount(this.con.split(","), 5);
          this.pd.addzhu = this.zhu;
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
          this.dd = this.kf.filter(function(n) { return n; });
          this.fn = "[千十]" + this.dd.join("");
          if (this.fn == "" || this.fn == "-" || this.fn == "[千十]") {
            this.fn = this.dd.join("");
          }
        }
        if (indexff === 6) {
          this.kg.splice(indexg, 1, "");
          this.dd = this.kg.filter(function(n) { return n; });
          this.gn = "[千个]" + this.dd.join("");
          if (this.gn == "" || this.gn == "-" || this.gn == "[千个]") {
            this.gn = this.dd.join("");
          }
        }
        if (indexff === 7) {
          this.kh.splice(indexg, 1, "");
          this.dd = this.kh.filter(function(n) { return n; });
          this.hn = "[百十]" + this.dd.join("");
          if (this.hn == "" || this.hn == "-" || this.hn == "[百十]") {
            this.hn = this.dd.join("");
          }
        }
        if (indexff === 8) {
          this.ki.splice(indexg, 1, "");
          this.dd = this.ki.filter(function(n) { return n; });
          this.in = "[百个]" + this.dd.join("");
          if (this.in == "" || this.in == "-" || this.in == "[百个]") {
            this.in = this.dd.join("");
          }
        }
        if (indexff === 9) {
          this.kj.splice(indexg, 1, "");
          this.dd = this.kj.filter(function(n) { return n; });
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
        this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en + "," + this.fn + "," + this.gn + "," + this.hn + "," + this.in + "," + this.jn;
        this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en + "," + this.fn + "," + this.gn + "," + this.hn + "," + this.in + "," + this.jn;
        if (this.con.indexOf("和") !== -1) {
          this.youhezhi = true;
        } else if (this.con.indexOf("和") === -1) {
          this.youhezhi = false;
        }
      }
      //三星包胆 -
      if (
        this.className === "ssc_star3_front_group_contains" ||
        this.className === "ssc_star3_mid_group_contains" ||
        this.className === "ssc_star3_last_group_contains" ) {
        for (let i = 0; i < list.nums.length; i++) {
          this.zhu = 0;
          this.pd.addzhu = this.zhu;
          this.pd.addCon = "";
          this.con = "";
        }
      }
      //二星包胆 -
      if (
        this.className === "ssc_star2_front_group_contains" ||
        this.className === "ssc_star2_last_group_contains" ) {
        for (let i = 0; i < list.nums.length; i++) {
          this.zhu = 0;
          this.pd.addzhu = this.zhu;
          this.pd.addCon = "";
          this.con = "";
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount5(this.con.split(","));
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount10(this.con.split(","));
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount20(this.con.split(","));
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount30(this.con.split(","));
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount60(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选120 -
      if (this.className === "ssc_star5_group120") {
        this.dd = this.d.filter(function(n) { return n; });
        let lengths = this.dd.length;
        this.zhu = this.getCount120(lengths);
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount4(this.con.split(","));
        this.pd.addzhu = this.zhu;
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
        this.pd.addCon = this.an + "," + this.bn;
        this.con = this.an + "," + this.bn;
        this.zhu = this.getzuCount12(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //前四--组选24 -
      if (this.className === "ssc_star4_front_group24") {
        this.dd = this.d.filter(function(n) { return n; });
        let lengths = this.dd.length;
        this.zhu = this.getzuCount24(lengths);
        this.pd.addzhu = this.zhu;
      }
      //前三、中三、后三组选 -
      if (
        this.className === "ssc_star3_front_group3" ||
        this.className === "ssc_star3_mid_group3" ||
        this.className === "ssc_star3_last_group3" ) {
        this.dd = this.d.filter(function(n) { return n; });
        let lengths = this.dd.length;
        this.zhu = this.getzuCount3(lengths);
        this.pd.addzhu = this.zhu;
      }
      //二星组选 复式 -
      if (this.className === "ssc_star2_front_group" || this.className === "ssc_star2_last_group" ) {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.erzuxuanfushi(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //三星直选和值 -
      if (
        this.className === "ssc_star3_front_and" ||
        this.className === "ssc_star3_mid_and" ||
        this.className === "ssc_star3_last_and"
      ) {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.sanzhixuanhezhi(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //三星组选和值 -
      if (
        this.className === "ssc_star3_front_group_and" ||
        this.className === "ssc_star3_mid_group_and" ||
        this.className === "ssc_star3_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.sanzuxuanhezhi(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //三星跨度 -
      if (
        this.className === "ssc_star3_front_kd" ||
        this.className === "ssc_star3_mid_kd" ||
        this.className === "ssc_star3_last_kd"
      ) {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.sankuadu(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //二星直选和值 -
      if (
        this.className === "ssc_star2_front_and" ||
        this.className === "ssc_star2_last_and"
      ) {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.erzhixuanhezhi(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //二星组选和值 -
      if (
        this.className === "ssc_star2_front_group_and" ||
        this.className === "ssc_star2_last_group_and"
      ) {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.erzuxuanhezhi(this.dd);
        this.pd.addzhu = this.zhu;
      }
      //二星跨度 -
      if (
        this.className === "ssc_star2_front_kd" ||
        this.className === "ssc_star2_last_kd"
      ) {
        this.dd = this.d.filter(function(n) { return n; });
        this.zhu = this.erkuadu(this.dd);
        this.pd.addzhu = this.zhu;
      }
    },
    //玩法术
    getPlayTree(){
      if(localStorage.getItem("getPlayTree_playGroups_ssc") !== null ){
        this.playGroups = JSON.parse(localStorage.getItem("getPlayTree_playGroups_ssc"));
        this.setupPlayTree();
      }else{
        this.$axios.get(baseUrl + "/api/lottery/getPlayTree?lotteryId="+this.lotteryId,this.$store.state.config).then(res =>{
          localStorage.setItem("getPlayTree_playGroups_ssc",JSON.stringify(res.data.data.playGroups));
          this.playGroups = JSON.parse(localStorage.getItem("getPlayTree_playGroups_ssc"));
          this.setupPlayTree();
        }).catch(error =>{
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
    //确认投注
    affirmBetGo(){
      if(this.productList.length == 0){
        this.$pop.show({title:'温馨提示',content:'您未选择号码,号码篮是空的！',content1:String(this.seasonId),content2:String(Number(this.seasonId)+1),number:1});
      }else{
        this.$refs.firmbet.isshow();
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
    lottListNav(item,index){
      this.productList = [];
      this.lottName = this.arrLottName[this.arrLottName.indexOf(item.name)];
      this.lottNameIndex = index;
      this.$router.push("/lotts/ssc/" + item.id);
      this.getPlayTree();
      this.getPastOp();
      this.geteServerTime();
    },
    //清空
    iscreat() {
      this.pd = {};
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
      if(localStorage.getItem("lotteryAll_ssc") !== null){
        this.lotteryList = JSON.parse(localStorage.getItem("lotteryAll_ssc"));
        this.lotteryList.map(k => {
          this.arrLottId.push(k.id);
          this.arrLottName.push(k.name);
        });
        this.lottNameIndex = this.arrLottId.indexOf(this.$route.params.lotteryId);
        this.lottName = this.arrLottName[this.lottNameIndex];
        if (this.lottNameIndex > 5) {
          this.left = -200;
        }
      }else{
        this.$axios.get(baseUrl + "/api/lottery/getLotteryList").then(res => {
          localStorage.setItem("lotteryAll_ssc",JSON.stringify(res.data.data));
          this.lotteryList = JSON.parse(localStorage.getItem("lotteryAll_ssc"));
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    //获取过去开奖号码10个
    getPastOp() { 
      this.$axios.get(baseUrl + "/api/lottery/getPastOpen", {params: { lotteryId: this.$route.params.lotteryId, count: 10 }}).then(res => {
        this.getPastOpens = res.data.data;
        this.getPastOpenB = res.data.data;
        this.nBox[0] = this.getPastOpens[0].n1;
        this.nBox[1] = this.getPastOpens[0].n2;
        this.nBox[2] = this.getPastOpens[0].n3;
        this.nBox[3] = this.getPastOpens[0].n4;
        this.nBox[4] = this.getPastOpens[0].n5;
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
    getbetOrderList(){
      this.$axios.get(baseUrl + "/api/proxy/getbetOrderList?include=0&status=100&betweenType=3&start=0&limit=4&account="+this.$store.state.Globalusername,this.$store.state.config).then(res =>{
        this.orderList = res.data.data.list
      }).catch(error =>{
        console.log("获取投注记录失败");
      })
    },
    //获取彩種當前獎期時間
    geteServerTime() {
      clearInterval(this.timer);
      this.$axios.get(baseUrl + "/api/lottery/getCurrentSaleTime", {params: { lotteryId: this.$route.params.lotteryId }}).then(res => {
        this.getCurrentSaleTime = res.data.data;
        this.today = res.data.data.restSeconds;
        this.lastSeasonId = this.getCurrentSaleTime.lastSeasonId;
        this.seasonId = this.getCurrentSaleTime.seasonId;
        this.initSetTimeout();
        this.getPastOp();
      })
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
        if(this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 47){
          this.getPastOp();
        }else if(this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 46){
          this.getPastOp();
        }else if(this.getPastOpenB[0].seasonId !== this.lastSeasonId && this.today === 45){
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
    butClass1C(){
      this.butClass2 = false;
      this.butClass1 = true;
    },
    //昨日盈利
    butClass2C(){
      this.butClass1 = false;
      this.butClass2 = true;
    },
    // 获取昨日盈利榜单
    getLastDayWinList() {
      var now = new Date().getTime();
      if(localStorage.getItem("getLastDayWinList") !== null){
        var setupTime = localStorage.getItem("data_getLastDayWinList");
        if(setupTime === null || now - setupTime > this.$store.state.cacheTime){
          localStorage.removeItem("getLastDayWinList");
          localStorage.removeItem("data_getLastDayWinList");
          this.$axios.get(baseUrl + "/api/lottery/getLastDayWinList").then(res => {
            localStorage.setItem("getLastDayWinList",JSON.stringify(res.data.data));
            this.winList = JSON.parse(localStorage.getItem("getLastDayWinList"));
            localStorage.setItem("data_getLastDayWinList",now);
          })
          .catch(error => {
            console.log(error);
          });
        }else{
          this.winList = JSON.parse(localStorage.getItem("getLastDayWinList"));
        }
      }else{
        this.$axios.get(baseUrl + "/api/lottery/getLastDayWinList").then(res => {
          localStorage.setItem("getLastDayWinList",JSON.stringify(res.data.data));
          this.winList = JSON.parse(localStorage.getItem("getLastDayWinList"));
          localStorage.setItem("data_getLastDayWinList",now);
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
    playGroupBut(item,index){
      this.navTo = index;
      this.playNum = 0;
      this.current_player = item;
      this.current_player_bonus = item.groups[0].players[0];
      this.className = this.current_player_bonus.id;
      this.iscreat();
      switch (item.title) {
        case '五星':
          this.addTitle = "五星直选复式";
          break;
        case '前四':
          this.addTitle = "前四直选复式";
          break;
        case '后四':
          this.addTitle = "后四直选复式";
          break;
        case '前三':
          this.addTitle = "前三直选复式";
          break;
        case '中三':
          this.addTitle = "中三直选复式";
          break;
        case '后三':
          this.addTitle = "后三直选复式";
          break;
        case '前二':
          this.addTitle = "前二直选复式";
          break;
        case '后二':
          this.addTitle = "后二直选复式";
          break;
        case '定位胆':
          this.addTitle = "定位胆";
          break;
        case '任选':
          this.addTitle = "任选二直选复式";
          break;
        case '龙虎':
          this.addTitle = "龙虎和";
          break;
        case '微信玩法':
          this.addTitle = "大小单双";
          break;
      }
    },
    //菜单选择项2
    playersBut(play,indexff){
      this.playNum = indexff;
      this.current_player_bonus = play;
      this.className = play.id;
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
      console.log(this.className)
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
      if(this.left < 0){
        this.num = parseInt(this.left /100* -1)
      }
      if (this.num > 0) {
        this.num--;
        if (ul > box) {
          this.left = -(this.num * li);
        }
      }else{
        this.$pop.show({title:'温馨提示',content:'已经到顶啦',content1:'',content2:'',number:2});
        // this.$refs.pop.closeSimpleDialog();
        // this.content = '已经到顶啦'
        // this.number = 2;
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
    //全 ++++
    iszhu1({ ball },item,indexf){
      //复式 +
      if(this.className === "ssc_star5" || this.className === "ssc_star4_front" || this.className === "ssc_star3_front" || this.className === "ssc_star3_mid" || this.className === "ssc_star3_last" || this.className === "ssc_star2_front" || this.className === "ssc_star2_last" || this.className === "ssc_star1_dwd" ){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
          this.zhu1 = 10;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            list.choose = true;
            this.kb[i] = list.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join("");
          });
          this.zhu2 = 10;
        }
        if(indexf === 2){
          ball.filter((list,i) => {
            list.choose = true;
            this.kc[i] = list.ball;
            this.dd = this.kc.filter(function(n) {return n;});
            this.cn = this.dd.join("");
          });
          this.zhu3 = 10;
        }
        if(indexf === 3){
          ball.filter((list,i) => {
            list.choose = true;
            this.kd[i] = list.ball;
            this.dd = this.kd.filter(function(n) {return n;});
            this.dn = this.dd.join("");
          });
          this.zhu4 = 10;
        }
        if(indexf === 4){
          ball.filter((list,i) => {
            list.choose = true;
            this.ke[i] = list.ball;
            this.dd = this.ke.filter(function(n) {return n;});
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
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.getCount(this.con.split(","), 4);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_front") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-," + this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_last") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_front") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_last") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = "-,-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star1_dwd") {
          this.zhu = this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
          this.pd.addzhu = this.zhu;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star5") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
          this.zhu = this.getCount(this.con.split(","), 5);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if ( this.className === "ssc_star4_front_group6" || this.className === "ssc_star5_none2" || this.className === "ssc_star4_front_none2" || this.className === "ssc_star3_front_none2" || this.className === "ssc_star3_mid_none2" || this.className === "ssc_star3_last_none2"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join(",");
          });
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = arr.length;
          this.pd.addzhu = this.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (this.className === "ssc_star3_front_group3" || this.className === "ssc_star3_mid_group3" || this.className === "ssc_star3_last_group3"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join(",");
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          let lengths = this.dd.length;
          this.zhu = this.getzuCount3(lengths);
          this.pd.addzhu = this.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (this.className === "ssc_star5_none3" || this.className === "ssc_star3_mid_group6" || this.className === "ssc_star3_last_group6" || this.className === "ssc_star3_front_group6"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join(",");
          });
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = arr.length;
          this.pd.addzhu = this.zhu;
        }
      }
      //前二，后二跨度 +
      if (this.className === "ssc_star2_front_kd" || this.className === "ssc_star2_last_kd") {
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join(",");
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erkuadu(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (this.className === "ssc_star5_group5" || this.className === "ssc_star5_group10"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
          this.zhu1 = 10;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            list.choose = true;
            this.kb[i] = list.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join("");
          });
          this.zhu2 = 10;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount5(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (this.className === "ssc_star5_group20" || this.className === "ssc_star5_group30"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
          this.zhu1 = 10;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            list.choose = true;
            this.kb[i] = list.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join("");
          });
          this.zhu2 = 10;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount20(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
          this.zhu1 = 10;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            list.choose = true;
            this.kb[i] = list.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join("");
          });
          this.zhu2 = 10;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount60(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getCount120(lengths);
        this.pd.addzhu = this.zhu;
      }
      //二星组选 复式 +
      if (this.className === "ssc_star2_front_group" || this.className === "ssc_star2_last_group"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erzuxuanfushi(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if(this.className === 'ssc_star5_none1' || this.className === 'ssc_star4_front_none1' || this.className === 'ssc_star4_last_none1' || this.className === 'ssc_star3_front_none1' || this.className === 'ssc_star3_mid_none1' || this.className === 'ssc_star3_last_none1'){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
          this.zhu1 = 10;
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        this.zhu = this.zhu1;
        this.pd.addzhu = this.zhu;
      }
      //前四--组选4,12+
      if (this.className === "ssc_star4_front_group4" || this.className === "ssc_star4_front_group12" || this.className === "ssc_star4_front_group24"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            list.choose = true;
            this.kb[i] = list.ball;
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join("");
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        if(this.className === "ssc_star4_front_group4"){
          this.zhu = this.getzuCount4(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group12"){
          this.zhu = this.getzuCount12(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group24"){
          this.zhu = this.getzuCount24(this.con.split(","));
        }
        this.pd.addzhu = this.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = true;
            this.ka[i] = list.ball;
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getzuCount24(lengths);
        this.pd.addzhu = this.zhu;
      }
    },
    //大 ++++
    iszhu2({ ball },item,indexf){
      //复式 +
      if(this.className === "ssc_star5" || this.className === "ssc_star4_front" || this.className === "ssc_star3_front" || this.className === "ssc_star3_mid" || this.className === "ssc_star3_last" || this.className === "ssc_star2_front" || this.className === "ssc_star2_last" || this.className === "ssc_star1_dwd" ){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        if(indexf === 2){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {return n;});
              this.cn = this.dd.join("");
            }
          });
          this.zhu3 = 5;
        }
        if(indexf === 3){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {return n;});
              this.dn = this.dd.join("");
            }
          });
          this.zhu4 = 5;
        }
        if(indexf === 4){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {return n;});
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
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.getCount(this.con.split(","), 4);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_front") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-," + this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_last") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_front") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_last") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = "-,-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star1_dwd") {
          this.zhu = this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
          this.pd.addzhu = this.zhu;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star5") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
          this.zhu = this.getCount(this.con.split(","), 5);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if ( this.className === "ssc_star4_front_group6" || this.className === "ssc_star5_none2" || this.className === "ssc_star4_front_none2" || this.className === "ssc_star3_front_none2" || this.className === "ssc_star3_mid_none2" || this.className === "ssc_star3_last_none2"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = arr.length;
          this.pd.addzhu = this.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (this.className === "ssc_star3_front_group3" || this.className === "ssc_star3_mid_group3" || this.className === "ssc_star3_last_group3"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          let lengths = this.dd.length;
          this.zhu = this.getzuCount3(lengths);
          this.pd.addzhu = this.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (this.className === "ssc_star5_none3" || this.className === "ssc_star3_mid_group6" || this.className === "ssc_star3_last_group6" || this.className === "ssc_star3_front_group6"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = arr.length;
          this.pd.addzhu = this.zhu;
        }
      }
      //前二，后二跨度 +
      if (this.className === "ssc_star2_front_kd" || this.className === "ssc_star2_last_kd") {
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erkuadu(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (this.className === "ssc_star5_group5" || this.className === "ssc_star5_group10"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount5(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (this.className === "ssc_star5_group20" || this.className === "ssc_star5_group30"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount20(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount60(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getCount120(lengths);
        this.pd.addzhu = this.zhu;
      }
      //二星组选 复式 +
      if (this.className === "ssc_star2_front_group" || this.className === "ssc_star2_last_group"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erzuxuanfushi(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if(this.className === 'ssc_star5_none1' || this.className === 'ssc_star4_front_none1' || this.className === 'ssc_star4_last_none1' || this.className === 'ssc_star3_front_none1' || this.className === 'ssc_star3_mid_none1' || this.className === 'ssc_star3_last_none1'){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        this.zhu = this.zhu1;
        this.pd.addzhu = this.zhu;
      }
      //前四--组选4,12+
      if (this.className === "ssc_star4_front_group4" || this.className === "ssc_star4_front_group12" || this.className === "ssc_star4_front_group24"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        if(this.className === "ssc_star4_front_group4"){
          this.zhu = this.getzuCount4(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group12"){
          this.zhu = this.getzuCount12(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group24"){
          this.zhu = this.getzuCount24(this.con.split(","));
        }
        this.pd.addzhu = this.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i >= len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getzuCount24(lengths);
        this.pd.addzhu = this.zhu;
      }
    },
    //小 ++++
    iszhu3({ ball },item,indexf){
      //复式 +
      if(this.className === "ssc_star5" || this.className === "ssc_star4_front" || this.className === "ssc_star3_front" || this.className === "ssc_star3_mid" || this.className === "ssc_star3_last" || this.className === "ssc_star2_front" || this.className === "ssc_star2_last" || this.className === "ssc_star1_dwd" ){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        if(indexf === 2){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {return n;});
              this.cn = this.dd.join("");
            }
          });
          this.zhu3 = 5;
        }
        if(indexf === 3){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {return n;});
              this.dn = this.dd.join("");
            }
          });
          this.zhu4 = 5;
        }
        if(indexf === 4){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {return n;});
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
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.getCount(this.con.split(","), 4);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_front") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-," + this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_last") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_front") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_last") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = "-,-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star1_dwd") {
          this.zhu = this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
          this.pd.addzhu = this.zhu;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star5") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
          this.zhu = this.getCount(this.con.split(","), 5);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if ( this.className === "ssc_star4_front_group6" || this.className === "ssc_star5_none2" || this.className === "ssc_star4_front_none2" || this.className === "ssc_star3_front_none2" || this.className === "ssc_star3_mid_none2" || this.className === "ssc_star3_last_none2"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = arr.length;
          this.pd.addzhu = this.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (this.className === "ssc_star3_front_group3" || this.className === "ssc_star3_mid_group3" || this.className === "ssc_star3_last_group3"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          let lengths = this.dd.length;
          this.zhu = this.getzuCount3(lengths);
          this.pd.addzhu = this.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (this.className === "ssc_star5_none3" || this.className === "ssc_star3_mid_group6" || this.className === "ssc_star3_last_group6" || this.className === "ssc_star3_front_group6"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = arr.length;
          this.pd.addzhu = this.zhu;
        }
      }
      //前二，后二跨度 +
      if (this.className === "ssc_star2_front_kd" || this.className === "ssc_star2_last_kd") {
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erkuadu(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (this.className === "ssc_star5_group5" || this.className === "ssc_star5_group10"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount5(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (this.className === "ssc_star5_group20" || this.className === "ssc_star5_group30"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount20(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount60(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getCount120(lengths);
        this.pd.addzhu = this.zhu;
      }
      //二星组选 复式 +
      if (this.className === "ssc_star2_front_group" || this.className === "ssc_star2_last_group"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erzuxuanfushi(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if(this.className === 'ssc_star5_none1' || this.className === 'ssc_star4_front_none1' || this.className === 'ssc_star4_last_none1' || this.className === 'ssc_star3_front_none1' || this.className === 'ssc_star3_mid_none1' || this.className === 'ssc_star3_last_none1'){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        this.zhu = this.zhu1;
        this.pd.addzhu = this.zhu;
      }
      //前四--组选4,12+
      if (this.className === "ssc_star4_front_group4" || this.className === "ssc_star4_front_group12" || this.className === "ssc_star4_front_group24"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        if(this.className === "ssc_star4_front_group4"){
          this.zhu = this.getzuCount4(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group12"){
          this.zhu = this.getzuCount12(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group24"){
          this.zhu = this.getzuCount24(this.con.split(","));
        }
        this.pd.addzhu = this.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (i < len) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getzuCount24(lengths);
        this.pd.addzhu = this.zhu;
      }
    },
    //单 ++++
    iszhu4({ ball },item,indexf){
      //复式 +
      if(this.className === "ssc_star5" || this.className === "ssc_star4_front" || this.className === "ssc_star3_front" || this.className === "ssc_star3_mid" || this.className === "ssc_star3_last" || this.className === "ssc_star2_front" || this.className === "ssc_star2_last" || this.className === "ssc_star1_dwd" ){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        if(indexf === 2){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {return n;});
              this.cn = this.dd.join("");
            }
          });
          this.zhu3 = 5;
        }
        if(indexf === 3){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {return n;});
              this.dn = this.dd.join("");
            }
          });
          this.zhu4 = 5;
        }
        if(indexf === 4){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {return n;});
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
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.getCount(this.con.split(","), 4);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_front") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-," + this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_last") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_front") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_last") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = "-,-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star1_dwd") {
          this.zhu = this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
          this.pd.addzhu = this.zhu;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star5") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
          this.zhu = this.getCount(this.con.split(","), 5);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if ( this.className === "ssc_star4_front_group6" || this.className === "ssc_star5_none2" || this.className === "ssc_star4_front_none2" || this.className === "ssc_star3_front_none2" || this.className === "ssc_star3_mid_none2" || this.className === "ssc_star3_last_none2"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = arr.length;
          this.pd.addzhu = this.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (this.className === "ssc_star3_front_group3" || this.className === "ssc_star3_mid_group3" || this.className === "ssc_star3_last_group3"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          let lengths = this.dd.length;
          this.zhu = this.getzuCount3(lengths);
          this.pd.addzhu = this.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (this.className === "ssc_star5_none3" || this.className === "ssc_star3_mid_group6" || this.className === "ssc_star3_last_group6" || this.className === "ssc_star3_front_group6"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = arr.length;
          this.pd.addzhu = this.zhu;
        }
      }
      //前二，后二跨度 +
      if (this.className === "ssc_star2_front_kd" || this.className === "ssc_star2_last_kd") {
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erkuadu(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (this.className === "ssc_star5_group5" || this.className === "ssc_star5_group10"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount5(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (this.className === "ssc_star5_group20" || this.className === "ssc_star5_group30"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount20(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount60(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getCount120(lengths);
        this.pd.addzhu = this.zhu;
      }
      //二星组选 复式 +
      if (this.className === "ssc_star2_front_group" || this.className === "ssc_star2_last_group"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erzuxuanfushi(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if(this.className === 'ssc_star5_none1' || this.className === 'ssc_star4_front_none1' || this.className === 'ssc_star4_last_none1' || this.className === 'ssc_star3_front_none1' || this.className === 'ssc_star3_mid_none1' || this.className === 'ssc_star3_last_none1'){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        this.zhu = this.zhu1;
        this.pd.addzhu = this.zhu;
      }
      //前四--组选4,12+
      if (this.className === "ssc_star4_front_group4" || this.className === "ssc_star4_front_group12" || this.className === "ssc_star4_front_group24"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        if(this.className === "ssc_star4_front_group4"){
          this.zhu = this.getzuCount4(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group12"){
          this.zhu = this.getzuCount12(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group24"){
          this.zhu = this.getzuCount24(this.con.split(","));
        }
        this.pd.addzhu = this.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 1) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getzuCount24(lengths);
        this.pd.addzhu = this.zhu;
      }
    },
    //双 ++++
    iszhu5({ ball },item,indexf){
      //复式 +
      if(this.className === "ssc_star5" || this.className === "ssc_star4_front" || this.className === "ssc_star3_front" || this.className === "ssc_star3_mid" || this.className === "ssc_star3_last" || this.className === "ssc_star2_front" || this.className === "ssc_star2_last" || this.className === "ssc_star1_dwd" ){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
          this.zhu2 = 5;
        }
        if(indexf === 2){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kc[i] = list.ball;
              this.dd = this.kc.filter(function(n) {return n;});
              this.cn = this.dd.join("");
            }
          });
          this.zhu3 = 5;
        }
        if(indexf === 3){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kd[i] = list.ball;
              this.dd = this.kd.filter(function(n) {return n;});
              this.dn = this.dd.join("");
            }
          });
          this.zhu4 = 5;
        }
        if(indexf === 4){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ke[i] = list.ball;
              this.dd = this.ke.filter(function(n) {return n;});
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
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.getCount(this.con.split(","), 4);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_front") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-," + this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_last") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_front") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_last") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = "-,-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star1_dwd") {
          this.zhu = this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
          this.pd.addzhu = this.zhu;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star5") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
          this.zhu = this.getCount(this.con.split(","), 5);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if ( this.className === "ssc_star4_front_group6" || this.className === "ssc_star5_none2" || this.className === "ssc_star4_front_none2" || this.className === "ssc_star3_front_none2" || this.className === "ssc_star3_mid_none2" || this.className === "ssc_star3_last_none2"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 2);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = arr.length;
          this.pd.addzhu = this.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (this.className === "ssc_star3_front_group3" || this.className === "ssc_star3_mid_group3" || this.className === "ssc_star3_last_group3"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          let lengths = this.dd.length;
          this.zhu = this.getzuCount3(lengths);
          this.pd.addzhu = this.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (this.className === "ssc_star5_none3" || this.className === "ssc_star3_mid_group6" || this.className === "ssc_star3_last_group6" || this.className === "ssc_star3_front_group6"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          let ret = this.groupSplit(this.dd, 3);
          let arr = [];
          for (var k = 0; k < ret.length; k++) {
            var cc = ret[k].join("");
            arr.push(cc);
          }
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = arr.length;
          this.pd.addzhu = this.zhu;
        }
      }
      //前二，后二跨度 +
      if (this.className === "ssc_star2_front_kd" || this.className === "ssc_star2_last_kd") {
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join(",");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erkuadu(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (this.className === "ssc_star5_group5" || this.className === "ssc_star5_group10"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount5(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (this.className === "ssc_star5_group20" || this.className === "ssc_star5_group30"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount20(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount60(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getCount120(lengths);
        this.pd.addzhu = this.zhu;
      }
      //二星组选 复式 +
      if (this.className === "ssc_star2_front_group" || this.className === "ssc_star2_last_group"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erzuxuanfushi(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if(this.className === 'ssc_star5_none1' || this.className === 'ssc_star4_front_none1' || this.className === 'ssc_star4_last_none1' || this.className === 'ssc_star3_front_none1' || this.className === 'ssc_star3_mid_none1' || this.className === 'ssc_star3_last_none1'){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
          this.zhu1 = 5;
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        this.zhu = this.zhu1;
        this.pd.addzhu = this.zhu;
      }
      //前四--组选4,12+
      if (this.className === "ssc_star4_front_group4" || this.className === "ssc_star4_front_group12" || this.className === "ssc_star4_front_group24"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.kb[i] = list.ball;
              this.dd = this.kb.filter(function(n) {return n;});
              this.bn = this.dd.join("");
            }
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        if(this.className === "ssc_star4_front_group4"){
          this.zhu = this.getzuCount4(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group12"){
          this.zhu = this.getzuCount12(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group24"){
          this.zhu = this.getzuCount24(this.con.split(","));
        }
        this.pd.addzhu = this.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24"){
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            if (list.ball % 2 === 0) {
              list.choose = true;
              this.ka[i] = list.ball;
              this.dd = this.ka.filter(function(n) {return n;});
              this.an = this.dd.join("");
            }
          });
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getzuCount24(lengths);
        this.pd.addzhu = this.zhu;
      }
    },
    //清 ++++
    iszhu6({ ball },item,indexf){
      //复式 +
      if(this.className === "ssc_star5" || this.className === "ssc_star4_front" || this.className === "ssc_star3_front" || this.className === "ssc_star3_mid" || this.className === "ssc_star3_last" || this.className === "ssc_star2_front" || this.className === "ssc_star2_last" || this.className === "ssc_star1_dwd" ){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
          this.zhu1 = 0;
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            list.choose = false;
            this.kb = [];
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join("");
          });
          this.zhu2 = 0;
        }
        if(indexf === 2){
          ball.filter((list,i) => {
            list.choose = false;
            this.kc = [];
            this.dd = this.kc.filter(function(n) {return n;});
            this.cn = this.dd.join("");
          });
          this.zhu3 = 0;
        }
        if(indexf === 3){
          ball.filter((list,i) => {
            list.choose = false;
            this.kd = [];
            this.dd = this.kd.filter(function(n) {return n;});
            this.dn = this.dd.join("");
          });
          this.zhu4 = 0;
        }
        if(indexf === 4){
          ball.filter((list,i) => {
            list.choose = false;
            this.ke = [];
            this.dd = this.ke.filter(function(n) {return n;});
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
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn;
          this.zhu = this.getCount(this.con.split(","), 4);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_front") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_mid") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-," + this.con + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star3_last") {
          this.pd.addCon = this.an + "," + this.bn + "," + this.cn;
          this.con = this.an + "," + this.bn + "," + this.cn;
          this.zhu = this.getCount(this.con.split(","), 3);
          this.pd.addzhu = this.zhu;
          this.con = "-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_front") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = this.con + ",-" + ",-" + ",-";
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star2_last") {
          this.pd.addCon = this.an + "," + this.bn;
          this.con = this.an + "," + this.bn;
          this.zhu = this.getCount(this.con.split(","), 2);
          this.pd.addzhu = this.zhu;
          this.con = "-,-,-," + this.con;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star1_dwd") {
          this.zhu = this.zhu1 + this.zhu2 + this.zhu3 + this.zhu4 + this.zhu5;
          this.pd.addzhu = this.zhu;
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
        }
        if (this.className === "ssc_star5") {
          this.con = this.an + "," + this.bn + "," + this.cn + "," + this.dn + "," + this.en;
          this.pd.addCon = this.con;
          this.zhu = this.getCount(this.con.split(","), 5);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星、四星、三星、二星二码不定位 、前四组选6+
      if ( this.className === "ssc_star4_front_group6" || this.className === "ssc_star5_none2" || this.className === "ssc_star4_front_none2" || this.className === "ssc_star3_front_none2" || this.className === "ssc_star3_mid_none2" || this.className === "ssc_star3_last_none2"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = 0;
          this.pd.addzhu = this.zhu;
        }
      }
      //前三、中三、后三组选3 +
      if (this.className === "ssc_star3_front_group3" || this.className === "ssc_star3_mid_group3" || this.className === "ssc_star3_last_group3"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join(",");
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = 0;
          this.pd.addzhu = this.zhu;
        }
      }
      //三码不定位、前三，中三，后三组六 +
      if (this.className === "ssc_star5_none3" || this.className === "ssc_star3_mid_group6" || this.className === "ssc_star3_last_group6" || this.className === "ssc_star3_front_group6"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join(",");
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = 0;
          this.pd.addzhu = this.zhu;
        }
      }
      //前二，后二跨度 +
      if (this.className === "ssc_star2_front_kd" || this.className === "ssc_star2_last_kd") {
        let len = Math.ceil(ball.length / 2);
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join(",");
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erkuadu(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //五星--组选5,五星--组选10 +
      if (this.className === "ssc_star5_group5" || this.className === "ssc_star5_group10"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            list.choose = false;
            this.kb = [];
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join("");
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount5(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选20 ,五星--组选30+
      if (this.className === "ssc_star5_group20" || this.className === "ssc_star5_group30"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            list.choose = false;
            this.kb = [];
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join("");
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount20(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选60+
      if (this.className === "ssc_star5_group60"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            list.choose = false;
            this.kb = [];
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join("");
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        this.zhu = this.getzuCount60(this.con.split(","));
        this.pd.addzhu = this.zhu;
      }
      //五星--组选120+
      if (this.className === "ssc_star5_group120"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getCount120(lengths);
        this.pd.addzhu = this.zhu;
      }
      //二星组选 复式 +
      if (this.className === "ssc_star2_front_group" || this.className === "ssc_star2_last_group") {
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erzuxuanfushi(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //一码不定位,前五，后五，前四，后四，前三，后三
      if(this.className === 'ssc_star5_none1' || this.className === 'ssc_star4_front_none1' || this.className === 'ssc_star4_last_none1' || this.className === 'ssc_star3_front_none1' || this.className === 'ssc_star3_mid_none1' || this.className === 'ssc_star3_last_none1'){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
          this.con = this.an;
          this.pd.addCon = this.con;
          this.zhu = this.erzuxuanfushi(this.dd);
          this.pd.addzhu = this.zhu;
        }
      }
      //前四--组选4,12+
      if (this.className === "ssc_star4_front_group4" || this.className === "ssc_star4_front_group12" || this.className === "ssc_star4_front_group24"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
        }
        if(indexf === 1){
          ball.filter((list,i) => {
            list.choose = false;
            this.kb = [];
            this.dd = this.kb.filter(function(n) {return n;});
            this.bn = this.dd.join("");
          });
        }
        this.con = this.an + "," + this.bn;
        this.pd.addCon = this.con;
        if(this.className === "ssc_star4_front_group4"){
          this.zhu = this.getzuCount4(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group12"){
          this.zhu = this.getzuCount12(this.con.split(","));
        }
        if(this.className === "ssc_star4_front_group24"){
          this.zhu = this.getzuCount24(this.con.split(","));
        }
        this.pd.addzhu = this.zhu;
      }
      //前四--组选24+
      if (this.className === "ssc_star4_front_group24"){
        if(indexf === 0){
          ball.filter((list,i) => {
            list.choose = false;
            this.ka = [];
            this.dd = this.ka.filter(function(n) {return n;});
            this.an = this.dd.join("");
          });
        }
        this.con = this.an;
        this.pd.addCon = this.con;
        let lengths = this.dd.length;
        this.zhu = this.getzuCount24(lengths);
        this.pd.addzhu = this.zhu;
      }
    },
    aa(){
      this.dd = this.d.filter(function(n) {return n;});
      this.pd.addTitle = this.addTitle;
      this.con = this.dd.join(",");
      this.pd.addCon = this.con;
      this.pd.addPattern = "元";
      this.pd.addzhu = this.zhu;
      this.pd.addMoney = this.spinner3;
      this.pd.addClassName = this.className;
      this.pd.addSeasonId = this.seasonId;
      this.pd.addName = this.lottName;
    },
    //全大小单双清
    toolsCur(tools,idx,item,indexff) {
      if (Object.is(tools.fncode, "full")) {
        this.full({ball: item.nums},item,indexff);
      } else if (Object.is(tools.fncode, "big")) {
        this.big({ball: item.nums},item,indexff);
      } else if (Object.is(tools.fncode, "small")) {
        this.small({ball: item.nums},item,indexff);
      } else if (Object.is(tools.fncode, "single")) {
        this.single({ball: item.nums},item,indexff);
      } else if (Object.is(tools.fncode, "double")) {
        this.double({ball: item.nums},item,indexff);
      } else {
        this.empty({ball: item.nums},item,indexff);
      }
    },
    //全
    full({ ball },item,indexf) {
      this.empty({ball},item,indexf);
      this.aa();
      this.iszhu1({ ball },item,indexf);
      
    },
    //大
    big({ ball },item,indexf) {
      this.empty({ball},item,indexf);
      this.aa();
      this.iszhu2({ ball },item,indexf);
    },
    //小
    small({ ball },item,indexf) {
      this.empty({ball},item,indexf);
      this.aa();
      this.iszhu3({ ball },item,indexf);
    },
    //单
    single({ ball },item,indexf) {
      this.empty({ball},item,indexf);
      this.aa();
      this.iszhu4({ ball },item,indexf);
    },
    //双
    double({ ball },item,indexf) {
      this.empty({ball},item,indexf);
      this.aa();
      this.iszhu5({ ball },item,indexf);
    },
    //清
    empty({ ball },item,indexf) {
      this.aa();
      this.iszhu6({ ball },item,indexf);
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
    exit(){
      this.productList= [];
    },
  },
  components:{
    tool,firmbet
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
@import "../../../assets/scss/lotts/ssc.scss";
</style>
