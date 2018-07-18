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
.el-message-box{
  border: none;
  & .el-message-box__header{
    background: #af3a31;
    padding:10px 15px 10px;
    & .el-message-box__title{
      font-size: 18px;
      color: #FFF;
    }
    & .el-message-box__headerbtn{
      font-size: 18px;
      & i{
        color: #FFF;
      }
    }
  }
}
</style>
