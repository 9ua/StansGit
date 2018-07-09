<template>
  <div class="sscnav">
    <div v-for='(group,indexabc) in items.groups' :key='indexabc'>
      <span class="groupTitle">{{group.title}}</span>
      <span class="groupTitleList" :class="indexbcd === playNum ? 'active': ''" v-for='(player,indexbcd) in group.players' :key='indexbcd' @click="playersBut(player,indexbcd)">{{player.title}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playNum: 0,
      className: "ssc_star5", //玩法ID
      lottName: "宏发时时彩", //彩种名
      lotteryId: "sj1fc", //彩种id
      current_player_bonus: {}, //當前玩法
      displayBonus: 0,
      displayBonus1: 0,
      displayBonus2: 0,
      displayBonus3: ""
    };
  },
  props: {
    items: {
      type: Object
    }
  },
  methods: {
    //菜单选择项2
    playersBut(play, indexff) {
      this.playNum = indexff;
      this.current_player_bonus = play;
      this.className = play.id;
      this.displayBonus = play.displayBonus;
      if (isNaN(this.displayBonus)) {
        let ar = [];
        ar = this.displayBonus.split("-");
        this.displayBonus1 = Number(ar[0]);
        this.displayBonus2 = Number(ar[1]);
        this.displayBonus3 = this.displayBonus1 + "-" + this.displayBonus2;
      }
      console.log("菜单选择项2", this.className, play, indexff);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/minix/main.scss";

.sscnav {
  @extend %fdc;
  & div {
    @extend %flex, %aitems, %fdr;
    height: 33px;
    & .groupTitleList {
      @extend %faj;
      width: 80px;
      height: 30px;
      padding: 0px 0px;
      cursor: pointer;
    }
    & .groupTitleList.active {
      height: 33px;
      color: red;
    }
    & .groupTitle {
      width: 60px;
      color: red;
    }
  }
}
</style>

