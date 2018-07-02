<template lang="jade">
#app
  router-view
</template>
<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
@import "assets/minix/reset.scss";
.mu-raised-button .mu-button-wrapper {
  color: #eee;
}
.gm-scrollbar.-vertical{
  background-color: #ED635D;
}
.gm-scrollbar.-horizontal{
  height: 0px;
}
.gm-scrollbar.-vertical .thumb{
  background-color: #af3a31;
}
</style>
