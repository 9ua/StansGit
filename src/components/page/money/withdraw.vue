<template lang='jade'>
.viewBox
  .userRight
    .userTitle 我要提现
    .userMain
      ul.submitContent.mg30
        li
          span 最高提现额度：
          ins 
            .money {{moneyDepositMax}} &nbsp;&nbsp;
          i 元
        li
          span 最低提现额度：
          ins 
            .money {{moneyDepositMin}} &nbsp;&nbsp;
          i 元
        li
          span 可提现金额：
          ins 
            .money {{myAmount}} &nbsp;&nbsp;
          i 元
        li
          span 今日剩余提现次数：
          ins 
            .money {{countMax}} &nbsp;&nbsp;
          i 次
        li
          el-form(ref='form', label-width='144px',size='medium')
            el-form-item(label='选择银行：')
              el-select(v-model='bankUserId', placeholder='请选择银行')
                el-option(:label='item.bankTitle+item.card', :value='item.id',v-for="(item,index) in bankUserList",:key="index")
            el-form-item(label='提现金额：')
              el-input(v-model='amount', placeholder='请输入您想要提现的金额',type='number',style="width:210px;",:min='moneyDepositMin',:max='moneyDepositMax')
            el-form-item(label='安全密码：')
              el-input(v-model='securityCode', placeholder='请输入您的安全密码',style="width:210px;",@keyup.enter="submit")
        li
          span
          router-link(to='',@click.native='submit',class='submitBtn') 确定           
      .userTip
        p ※ 温馨提示：
          br
          span 可提现金额=投注金额+中奖金额+代理返点
          br
          span 单笔提现：最低{{moneyDepositMin}}元，最高{{moneyDepositMax}}元
          br
          span 宏發云保障玩家资金绝对安全，欢迎监督举报；
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      bankUserId: "",
      myAmount: "",
      amount: "",
      countMax: "",
      securityCode: "",
      moneyDepositMax: "",
      moneyDepositMin: "",
      withdrawType: 1, //2
      bankUserList: [
        { value: 1, label: "中国工商银行" },
        { value: 2, label: "中国农业银行" }
      ]
    };
  },
  mounted() {
    this.getWithdrawInformation();
  },
  methods: {
    getWithdrawInformation() {
      this.$loader.show();
      this.$axios
        .get(baseUrl + "/api/proxy/getWithdrawInformation", {
          params: {
            withdrawType: this.withdrawType
          }
        })
        .then(res => {
          this.bankUserList = res.data.data.bankUserList;
          this.myAmount = res.data.data.amount;
          this.countMax = res.data.data.countMax;
          this.moneyDepositMax = res.data.data.moneyDepositMax;
          this.moneyDepositMin = res.data.data.moneyDepositMin;
          this.$loader.hide();
        })
        .catch(error => {
          this.$loader.hide();
          console.log("获取列表Error");
        });
    }
  },
  submit() {
    if (this.amount === "") {
      this.$message.error({
        message: "请输入金额！",
        center: true,
        showClose: true
      });
    } else if (
      this.amount > this.moneyDepositMax ||
      this.amount < this.moneyDepositMin
    ) {
      this.$message.error({
        message:
          "提现金额必须大于" +
          this.moneyDepositMin +
          "小于" +
          this.moneyDepositMax,
        center: true,
        showClose: true
      });
    } else {
      this.$loader.show();
      let formData = new FormData();
      formData.append("amount", this.amount);
      formData.append("bankUserId", this.bankUserId);
      formData.append("securityCode", md5(this.securityCode));
      formData.append("withdrawType", this.$route.query.id);
      this.$axios
        .post(this.$store.state.url + "api/proxy/setWithdraw", formData)
        .then(res => {
          this.$loader.hide();
          if (res.data.code === 1) {
            this.$pop.show({
              title: "提现成功",
              content: "请耐心等待款项到账",
              number: 1
            });
            this.$router.go(-1);
          } else {
            this.$pop.show({
              title: "提现失败",
              content: res.data.message,
              number: 1
            });
          }
        })
        .catch(error => {
          this.$loader.hide();
          console.log("setWithdrawNo");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/user/comm.scss";
.submitContent {
  & li {
    color: #000;
    line-height: 36px;
    margin-bottom: 4px;
    & > span {
      color: #666;
      display: inline-block;
      width: 144px;
      text-align: right;
      padding-right: 15px;
      font-size: 12px;
      margin-top: 8px;
    }
    & i {
      font-size: 13px;
      color: #333;
      right: 15px;
    }
    & input[type="radio"] {
      margin: 11px 5px;
      vertical-align: sub;
    }
  }
  & ins {
    text-decoration: none;
    & .money {
      color: #e4393c;
      display: inline-block;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
.selectBankCon {
  display: inline;
  position: relative;
  & i {
    position: absolute;
  }
  & .banked {
    margin: 10px 0;
    & i {
      padding-left: 20px;
      &::before {
        content: "\E74E";
        font-family: iconfont;
        font-style: normal;
        padding-left: 10px;
      }
    }
  }
}
.selectBank {
  border: 1px solid #ddd;
  display: inline-block;
  padding: 0 20px;
  padding-right: 40px;
  color: #000;
  line-height: 30px;
  cursor: pointer;
  border-radius: 2px;
}
.bankList {
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  width: 380px !important;
  padding: 10px 20px;
  margin-top: -3px;
  left: 0;
  box-shadow: 2px 2px 4px #999;
  & li {
    border-bottom: 1px dotted #ccc;
    cursor: pointer;
    & ins {
      display: inline-block;
      vertical-align: middle;
      line-height: 1.4;
    }
  }
}
.iconBank {
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  border: 1px solid #fff;
  overflow: hidden;
  height: 30px;
  margin: 10px 0;
  width: 126px;
}
</style>


