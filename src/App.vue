<template>
  <div id="app">
    <div class="div">fdsaf</div>
    <p>dsaf</p>
    <ul class="ul">
      <li v-for="a in 6" :key="a.id"></li>
    </ul>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      a: 0,
      b: 1
    };
  }
};
</script>
<style lang="scss">
@import "assets/minix/reset.scss";
@import "assets/scss/app.scss";
</style>
