<template lang='jade'>
.viewBox
  .userRight
    .userTitle 绑定银行卡
    .userMain
      ul.submitContent.mglr30.mgt15
        li
          el-form(ref='form',label-width='200px',size='medium')
            el-form-item(label='开户银行：')
              el-select(v-model='bankNameId',placeholder='请选择开户银行')
                el-option(:label='item.title', :value='item.id',v-for="(item,index) in bankNameList",:key="index")
            el-form-item(label='开户城市：')
              el-input(v-model='address', placeholder='请输入开户省-市',style="width:210px;",type='text')
            el-form-item(label='开户人姓名：')
              el-input(v-model='niceName', placeholder='请输入银行卡的姓名',style="width:210px;",type='text')
            el-form-item(label='银行卡号：')
              el-input(v-model='card', placeholder='请输入银行卡的卡号',style="width:210px;",type='number')
            el-form-item(label='确认卡号：')
              el-input(v-model='card2', placeholder='请再次输入银行卡号',style="width:210px;",type='number')
            el-form-item(label='安全密码：')
              el-input(v-model='securityCode',placeholder='请输入您的安全密码',style="width:210px;",type='password',@keyup.enter="submit")
        li
          span
          router-link(to='',class='submitBtn ClickShade',@click.native="submit") 确定
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import md5 from "js-md5";
export default {
  data() {
    return {
      id: "",
      bankNameList: [],
      bankNameId: "",
      card: "", //卡号
      card2: "", //卡号重复
      address: "",
      niceName: "",
      securityCode: ""
    };
  },
  created() {
    this.getBankNameList();
    this.parser();
  },
  methods: {
    parser() {
      if (this.$route.query.Q) {
        let Q = JSON.parse(this.$route.query.Q);
        this.card = Q.card;
        this.bankNameId = Q.bankNameId;
        this.address = Q.address;
        this.niceName = Q.niceName;
        this.id = Q.id;
      } else {
        return;
      }
    },
    getBankNameList() {
      this.$axios
        .get(baseUrl + "/api/proxy/getBankNameList")
        .then(res => {
          this.bankNameList = res.data.data;
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    submit() {
      if (this.card != this.card2) {
        this.$message.error({
          message: "请输入相同银行卡号！",
          center: true,
          showClose: true
        });
        return;
      }
      if (
        this.bankNameId == "" ||
        this.card == "" ||
        this.card2 == "" ||
        this.address == "" ||
        this.niceName == "" ||
        this.securityCode == ""
      ) {
        this.$message.error({
          message: "请提交全部完整信息！",
          center: true,
          showClose: true
        });
        return;
      }
      if (this.card.indexOf("e") != -1 || this.card2.indexOf("e") != -1) {
        this.$message.error({
          message: "卡号含有非法字符！",
          center: true,
          showClose: true
        });
        return;
      } else {
        this.$loader.show();
        let formData = new FormData();
        formData.append("id", this.id);
        formData.append("bankNameId", this.bankNameId);
        formData.append("card", this.card);
        formData.append("card2", this.card2);
        formData.append("address", this.address);
        formData.append("niceName", this.niceName);
        formData.append("securityCode", md5(this.securityCode));
        this.$axios
          .post(baseUrl + "/api/proxy/setBankUser", formData)
          .then(res => {
            this.$loader.hide();
            if (res.data.code === 1) {
              this.$message({
                message: res.data.data.message,
                type: "success",
                center: true,
                showClose: true
              });
              setTimeout(() => {
                this.$router.push("/user/manageBankcard");
              }, 2000);
            } else {
              this.$message.error({
                message: res.data.data.message,
                center: true,
                showClose: true
              });
            }
          })
          .catch(error => {
            this.$loader.hide();
            this.$message.error({
              message: "请检查您的网络！",
              center: true,
              showClose: true
            });
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/user/comm.scss";
@import "@/assets/scss/user/setComm.scss";
</style>


