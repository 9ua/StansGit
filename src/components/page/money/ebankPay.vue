<template lang="jade">
.viewBox
  .userRight
    .userTitle 我要充值
    .userMain
      newTab(:navNum=4)
      .rechLeftInfo
      .p 收款银行：
        span {{receiveBankName}}
      .p 收款人姓名：
        span {{receiveNiceName}}
      .p 收款卡号：
        span {{receiveBankId}}
      .p 支行地址：
        span {{receiveAddress}}
      el-form(ref='form', label-width='144px',size='medium')
        el-form-item(label='充值金额：')
          el-input(v-model='chargeamount', placeholder='请输入您想要充值的金额',type='number',style="width:210px;")
        el-form-item(label='充值人姓名：')
          el-input(v-model='niceName', placeholder='请输入充值人姓名',style="width:210px;",type='text')
        el-form-item(label='附言：')
          el-input(v-model='checkCode',style="width:210px;",type='number')
      router-link(to='',@click.native='submit',class='submitBtn',style='margin-left:144px;') 确定  
      .userTip
        p ※ 温馨提示：
          br
          span 1、请转到以上收款银行账户。
          br
          span 2、请正确填写转账银行卡的持卡人姓名和充值金额，以便及时核对。
          br
          span 3、转账1笔提交1次，请勿重复提交订单。
          br
          span 4、请务必转账后再提交订单，否则无法及时查到您的款项！
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import newTab from "../public/newTab";
export default {
  components: {
    newTab
  },
  data() {
    return {
      chargeamount: "",
      card: "",
      niceName: "",
      checkCode: "",
      listnav: "",
      QRCodeUrl: "",
      receiveAddress: "",
      receiveBankId: "",
      receiveBankName: "",
      receiveCard: "",
      receiveNiceName: ""
    };
  },
  mounted() {
    this.rechargeEntrance();
  },
  methods: {
    rechargeEntrance() {
      this.$axios
        .get(baseUrl + "/api/proxy/rechargeEntrance", {
          params: { rechargeWay: 5 }
        })
        .then(res => {
          this.QRCodeUrl = baseUrl + res.data.data.QRCodeUrl;
          this.receiveAddress = res.data.data.receiveAddress;
          this.receiveBankId = res.data.data.receiveBankId;
          this.receiveBankName = res.data.data.receiveBankName;
          this.receiveCard = res.data.data.receiveCard;
          this.receiveNiceName = res.data.data.receiveNiceName;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    sendReq() {
      if (this.checkCode == "") {
        this.$message.error({
          message: "交易订单后六位不能为空！",
          center: true,
          showClose: true
        });
        return;
      }
      if (this.chargeamount == "") {
        this.$message.error({
          message: "充值金额不能为空！",
          center: true,
          showClose: true
        });
        return;
      }
      if (this.niceName == "") {
        this.$message.error({
          message: "充值人姓名不能为空！",
          center: true,
          showClose: true
        });
        return;
      } else {
        let formData = new FormData();
        formData.append("rechargeWay", 1);
        formData.append("receiveBankId", this.receiveBankId);
        formData.append("chargeamount", this.chargeamount);
        formData.append("niceName", this.niceName);
        formData.append("checkCode", this.checkCode);
        this.$axios
          .post(baseUrl + "/api/proxy/setPayRequest", formData)
          .then(res => {
            if (res.data.code === 1) {
              this.$pop.show({
                title: "充值申请成功",
                content: "申请完成，资讯可至充值信息页面查询。",
                number: 1
              });
            } else if (res.data.code === 0) {
              this.$message.error({
                message: res.data.data.message,
                center: true,
                showClose: true
              });
            } else {
              this.$message.error({
                message: res.data.content,
                center: true,
                showClose: true
              });
            }
          })
          .catch(error => {
            console.log("充值失败");
          });
      }
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
  & span{
      margin-left:20px;
  }
}
.userMain .p:nth-child(4) {
  margin-left: 50px;
}
</style>