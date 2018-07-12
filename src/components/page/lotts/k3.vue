<template>
  <div class="lott">
    <div class="lott-center">
      <div class="lott-top">
        <div class="lott-top-left"><img src="@/assets/img/lott/k3.png" alt="" />
          <span>{{lottName}}</span>
        </div>
        <div class="lott-top-middle k3">
          <p>第
            <span>201806240751</span>期 剩余投注时间</p>
          <div>00:00:00</div>
        </div>
        <div class="lott-top-right k3">
          <p>第
            <span>201806240751</span>期 开奖结果</p>
          <div class="showGif">
            <span v-for="(item,index) in 3" :key="index"></span>
          </div>
          <div class="showName" v-show="false">
            <img src="@/assets/img/lott/k3n1.jpg" alt="">
            <img src="@/assets/img/lott/k3n2.jpg" alt="">
            <img src="@/assets/img/lott/k3n3.jpg" alt="">
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
              <li v-for="(item,indexs) in sgroups2" :key="indexs" v-show="indexs === navTo">
                <p :class="{'active': indexff === playNum}" v-for="(play,indexff) in item.players" :key="indexff" @click="playersBut(play,indexff)" v-if="lotteryId !== 'dfk3' && play.title !== '三同号'">{{play.title}}</p>
                <p :class="{'active': indexff === playNum}" v-for="(play,indexff) in item.players" :key="indexff" @click="playersBut(play,indexff)" v-if="lotteryId === 'dfk3'">{{play.title}}</p>
              </li>
            </ul>
          </div>
          <div class="conterButBox">
            <div class="conterButTitle"><i class="el-icon-info"></i>{{current_player_bonus.remark}}。单注最高奖金<i>{{current_player_bonus.displayBonus | keepTwoNum}}</i>倍</div>
            <div class="conterBut" :class="'conterBut'+className">
              <div :class="className+'Box'" v-for='(numViews, indexf) in current_player_bonus.numView' :key='indexf'>
                <p :class="[item.choose ? 'active' : '',className]" v-for="(item,indexha) in numViews.nums" :key="indexha" @click="curBalls(item,indexha)" v-if="lotteryId !== 'dfk3' && item.ball !== '03' && item.ball !== '18'">
                  <span v-if="className !== 'k3_star3_and'"></span>
                  <span v-else><i>{{item.ball}}</i><i>赔160.00</i></span>
                </p>
                <p :class="[item.choose ? 'active' : '',className]" v-for="(item,indexha) in numViews.nums" :key="indexha" @click="curBalls(item,indexha)" v-if="lotteryId === 'dfk3'">
                  <span v-if="className !== 'k3_star3_and'"></span>
                  <span v-else><i>{{item.ball}}</i><i>赔60.00</i></span>
                </p>
                <div :class="className+'All'" v-if="className === 'k3_star2_same'"><span></span></div>
              </div>
            </div>
            <div class="zhu">
              <p>您选择了 <i>{{zhu}}</i> 注</p>
              <div class="butBox">
                <div class="numSum">
                  <span class="trim">投注金额</span><yd-spinner v-model="spinner3"></yd-spinner>
                </div>
                <button class="add" @click="addNum">添加号码栏</button><button>立即投注</button>
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
                <li>清空</li>
              </ul>
              <div class="addListBox">
                <ul class="addList" ref="addList" v-for="(item,index) in productList" :key="index">
                  <li>【{{item.addTitle}}】</li>
                  <li>{{item.addCon}}</li>
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
              <span class="lott-right-top2-span1">期号</span>
              <span class="lott-right-top2-span2">开奖号码</span>
              <span class="lott-right-top2-span3">和值</span>
              <span class="lott-right-top2-span4">形态</span>
            </p>
            <ul>
              <li v-for="item in 10" :key="item.id">
                <span class="lott-right-top2-span1">20180702064</span>
                <span class="lott-right-top2-span2">
                  <i>2,2,2</i>
                </span>
                <span class="lott-right-top2-span3">10</span>
                <span class="lott-right-top2-span4">
                  <i :class="sum < 11 ? 'yellow' : 'blue'">{{sum < 11 ? "小" : "大"}}</i>
                  <i :class="sum % 2 ===0 ? 'yellow' : 'blue'">{{sum % 2 ===0 ? "双" : "单"}}</i>
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
                <span class="lott-right-top4-span3" :class="{'status': item.win === 0}" v-if="item.win === 0"><i>{{item.statusName}}</i></span>
                <span class="lott-right-top4-span3" v-if="item.win !== 0"><i>{{item.win}}</i></span>
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
  </div>
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      num:0,
      left:0,
      sum: 0,
      navTo:0,
      playNum:0,
      zhu:10,
      productList: [
        {
          addTitle: "龙虎",
          addCon: "1,2,3",
          addPattern: "元",
          addzhu: 1,
          addMoney: 1
        },
        {
          addTitle: "龙虎",
          addCon: "1,2,3",
          addPattern: "元",
          addzhu: 2,
          addMoney: 1
        },
        {
          addTitle: "龙虎",
          addCon: "1,2,3",
          addPattern: "元",
          addzhu: 3,
          addMoney: 1
        },
      ],
      spinner3:0,
      butClass1:true,
      butClass2:false,
      animate:true,
      orderList:null,
      className:'k3_star1',//玩法ID
      lottName:'宏發快3',//彩种名
      lotteryId:'dfk3',//彩种id
      lottNameIndex:0,//默认彩种
      winList: null, //中奖列表
      lotteryList:null,
      playGroups:null,//玩法树
      playBonus: "", //玩法树
      bonusArray:[],//和值赔率
      playBonusId: "ssc_star5", //点击选中后获取此玩法ID
      current_player: {}, //當前玩法
      current_player_bonus: {}, //當前玩法
      splayGroups: [],
      sgroups: [], 
      sgroups2: [], 
      splayers: [], 
      snumView: [], 
      arrpeilva:[],
      arrpeilvb:[],
      arrpeilvc:[],
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
    this.getbetOrderList();
    this.lotteryAll();
    this.getPlayTree();
  },
  methods:{
    //添加号码栏
    addNum() {
      this.iscreat();
      console.log(this.arr,this.productList)
    },
    //删除指定行
    deleList(item,index) {
      this.productList.splice(index,1);
    },
    curBalls(item,index){
      item.choose = !item.choose;
    },
    //菜单选择项1
    playGroupBut(item,index){
      this.navTo = index;
      this.playNum = 0;
      this.current_player = item;
      this.current_player_bonus = item.groups[0].players[0];
      this.className = this.current_player_bonus.id;
      this.iscreat();
    },
    //菜单选择项2
    playersBut(play,indexff){
      this.playNum = indexff;
      this.current_player_bonus = play;
      this.className = play.id;
      this.iscreat();
    },
    //玩法术
    getPlayTree(){
      var now = new Date().getTime();
      if(localStorage.getItem("getPlayTree_playGroups_k3") !== null ){
        var setupTime = localStorage.getItem("data_getPlayTree_k3");
        if(setupTime === null || now - setupTime > this.$store.state.cacheTime){
          localStorage.removeItem("getPlayTree_playGroups_k3");
          localStorage.removeItem("getPlayTree_playBonus_k3");
          localStorage.removeItem("data_getPlayTree_k3");
          this.$axios.get(baseUrl + "/api/lottery/getPlayTree?lotteryId="+this.lotteryId).then(res =>{
          localStorage.setItem("getPlayTree_playGroups_k3",JSON.stringify(res.data.data.playGroups));
          localStorage.setItem("getPlayTree_playBonus_k3",JSON.stringify(res.data.data.playBonus));
          localStorage.setItem("data_getPlayTree_k3",now);
          this.playGroups = JSON.parse(localStorage.getItem("getPlayTree_playGroups_k3"));
          this.playBonus = JSON.parse(localStorage.getItem("getPlayTree_playBonus_k3"));
          this.setupPlayTree();
        }).catch(error =>{
          console.log("玩法术,No");
        });
        }else{
          this.playGroups = JSON.parse(localStorage.getItem("getPlayTree_playGroups_k3"));
          this.playBonus = JSON.parse(localStorage.getItem("getPlayTree_playBonus_k3"));
          this.setupPlayTree();
        }
      }else{
        this.$axios.get(baseUrl + "/api/lottery/getPlayTree?lotteryId="+this.lotteryId).then(res =>{
          localStorage.setItem("getPlayTree_playGroups_k3",JSON.stringify(res.data.data.playGroups));
          localStorage.setItem("getPlayTree_playBonus_k3",JSON.stringify(res.data.data.playBonus));
          localStorage.setItem("data_getPlayTree_k3",now);
          this.playGroups = JSON.parse(localStorage.getItem("getPlayTree_playGroups_k3"));
          this.playBonus = JSON.parse(localStorage.getItem("getPlayTree_playBonus_k3"));
          this.setupPlayTree();
        }).catch(error =>{
          console.log("玩法术,No");
        });
      }
    },
    setupPlayTree() {
      let arr1 = [];
      let arr2 = [];
      let arrpeilv1 = JSON.parse(JSON.stringify(this.playBonus[3].bonusArray))
      let arrpeilv2 = JSON.parse(JSON.stringify(this.playBonus[4].bonusArray))
      if (this.lotteryId === 'dfk3'){
        for (let i in arrpeilv1) {
          this.arrpeilva.push(arrpeilv1[i]);
        }
        this.arrpeilva.shift();
        this.arrpeilva.pop();
        for(let i=0; i<this.arrpeilva.length/2;i++){
          arr1.push(this.arrpeilva[i]);
        }
        for(let i=this.arrpeilva.length/2; i<this.arrpeilva.length;i++){
          arr2.push(this.arrpeilva[i]);
        }
        for (let i in arrpeilv2) {
          this.arrpeilvb.push(arrpeilv2[i]);
        }
        this.arrpeilvc.push(arr1);
        this.arrpeilvc.push(arr2);
        this.arrpeilvc.push(this.arrpeilvb);
      }else if (this.lotteryId !== 'dfk3'){
        this.arrpeilva = [];
        this.arrpeilvb = [];
        for (let i in arrpeilv1) {
          this.arrpeilva.push(arrpeilv1[i]);
        }
        for(let i=0; i<this.arrpeilva.length/2;i++){
          arr1.push(this.arrpeilva[i]);
        }
        for(let i=this.arrpeilva.length/2; i<this.arrpeilva.length;i++){
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
    //导航点击
    lottListNav(item,index){
      this.lottName = item.name;
      this.lottNameIndex = index;
      this.lotteryId = item.id;
      this.getPlayTree();
    },
    //清空
    iscreat() {
      this.zhu = 0;
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
      if(localStorage.getItem("lotteryAll_k3") !== null){
        var setupTime = localStorage.getItem("data_lotteryAll_k3");
        if(setupTime === null || now - setupTime > this.$store.state.cacheTime){
          localStorage.removeItem("lotteryAll_k3");
          localStorage.removeItem("data_lotteryAll_k3");
          this.$axios.get(baseUrl + "/api/lottery/getLotteryList").then(res => {
            localStorage.setItem("lotteryAll_k3",JSON.stringify(res.data.data.k3));
            this.lotteryList = JSON.parse(localStorage.getItem("lotteryAll_k3"));
            localStorage.setItem("data_lotteryAll_k3",now);
          })
          .catch(error => {
            console.log(error);
          });
        }else{
          this.lotteryList = JSON.parse(localStorage.getItem("lotteryAll_k3"));
        }
      }else{
        this.$axios.get(baseUrl + "/api/lottery/getLotteryList").then(res => {
          localStorage.setItem("lotteryAll_k3",JSON.stringify(res.data.data.k3));
          this.lotteryList = JSON.parse(localStorage.getItem("lotteryAll_k3"));
          localStorage.setItem("data_lotteryAll_k3",now);
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    //我的投注
    getbetOrderList(){
      this.$axios.get(baseUrl + "/api/proxy/getbetOrderList?include=0&status=100&betweenType=3&start=0&limit=4&account="+this.$store.state.Globalusername,this.$store.state.config).then(res =>{
        this.orderList = res.data.data.list
      }).catch(error =>{
        console.log("获取投注记录失败");
      })
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
    //导航左边点击
    lottnavright(){
      let box = this.$refs.lottnavbox.offsetWidth;
      let ul = this.$refs.lottnavUl.offsetWidth;
      let li = this.$refs.lottnavLi[0].offsetWidth;
      if((this.num*li +box) < ul){
        this.num ++;
        if(ul > box){
          this.left = -(this.num * li)
        }
      }else if((this.num*li +box) > ul){
        this.num = this.num;
      }
    },
    //导航右边点击
    lottnavleft(){
      let box = this.$refs.lottnavbox.offsetWidth;
      let ul = this.$refs.lottnavUl.offsetWidth;
      let li = this.$refs.lottnavLi[0].offsetWidth;
      if(this.num > 0){
        this.num --;
        if(ul > box){
          this.left = -(this.num * li)
        }
      }else if((this.num*li +box) > ul){
        this.num = 0;
      }
    },
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
