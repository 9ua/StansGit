<template lang='jade'>
.viewBox
  .userRight
    .userTitle 银行卡管理
    .userMain
      .bindCard
        .fix
          .cardItem(v-for="(item,index) in bankUserList")
            .bankName
              i 
              | {{item.title}}
            .bankNum
              | 尾号：
              | {{item.card|lastFive}}
            .cardInfo.fix
              .cardStyle.cardPink
                | 储蓄卡
                em
              .cardOperation
               span._islock 未锁定
               router-link(:to="'setBankcard?Q='+JSON.stringify(item)",class="_set_bankcard") 修改
            .cardTxt
              span 绑卡日期：2018-07-12
              em {{item.niceName|name}}
          router-link(to="",class="cardEmpty cardItem ClickShade",@click.native="goCreate") 立即添加银行卡
        .userTip.mgt15
          p {{content}}
</template>
<script>
import md5 from "js-md5";
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      content: "",
      bankUserList: []
    };
  },
  created() {
    this.getBankUserList();
  },
  methods: {
    goCreate() {
      if (this.bankUserList.length > 5) {
        this.$message.error({
          message: "最多只能绑定5张卡，您已到达上限！",
          center: true,
          showClose: true
        });
        return;
      }
      this.$axios
        .get(baseUrl + "/api/userCenter/getSecurityCenterStatus")
        .then(res => {
          this.securityCoe = res.data.data.securityCoe;
          if (this.securityCoe !== 1) {
            this.$message.error({
              message: "请先设置安全密码！",
              center: true,
              showClose: true
            });
            setTimeout(() => {
              this.$router.push({ path: "/user/setSafePwd" });
            }, 1000);
          } else {
            this.$router.push({ path: "/user/setBankcard" });
          }
        })
        .catch(error => {
          console.log("取安全中心状态No111");
        });
    },
    getBankUserList() {
      this.$loader.show();
      this.$axios
        .get(baseUrl + "/api/proxy/getBankUserList")
        .then(res => {
          this.$loader.hide();
          this.bankUserList = res.data.data;
          if (res.data.data.length === 0) {
            this.content = "！您尚未绑定银行卡，一共可以绑定 5 张银行卡。";
          } else {
            this.content =
              "您已绑定 " +
              res.data.data.length +
              " 张银行卡，一共可以绑定5张银行卡。为了您的资金安全，成功提现的银行卡会自动锁定，无法删除和修改。";
          }
        })
        .catch(error => {
          this.$loader.hide();
          this.$message.error({
            message: "请您的检查网络",
            center: true,
            showClose: true
          });
        });
    }
  },
  filters: {
    lastFive(value) {
      let end = value.slice(-5);
      return `*********${end}`;
    },
    name(value) {
      let star = value.slice(0, 1);
      return `${star}**`;
    },
    stringify(value) {
      return JSON.stringify(value);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/user/manageBankcard.scss";
</style>


