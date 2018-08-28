<template lang='jade'>
.notContent(style='padding: 100px 0px;')
  .iconLoadingCon(style='transform: scale(0.6);')
    img.loadingImg(src='../../../assets/img/lott/loadingMobile.gif')
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.notContent {
  text-align: center;
  color: #999;
  padding-top: 18px;
  line-height: 1;
}
.iconLoadingCon {
  height: 175px;
  width: 150px;
  display: inline-block;
  position: relative;
  & img {
    width: 90px;
  }
}
</style>