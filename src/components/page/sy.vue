<template>
  <div class="sy">
    <button @click="logOut">退出</button>
    <button @click="alert">alert</button>
    <button @click="message">message</button>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import {setCookie,getCookie,clearCookie} from '../../assets/js/utils';
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
    alert(){
      this.$alert("alert");
    },
    message(){
      this.$message("message");
    },
  }
};
</script>
