<template lang='jade'>
.viewBox
  .userRight
    .userTitle 银行卡管理
    .userMain
      .bindCard
        .fix
          .cardEmpty.cardItem.ClickShade 立即添加银行卡
        .userTip.mgt15
          p  {{content}}
</template>
<script>
import md5 from "js-md5";
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      content: "",
      securityCoe: "",
      securityCode: "",
      loading: false,
      dateFlag: 0,
      bankUserList: [],
      timeline: "今天",
      show1: false,
      show2: false,
      show3: false,
      show5: false,
      show6: false,
      usertype: 2,
      selected: [],
      bankUserList: [],
      showFlag: true,

      id: "",
      bankNameId: "",
      payway: [],
      selectBank: "",
      address: "",
      niceName: "",
      card: "",
      card2: "",
      securityCode: "",
      content2: ""
    };
  },
  created() {
    this.getBankUserList();
    this.getBankNameList();
  },
  methods: {
    select(a) {
      this.id = a.id;
      this.selectBank = a.title;
      this.address = a.address;
      this.niceName = a.niceName;
      this.card = a.card;
      this.show3 = !this.show3;
    },
    goCreate() {
      this.$axios
        .get(baseUrl + "/api/userCenter/getSecurityCenterStatus")
        .then(res => {
          this.securityCoe = res.data.data.securityCoe;
          if (this.securityCoe !== 1) {
            Message.error({
              message: "请先绑定安全密码!"
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
    onClick(item) {
      this.selectBank = item.name;
      this.bankNameId = item.id;
      this.show1 = !this.show1;
    },
    getBankNameList() {
      this.$axios
        .get(baseUrl + "/api/proxy/getBankNameList")
        .then(res => {
          for (let i = 0; i < res.data.data.length; i++) {
            if (i >= 3) {
              this.payway.push({
                name: res.data.data[i].title,
                id: res.data.data[i].id,
                callback: this.onClick
              });
            }
          }
        })
        .catch(error => {
          console.log("获取列表Error");
        });
    },
    getBankUserList() {
      this.$axios
        .get(baseUrl + "/api/proxy/getBankUserList")
        .then(res => {
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
          console.log("获取列表Error");
        });
    },

    sendReq() {
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
          if (res.data.code === 1) {
            this.content2 = res.data.data.message;
            this.show5 = true;
            this.show3 = false;
          } else {
            this.content2 = res.data.data.message;
            this.show6 = true;
          }
          this.getBankUserList();
        })
        .catch(error => {
          console.log("No");
        });
    }
  },
  filters: {
    lastFive(value) {
      let end = value.slice(-5);
      return `*********${end}`;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/user/manageBankcard.scss";
</style>


