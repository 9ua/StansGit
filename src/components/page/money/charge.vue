<template lang="jade">
.viewBox
  .userRight
    .userTitle 我要充值
    .userMain
      .newTab
        router-link(:to="'charge?id='+nav.id+'&alias='+nav.alias", v-for='(nav,index) in listnav',:class="{'active': nav.id == navNum}",:key='index' ,@click.native="changeNav($event,index)") {{nav.alias}}
      .list
        .content
          ul.II(v-if='waytype==2')
            .rechLeftInfo
            .p 收款银行：
              span {{receiveBankName}}
            .p 收款人姓名：
              span {{receiveNiceName}}
            .p 收款卡号：
              span {{receiveCard}}
            .p 收款银行地址：
              span {{receiveAddress}}
            el-form(ref='form', label-width='144px',size='medium')
              el-form-item(label='充值金额：')
                el-input(v-model='chargeamount', placeholder='请输入您想要充值的金额',type='number',style="width:210px;")
              el-form-item(label='充值人姓名：')
                el-input(v-model='niceName', placeholder='请输入充值人姓名',style="width:210px;",type='text')
              el-form-item(label='附言：')
                el-input(v-model='checkCode',style="width:210px;",type='number')
            button(@click='sendReq',class='submitBtn',style='margin-left:144px;border:0;') 确定  
            .userTip
              p 1、{{attthird}}
              p 2、请正确填写转账银行卡的持卡人姓名和充值金额，以便及时核对。
              p 3、转账1笔提交1次，请勿重复提交订单。
              p 4、请务必转账后再提交订单，否则无法及时查到您的款项！
          ul.I(v-if='waytype==1')
            .rechLeftInfo
              .img(style='width:1px;height:280px;')
                img(:src='this.QRCodeUrl',style="width:200px;margin:22px 144px;")
            el-form(ref='form', label-width='144px',size='medium')
              el-form-item(label='充值金额：')
                el-input(v-model='chargeamount', placeholder='请输入您想要充值的金额',type='number',style="width:210px;")
              el-form-item(label='充值人姓名：')
                el-input(v-model='niceName', placeholder='请输入充值人姓名',style="width:210px;",type='text')
              el-form-item(label='交易单号后六位：')
                el-input(v-model='checkCode', placeholder='交易单号后六位',style="width:210px;",type='number')
                span(style='color:red;margin-left:10px;') {{attthird}}
            button(@click='sendReq',class='submitBtn',style='margin-left:144px;border:0;') 确定
            .userTip
              p 1、{{attthird}}
              p 2、请正确填写姓名和充值金额，以便及时核对。
              p 3、转账1笔提交1次，请勿重复提交订单。
              p 4、请务必转账后再提交订单，否则无法及时查到您的款项！
          ul.III(v-if='waytype==3')
            li
              .p 申请金额：
                input(type="number" @focus="parseIntAmount" @blur='parseIntAmount' placeholder='请输入金額', v-model='amount', value='amount', class='el-input__inner')
            li
              .p 支付渠道：
                | {{selectBank}}
            li
              button.submitBtn(@click="sendReq2()",class='submitBtn',style='margin-left:144px;border:0;') 充值申请
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  computed: {
    listnav() {
      this.rechargeEntrance();
      let payway = JSON.parse(localStorage.getItem("paywaylist"));
      return payway;
    },
    navNum() {
      return this.$route.query.id;
    }
  },
  data() {
    return {
      amount: "", //金額
      waytype: "", //渠道類型
      title: "", //標題
      chargeamount: "", //線下充值金額
      niceName: "", //使用者名稱
      content: "", //提示窗內容文字
      checkCode: "", //附言
      QRCodeUrl: "", //QRcode連結
      receiveAddress: "",
      receiveBankId: "",
      receiveBankName: "",
      receiveCard: "",
      receiveNiceName: "",
      attfirst: "访问点连接中...",
      attsecond: "访问点连接中...",
      attthird: "访问点连接中...",
      selectBank: "渠道连接中..",
      bankUserId: "", //第三方線上渠道id
      payway: [], //渠道列表
      jId: "",
      attempty: "",
      canClick: true
    };
  },
  methods: {
    changeNav($e, index) {
      this.selectBank = "渠道连接中..";
      this.canClick=true;
      this.chargeamount = ""; //線下充值金額
      this.niceName = ""; //使用者名稱
      this.checkCode = ""; //提示窗內容文字
    },
    parseIntAmount() {
      if (this.amount !== "") {
        this.amount = parseInt(this.amount);
      }
    },
    //獲取渠道資訊
    rechargeEntrance() {
      this.$loader.show();
      this.$axios
        .get(baseUrl + "/api/proxy/rechargeEntrance", {
          params: { rechargeWay: this.$route.query.id }
        })
        .then(res => {
          this.$loader.hide();
          this.waytype = res.data.data.waytype;
          this.title = this.$route.query.alias;
          if (this.waytype === 3) {
            //若waytype為3則為線上支付渠道
            this.sToJ();
            //id轉換判斷
          } else {
            this.attempty = res.data.data.attempty;
            this.QRCodeUrl = baseUrl + res.data.data.QRCodeUrl;
            this.receiveAddress = res.data.data.receiveAddress;
            this.receiveBankId = res.data.data.receiveBankId;
            this.receiveBankName = res.data.data.receiveBankName;
            this.receiveCard = res.data.data.receiveCard;
            this.receiveNiceName = res.data.data.receiveNiceName;
            this.attfirst = res.data.data.attfirst;
            this.attsecond = res.data.data.attsecond;
            this.attthird = res.data.data.attthird;
          }
        })
        .catch(error => {
          this.$loader.hide();
          console.log(error);
        });
    },
    //執行傳入之js跳轉（線上渠道）
    excecuteJS() {
      setTimeout("document.getElementById('frm1').submit();", 100);
    },
    //id轉換判斷 stephen -> jason
    sToJ() {
      if (this.title.match("支付宝") !== null) {
        this.jId = 2;
      } else if (this.title.match("微信") !== null) {
        this.jId = 3;
      } else if (this.title.match("QQ") !== null) {
        this.jId = 4;
      } else {
        this.jId = 1;
      }
      this.getBanks();
    },
    //獲取渠道資訊（線上用）
    getBanks() {
      this.$axios
        .get(baseUrl + "/api/pay/thirdparty/getBanks", {
          params: { type: this.jId }
        })
        .then(res => {
          if (this.jId === 1) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.payway.push({
                name: res.data.data[i].name,
                code: res.data.data[i].code,
                callback: this.onClick
              });
            }
          } else {
            if (res.data.data.length > 0) {
              this.bankUserId = res.data.data[0].code;
              this.selectBank = res.data.data[0].name;
            } else {
              this.canClick = false;
              this.selectBank = "暂无可用渠道";
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //線上渠道支付申請
    sendReq2() {
      if (this.canClick) {
        if (this.amount === "") {
          this.$pop.show({
            error: "",
            title: "温馨提示",
            content: "请输入金額!",
            content1: "",
            content2: "",
            number: 2
          });
          return ;
        } else if (this.selectBank === "请选择银行") {
          this.$pop.show({
            error: "",
            title: "温馨提示",
            content: "请选择银行卡!",
            content1: "",
            content2: "",
            number: 2
          });
          return ;
        } else {
          let formData = new FormData();
          formData.append("amount", parseInt(this.amount));
          formData.append("bankId", this.bankUserId);
          this.$loader.show();
          this.$axios
            .post(baseUrl + "/api/pay/thirdparty/deposit", formData)
            .then(res => {
              this.$loader.hide();
              if (res.data.code === 1) {
                console.log(res.data.data);
                var z = document.createElement("p");
                z.innerHTML = res.data.data;
                document.body.appendChild(z);
                this.excecuteJS();
                console.log("成功");
              } else {
                this.content = res.data.data;
                this.$pop.show({
                  error: "",
                  title: "温馨提示",
                  content: this.content,
                  content1: "",
                  content2: "",
                  number: 2
                });
              }
            })
            .catch(error => {
              this.$loader.hide();
              console.log(error);
            });
        }
      }else{
        this.$pop.show({
          error: "",
          title: "温馨提示",
          content: "暂无可用渠道",
          content2: "",
          number: 2
        });
      }
    },
    //線下支付申請
    sendReq() {
      if (this.chargeamount == "") {
        this.$pop.show({
          error: "",
          title: "温馨提示",
          content: "充值金额不能位空！",
          content2: "",
          number: 2
        });
        return;
      } else if (this.niceName === "") {
        this.$pop.show({
          error: "",
          title: "温馨提示",
          content: "请输入姓名!",
          content1: "",
          content2: "",
          number: 2
        });
        return;
      }
      let formData = new FormData();
      formData.append("rechargeWay", this.$route.query.id);
      formData.append("receiveBankId", this.receiveBankId);
      formData.append("chargeamount", this.chargeamount);
      formData.append("niceName", this.niceName);
      formData.append("checkCode", this.checkCode);
      this.$loader.show();
      this.$axios
        .post(baseUrl + "/api/proxy/setPayRequest", formData)
        .then(res => {
          this.$loader.hide();
          if (res.data.code === 1) {
            this.content = "申请完成，资讯可至充值信息页面查询。";
            this.chargeamount = "";
            this.$pop.show({
              title: "提示",
              content: res.data.data.message,
              content2: "",
              number: 1
            });
          } else if (res.data.code === 0) {
            this.content = res.data.data.message;
            this.$pop.show({
              error: "",
              title: "失败",
              content: this.content,
              content1: "",
              content2: "",
              number: 2
            });
          } else {
            this.content = res.data.content;
            this.$pop.show({
              error: "",
              title: "温馨提示",
              content: res.data.content,
              content1: "",
              content2: "",
              number: 2
            });
          }
        })
        .catch(error => {
          this.$loader.hide();
          console.log("setPayApplicationNo");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/user/comm.scss";
.p {
  line-height: 34px;
  font-size: 14px;
  margin: 10px 64px;
  & span {
    margin-left: 20px;
  }
}
.userMain .p:nth-child(4) {
  margin-left: 50px;
}
.el-input__inner {
  width: 210px;
}
.newTab {
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
  padding-left: 10px;
  & a {
    font-size: 14px;
    background: #f8f8f8;
    border: 1px solid #cecece;
    margin: 0 5px;
    padding: 0 10px;
    border-radius: 4px 4px 0 0;
    line-height: 28px;
    display: inline-block;
    margin-bottom: -1px;
  }
  & a.active {
    border-bottom: 1px solid #fff;
    background: #fff;
    color: #e4393c;
  }
}
</style>