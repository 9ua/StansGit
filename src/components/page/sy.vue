<template>
  <div class="sy">
    <div class="hfBox">
      <div>top</div>
      <div>nav</div>
    </div>
    <!-- <button @click="logOut">退出</button>
    <button @click="alert">alert</button>
    <button @click="message">message</button>
    <div class="haaa">
      <mu-ripple class="mu-ripple-demo" color="red" :opacity="0.1">
        Click Me
      </mu-ripple>
    </div> -->
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { setCookie, getCookie, clearCookie } from "../../assets/js/utils";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["OUT_LOGIN"]),
    logOut() {
      this.OUT_LOGIN();
      this.$router.push({ name: "login" });
    },
    alert() {
      this.$alert("alert");
    },
    message() {
      this.$message("message");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/sy.scss";
</style>
