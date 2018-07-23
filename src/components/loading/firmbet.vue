<template>
  <div class="firmbet" v-show="toshwo">
    <ul class="num4">
      <li class="title">
        <span></span>
        <p>温馨提示</p>
        <span @click="isshow">
          <i class="el-icon-circle-close-outline transition"></i>
        </span>
      </li>
      <li class="betConfirmBox">
        <div>
          <p class="hint">请核准您的投注信息</p>
          <p class="headline">
            <span>彩种：{{addName}}</span>
            <span>期号：{{content}}</span>
          </p>
          <div class="addBox">
            <span class="addHead">详情：</span>
            <div>
              <ul>
                <li v-for="(item,index) in productLists" :key="index">
                  <span class="addtitle">【{{item.addTitle}}】</span>
                  <p class="addCon">{{item.addCon}}</p>
                </li>
              </ul>
            </div>
          </div>
          <p class="payment">付款总金额：<i>{{money}} </i> 元</p>
          <p class="user">付款账号：{{username}}</p>
        </div>
      </li>
      <li class="dialogBtn">
        <button @click="betGo">确认投注</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { baseUrl } from "@/assets/js/env";
export default {
  data() {
    return {
      zhu:0,
      addMoney:0,
      money:0,
      toshwo:false,
      addName:null,
      username:localStorage.getItem('username')
    };
  },
  props:{
    productLists:{
      type:Array
    },
    content:{
      type:Number
    },
    pds:{
      type:Object
    }
  },
  methods:{
    isshow(){
      this.toshwo = !this.toshwo;
      let addName = '';
      let addMoney=0;
      let addzhu=0;
      let money=0;
      for(let i=0; i<this.productLists.length;i++){
        addMoney += this.productLists[i].addMoney;
        addzhu += this.productLists[i].addzhu;
        money += this.productLists[i].addMoney * this.productLists[i].addzhu;
        addName = this.productLists[0].addName;
      }
      this.money = money;
      this.addName = addName;
    },
    betGo(){
      let addMoney=0;
      let addzhu=0;
      let money=0;
      let addSeasonId=null;
      let formData = new FormData();
      for(let i=0; i<this.productLists.length;i++){
        addMoney += this.productLists[i].addMoney;
        addzhu += this.productLists[i].addzhu;
        money += this.productLists[i].addMoney * this.productLists[i].addzhu;
        addSeasonId = this.productLists[0].addSeasonId
        formData.append("order["+i+"].content", this.productLists[i].addCon);
        formData.append("order["+i+"].betCount", this.productLists[i].addzhu);
        formData.append("order["+i+"].price", this.productLists[i].addMoney);
        formData.append("order["+i+"].unit", 1);
        formData.append("order["+i+"].playId", this.productLists[i].addClassName);
        formData.append("traceOrders[0].price", this.productLists[i].addMoney);
      }
      this.money = money;
      this.addMoney = addMoney;
      this.zhu = addzhu;
      this.addSeasonId = addSeasonId;
      formData.append("count", this.zhu);
      formData.append("traceOrders[0].seasonId",this.addSeasonId);
      formData.append("bounsType", 0);
      formData.append("traceWinStop", 0);
      formData.append("isTrace", 0);
      formData.append("lotteryId", this.$route.params.lotteryId);
      formData.append("amount", this.money);
      this.$axios
        .post(baseUrl + "/api/lottery/bet", formData, this.$store.state.config)
        .then(res => {
          if (res.data.message === "success") {
            this.toshwo = !this.toshwo;
            this.$pop.show({title:'温馨提示',content:'恭喜您，投注成功！',content1:'',content2:'',number:1});
            this.$parent.getbetOrderList();//调用父级的获取投注记录
            this.$parent.exit();//调用父级的清空方法
          } else {
            this.toshwo = !this.toshwo;
            this.$pop.show({title:'温馨提示',content:res.data.data,content1:'',content2:'',number:1});
            this.$parent.exit();//调用父级的清空方法
          }
        })
        .catch(error => {
          console.log("立即投注,No");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/minix/main.scss";
.firmbet {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 20180608;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  ul.num4 {
    min-width: 300px;
    max-width: 500px;
    width: 460px;
    height: 432px;
    background: #FFF;
    border-radius: 4px;
    @extend %flex;
    @extend %fdc;
    @extend %sbetween;
    & li.title {
      @extend %flex,%aitems,%sbetween;
      background: rgb(175,58,49);
      color: #fff;
      font-size: 16px;
      height: 40px;
      border: 1px solid rgb(175,58,49);
      border-radius: 4px 4px 0px 0px;
      border-bottom: 0px solid #ddd;
      & span{
        @extend %faj;
        width: 10%;
        height: 40px;
      }
      & p{
        @extend %faj;
        width: 80%;
        height: 40px;
      }
      & i{
        @extend %faj;
        width: 26px;
        height: 26px;
        font-size: 26px;
      }
      & i.transition:hover{
        transition: All 4s ease-in-out;
        transform: rotate(3600deg);
      }
    }
    & li.betConfirmBox {
      height: 340px;
      padding: 20px 30px 0px;
      & .hint {
        font-size: 14px;
        font-weight: 700;
        height: 30px;
      }
      & .headline {
        font-size: 14px;
        & span {
          margin-right: 20px;
        }
      }
      & .addBox {
        @extend %flex;
        margin-top: 14px;
        & .addHead {
          width: 40px;
        }
        > div {
          width: 350px;
          height: 210px;
          border: 1px solid #ddd;
          padding: 10px 0px 0px 10px;
          > ul {
            & li {
              @extend %flex;
              & .addtitle {
                @extend %flex;
                width: 108px;
                margin-right: 10px;
              }
              & .addCon {
                @extend %flex,%fr;
                max-width: 220px;
                word-break:break-all;
              }
            }
          }
        }
      }
      & .payment,
      .user {
        height: 30px;
        & i {
          color: red;
        }
      }
    }
    & li.dialogBtn {
      @extend %faj;
      height: 52px;
      & button {
        width: 100px;
        height: 30px;
        background: #ec511e;
        border-radius: 15px;
        color: #fff;
        font-size: 14px;
      }
    }
  }
}
</style>

