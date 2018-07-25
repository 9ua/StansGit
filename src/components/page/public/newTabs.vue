<template lang='jade'>
.newTab
  router-link(:to="nav.to", v-for='(nav,index) in listnav',:class="{'active': index === navNum}",:key='index') {{nav.title}}
</template>
<script>
export default {
  props: {
    navNum: Number
  },
  computed: {
    listnav() {
      let payway = JSON.parse(localStorage.getItem("paywaylist"));
      let listnav = [];
      for (let i in payway) {
        listnav.push({ title: payway[i].alias, to: payway[i].alino });
      }
      return listnav;
    }
  },
};
</script>
<style lang="scss" scoped>
.newTab {
  border-bottom: 1px solid #ddd;
  margin-top: 15px;
  padding-left: 10px;
  & a {
    font-size: 14px;
    background: #f8f8f8;
    border: 1px solid #cecece;
    margin: 0 5px;
    padding: 0 10px;
    border-radius: 4px 4px 0 0;
    line-height: 28px;
    display: inline-block;
    margin-bottom: -1px;
  }
  & a.active {
    border-bottom: 1px solid #fff;
    background: #fff;
    color: #e4393c;
  }
}
</style>