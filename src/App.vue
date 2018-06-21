<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
@import "assets/minix/reset.scss";
.mu-raised-button .mu-button-wrapper{
  color: #eee;
}
</style>
